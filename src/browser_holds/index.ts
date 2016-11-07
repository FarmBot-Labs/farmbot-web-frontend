import { Everything } from "../interfaces";

function stopThem() { return "You have unsaved work."; }
function dontStopThem() { }

/** Subscribe to the store. Stop the user from exiting if any part of the
 * state tree contains `dirty: true`. */
export function dontExitIfBrowserIsOnHold(state: Everything) {
    let unsavedWork = ((JSON.stringify(state) || "")
        .replace(" ", "")
        .includes('"dirty":true'));
    window.onbeforeunload = (unsavedWork) ? stopThem : dontStopThem;
}
