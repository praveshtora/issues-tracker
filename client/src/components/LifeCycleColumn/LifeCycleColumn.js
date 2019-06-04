import React from 'react';
import Issue from '../Issue';
import './LifeCycleColumn.css';
import { Droppable } from 'react-beautiful-dnd';

class LifeCycleColumn extends React.Component {
  render() {
    const {title, issues=[]} = this.props;
    
    const Issues = issues.map((issue, index) => (
      <Issue key={issue._id} issue={issue} index={index} />
    ));

    return (
      <div className="LifeCycleColumn">
        <header>
          {/* <h3>{name}</h3> */}
          <h3>{title}</h3>
        </header>
        {/* <Droppable droppableId={id}> */}
        <Droppable droppableId={title}>
          {({ innerRef, droppableProps, placeholder }) => (
            <div
              className="issue-container"
              ref={innerRef}
              {...droppableProps}
            >
              {Issues}
              {placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default LifeCycleColumn;
