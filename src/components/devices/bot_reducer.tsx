import { error, warning, success } from "../../logger";
import * as _ from "lodash";
import { BotState } from "./interfaces";
import { generateReducer } from "../generate_reducer";
import { isBotLog } from "./is_bot_log";

let status = {
  NOT_READY: "never connected to device",
  CONNECTING: "initiating connection",
  AWAITING_API: "downloading device credentials",
  API_ERROR: "Unable to download device credentials",
  AWAITING_WEBSOCKET: "calling FarmBot with credentials",
  WEBSOCKET_ERR: "Error establishing socket connection",
  CONNECTED: "Socket Connection Established",
  READY: "Bot ready"
};

let initialState: BotState = {
  logQueueSize: 10,
  logQueue: [],
  status: status.NOT_READY,
  stepSize: 1000,
  hardware: {},
  axisBuffer: {},
  settingsBuffer: {}
};

export let botReducer = generateReducer<BotState>(initialState)
  .add<any>("SETTING_TOGGLE_OK", function(state, action) {
    return this.READ_STATUS_OK(state, action);
  })
  .add<any>("COMMIT_SETTINGS_OK", function(state, action) {
    let nextState = _.assign<any, BotState>({}, state, {
      settingsBuffer: {}
    });
    return nextState;
  })
  .add<any>("COMMIT_AXIS_CHANGE_OK", function(oldState, action) {
    let hardware = _.assign({}, oldState.hardware, action.payload);
    let state = _.assign<any, BotState>({}, oldState);

    return _.assign<any, BotState>({}, state, {
      axisBuffer: {},
      hardware
    });
  })
  .add<any>("COMMIT_AXIS_CHANGE_ERR", function(state, action) {
    return state;
  })
  .add<any>("CHANGE_AXIS_BUFFER", function(state, action) {
    let axisBuffer = _.assign({}, state.axisBuffer);
    axisBuffer[action.payload.key] = action.payload.val;

    return _.assign<any, BotState>({}, state, {
      axisBuffer: axisBuffer
    });
  })
  .add<any>("CHANGE_SETTINGS_BUFFER", function(state, action) {
    let settingsBuffer = _.assign({}, state.settingsBuffer);
    let newVal = Number(action.payload.val);
    if (newVal) {
      settingsBuffer[action.payload.key] = action.payload.val;
    } else {
      delete settingsBuffer[action.payload.key];
    }
    return _.assign<any, BotState>({}, state, {
      settingsBuffer: settingsBuffer
    });
  })
  .add<any>("CHANGE_STEP_SIZE", function(state, action) {
    return _.assign<any, BotState>({}, state, {
      stepSize: action.payload
    });
  })
  .add<any>("READ_STATUS_OK", function(state, action) {
    let hardware: any = _.assign({}, action.payload);
    delete hardware.method;
    return _.assign<any, BotState>({},
      state, {
        hardware: hardware
      }, {
        status: status.READY
      });
  })
  .add<any>("BOT_CHANGE", function(state, action) {
    let statuses: any = _.assign({}, action.payload);
    let newState: any = _.assign({}, state);
    newState.hardware = _.assign({}, state.hardware, statuses);
    return _.assign<any, BotState>({}, newState);
  })
  .add<any>("COMMAND_ERR", function(s, a) {
    return s;
  })
  .add<any>("COMMAND_OK", function(s, a) {
    return s;
  })
  .add<any>("CONNECT_OK", function(state, action) {
    return _.assign<any, BotState>({},
      state,
      action.payload, {
        status: status.CONNECTED,
        connected: true
      });
  })
  .add<any>("CONNECT_ERR", function(state, action) {
    return _.assign<any, BotState>({},
      state, {
        status: status.WEBSOCKET_ERR
      });
  })
  .add<any>("CHANGE_DEVICE", function(state, action) {
    return _.assign<any, BotState>({},
      state,
      action.payload);
  })
  .add<any>("FETCH_DEVICE", function(state, action) {
    return state;
  })
  .add<any>("FETCH_DEVICE_OK", function(state, { payload }) {
    return _.assign<any, BotState>({},
      state,
      payload, {
        status: status.AWAITING_WEBSOCKET
      });
  })
  .add<any>("FETCH_DEVICE_ERR", function(state, action) {
    if (action.payload.status === 404) {
      warning("warning-m-FETCH_DEVICE_ERR",
        "warning-t-FETCH_DEVICE_ERR");
    } else {
      error("error-m-FETCH_DEVICE_ERR");
    };
    return _.assign<any, BotState>({},
      state, {
        status: status.API_ERROR
      });
  })
  .add<any>("SAVE_DEVICE_ERR", function(state, action) {
    switch (action.payload.status) {
      case 422:
        let errors = _.map(action.payload.responseJSON, v => v)
          .join(". ");
        error(errors, "error-t-SAVE_DEVICE_ERR"); // TODO: localize `errors`
        break;
      default:
        error("error-m-SAVE_DEVICE_ERR");
        break;
    }
    return state;
  })
  .add<any>("SAVE_DEVICE_OK", function(state, action) {
    // TODO Move this into the action creator. Does not belong in a reducer.
    success("success-m-SAVE_DEVICE_OK");
    return _.assign<any, BotState>({}, state, action.payload, {
      dirty: false
    });
  })
  .add<any>("BOT_NOTIFICATION", function(s, { payload }) {
    let state;

    if (isBotLog(payload)) {
      state = _.cloneDeep(s);
      let msg = _.cloneDeep(payload);
      state.logQueue.unshift(msg);
      state.logQueue = _.take(state.logQueue, state.logQueueSize);
      console.groupCollapsed("Bot Message");
      console.log(msg.data);
      console.groupEnd();
    } else {
      console.warn("Unexpected log message?");
      state = s; // Not a log message.
    }
    return state;

  });
