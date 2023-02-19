import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { restRequest } from '../../utils/restAPI'
import { TODO_LISTS, DELETE_TODO_LISTS } from '../../constants/links'
import { selectAuthToken } from '../../store/selectors/auth'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useParams, generatePath } from 'react-router'
import styles from './TodoLists.module.css'
import Modal from '../modal/Modal'
import PrimaryButton from '../ui-kit/components/buttons/PrimaryButton'
import { TextField } from '@mui/material'

const TodoLists = () => {
  const { eventId } = useParams()

  const todoListColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 100 },
    { field: 'memo', headerName: 'TODO', minWidth: 150, maxWidth: 500, flex: 500 },
  ];
  const [selectedTodoLists, setSelectedTodoLists] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [todoListRows, setTodoListRows] = useState([])
  const authToken = useSelector(selectAuthToken)

  const [todo, setTodo] = useState('')

  const fetchTodoLists = async (event) => {
    try {
      const config = {
        url: generatePath(TODO_LISTS, { event_id: eventId }),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      }
      const response = await restRequest(config)
      const attributes = response?.data.map((element) => { 
        return Object.assign(element?.attributes, { id: element?.id }) 
      })
      setTodoListRows(attributes)
    } catch (event) {
      alert(event)
    }
  }

  const addTodoList = async (data) => {
    try {
      const config = {
        url: generatePath(TODO_LISTS, { event_id: eventId }),
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          memo: todo,
          event_id: eventId
        }
      }
      const response = await restRequest(config)
      const attributes = response?.data?.attributes
      setTodoListRows(todoListRows.concat(attributes))
    } catch (event) {
      alert(event)
    }
  }

  const deleteTodoLists = async () => {
    try {
      const config = {
        url: generatePath(DELETE_TODO_LISTS, { event_id: eventId }),
        method: 'delete',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: { eventIds: selectedTodoLists }
      }
      const response = await restRequest(config)
      setTodoListRows(todoListRows.filter(element => !response?.data?.map(el => el?.attributes?.id).includes(element.id)))
    } catch (event) {
      alert(event)
    }
  }

  useEffect(()=>{
    fetchTodoLists();
  },[]) 

  return(
    <>
      <Modal
        title='Add Plan'
        show={showModal}
        setShow={setShowModal}
        onConfirm={addTodoList}
      >
        <label>Plan: </label>
        <TextField 
          value={todo}
          margin="dense"
          className={styles.input}
          onChange={(event) => { setTodo(event?.target?.value) }}
        />
      </Modal>
      <div className={styles.title}>
        Plans
      </div>
      <div className={styles.buttons}>
        <PrimaryButton onClick={() => {setShowModal(true)}}>Add</PrimaryButton>
        <PrimaryButton onClick={deleteTodoLists}>Delete Selected</PrimaryButton>
      </div>
      <div className={styles.table}>
        <DataGrid
          rows={todoListRows}
          columns={todoListColumns}
          pageSize={5}
          hideFooter={true}
          autoHeight={true}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={itm => setSelectedTodoLists(itm)}
        />
      </div>
    </>
  )
}

export default TodoLists
