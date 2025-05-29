import React, { ReactNode, useState } from "react";

type DialogProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Dialog: React.FC<DialogProps> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`dialog--background ${!isOpen ? "dialog-hidden" : ""}`} onClick={onClose}>
      <div
        className="dialog--window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog--header">
          <h2 className="dialog--title">{title}</h2>

          <button className="button" onClick={onClose}>✕</button>
        </div>
        { children }
      </div>
    </div>
  );
}

export default Dialog;