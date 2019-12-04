const jobStates = [
  "active",
  "waiting",
  "completed",
  "failed",
  "delayed",
  "paused"
];
const queueFields = [];
const queuePageSize = 10;
const pollingInterval = 1000; // ms

export { jobStates, queueFields, queuePageSize, pollingInterval };
