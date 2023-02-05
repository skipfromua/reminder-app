import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { restRequest } from '../../utils/restAPI'
import { EVENTS } from '../../constants/links'
import { selectAuthToken } from '../../store/selectors/auth'
import Navbar from '../../components/navbar/Navbar'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Content from '../../components/content/Content'
import { Button } from '@mui/material'
import { EVENT_DETAILS } from '../../constants/routes'
import { useNavigate } from 'react-router'
import PrimaryButton from '../../components/ui-kit/components/buttons/PrimaryButton'

const Events = () => {
  const navigate = useNavigate()

  const onClick = (e, cv) => {
    e.stopPropagation();
    navigate(EVENT_DETAILS(cv.id))
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
  const authToken = useSelector(selectAuthToken)

  const fetchEvents = async (event) => {
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

  return (
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

export default Events
