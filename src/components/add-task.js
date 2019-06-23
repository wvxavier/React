import React from 'react';

const AddTask = (props) => (
  <div>
    <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      Add task?
      </button>
  </div>
);

export default AddTask;