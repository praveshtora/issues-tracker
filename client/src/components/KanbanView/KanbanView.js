import React, { useReducer, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import LifeCycleColumn from '../LifeCycleColumn';
import './KanbanView.css';
import { reducer, ADD_ISSUE, REORDER_ISSUE } from '../../reducer/reducer';

const KanbanView = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = { lifeCycles: {} };
  //   this.onDragEnd = this.onDragEnd.bind(this);
  //   this.getBoard = this.getBoard.bind(this);
  // }

  const [state, dispatch] = useReducer(reducer, { lifeCycles: {} });

  useEffect(() => {
    getBoard().then(response =>
      dispatch({ type: REORDER_ISSUE, payload: { lifeCycles: response } })
    );
  }, []);
  // componentDidMount() {
  // }

  const getBoard = () => {
    return new Promise(resolve => {
      // const data = require('./data.json');
      const data = {
        lifeCycles: {
          'To-Do': [],
          Progress: [
            {
              _id: 'id2',
              issueId: '1003',
              title: 'Refactor Repo',
              description: 'Nothing much',
              asignee: 'Vikalp',
              lifeCycle: 'Done',
              comments: ['comment2']
            }
          ],
          Done: [
            {
              _id: 'id1',
              issueId: '1002',
              title: 'Create Repo',
              description: 'ASKK askjka asda',
              asignee: 'Manish',
              lifeCycle: 'Done',
              comments: ['comment1']
            }
          ]
        }
      };
      resolve(data.lifeCycles);
    });
  };

  const onDragEnd = result => {
    const { source, destination } = result;
    console.log(result);
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const { lifeCycles } = state;
    const startLifeCycleName = source.droppableId;
    const startLifeCycle = lifeCycles[startLifeCycleName];
    const finishLifeCycleName = destination.droppableId;
    const finishLifeCycle = lifeCycles[finishLifeCycleName];

    const startIssues = Array.from(startLifeCycle);
    const issue = startIssues[source.index];
    startIssues.splice(source.index, 1);

    console.log(startLifeCycleName);
    console.log(finishLifeCycleName);
    if (startLifeCycleName === finishLifeCycleName) {
      startIssues.splice(destination.index, 0, issue);

      const newLifeCycle = [...startIssues];

      const newState = {
        ...state,
        lifeCycles: {
          ...lifeCycles,
          [startLifeCycleName]: newLifeCycle
        }
      };

      dispatch({ type: REORDER_ISSUE, payload: newState });
    } else {
      const newStartLifeCycle = startIssues;

      const finishIssues = Array.from(finishLifeCycle);
      finishIssues.splice(destination.index, 0, issue);
      const newFinishLifeCycle = finishIssues;

      const newState = {
        ...state,
        lifeCycles: {
          ...lifeCycles,
          [startLifeCycleName]: newStartLifeCycle,
          [finishLifeCycleName]: newFinishLifeCycle
        }
      };

      dispatch({ type: REORDER_ISSUE, payload: newState });
    }
  };

  const { lifeCycles = {} } = state;

  const lifeCycleColumns = Object.keys(lifeCycles).map(key => (
    <LifeCycleColumn key={key} title={key} issues={lifeCycles[key]} />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="KanbanView life-cycle-columns-container">
        {lifeCycleColumns}
      </div>
    </DragDropContext>
  );
};

export default KanbanView;
