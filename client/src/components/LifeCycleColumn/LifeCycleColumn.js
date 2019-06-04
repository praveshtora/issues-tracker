import React, { useReducer } from 'react';
import Issue from '../Issue';
import './LifeCycleColumn.css';
import { Droppable } from 'react-beautiful-dnd';
import AddIssue from '../AddIssue';
import reducer, { ADD_ISSUE, REORDER_ISSUE } from '../../reducer/reducer';

class IssueList extends React.Component {
  shouldComponentUpdate(newProps) {
    return newProps.issues !== this.props.issues;
  }
  render() {
    return this.props.issues.map((issue, index) => (
      <Issue key={issue._id} issue={issue} index={index} />
    ));
  }
}

const LifeCycleColumn = ({ title, issues = [] }) => {
  const [state, dispatch] = useReducer(reducer, { lifeCycles: {} });

  const handleOnSubmit = newIssues => {
    console.log(newIssues);
    dispatch({ type: ADD_ISSUE, payload: {"title": newIssues }});
  };

  return (
    <div className="LifeCycleColumn">
      <header>
        <h3>{title}</h3>
      </header>
      <Droppable droppableId={title}>
        {({ innerRef, droppableProps, placeholder }) => (
          <div className="issue-container" ref={innerRef} {...droppableProps}>
            <IssueList issues={issues} />
            {placeholder}
          </div>
        )}
      </Droppable>
      <div className="add-issue-bottomBar">
        <AddIssue onSubmit={handleOnSubmit} />
      </div>
    </div>
  );
};

export default LifeCycleColumn;
