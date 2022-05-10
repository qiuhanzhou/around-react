import { useEffect } from 'react'

export default function PopupWithForm(props) {
  const modal = document.querySelector(`.modal_type_${props.name}`)

  useEffect(() => {
    if (props.isOpen) {
      modal.focus()
    }
  }, [props.isOpen, modal])
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? 'modal_open' : ''
      } 
      `}
      id={`${props.name}-modal`}
      onClick={props.onClose}
      onKeyDown={props.onClose}
      tabIndex='0'
    >
      <div className='modal__content'>
        <button
          type='button'
          aria-label='close'
          className='modal__close-button'
        ></button>
        <h2 className='modal__title'>{props.title}</h2>
        <form className='modal__form' name={props.name} id={props.name}>
          {props.children}
        </form>
      </div>
    </div>
  )
}
