import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import api from "./utils/api";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

function App() {
  // Carga de States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  //Llamada de datos de Usuario de la Api
  useEffect(()=>{
    api.defaultProfile().then((fetchedUser)=>{
        setCurrentUser(fetchedUser);
    })
  },[])

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
      <CurrentUserContext.Provider 
        value= {
          currentUser
        }
      >
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
