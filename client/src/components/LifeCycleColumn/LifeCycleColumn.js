import React from 'react';
import Issue from '../Issue';
import './LifeCycleColumn.css';

export default function LifeCycleColumn({ name = '', issues = [] }) {
  const Issues = issues.map(({ id, title }) => (
    <Issue key={id} title={title} />
  ));
  return (
    <div className="LifeCycleColumn">
      <header>
        <h3>{name}</h3>
      </header>
      <div className="issue-container">
      {Issues}
      </div>
    </div>
  );
}
