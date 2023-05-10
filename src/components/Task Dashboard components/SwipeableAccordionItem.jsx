import React from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeableAccordionItem = ({ taskId, handleTaskDelete, children, taskName }) => {

  const swipeableHandler = useSwipeable({
    onSwipedLeft: () => handleTaskDelete(taskId, taskName),
  });

  return <div {...swipeableHandler}>{children}</div>;
};

export default SwipeableAccordionItem;
