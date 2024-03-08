import React from "react";
import closeIcon from "../images/Close Icon.png";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  children,
  onClose,
  id
}) {
    return (
    <div id={id}
      className={`pop-up popup_type_${name} ${isOpen ? "pop-up__open" : ""} `}>
      <div className="pop-up__container">
        <img
          className="pop-up__close-icon btn-close"
          id={`close-icon ${id}`}
          alt="icono de cerrar profile"
          src={closeIcon}
          onClick={onClose}
        />
        <h2 className="formulary-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
