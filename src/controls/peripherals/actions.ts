import { Everything } from "../../interfaces";
import { ReduxAction } from "../../redux/interfaces";
import * as axios from "axios";
import { error } from "../../logger";
import { t } from "i18next";
import { IndexedPeripheral, Peripheral } from "./interfaces";
import { devices } from "../../device";
import * as _ from "lodash";

/** Transitions the peripherals form from a controlling state
 *  into an editing state */
export function startEditing(): ReduxAction<{}> {
    return {
        type: "EDIT_PERIPHERALS_START",
        payload: {}
    };
}

/** Flips the peripheral form out of the editing state. */
export function startControlling(): ReduxAction<{}> {
    return { type: "CONTROL_PERIPHERALS_START", payload: {} };
}

export interface UpdatePeripheral {
    index: number;
    peripheral: {
        // Typescript 2.1 will introduce subset types.
        // TODO: Change this to a subset type when that feature lands.
        label?: string;
        pin?: number;
    };
}

/** Triggered when the user uses the inline form on the peripheral box. */
export function updatePeripheral({index, peripheral}: UpdatePeripheral):
    ReduxAction<{}> {
    return {
        type: "UPDATE_PERIPHERAL",
        payload: {
            index,
            peripheral
        }
    };
};

export function destroyPeripheral(payload: IndexedPeripheral) {
    return function(dispatch: Function, getState: () => Everything) {
        let state = getState();
        let id = payload.peripheral.id;
        function remove() {
            dispatch({
                type: "REMOVE_PERIPHERAL",
                payload
            });
        }
        if (id) {
            axios
                .delete(peripheralUrl(state.auth.iss) + id)
                .then(remove)
                .catch(handleError("Peripheral deletion failed."));
        } else {
            remove();
        };
    };
}

export function saveAll() {
    return function(dispatch: Function, getState: () => Everything) {
        let state = getState();
        axios
            .post<Peripheral[]>(peripheralUrl(state.auth.iss),
            { peripherals: state.peripherals.all })
            .then(function(x) {
                devices.current.sync();
                dispatch({
                    type: "REPLACE_PERIPHERALS",
                    payload: x.data
                });
            })
            .catch(handleError("There was a problem saving peripherals"));
    };
}

function handleError(defaultMsg: string) {
    return function(x: any) {
        let message = _.get(x, "response.data.error", t(defaultMsg));
        error(message);
    };
}

export function fetchPeripherals(baseUrl: string) {
    return function(dispatch: Function) {
        axios
            .get(peripheralUrl(baseUrl))
            .then(function(x) {
                dispatch({
                    type: "REPLACE_PERIPHERALS",
                    payload: x.data
                });
            });
    };
}

export function pushPeripheral(payload: Peripheral) {
    return { type: "PUSH_PERIPHERAL", payload };
}

let peripheralUrl = (base: string) => `${base}/api/peripherals/`;
