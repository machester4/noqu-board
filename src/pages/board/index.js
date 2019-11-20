import React from "react";
import "./styles.css";

// Components
import NavBar from "./NavBar";
import Header from "./header";
import Queue from "./queue";

// Libs
import { StickyContainer, Sticky } from "react-sticky";

function BoardPage() {
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
        <Header />
      </StickyContainer>
      <Queue />
    </div>
  );
}

export default BoardPage;
