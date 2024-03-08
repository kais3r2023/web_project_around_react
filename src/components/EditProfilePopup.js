import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Funcion para tomar valores de los inputs y guardarlos en los states name y about
  function handleOnChangeInput(event) {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else {
      setAbout(event.target.value);
    }
  }

  //Despues de cargar el usuario actual desde la API sus datos serán usados en componentes gestionados.

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit(event) {
    event.preventDefault();

    //Limpiar inputs
    setName("");
    setAbout("");

    // Pasa los valores de los componentes gestionados al controlador externo
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name={"edit"}
      isOpen={isOpen}
      title={"Editar Perfil"}
      onClose={onClose}
    >
      <form
        className="formulary"
        id="formulary-profile"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="formulary__data"
          id="name-profile"
          type="text"
          placeholder="Nombre"
          minLength="2"
          maxLength="21"
          name="name"
          required
          onChange={handleOnChangeInput}
        />
        <span className="name-profile-error "></span>
        <input
          className="formulary__data"
          id="about-me"
          type="text"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="30"
          name="about"
          required
          onChange={handleOnChangeInput}
        />
        <span className="about-me-error "></span>
        <button
          type="submit"
          className="formulary__save-button"
          id="btn-submit-profile"
        >
          Guardar
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
