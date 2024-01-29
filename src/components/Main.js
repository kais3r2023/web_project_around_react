import { React, useState, useEffect } from "react";
import addButton from "../images/Add Button.png";
import editButton from "../images/Edit Button.png";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/api.js";
import Card from "./Card.js";
import ImagePopup from "./ImagePopup.js";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onConfirmationClick,
  onCardClick,
  isOpen,
  selectedCard,
  onClose,
}) {
  const [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isConfirmationPopupOpen,
  ] = isOpen;

  //Carga de States de perfil
  const [userName, setUserName] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  //Carga de state de Array de Cards
  const [cards, setCards] = useState([]);

  //Handler States de Perfil
  useEffect(() => {
    api.defaultProfile().then((profileInfo) => {
      setUserName(profileInfo.name);
      setUserAbout(profileInfo.about);
      setUserAvatar(profileInfo.avatar);
    });
  }, []);

  //Handler states Array de Cards
  useEffect(() => {
    api.getCards().then((arrayApiCards) => {
      setCards(arrayApiCards);
    });
  }, []);

  return (
    <>
      <section>
        <div className="profile">
          <div id="avatarContent">
            <div
              className="profile__avatar-overlay"
              id="btnUpdateProfileIcon"
              onClick={onEditAvatarClick}
            ></div>
            <img
              className="profile__avatar"
              id="profileAvatar"
              alt="Avatar"
              style={{ backgroundImage: `url(${userAvatar})` }}
            />
          </div>
          <div className="profile__content">
            <h1 className="profile__content-name">{userName}</h1>
            <button className="profile__content-edit-button">
              <img
                id="btnEdit"
                alt="Button Edit"
                src={editButton}
                onClick={onEditProfileClick}
              />
            </button>
            <h3 className="profile__content-subtitle">{userAbout}</h3>
          </div>
          <button
            className="add-button-place"
            id="add-button-place"
            onClick={onAddPlaceClick}
          >
            <img
              className="profile__add-button"
              id="btnAddPlace"
              alt="Add Button"
              src={addButton}
            />
          </button>
        </div>
      </section>
      <section className="gallery" id="gallery">
        {cards.map((dataCard) => (
          <Card
            key={`card-${dataCard.name}`}
            name={dataCard.name}
            link={dataCard.link}
            likes={dataCard.likes}
            _id={dataCard._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>

      <PopupWithForm
        name={"Avatar"}
        isOpen={isEditAvatarPopupOpen}
        title={"Cambiar Foto De Perfil"}
        onClose={onClose}
      >
        <form
          className="formulary"
          id="formulary-update-avatar-icon"
          noValidate
        >
          <input
            className="formulary__data"
            id="photo-avatar"
            type="url"
            placeholder="Enlace de la nueva foto de perfil"
            name="link"
            required
          />
          <span className="photo-avatar-error"></span>
          <button
            type="submit"
            className="formulary__save-button"
            id="btn-update-save"
          >
            Guardar
          </button>
        </form>
      </PopupWithForm>

      <PopupWithForm
        name={"profile"}
        isOpen={isEditProfilePopupOpen}
        title={"Editar Perfil"}
        onClose={onClose}
      >
        <form className="formulary" id="formulary-profile" noValidate>
          <input
            className="formulary__data"
            id="name-profile"
            type="text"
            placeholder="Nombre"
            minLength="2"
            maxLength="21"
            name="name"
            required
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

      <PopupWithForm
        name={"place"}
        isOpen={isAddPlacePopupOpen}
        title={"Nuevo Lugar"}
        onClose={onClose}
      >
        <form className="formulary" id="formulary-place" noValidate>
          <input
            className="formulary__data"
            id="place-title"
            type="text"
            minLength="2"
            maxLength="30"
            name="name"
            placeholder="Título"
            required
          />
          <span className="place-title-error "></span>
          <input
            className="formulary__data"
            id="photo-link"
            type="url"
            placeholder="Enlace a la imagen"
            name="link"
            required
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

      <PopupWithForm
        name={"confirmation"}
        isOpen={isConfirmationPopupOpen}
        title={"¿Estás Seguro?"}
        onClose={onClose}
      >
        <form className="formulary">
          <button
            type="button"
            className="formulary__save-button"
            id="btn-confirmation"
          >
            Si
          </button>
        </form>
      </PopupWithForm>

      <ImagePopup
        name={selectedCard?.name || ""}
        link={selectedCard?.link || ""}
        isOpen={!!selectedCard}
        onClose={onClose}
      />
    </>
  );
}

export default Main;
