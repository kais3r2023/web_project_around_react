import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

function App() {
  // Carga de States de Popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  function handlerCardClick({name, link}) {
    setSelectedCard({name,link});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onConfirmationClick={handleConfirmationClick}
        onCardClick={handlerCardClick}
        isOpen={[
          isEditProfilePopupOpen,
          isAddPlacePopupOpen,
          isEditAvatarPopupOpen,
          isConfirmationPopupOpen,
        ]}
        onClose={closeAllPopups}
        selectedCard={selectedCard}
      />

      <Footer />
    </div>
  );
}

export default App;
