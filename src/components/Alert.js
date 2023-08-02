import React from "react";

export default function Alert(props) {
  return (
    <>
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        {/* <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg} */}
        <strong>{props.alert.type}</strong> {props.alert.msg}
      </div>
    </>
  );
}
