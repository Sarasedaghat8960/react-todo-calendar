import React, { Component } from 'react'
import DatePicker ,{registerLocale} from 'react-datepicker';
import sv from "date-fns/locale/sv"
import { v4 } from 'uuid';

registerLocale("sv", sv);





export default function Form({newEvent,handleAddEvent,setNewEvent}) {
   
    return (
        <>
        
        <div style={{ margin:'50px 30% 50px  30%  ', border:'5px black solid', padding:'0px 10% 10px 15% ',  borderRadius: "10px" , boxShadow:'10px 10px 10px 10px black',background:'lightgray'}}>
       <h4>Todo Calendar</h4>
      <input type="text" placeholder="Add text" style={{width:"72%" }} value={newEvent.title} onChange={(e)=> setNewEvent({...newEvent,title: e.target.value})}/>
      
      <DatePicker placeholderText="Start Date" 
            selected={newEvent.start} locale="sv" onChange={(start)=> setNewEvent({...newEvent , start})} />
      <button style={{marginTop: "10px ", marginLeft:'20px', borderRadius:'10px' ,boxShadow:'5px 5px 5px 5px' }} onClick={handleAddEvent}>Add Event</button>    
        </div>
        </>
    )
}

