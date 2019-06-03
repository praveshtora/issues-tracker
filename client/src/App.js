import React from 'react';
import './App.css';
import KanbanView from './components/KanbanView';

const data = require('./data.json');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boardData: { lanes: [] } };
    this.getBoard = this.getBoard.bind(this);
  }

  async componentWillMount() {
    const response = await this.getBoard();
    this.setState({ boardData: response });
  }

  getBoard() {
    return new Promise(resolve => {
      resolve(data);
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h3>Board X</h3>
        </header>
        <div className="App-intro">
          <KanbanView data={data} />
        </div>
      </div>
    );
  }
}

export default App;
