// components/ScrollTo.js
import React, { forwardRef } from 'react';

const ScrollTo = forwardRef(({ children, id }, ref) => {
  return (
    <div id={id} ref={ref}>
      {children}
    </div>
  );
});

export default ScrollTo;