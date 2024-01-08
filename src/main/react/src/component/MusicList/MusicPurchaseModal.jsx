import React from "react";

const ModalComponent = ({ onConfirm, onCancel, children }) => {
  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    zIndex: "1000",
    justifyContent: "center",
    alignItems: "center",
  };

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: "1000",
  };

  return (
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        {children}
        {/* <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button> */}
      </div>
    </>
  );
};

export default ModalComponent;
