import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { restRequest } from '../../utils/restAPI'
import { NOTIFICATIONS, DELETE_NOTIFICATIONS } from '../../constants/links'
import { selectAuthToken } from '../../store/selectors/auth'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useParams, generatePath } from 'react-router'
import styles from './Notifications.module.css'
import Modal from '../modal/Modal'
import PrimaryButton from '../ui-kit/components/buttons/PrimaryButton'


const Notifications = () => {
  const { eventId } = useParams()
  const notificationColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 30, maxWidth: 100, flex: 100 },
    { field: 'enabled', headerName: 'Enabled', minWidth: 30, maxWidth: 500, flex: 300 },
    { field: 'startNotifyingDaysBefore', headerName: 'Start Notiying', minWidth: 50, maxWidth: 500, flex: 500 },
    { field: 'notifyAt', headerName: 'Notification Time', minWidth: 70, maxWidth: 500, flex: 500 },
  ];

  const [notificationRows, setNotificationRows] = useState([])
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [showModal, setShowModal] = useState(false)
  const authToken = useSelector(selectAuthToken)

  const fetchNotifications = async (event) => {
    try {
      const config = {
        url: generatePath(NOTIFICATIONS, { event_id: eventId }),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
      const response = await restRequest(config)
      const attributes = response?.data.map((element) => { 
        return Object.assign(element?.attributes, { id: element?.id }) 
      })
      setNotificationRows(attributes)
    } catch (event) {
      alert(event)
    }
  }

  const addNotification = async (data) => {
    try {
      const config = {
        url: generatePath(NOTIFICATIONS, { event_id: eventId }),
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          enabled: data.enabled.value,
          start_notifying_days_before: data.start_notifying_days_before.value,
          notify_at: data.notify_at.value,
          event_id: eventId
        }
      }
      const response = await restRequest(config)
      const attributes = response?.data?.attributes
      setNotificationRows(notificationRows.concat(attributes))
    } catch (event) {
      alert(event)
    }
  }

  const deleteNotifications = async () => {
    try {
      const config = {
        url: generatePath(DELETE_NOTIFICATIONS, { event_id: eventId }),
        method: 'delete',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: { eventIds: selectedNotifications }
      }
      const response = await restRequest(config)
      setNotificationRows(notificationRows.filter(element => !response?.data?.map(el => el?.attributes?.id).includes(element.id)))
    } catch (event) {
      alert(event)
    }
  }

  useEffect(()=>{
    fetchNotifications();
  },[]) 

  return(
    <>
      <Modal
        title='Add Notificaiotn'
        show={showModal}
        setShow={setShowModal}
        onConfirm={addNotification}
      >
        <label>Enabled: </label>
        <input type='checkbox' id='enabled'></input>
        <label>Start Notifying Days Before: </label>
        <input type='number' min='1' max='31' id='start_notifying_days_before'></input>
        <label>Notify At: </label>
        <input type='time' id='notify_at'></input>
      </Modal>

      <div className={styles.title}>
        Notifiers
      </div>
      <div className={styles.buttons}>
        <PrimaryButton onClick={() => {setShowModal(true)}}>Add</PrimaryButton>
        <PrimaryButton onClick={deleteNotifications}>Delete Selected</PrimaryButton>
      </div>
      <div className={styles.table}>
        <DataGrid
          rows={notificationRows}
          columns={notificationColumns}
          pageSize={5}
          hideFooter={true}
          autoHeight={true}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={itm => setSelectedNotifications(itm)}
        />
      </div>
    </>
  )
}

export default Notifications
