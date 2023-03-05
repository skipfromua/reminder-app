import React from 'react'
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { PickersDay } from '@mui/x-date-pickers';
import { Badge } from '@mui/material';
import { restRequest } from '../../utils/restAPI';
import { selectAuthToken } from '../../store/selectors/auth';
import { EVENTS_BY_MONTH } from '../../constants/links'
import { applySetEvents } from '../../store/actions/events'
import './Content.css'

const Calendar = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(selectAuthToken)
  const [date, setDate] = useState(Date())
  const [highlightedDays, setHighlightedDays] = useState([])
  const getDay = (date) => {
    return Number(date.split('-')[1])
  } 

  const eventsCount = (highlightedDays, day) => {
    return highlightedDays.reduce((count, element) => {
      if (element === day) {
        count++;
      }
      return count;
    }, 0);
  }

  const fetchEventsForMonth = async (month) => {
    try {
      const config = {
        url: EVENTS_BY_MONTH,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          event: {
            month: month + 1
          }
        }
      }
      const response = await restRequest(config)
      const eventDays = response?.data.map((element) => { 
        return getDay(element?.attributes?.date)
      })
      const attributes = response?.data.map((element) => { 
        return element?.attributes
      })
      setHighlightedDays(eventDays)
      dispatch(applySetEvents(attributes))
    } catch (event) {
      alert(event)
    }
  }

  useEffect(()=>{
    fetchEventsForMonth(new Date().getMonth());
  },[])

  return(
    <div>
      <StaticDatePicker
        className='calendar'
        orientation="portrait"
        openTo="day"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        onMonthChange={(newMonth) => {
          fetchEventsForMonth(newMonth._d.getMonth())
        }}
        renderDay={(day, _value, DayComponentProps) => {
          const isSelected =
            !DayComponentProps.outsideCurrentMonth &&
            highlightedDays.indexOf(day.date()) >= 0;

          return (
            <Badge
              key={day.toString()}
              overlap="circular"
              color="success"
              badgeContent={isSelected ? eventsCount(highlightedDays, day.date()) : undefined}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <PickersDay {...DayComponentProps} />
            </Badge>
          );
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  )
}

export default Calendar
