import { UPDATE_SYSTEM_METRIC } from "./types";

const initialState = {
  systemMetrics: { cpu: 0, cpuModel: "", mem: 0, totalMem: 0 }
};

export function metricsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SYSTEM_METRIC:
      return Object.assign({}, state, { systemMetrics: action.payload });
    default:
      return state;
  }
}
