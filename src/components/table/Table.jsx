import React from 'react'
import styles from './Table.module.css'

const Table = ({children}) => {
  return(
    <div className={styles.tableContainer}>
      <table className={styles.tableContainer__table}>
        {children}
      </table>
    </div>
  )
}

export default Table;
