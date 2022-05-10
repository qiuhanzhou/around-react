export default function Card(props) {
  function handleClick(card) {
    props.onCardClick(props.card)
  }

  return (
    <li className='card' id={props.card._id}>
      <button
        type='button'
        aria-label='close'
        className='card__close-button'
      ></button>
      <img
        className='card__image'
        src={props.card.link}
        onClick={handleClick}
      />
      <div className='card__info'>
        <h2 className='card__title'>{props.card.name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            aria-label='like'
            className='card__like-button'
          ></button>
          <div className='card__like-count'>{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}
