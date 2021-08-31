
import React, {useState} from 'react';
import Calendar from 'react-calendar';

const ReactCalendar = () => {
    const[date, setDate ]=useState(new Date());

    const onChange = date => {
        setDate(date);
    }
    return (
      <>
        <Calendar showWeekNumbers onChange={onChange} value={date}/>
        {console.log(date)}
        {date.toString()}
        
      </>
    );
  }
  export default ReactCalendar;
 