import axios from "axios";
import { URL } from "../config/NoquServer";

export function getQueues() {
  return axios({
    url: "queues",
    baseURL: URL(),
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
}

export function getJobsByStatus(queue, status) {
  return axios({
    url: `${queue}/${status}`,
    baseURL: URL(),
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
}
