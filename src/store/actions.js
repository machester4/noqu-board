import { UPDATE_SYSTEM_METRIC } from "./types";

export function updateSystemMetric(payload) {
  return {
    type: UPDATE_SYSTEM_METRIC,
    payload
  };
}
