import React from "react";
import Notes from "./Notes";
const Homee = (props) => {
  const { showAlert } = props;
  return (
    <>
      <Notes showAlert={showAlert} />
    </>
  );
};

export default Homee;
