import React from 'react'
import classes from './PrimaryButton.module.css'

const PrimaryButton = (props) => {
  return(
    <button className={classes.primaryButton}>{props.children}</button>
  )
}

export default PrimaryButton;
