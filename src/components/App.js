import React from 'react'
import '../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState([])

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
    setSelectedCard([])
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

  return (
    <div className='App'>
      <div className='page'>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={(card) => {
            handleCardClick(card)
          }}
        />
        <Footer />
        <PopupWithForm
          name='edit-profile'
          title='Edit profile'
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
        >
          <label className='modal__form-field'>
            <input
              name='name'
              type='text'
              className='modal__input'
              id='name-input'
              placeholder='Your name'
              required
              minLength='2'
              maxLength='40'
            />
            <span className='modal__error name-input-error'></span>
          </label>

          <label className='modal__form-field'>
            <input
              name='about'
              type='text'
              className='modal__input'
              id='about-input'
              placeholder='About you'
              required
              minLength='2'
              maxLength='200'
            />
            <span className='modal__error about-input-error'></span>
          </label>
          <button
            type='submit'
            aria-label='submit'
            className='modal__submit-button'
          >
            Save
          </button>
        </PopupWithForm>
        <PopupWithForm
          name='add-card'
          title='New Place'
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
        >
          <label className='modal__form-field'>
            <input
              name='title'
              type='text'
              className='modal__input'
              id='title-input'
              placeholder='Title of the new place'
              required
              minLength='1'
              maxLength='30'
            />
            <span className='modal__error title-input-error'></span>
          </label>

          <label className='modal__form-field'>
            <input
              name='url'
              type='url'
              className='modal__input'
              placeholder='Image link of the new place'
              id='url-input'
              required
            />
            <span className='modal__error url-input-error'></span>
          </label>

          <button
            type='submit'
            aria-label='submit'
            className='modal__submit-button'
          >
            Create
          </button>
        </PopupWithForm>
        <PopupWithForm
          name='delete-card'
          title='Are you sure?'
          onClose={handleCloseAllPopups}
        >
          <button
            type='submit'
            aria-label='submit'
            className='modal__submit-button'
          >
            Yes
          </button>
        </PopupWithForm>
        <PopupWithForm
          name='update-avatar'
          title='Update profile picture'
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
        >
          <label className='modal__form-field'>
            <input
              name='url'
              type='url'
              className='modal__input'
              placeholder='Image link of the new avatar'
              id='link-input'
              required
            />
            <span className='modal__error link-input-error'></span>
          </label>

          <button
            type='submit'
            aria-label='submit'
            className='modal__submit-button'
          >
            Save
          </button>
        </PopupWithForm>
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={handleCloseAllPopups}
          card={selectedCard}
        />
      </div>
    </div>
  )
}

export default App
