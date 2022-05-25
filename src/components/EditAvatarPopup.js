import { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup(props) {
  const inputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    // Pass the latest values of the input ref (uncontrolled component) to the external handler
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    })
  }

  return (
    <PopupWithForm
      name='update-avatar'
      title='Update profile picture'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Save'
      onSubmit={handleSubmit}
    >
      <label className='modal__form-field'>
        <input
          name='url'
          type='url'
          className='modal__input'
          placeholder='Image link of the new avatar'
          id='link-input'
          required
          ref={inputRef}
        />
        <span className='modal__error link-input-error'></span>
      </label>
    </PopupWithForm>
  )
}
