import {React, useContext, useRef, useState} from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'



function EditAvatarPopup({onClose, isOpen, onUpdateAvatar }) {
 
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser?.avatar ?? "");
  
  function handleSubmit(event){
    event.preventDefault()

    onUpdateAvatar({avatar: avatarRef.current.value});
  }

  return (
    <PopupWithForm
        name={"Avatar"}
        isOpen={isOpen}
        title={"Cambiar Foto De Perfil"}
        onClose={onClose}
      >
        <form
          className="formulary"
          id="formulary-update-avatar-icon"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className="formulary__data"
            id="photo-avatar"
            type="url"
            placeholder="Enlace de la nueva foto de perfil"
            name="link"
            required
            ref={avatarRef}
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
  )
}

export default EditAvatarPopup;
