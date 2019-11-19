import React from "react";
import "./styles.css";

// Components
import Header from "./header";

function Queue() {
  return (
    <div className="queue">
      <Header />
      <hr />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>timestamps</th>
            <th>progress</th>
            <th>attemps</th>
            <th>data</th>
            <th>opts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>20/11</td>
            <td>100%</td>
            <td>0</td>
            <td>
              <pre>{'{"name": "Test"}'}</pre>
            </td>
            <td>
              <pre>{'{"opp": "Test"}'}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Queue;
