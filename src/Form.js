import React, { Component } from 'react'
import DatePicker ,{registerLocale} from 'react-datepicker';
import sv from "date-fns/locale/sv"
import { v4 } from 'uuid';

registerLocale("sv", sv);





export default function Form({newEvent,handleAddEvent,setNewEvent}) {
   
    return (
        <div>
           <h1>Todo Calendar</h1>
      <input type="text" placeholder="Add text" style={{width:"20%", marginRighr:"10px"}} value={newEvent.title} onChange={(e)=> setNewEvent({...newEvent,title: e.target.value})}/>
      
      <DatePicker placeholderText="Start Date" 
            selected={newEvent.start} locale="sv" onChange={(start)=> setNewEvent({...newEvent , start})} />
      <button style={{marginTop: "10px "}} onClick={handleAddEvent}>Add Event</button>    
        </div>
    )
}

