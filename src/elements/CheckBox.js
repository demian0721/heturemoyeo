import React from 'react';

function CheckBox({ children, checked, ...rest }) {
  return (
    <div style={{display: "flex"}}>
      <label >
        <input type="checkbox" checked={checked} {...rest} />
        <div>{checked ? '' : ''}</div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;