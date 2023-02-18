import React from 'react'
import PrimaryButton from '../ui-kit/components/buttons/PrimaryButton'
import styles from './Modal.module.css'
import { useRef } from 'react'

const Modal = (props) => {
  const formRef = useRef(null)

  const save = () => {
    props.onConfirm(formRef.current.elements)
    close()
  }

  if (!props.show) {
    return null
  }

  const close = () => {
    props.setShow(false)
  }

  return(
    <>
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <div className={styles.modal__header}>
            <div className={styles.modal__title}>{props.title}</div>
          </div>
          <div className={styles.modal__body}>
            <form className={styles.modal__body__table} ref={formRef}>
              {props.children}
            </form>
          </div>
          <div className={styles.modal__footer}>
            <PrimaryButton onClick={save}>Save</PrimaryButton>
            <PrimaryButton onClick={close}>Close</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal