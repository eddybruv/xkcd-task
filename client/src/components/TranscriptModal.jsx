import React from "react";
import style from "../styles/transcriptModal.module.css";

function TranscriptModal({ text, handleDisplay }) {
  const handleClose = () => {
    handleDisplay();
  };

  return (
    <div className={style.body}>
      <div className={style.content}>
        <p>{text}</p>
        <button onClick={handleClose}>close</button>
      </div>
    </div>
  );
}

export default TranscriptModal;
