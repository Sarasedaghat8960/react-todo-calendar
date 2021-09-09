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
import Form from './Form';
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



const LocalStorage ='TodoApp'

  

function App() {

   const [newEvent, setNewEvent] = useState({title:"", start:""  , done:false , holiday:'No' ,})
   const [allEvents, setAllEvents] = useState([])
   const [allHolidays, setAllHolidays] = useState([])
   let count=0
   
   

// Store events to Local storage 

useEffect(()=>{

  const storedTodos=JSON.parse(localStorage.getItem(LocalStorage))
  console.log('storedToDoes:',storedTodos);
  if (storedTodos) setAllEvents(storedTodos)
  
},[count])

useEffect(()=>{
 console.log('localstorage',localStorage.getItem(LocalStorage));
   
  localStorage.setItem(LocalStorage , JSON.stringify(allEvents))
  
},[allEvents])




// //Holidays  API ?????????????

useEffect(() => {
  let year=moment("2021").format('YYYY')
  axios(`https://sholiday.faboul.se/dagar/v2.1/`+ year)
  .then(response => {
  
   const holDay=response.data.dagar.filter(holiday=>holiday.helgdag).map(function(holidayEvents){
     return{ title:holidayEvents.helgdag , start: holidayEvents.datum , id:v4() , done:true ,holiday:'Ja' }
   })
   console.log('holDay',holDay);
   setAllEvents([...holDay]) 
     console.log('allEvents ', allEvents)
      
          });
  },[count]) 



//Function for adding new event on clicking Add Event button 
function handleAddEvent(){
   if(newEvent.title){
      setAllEvents(prevAllEvents =>{
      return [...prevAllEvents , {title:newEvent.title,  start:newEvent.start  ,id:v4() , holiday:'No', done:false}]
      })
      
   } 
}


//Function for deleting done  events on clickind clear Event button 

const handleClearEvent = ()=>{
  const clearDoneEvent=allEvents.filter(clearEvents=>!clearEvents.done)
  setAllEvents(clearDoneEvent)
}

// Function for changing the events status to done 
function toggleTodo(id){
  const toggleEvents=[... allEvents]
  
  const doneEvent=toggleEvents.find(doneEvent=> doneEvent.id ===id )
  doneEvent.done =! doneEvent.done
  setAllEvents(toggleEvents)
}


  
  return (
    <div className="App">
      <Form  newEvent={newEvent} handleAddEvent={handleAddEvent} setNewEvent={setNewEvent}/>
      <Calendar localizer={localizer} events={allEvents} 
           startAccessor ="start" endAccessor="start" style={{height:500 , margin:"150px"}} value={allEvents.title} 
      />
      <div style={{marginLeft:'100px' ,width:'80%' ,boxShadow:'10px 10px 10px 10px black',background:'lightgray',fontSize:'20px' }}>
          <div style={{fontWeight:'bold',fontSize:'20px' ,boxShadow:'5px 5px 5px 5px black',background:'lightgray'}}>
                {allEvents.filter(allEvents=>!allEvents.done).length} left to do 
                {console.log(allEvents)}
          
          </div>
          <br/>
          < TodoList allEvents={allEvents} toggleTodo={toggleTodo}  />
          <button onClick={handleClearEvent} style={{margin:'100px' ,width:'50%' ,boxShadow:'10px 10px 10px 10px black',
            fontWeight:'bold',  fontSize:'20px' }}> Clear Done Events
          </button>
          <br/>
      </div>
    </div>
  );
}

export default App;

