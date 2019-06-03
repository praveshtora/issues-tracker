import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import LifeCycleColumn from '../LifeCycleColumn';

class KanbanView extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  render() {
    const { lifeCycles = [] } = this.state.data;
    const lifeCycleColumns = lifeCycles.map(({ id, name, issues }) => (
      <LifeCycleColumn key={id} name={name} issues={issues} />
    ));

    return <div>{ lifeCycleColumns }</div>;
  }
}

export default KanbanView;
