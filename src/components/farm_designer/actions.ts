import { authHeaders } from "../auth/util";
import * as Axios from "axios";
import { error } from "../../logger";
import { Plant } from "./interfaces";
import { CropSearchResult, OpenFarm } from "./openfarm";

const PLANT_URL = "api/plants";

export function fetchPlants(baseUrl: string, token: string) {
  let url = baseUrl + "/" + PLANT_URL;
  return function (dispatch, getState) {
    dispatch({ type: "FETCH_PLANTS_START" });
    return Axios.get<Plant[]>(url, authHeaders(token))
      .then((resp) => {
        let payload = resp.data;
        console.dir(payload);
        dispatch({ type: "FETCH_PLANTS_OK", payload });
      })
      .catch((payload) => {
        error("error-m-FETCH_PLANTS_ERR");
        dispatch({ type: "FETCH_PLANTS_ERR", payload });
      });

  };
};

export function savePlant(plant: Plant, baseUrl: string, token: string) {
  let url = baseUrl + PLANT_URL;
  return function (dispatch, getState) {
    dispatch({ type: "SAVE_PLANT_START" });
    return Axios.post<Plant>(url, plant, authHeaders(token))
      .then((resp) => {
        // so that no persisted data sticks around.
        let payload: Plant = _.assign({}, plant, resp.data) as Plant;
        dispatch({ type: "SAVE_PLANT_OK", payload });
      })
      .catch((payload) => {
        error("error-m-SAVE_PLANT_ERR");
        dispatch({ type: "SAVE_PLANT_ERR", payload });
      });
  };
};

export function destroyPlant(plant: Plant, baseUrl: string, token: string) {
  let url = baseUrl + PLANT_URL + "/" + plant._id;
  return function (dispatch, getState) {
    dispatch({ type: "DESTROY_PLANT_START" });
    return Axios.delete<Plant>(url, authHeaders(token))
      .then((resp) => {
        let payload = plant;
        dispatch({ type: "DESTROY_PLANT_OK", payload });
      })
      .catch((payload) => {
        error("error-m-DESTROY_PLANT_ERR");
        dispatch({ type: "DESTROY_PLANT_ERR", payload });
      });
  };
};

let STUB_IMAGE = "http://placehold.it/200x150";
let url = (q) => `${OpenFarm.cropUrl}?include=pictures&filter=${q}`;
// If we do a search on keypress, we will DDoS OpenFarm.
// This function prevents that from happening by pausing X ms
// per keystroke.
let _openFarmSearchQuery = _.throttle(q => Axios.get<CropSearchResult>(url(q)), 1500);


/** Search openfarm for crops. This is a throttled function, useful for live search. */
export function openFarmSearchQuery(query: string) { // TODO make less smelly
  return function(dispatch: Function) {
    dispatch({
      type: "SEARCH_QUERY_CHANGE",
      payload: query
    });
    return _openFarmSearchQuery(query)
      .then((resp) => {
        // Pluck ID and URL of user-submitted OpenFarm crops...
        // EG: => { X1y3ZAA: "cabbage.png" }
        let images: { [key: string]: string } = {};

        _.get<OpenFarm.Included[]>(resp, "data.included", [])
         .map(function (item) {
            return {
              id: item.id,
              url: item.attributes.thumbnail_url
            };
          })
          .map((val, acc) => images[val.id] = val.url);

        let payload = resp
          .data
          .data
          .map(function (datum) {
            let crop = datum.attributes;
            let id = _.get<string>(datum, "relationships.pictures.data[0].id");
            return { crop, image: (images[id] || STUB_IMAGE) };
          });

        dispatch({
          type: "OF_SEARCH_RESULTS_OK",
          payload
        });
      })
      .catch(function (error) { console.warn(error); });
  };
};
