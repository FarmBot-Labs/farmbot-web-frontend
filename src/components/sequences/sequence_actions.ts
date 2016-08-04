import * as axios from "axios";
import { AuthState } from "../auth/interfaces";
import { authHeaders } from "../auth/util";
import { SequenceOptions,
         Step,
         UnplacedStep,
         Sequence,
         SequenceReducerState } from "./interfaces";
import { success, error } from "../../logger";
import { randomColor } from "../../util";


export function nullSequence(): Sequence {
  return {
    color: randomColor(),
    name: "New Sequence", // TODO: l10n-id="sequences-list-new"
    steps: [],
    dirty: false
  };
}
function fetchSequencesNo(err: Error) {
  return {
    type: "FETCH_SEQUENCE_NO",
    payload: {}
  };
}

export interface FetchSequencesOk {
  type: "FETCH_SEQUENCES_OK";
  payload: Array<Sequence>;
};

function fetchSequencesOk(sequences: Array<Sequence>): FetchSequencesOk {
  return {
    type: "FETCH_SEQUENCES_OK",
    payload: sequences
  };
}

export function fetchSequences() {
  return (dispatch: Function, getState: Function) => {
    let state: AuthState = getState().auth;
    let { iss, token } = state;

    let headers = authHeaders(token);
    axios.get<Sequence[]>(`${iss}/api/sequences`, headers)
      .then(({data}) => {
        dispatch(fetchSequencesOk(data));
      }, (e: Error) => {
        error("error-m-FETCH_SEQUENCE_NO");
        dispatch(fetchSequencesNo(e));
      });
  };
};

export interface EditCurrentSequence {
  type: "EDIT_CURRENT_SEQUENCE";
  payload: {
    name?: String;
  };
};

export function editCurrentSequence(updates: SequenceOptions): EditCurrentSequence {
  return {
    type: "EDIT_CURRENT_SEQUENCE",
    payload: updates
  };
}

export interface PushStep {
  type: "PUSH_STEP";
  payload: {
    step: UnplacedStep;
  };
}

export function pushStep(step: UnplacedStep): PushStep {
  return {
    type: "PUSH_STEP",
    payload: {step}
  };
}

type CHANGE_STEP = "CHANGE_STEP";
export interface ChangeStep {
  type: CHANGE_STEP;
  payload: {
    step: Step;
    index: number;
  };
}

export function changeStep(index: number, step: Step): ChangeStep {
  return {
    type: "CHANGE_STEP",
    payload: {step, index}
  };
}

export interface RemoveStep {
  type: "REMOVE_STEP";
  payload: {
    index: number;
  };
};

export function removeStep(index: number): RemoveStep {
  return {
    type: "REMOVE_STEP",
    payload: {index}
  };
}

export function saveSequence(sequence: Sequence) {
  return function(dispatch: Function, getState: Function) {
    let state: AuthState = getState().auth;
    let { iss, token } = state;
    let url = `${iss}/api/sequences/`;
    let method: Function;
    if (sequence._id) {
      url += sequence._id;
      method = axios.put;
    } else {
      method = axios.post;
    };
    return method(url, sequence, authHeaders(token))
    .then(function(resp: {data: Sequence; }) {
      let seq: Sequence = resp.data;
      success(["success-m-SAVE_SEQUENCE_OK", {sequenceName: seq.name}]);
      dispatch(saveSequenceOk(resp.data));
    },
    function(err: { data: Error; }) {
      let msg: string = _.values(err.data).join("\n"); // TODO: localize `msg`
      error(["error-m-SAVE_SEQUENCE_NO", {sequenceName: sequence.name, msg: msg}]);
      dispatch(saveSequenceNo(error));
    });
  };
};

export interface SaveSequenceOk {
  type: string;
  payload: Sequence;
}
export function saveSequenceOk(sequence: Sequence) {
  return {
    type: "SAVE_SEQUENCE_OK",
    payload: sequence
  };
}

export function saveSequenceNo(error: any) {
  return {
    type: "SAVE_SEQUENCE_NO",
    payload: error
  };
}

export interface SelectSequence {
  type: "SELECT_SEQUENCE";
  payload: number;
};

export function selectSequence(index: number): SelectSequence {
  return {
    type: "SELECT_SEQUENCE",
    payload: index
  };
}

export function deleteSequence(
  seqInx: number) {
  return (dispatch: Function, getState: Function) => {
    dispatch({ type: "DELETE_SEQUENCE_START", payload: {} });

    if (!confirm("Delete sequence?")) {
      cancelDeletion(dispatch, getState);
    } else {
      confirmDeletion(dispatch, getState);
    }
  };
}

function cancelDeletion(dispatch: Function, _: Function) {
  dispatch({ type: "DELETE_SEQUENCE_CANCEL", payload: {} });
}

function confirmDeletion(dispatch: Function, getState: Function) {
  let authState: AuthState = getState().auth;
  let sequenceState: SequenceReducerState = getState().sequences;
  let sequence = sequenceState.all[sequenceState.current];
  let index = sequenceState.current;
  let { iss, token } = authState;
  let handler = (sequence._id) ? deleteSavedSequence : deleteUnsavedSequence;

  handler({ sequence, iss, token }).then(() => {
    dispatch(deleteSequenceOk(sequence, index));
  }, () => {
      error("error-m-DELETE_SEQUENCE_ERR");
      dispatch({type: "DELETE_SEQUENCE_ERR", payload: {}});
  });
}

interface SequenceDeletionParams {
  sequence: Sequence;
  iss: string;
  token: string;
}

function deleteSavedSequence({
                                 sequence,
                                 iss,
                                 token
                               }: SequenceDeletionParams) {
  let url = `${iss}/api/sequences/${sequence._id}`;
  return axios.delete(url, authHeaders(token));
};

function deleteUnsavedSequence(_: SequenceDeletionParams) {
  return Promise.resolve();
};

export interface DeleteSequenceOk {
  type: "DELETE_SEQUENCE_OK";
  payload: {
    sequence: Sequence;
    index: number;
  };
}

export function deleteSequenceOk(sequence: Sequence,
                                 index: number): DeleteSequenceOk {
  return {
    type: "DELETE_SEQUENCE_OK",
    payload: {sequence, index}
  };
};

export function addSequence() {
  return {
    type: "ADD_SEQUENCE",
    payload: {}
  };
}
