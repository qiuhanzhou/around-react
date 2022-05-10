import { useEffect } from 'react'

export default function ImagePopup(props) {
  const modal = document.querySelector('.modal_type_image')

  useEffect(() => {
    if (props.isOpen) {
      modal.focus()
    }
  }, [props.isOpen, modal])

  return (
    <div
      className={`modal modal_type_image ${props.isOpen ? 'modal_open' : ''} 
    `}
      id='image-modal'
      onClick={props.onClose}
      onKeyDown={props.onClose}
      tabIndex='0'
    >
      <div className='modal__content modal__content_type_image'>
        <button
          type='button'
          aria-label='close'
          className='modal__close-button modal__close-button_type_image'
        ></button>
        <img
          className='modal__image'
          src={props.card.link}
          alt={props.card.name}
        />
        <p className='modal__caption'>{props.card.name}</p>
      </div>
    </div>
  )
}
