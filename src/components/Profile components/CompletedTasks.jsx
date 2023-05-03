import React from "react";

const CompletedTasks = ({setShowCompletedTaskButton, setRenderCompletedTask}) => {

    const handleShowLess = () => {
        setShowCompletedTaskButton(true);
        setRenderCompletedTask(false)
    }

  return (
    <div>
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
        <li>item4</li>
        <li>item5</li>
        <li>item6</li>
      </ul>
      <button onClick={handleShowLess}>Show Less</button>
    </div>
  );
};

export default CompletedTasks;
