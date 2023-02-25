import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Content from '../../components/content/Content'
import Calendar from '../../components/calendar/Calendar'
import Events from './events/Events'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <>
      <Navbar/>
      <Content>
        <div className={styles.box}>
          <div className={styles.leftColumn}>
            <Calendar />
          </div>
          
          <div className={styles.rightColumn}>
            <Events />
          </div>
        </div>
      </Content>
    </>
  )
}

export default Dashboard