import React from "react";
import { useSelector } from "react-redux";

import "../styles/notifier.scss";

export default () => {
  const { error, success } = useSelector(({ notify }) => notify);
  if (error) return <div className='notifier failure'>{error}</div>;
  if (success) return <div className='notifier success'>{success}</div>;
  return null;
};
