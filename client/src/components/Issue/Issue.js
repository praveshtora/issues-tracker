import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import './Issue.css';

class Issue extends React.Component {
  render() {
    const { issue=[], index } = this.props;
    // const { id, title } = issue;
    const { _id, title } = issue;
    return (
      // <Draggable draggableId={id} index={index}>
      <>
      {issue !== [] && 
        <Draggable draggableId={_id} index={index}>
          {({ dragHandleProps, draggableProps, innerRef }) => (
            <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
              <Card className="issue-card">
                <CardContent>{title}</CardContent>
              </Card>
            </div> 
          )}
        </Draggable>
      }
      </>
    );
  }
}

export default Issue;
