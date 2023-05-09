import React from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeableAccordionItem = ({ taskId, handleTaskDelete, children }) => {
  const swipeableHandler = useSwipeable({
    onSwipedLeft: () => handleTaskDelete(taskId),
  });

  return <div {...swipeableHandler}>{children}</div>;
};

export default SwipeableAccordionItem;
