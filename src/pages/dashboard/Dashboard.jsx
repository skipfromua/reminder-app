import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Content from '../../components/content/Content'
import UpcomingEvents from './upcomingEvents/UpcomingEvents'
import LatestNotifications from './latestNotifications/LatestNotifications'

const Dashboard = () => {
  return (
    <>
      <Navbar/>
      <Content>
        <UpcomingEvents />
        <LatestNotifications />
      </Content>
    </>
  )
}

export default Dashboard