import React from 'react'
import editAvatarIcon from '../images/EditButton.svg'
import api from '../utils/api'
import Card from './Card'

export default function Main(props) {
  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [userAvatar, setUserAvatar] = React.useState()
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((values) => {
        console.log(values)
        const { name, about, avatar } = values
        setUserName(name)
        setUserDescription(about)
        setUserAvatar(avatar)
      })
      .catch((err) => {
        console.log(`can't get inital user info: ${err}`)
      })
  }, [])

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((values) => {
        console.log(values)
        setCards(values)
      })
      .catch((err) => {
        console.log(`can't get inital cards: ${err}`)
      })
  }, [])

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__avatar-wrapper'>
          <img
            className='profile__avatar'
            src={userAvatar}
            alt='profile avatar'
          />
          <img
            className='profile__edit-icon'
            src={editAvatarIcon}
            alt='profile edit icon'
            onClick={props.onEditAvatarClick}
          />
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{userName}</h1>
          <button
            type='button'
            aria-label='edit'
            className='profile__edit-button'
            onClick={props.onEditProfileClick}
          ></button>
          <p className='profile__title'>{userDescription}</p>
        </div>
        <button
          type='button'
          aria-label='add'
          className='profile__add-button'
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      <section className='places'>
        <ul className='elements-grid cards-container'>
          {cards.map((item) => (
            <Card
              card={item}
              onCardClick={(card) => {
                props.onCardClick(card)
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
