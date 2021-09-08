import './App.css';
import {Calendar , dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfDay';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, {useState, useEffect,  Component } from 'react';
import DatePicker ,{registerLocale} from 'react-datepicker';
import sv from "date-fns/locale/sv"
import "react-datepicker/dist/react-datepicker.css"
import TodoList from './TodoList';
import { v4 } from 'uuid';
import moment from 'moment';
import Holiday from './Components/Holiday';
import axios from 'axios'
import { lastDayOfMonth } from 'date-fns';
registerLocale("sv", sv);


const locales = {

  "sv" :sv
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})
//const holidays= []

const events =[]
const LocalStorage ='TodoApp'
const holidays=[]
  

function App() {

   const [newEvent, setNewEvent] = useState({title:"", start:""  , done:false, holiday:'No'})
   const [allEvents, setAllEvents] = useState(events)
   const [allHolidays, setAllHolidays] = useState({title:"", start:""  , done:true , })

//Holidays  API ?????????????

function holiday() {
  return (
          axios('https://sholiday.faboul.se/dagar/v2.1/2021')
          .then(response => {
          
           const holDay=response.data.dagar.filter(holiday=>holiday.helgdag).map(function(row){
             return{ title:row.helgdag , start: row.datum , id:v4() , holiday:'Ja' , done:true}
           })
             setAllEvents(holDay) 
             console.log('allholidays ',allHolidays)
              
                  })
              
              //   setAllHolidays({title:response.data.dagar[i].helgdag , start:response.data.dagar[i].datum})
           
   
  )
}
  
   

// Store events to Local storage 

useEffect(()=>{
  
  const storedTodos=JSON.parse(localStorage.getItem(LocalStorage))
  if (storedTodos) setAllEvents(storedTodos)
},[])


useEffect(()=>{
  localStorage.setItem(LocalStorage , JSON.stringify(allEvents))
},[allEvents])

//Function for adding new event on clickind Add Event button 
function handleAddEvent(){
  setAllEvents(prevAllEvents =>{
    return [...prevAllEvents , {title:newEvent.title, start:newEvent.start  , done:false , id:v4()}]
  })
  
}

// Function for changing the events status to done 
function toggleTodo(id){
  const newEvents=[... allEvents]
  
  const doneEvent=newEvents.find(doneEvent=> doneEvent.id ===id )
  doneEvent.done =! doneEvent.done
  setAllEvents(newEvents)
}
  const handleClearEvent = ()=>{
    const clearDoneEvent=allEvents.filter(clearEvents=>!clearEvents.done)
    setAllEvents(clearDoneEvent)
  }
  
  return (
    <div className="App">
      <h1>Todo Calendar</h1>
      <input type="text" placeholder="Add text" style={{width:"20%", marginRighr:"10px"}} value={newEvent.title} onChange={(e)=> setNewEvent({...newEvent,title: e.target.value})}/>
      
      <DatePicker placeholderText="Start Date" 
            selected={newEvent.start} locale="sv" onChange={(start)=> setNewEvent({...newEvent , start})} />
      <button style={{marginTop: "10px "}} onClick={handleAddEvent}>Add Event</button>
      
      <Calendar localizer={localizer} events={allEvents} 
      startAccessor ="start" endAccessor="start" style={{height:500 , margin:"150px"}} value={allEvents.title} />
      <div style={{marginLeft:'100px' ,width:'80%' ,boxShadow:'10px 10px 10px 10px black',background:'lightgray',fontSize:'20px' }}>
     
        <div style={{fontWeight:'bold',fontSize:'20px' ,boxShadow:'5px 5px 5px 5px black',background:'lightgray'}}>
             {allEvents.filter(allEvents=>!allEvents.done).length} left to do 
             {console.log(allEvents)}
        </div>
        <br/>
        < TodoList allEvents={allEvents} toggleTodo={toggleTodo}  />
        <button onClick={holiday}>Show holidays</button>
        <button onClick={handleClearEvent} style={{margin:'100px' ,width:'50%' ,boxShadow:'10px 10px 10px 10px black',fontWeight:'bold',fontSize:'20px' }}> Clear Done Events</button>
        <br/>
       
      </div>
     
      
  
      
     
    </div>
  );
}

export default App;

