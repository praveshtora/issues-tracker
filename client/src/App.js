import React from 'react';
import './App.css';
import KanbanView from './components/KanbanView';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <h3>Board X</h3>
        </header>
        <div className="App-intro">
          <KanbanView />
        </div>
      </div>
    );
  }
}

export default App;
