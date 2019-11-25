import React, { useEffect } from "react";
import "./styles.css";

// Components
import NavBar from "./NavBar";
import Header from "./header";
import Queue from "./queue";

// Libs
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { init } from "../../config/socket";

function BoardPage({ metrics }) {
  useEffect(() => {
    const authenticated = true;
    if (authenticated) {
      init();
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
      <Queue />
    </div>
  );
}

function mapStateToProps({ metrics }) {
  return {
    metrics
  };
}

export default connect(mapStateToProps)(BoardPage);
