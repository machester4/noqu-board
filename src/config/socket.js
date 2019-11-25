import socket from "socket.io-client";

import { store } from "../store";
import { updateSystemMetric } from "../store/actions";

// Events

// **** Handlers ****
function handleConnect() {
  console.log("connected to server");
}
function handleSytemMetric(data) {
  console.log("system-met", data);
  store.dispatch(updateSystemMetric(data));
}

const socketEvents = {
  connect: handleConnect,
  "system-met": handleSytemMetric
};

let io;

function initListeners() {
  Object.keys(socketEvents).forEach(key => {
    io.on(key, socketEvents[key]);
  });
}

export function init() {
  if (!!!io) {
    io = socket("http://localhost:3333"); // PROD -> window.location.origin
    initListeners();
  }
}
