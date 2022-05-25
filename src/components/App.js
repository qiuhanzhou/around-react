import { useState, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext'
import api from '../utils/api'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    api
      .getInitialCards()
      .then((values) => {
        setCards(values)
      })
      .catch((err) => {
        console.log(`can't get inital cards: ${err}`)
      })
  }, [])

  useEffect(() => {
    api
      .getUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser)
      })
      .catch((err) => {
        console.log(`can't get inital user info: ${err}`)
      })
  }, [])

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id)

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(
        //api returns the new liked/unliked card object
        (newCard) => {
          console.log(newCard)
          setCards(
            // pass in a function to reliably get the value of the current state
            (state) =>
              state.map((currentCard) =>
                currentCard._id === card._id ? newCard : currentCard,
              ),
          )
        },
      )
      .catch((err) => {
        console.log(`can't chage like card status: ${err}`)
      })
  }

  function handleCardDelete(card) {
    // Send a request to the API and getting the updated card data
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        )
      })
      .catch((err) => {
        console.log(`can't delete card: ${err}`)
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function handleCloseAllPopups(e) {
    if (
      (e.type === 'click' &&
        (e.target.classList.contains('modal__close-button') ||
          e.target.classList.contains('modal_open'))) ||
      (e.type === 'keydown' && e.key === 'Escape')
    ) {
      closeAllPopups()
    }
  }

  function handleUpdateUser(newUserInfo) {
    api
      .setUserInfo(newUserInfo)
      .then((newUserInfo) => {
        //update currentUser state from received  modified profile data
        setCurrentUser(newUserInfo)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`can't set user info: ${err}`)
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then(
        //api returns the updated current user info
        //update currentUser state from received  modified profile data
        (newUserInfo) => {
          setCurrentUser(newUserInfo)
          closeAllPopups()
        },
      )
      .catch((err) => {
        console.log(`can't update user avatar: ${err}`)
      })
  }

  function handleAddPlaceSubmit(newAddPlaceInfo) {
    // Send a request to the API and getting the updated card data
    api
      .addCard(newAddPlaceInfo)
      .then(
        //api request returns a response with the obj of the new card
        (newCard) => {
          setCards([newCard, ...cards])
          closeAllPopups()
        },
      )
      .catch((err) => {
        console.log(`can't add card: ${err}`)
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <div className='page'>
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          {/* <PopupWithForm
            name='delete-card'
            title='Are you sure?'
            onClose={handleCloseAllPopups}
            buttonText='Save'
          >
            <button
              type='submit'
              aria-label='submit'
              className='modal__submit-button'
            >
              Yes
            </button>
          </PopupWithForm> */}

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleCloseAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={handleCloseAllPopups}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
