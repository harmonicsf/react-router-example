import React from 'react';

export default (props) => {
  return (
    <div>
      This is the header
      {props.children}
    </div>
  );
};
