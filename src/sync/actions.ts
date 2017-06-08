import { Log, AnyPointer } from "../interfaces";
import { API } from "../api";
import * as axios from "axios";
import { Sequence } from "../sequences/interfaces";
import { Tool } from "../tools/interfaces";
import { Regimen } from "../regimens/interfaces";
import { Peripheral } from "../controls/peripherals/interfaces";
import { FarmEvent, Crop } from "../farm_designer/interfaces";
import { Image } from "../images/interfaces";
import { DeviceAccountSettings } from "../devices/interfaces";
import { ResourceName } from "../resources/tagged_resources";
import { warning } from "../ui/logger";
// import { OpenFarmAPI } from "../open_farm/index";

export interface ResourceReadyPayl {
  name: ResourceName;
  data: object[];
}

export interface SyncResponse {
  type: "RESOURCE_READY";
  payload: ResourceReadyPayl;
}

export function fetchSyncData(dispatch: Function) {
  let fetch = <T>(name: ResourceName, url: string, type = "RESOURCE_READY") =>
    axios
      .get<T>(url)
      .then((r): SyncResponse => dispatch({
        type, payload: { name, data: r.data }
      }), fail);

  let fail = () => warning("Please try refreshing the page.",
    "Error downloading data");

  fetch<DeviceAccountSettings>("device", API.current.devicePath)
  fetch<FarmEvent[]>("farm_events", API.current.farmEventsPath);
  fetch<Image[]>("images", API.current.imagesPath);
  fetch<Log[]>("logs", API.current.logsPath);
  fetch<Peripheral[]>("peripherals", API.current.peripheralsPath);
  fetch<AnyPointer[]>("points", API.current.pointsPath)
  fetch<Regimen[]>("regimens", API.current.regimensPath);
  fetch<Sequence[]>("sequences", API.current.sequencesPath);
  fetch<Tool[]>("tools", API.current.toolsPath);
}

export function fetchSyncDataOk(payload: {}) {
  return {
    type: "FETCH_SYNC_OK", payload
  };
}

export function fetchSyncDataNo(err: Error) {
  return {
    type: "FETCH_SYNC_NO",
    payload: {}
  };
}
