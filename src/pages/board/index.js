import React, { useCallback, useState, useMemo } from "react";
import "./styles.css";

// Components
import NavBar from "./NavBar";
import Header from "./header";
import Queue from "./queue";

// Hooks
import { usePolling } from "../../hooks";

// Services
import { getPolling, getPollingQueue } from "../../services/noqu";
import { pollingInterval } from "../../config/NoquBoard";

function BoardPage() {
  const [sysUsage, setSysUsage] = useState();
  const [queues, setQueues] = useState([]);
  const [currentQueue, setCurrentQueue] = useState();

  const renderQueues = useMemo(() => {
    return queues.map(queue => (
      <Queue
        key={queue.name}
        queue={queue}
        setCurrent={setCurrentQueue}
        isCurrent={currentQueue && currentQueue.name === queue.name}
      />
    ));
  });

  const loadQueues = useCallback(
    async next => {
      try {
        if (currentQueue) {
          console.log("polling current");
          const { name, status, start, end } = currentQueue;
          console.log(currentQueue);
          const {
            data: { queuesStatus, sysStatus, polling }
          } = await getPollingQueue(name, status, start, end);
          const queuesMap = queuesStatus.map(qu => {
            if (qu.name === currentQueue.name) {
              qu.jobs = polling;
            }
            return qu;
          });
          console.log(queuesMap);
          setQueues(queuesMap);
          setSysUsage(sysStatus);
        } else {
          console.log("polling general");
          const {
            data: { queuesStatus, sysStatus }
          } = await getPolling();
          console.log(queuesStatus);
          setQueues(queuesStatus);
          setSysUsage(sysStatus);
        }
        next();
      } catch (error) {
        console.error(error);
      }
    },
    [currentQueue]
  );

  usePolling(loadQueues, pollingInterval);

  return (
    <div className="page">
      <NavBar />
      <Header sysUsage={sysUsage} />
      {renderQueues}
    </div>
  );
}

export default BoardPage;
