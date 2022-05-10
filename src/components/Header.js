import logo from '../images/logo.svg'

export default function Header() {
  return (
    <header className='header'>
      <img src={logo} alt='logo' className='header__logo' />
    </header>
  )
}
