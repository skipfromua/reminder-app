import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { restRequest } from '../../utils/restAPI'
import { EVENTS, DELETE_EVENTS } from '../../constants/links'
import { selectAuthToken } from '../../store/selectors/auth'
import Navbar from '../../components/navbar/Navbar'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Content from '../../components/content/Content'
import { EVENT_DETAILS } from '../../constants/routes'
import { useNavigate, generatePath } from 'react-router'
import PrimaryButton from '../../components/ui-kit/components/buttons/PrimaryButton'
import Modal from '../../components/modal/Modal'

const Events = () => {
  const navigate = useNavigate()

  const onClick = (e, cv) => {
    e.stopPropagation();
    navigate(generatePath(EVENT_DETAILS, { event_id: cv.id }))
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 100 },
    { field: 'name', headerName: 'Event Name', minWidth: 150, maxWidth: 500, flex: 500 },
    { field: 'date', headerName: 'Date', minWidth: 100, maxWidth: 500, flex: 500 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (cellValues) => {
        return <PrimaryButton onClick={(event) => { onClick(event, cellValues) }}>Details</PrimaryButton>;
      }
    },
  ];

  const [rows, setRows] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedEvents, setSelectedEvents] = useState([])
  const authToken = useSelector(selectAuthToken)

  const fetchEvents = async () => {
    try {
      const config = {
        url: EVENTS,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
      const response = await restRequest(config)
      const attributes = response?.data.map((element) => { 
        return element?.attributes
      })
      setRows(attributes)
    } catch (event) {
      alert(event)
    }
  }

  const addEvent = async (data) => {
    try {
      const config = {
        url: EVENTS,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          name: data.name.value,
          date: data.date.value
        }
      }
      const response = await restRequest(config)
      const attributes = response?.data?.attributes
      setRows(rows.concat(attributes))
    } catch (event) {
      alert(event)
    }
  }

  const deleteEvent = async () => {
    try {
      const config = {
        url: DELETE_EVENTS,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: { eventIds: selectedEvents }
      }
      const response = await restRequest(config)
      setRows(rows.filter(element => !response?.data?.map(el => el?.attributes?.id).includes(element.id)))
    } catch (event) {
      alert(event)
    }
  }

  useEffect(()=>{
    fetchEvents();
  },[]) 

  return (
    <>
      <Navbar />
      <Content>
        <Modal
          title='Add Event'
          show={showModal}
          setShow={setShowModal}
          onConfirm={addEvent}
        >
          <label>Name Of Event: </label>
          <input type='email' id='name'></input>
          <label>Date Of Event: </label>
          <input type='datetime-local' id='date'></input>

        </Modal>
        <PrimaryButton onClick={() => {setShowModal(true)}}>Add Event</PrimaryButton>
        <PrimaryButton onClick={deleteEvent}>Remove Events</PrimaryButton>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            hideFooter={true}
            autoHeight={true}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={itm => setSelectedEvents(itm)}
          />
        </div>
      </Content>
    </>
  )
}

export default Events
