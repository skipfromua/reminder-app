import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Content from '../../../components/content/Content'
import Notifications from '../../../components/notifications/Notifications'
import TodoLists from '../../../components/todo_lists/TodoLists'
import styles from './Details.module.css'

const Details = () => {
  return(
    <>
      <Navbar />
      <Content>
        <div className={styles.box}>
          <div className={styles.leftColumn}>
            <Notifications />
          </div>
          
          <div className={styles.rightColumn}>
            <TodoLists />
          </div>
        </div>
      </Content>
    </>
  )
}

export default Details
