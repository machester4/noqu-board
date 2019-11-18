import React, { useEffect, useCallback } from "react";
import "./styles.css";

// Utils
import { ClosetNumberIndex } from "../../utils/ClosetNumber";

// Hook
export function useSticky() {
  const refresh = useCallback(() => {
    const allSticky = document.getElementsByClassName("header-sticky");
    if (!allSticky.length) return;

    for (let item of allSticky) {
      if (item.offsetTop === window.pageYOffset) {
        console.log(item.classList);
        for (let itm of allSticky) {
          itm.classList.remove("sticky");
        }
        item.classList.add("sticky");
      }
    }
  }, []);
  useEffect(() => {
    refresh();
    // When the user scrolls the page
    window.onscroll = function() {
      refresh();
    };
  }, [refresh]);
}

export default function HeaderSticky({ children }) {
  return <div className="header-sticky">{children}</div>;
}
