import { generateReducer } from "../generate_reducer";
import { TickerState } from "./interfaces";

let YELLOW = "#fd6",
    RED = "#e66",
    GREEN = "#6a4";

function change(color: string, message: string, show = true) {
    return (s, a) => ({ color, message, show });
}

export let tickerReducer = generateReducer<TickerState>({
    message: "LOGIN_REQUIRED",
    color: "gray",
    show: true
  })
.add<{}>("LOGIN_OK", change(YELLOW, "LOGIN_OK"))
.add<{}>("LOGIN_ERR", change(RED, "LOGIN_ERR"))
.add<{}>("FETCH_PLANTS_START", change(YELLOW, "FETCH_PLANTS_START"))
.add<{}>("FETCH_PLANTS_OK", change(GREEN, "FETCH_PLANTS_OK"))
.add<{}>("FETCH_PLANTS_ERR", change(RED, "FETCH_PLANTS_ERR"))
.add<{}>("FETCH_SEQUENCES_OK", change(GREEN, "FETCH_SEQUENCES_OK"))
.add<{}>("READ_STATUS_OK", change(GREEN, "READ_STATUS_OK"))
.add<{}>("FETCH_DEVICE_ERR", change(RED, "FETCH_DEVICE_ERR"))
.add<{}>("READ_STATUS_ERR", change(RED, "READ_STATUS_ERR"))
.add<{}>("BOT_NOTIFICATION", change(GREEN, "BOT_NOTIFICATION"))
.add<{}>("COMMAND_OK", change(GREEN, "COMMAND_OK"));
