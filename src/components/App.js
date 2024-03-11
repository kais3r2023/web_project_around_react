import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  // Carga de States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //Llamada de datos de Usuario de la Api
  useEffect(() => {
    api.defaultProfile().then((fetchedUser) => {
      setCurrentUser(fetchedUser);
    });
  }, []);

  //Handler states Array de Cards
  useEffect(() => {
    api.getCards().then((arrayApiCards) => {
      setCards(arrayApiCards);
    });
  }, []);

  // Funciones para cambiar los States de Popups
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmationClick() {
    setIsConfirmationPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  function handlerCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleUpdateUser(dataUser) {
    api.updateProfile(dataUser).then((res) => {
      setCurrentUser(res);
    });
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data).then((res) => {
      setCurrentUser(res);
    });
    setIsEditAvatarPopupOpen(false);
  }

  // Funcion para controlar los likes y dislikes
  function handleCardLike(card) {
    // verificacion si la tarjeta ha sido dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Peticion a la API para obtener datos actualizados de la tarjeta

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  // Funcion para eliminar tarjetas

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  //Funcion para agregar tarjetas

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
    });
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onConfirmationClick={handleConfirmationClick}
          onCardClick={handlerCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          isOpen={[
            isEditProfilePopupOpen,
            isAddPlacePopupOpen,
            isEditAvatarPopupOpen,
            isConfirmationPopupOpen,
          ]}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
          cards={cards}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
