import React, { useEffect, useCallback, useState, useMemo } from "react";
import "./styles.css";

// Components
import NavBar from "./NavBar";
import Header from "./header";
import Queue from "./queue";

// Libs
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { init } from "../../config/socket";

// Services
import { getQueues } from "../../services/noqu";

function BoardPage({ metrics }) {
  const [queues, setQueues] = useState([]);

  const renderQueues = useMemo(() => {
    return queues.map(queue => <Queue {...queue} />);
  }, [queues]);

  const loadQueues = useCallback(async () => {
    try {
      const { data } = await getQueues();
      console.log(data);
      setQueues(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const authenticated = true;
    if (authenticated) {
      init();
      loadQueues();
    } else {
      // * Redirect login
      // * Disconnect socket
    }
  }, []);

  return (
    <div className="page">
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <header style={style}>
              <NavBar />
            </header>
          )}
        </Sticky>
        <Header {...metrics.systemMetrics} />
      </StickyContainer>
      {renderQueues}
    </div>
  );
}

function mapStateToProps({ metrics }) {
  return {
    metrics
  };
}

export default connect(mapStateToProps)(BoardPage);
