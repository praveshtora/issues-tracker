import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import LifeCycleColumn from '../LifeCycleColumn';
import './KanbanView.css';

class KanbanView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lifeCycles: {} };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getBoard = this.getBoard.bind(this);
  }

  componentDidMount() {
    this.getBoard().then(response => this.setState({ lifeCycles: response }));
  }

  getBoard() {
    return new Promise(resolve => {
      // const data = require('./data.json');
      const data = {
        lifeCycles: {
          'To-Do': [],
          Progress: [],
          Done: [
            {
              _id: 'id1',
              issueId: '1002',
              title: 'Create Repo',
              description: 'ASKK askjka asda',
              asignee: 'Manish',
              lifeCycle: 'Done',
              comments: ['comment1']
            },
            {
              _id: 'id2',
              issueId: '1003',
              title: 'Refactor Repo',
              description: 'Nothing much',
              asignee: 'Vikalp',
              lifeCycle: 'Done',
              comments: ['comment2']
            }
          ]
        }
      };
      resolve(data.lifeCycles);
    });
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const { lifeCycles } = this.state;
    const lifeCycleName = source.droppableId;
    const lifeCycle = lifeCycles[lifeCycleName];
    const newIssues = Array.from(lifeCycle);
    const issue = newIssues[source.index];

    newIssues.splice(source.index, 1);
    newIssues.splice(destination.index, 0, issue);

    const newLifeCycle = [...newIssues];

    const newState = {
      ...this.state,
      lifeCycles: {
        ...lifeCycles,
        [lifeCycleName]: newLifeCycle
      }
    };

    this.setState(newState);
  }

  render() {
    const { lifeCycles = {} } = this.state;

    const lifeCycleColumns = Object.keys(lifeCycles).map(key => (
      <LifeCycleColumn key={key} title={key} issues={lifeCycles[key]} />
    ));

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="KanbanView life-cycle-columns-container">
          {lifeCycleColumns}
        </div>
      </DragDropContext>
    );
  }
}

export default KanbanView;
