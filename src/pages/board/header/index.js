import React, { useMemo } from "react";
import "./styles.css";

// Components
import Item from "./item";

function Header({ cpu, cpuModel, mem, totalMem }) {
  const memoryPercentageUsed = useMemo(() => {
    return `${((mem / totalMem) * 100).toFixed(2)}%`;
  }, [mem]);

  const totalMemInGB = useMemo(() => {
    return (totalMem / 1024).toFixed(2);
  }, [totalMem]);

  return (
    <div className="header">
      <Item title="Version" body="0.0.1" footer="Redis 5.0.1" />
      <Item title="CPU Usage" body={`${cpu}%`} footer={cpuModel} />
      <Item
        title="Memory Usage"
        body={memoryPercentageUsed}
        footer={`${mem} MB of ${totalMemInGB} GB`}
      />
      <Item title="Active" body="8" />
      <Item title="Waiting" body="3" />
    </div>
  );
}

export default Header;
