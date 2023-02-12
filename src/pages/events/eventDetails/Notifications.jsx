import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { restRequest } from '../../../utils/restAPI'
import { NOTIFICATIONS } from '../../../constants/links'
import { selectAuthToken } from '../../../store/selectors/auth'
import Navbar from '../../../components/navbar/Navbar'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Content from '../../../components/content/Content'
import { useParams } from 'react-router'

const Notifications = () => {
  const { eventId } = useParams()
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 100 },
    { field: 'enabled', headerName: 'Enabled', minWidth: 150, maxWidth: 500, flex: 500 },
    { field: 'startNotifyingDaysBefore', headerName: 'Start Notiying', minWidth: 100, maxWidth: 500, flex: 500 },
    { field: 'notifyingAt', headerName: 'Notification Time', minWidth: 100, maxWidth: 500, flex: 500 },
  ];

  const [rows, setRows] = useState([])
  const authToken = useSelector(selectAuthToken)

  const fetchEvents = async (event) => {
    console.log(eventId)
    try {
      const config = {
        url: NOTIFICATIONS(eventId),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
      const response = await restRequest(config)
      const attributes = response?.data.map((element) => { 
        return Object.assign(element?.attributes, { id: element?.id }) 
      })
      setRows(attributes)
    } catch (event) {
      alert(event)
    }
  }

  useEffect(()=>{
    fetchEvents();
  },[]) 

  return(
    <>
      <Navbar />
      <Content>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            hideFooter={true}
            autoHeight={true}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Content>
    </>
  )
}

export default Notifications
