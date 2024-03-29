import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../ui-kit/assets/logo.png'
import PrimaryButton from '../ui-kit/components/buttons/PrimaryButton'
import { useDispatch } from 'react-redux'
import { applyUserSignOut } from '../../store/actions/auth'

const Navbar = () => {
  const dispatch = useDispatch()
  const onLogOut = () => {
    dispatch(applyUserSignOut())
  }

  return(
    <nav className={styles.navbar}>
      <div className={styles.navbar__logoContainer}>
        <img className={styles.navbar__logoContainer__logo} src={logo} alt="logo"/>
      </div>
      <ul className={styles.navbar__list}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
      </ul>
      <div className={styles.navbar__auth}>
        <div className={styles.navbar__auth__name}>
          Hello Oleksandr
        </div>
        <div className={styles.navbar__auth__control}>
          <PrimaryButton onClick={onLogOut}>Log Out</PrimaryButton>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
