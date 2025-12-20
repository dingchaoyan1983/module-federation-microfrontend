import React from "react";
import { useLocation } from "react-router-dom";

const Subapp1Component: React.FC<{ name?: string, useLocation?: typeof useLocation }> = (props) => {
  const location = props.useLocation?.();
  console.log('location', location);
  return <div>
  <h2>子应用1组件</h2>
  <p>这是子应用1的组件内容 modified by dane { props.name || 'default' }</p>
</div>
};


export default Subapp1Component;
