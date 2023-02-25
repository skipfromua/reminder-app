import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectEvents } from '../../../store/selectors/events'
import { useEffect } from 'react'

const Events = () => {
  const events = useSelector(selectEvents)
  const [rows, setRows] = useState([])
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 100 },
    { field: 'name', headerName: 'Event Name', minWidth: 150, maxWidth: 500, flex: 500 },
  ];

  useEffect(() => {
    console.log(events)
    setRows(events)
  }, [events])

  return(
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        hideFooter={true}
        autoHeight={true}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default Events
