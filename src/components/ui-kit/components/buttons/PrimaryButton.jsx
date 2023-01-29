import React from 'react'
import classes from './PrimaryButton.module.css'

const PrimaryButton = (props) => {
  return(
    <button onClick={props.onClick} className={classes.primaryButton}>{props.children}</button>
  )
}

export default PrimaryButton;
