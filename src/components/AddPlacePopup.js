import {React, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {


  const[ placeName, setPlaceName ] = useState("");
  const[ placeLink, setPlaceLink] = useState("");

  function handlePlaceName(event){
      setPlaceName(event.target.value);
  }

  function handlePlaceLink(event) {
    setPlaceLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlaceSubmit({
      name: placeName,
      link: placeLink
    })
  }

  function clearStatesPopupOpen() {
    placeName("");
    placeLink("");
  }

  return (
    <PopupWithForm
      name={"place"}
      isOpen={isOpen}
      title={"Nuevo Lugar"}
      onClose={onClose}
    >
      <form 
        className="formulary" 
        id="formulary-place" 
        noValidate
        onSubmit={handleSubmit}
        >
        <input
          className="formulary__data"
          id="place-title"
          type="text"
          minLength="2"
          maxLength="30"
          name="name"
          placeholder="Título"
          required
          onChange={handlePlaceName}
        />
        <span className="place-title-error "></span>
        <input
          className="formulary__data"
          id="photo-link"
          type="url"
          placeholder="Enlace a la imagen"
          name="link"
          required
          onChange={handlePlaceLink}
        />
        <span className="photo-link-error"></span>
        <button
          type="submit"
          className="formulary__save-button"
          id="btn-place-save"
        >
          Crear
        </button>
      </form>
    </PopupWithForm>
  );
}
