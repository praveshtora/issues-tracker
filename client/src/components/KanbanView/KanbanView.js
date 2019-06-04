import React, { useReducer, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import LifeCycleColumn from '../LifeCycleColumn';
import './KanbanView.css';
import { reducer, REORDER_ISSUE } from '../../reducer/reducer';
import { serverUrl } from '../../constants';
import axios from 'axios';

const KanbanView = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = { lifeCycles: {} };
  //   this.onDragEnd = this.onDragEnd.bind(this);
  //   this.getBoard = this.getBoard.bind(this);
  // }

  const [state, dispatch] = useReducer(reducer, { lifeCycles: {} });

  useEffect(() => {
    async function fetchData() {
      const res = await getBoard();
      if (res.data.success) {
        dispatch({
          type: REORDER_ISSUE,
          payload: { lifeCycles: res.data.lifeCycles }
        });
      }
    }
    fetchData();
  }, []);
  // componentDidMount() {
  // }

  const getBoard = async () => {
    return await axios.get(serverUrl + 'board/' + '100');
    // return fetch(serverUrl + 'board/' + '5cf673414cb9d8447ba381de');
  };

  const onDragEnd = result => {
    const { source, destination } = result;
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
    
    fetch(serverUrl + 'issue/' + issue._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lifeCycle: finishLifeCycleName })
    });
  };

  const { lifeCycles = {} } = state;
  console.log("changed state", state)

  if (state === Promise.resolve(state)) {
    state.then(data => console.log(data));
  }


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
