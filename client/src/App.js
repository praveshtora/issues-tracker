import React from "react";
import "./App.css";
import KanbanView from "./components/KanbanView";
import Dashboard from "./components/Dashboard/DashboardList";
import SignIn from "./components/SignIn/SignIn";
const data = require("./data.json");

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Issue Tracker</h1>
        </header>
        <SignIn />
        {/* <Dashboard /> */}
        <div className="App-intro">
          <KanbanView />
        </div>
        <Dashboard />
        {/* <div className="App-intro">
          <KanbanView data={data} />
        </div> */}
      </div>
    );
  }
}

export default App;
