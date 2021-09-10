import './App.css';
import {Calendar , dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfDay';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, {useState, useEffect } from 'react';
import {registerLocale} from 'react-datepicker';
import sv from "date-fns/locale/sv"
import "react-datepicker/dist/react-datepicker.css"
import TodoList from './TodoList';
import { v4 } from 'uuid';
import moment from 'moment';
import Form from './Form';
import axios from 'axios'

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

   const [newEvent, setNewEvent] = useState({title:"", start:""  , done:false })
   const [allEvents, setAllEvents] = useState([])
   
  
   
 // Change the color of events 
  function eventPropGetter(allEvents){ 
    let newStyle = {
      backgroundColor: "lightgreen",
      color: 'black',
      borderRadius: "5px",
      border: "none"
    };

    if (allEvents.holiday){
      newStyle.backgroundColor = "red"
     
    }

    return {
      className: "",
      style: newStyle
    };
  }
  



 //Fetch Holidays  API 
//const allEventsRef = useRef(allEvents);

useEffect(() => {
  //console.log('allEventsRef.current',allEventsRef.current);
 // if (allEvents !== allEventsRef.current) {
if(localStorage.getItem(LocalStorage)==[]){


  let year=moment("2021").format('YYYY')
  axios(`https://sholiday.faboul.se/dagar/v2.1/`+year)
  .then(response => {
  
   const holDay=response.data.dagar.filter(holiday=>holiday.helgdag)
   .map(function(holidayEvents){
     return{ title:holidayEvents.helgdag , start: holidayEvents.datum , id:v4() , done:false ,holiday:'Ja' }
   })
   console.log('holDay',holDay);
   setAllEvents(holDay) 

     console.log('allEvents ', allEvents)
      
          });
     }   
  },[]) 



// Store events to Local storage 

 useEffect(()=>{

  const storedTodos=JSON.parse(localStorage.getItem(LocalStorage))
  console.log('storedToDoes:',storedTodos);
  if (storedTodos)
   setAllEvents(storedTodos)
   console.log('saved storage',localStorage.getItem(LocalStorage));
 
},[])
  


 useEffect(()=>{
  localStorage.setItem(LocalStorage , JSON.stringify(allEvents))
   console.log('localstorage',localStorage.getItem(LocalStorage));

 },[allEvents])






//Function for adding new event on clicking Add Event button 
function handleAddEvent(){
   if(newEvent.title){
      setAllEvents(prevAllEvents =>{
      return [...prevAllEvents , {title:newEvent.title,  start:newEvent.start  ,id:v4() , workDay:'Ja', done:false}]
      })
     
   } 
}


//Function for deleting done  events on clickind clear Event button 

const handleClearEvent = ()=>{
  const clearDoneEvent=allEvents.filter(clearEvents=>!clearEvents.done )
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
           startAccessor ="start" endAccessor="start" style={{height:500 , marginLeft:"150px" ,  marginRight:"150px" ,  marginBottom:"50px"}} value={allEvents.title} eventPropGetter={eventPropGetter}
      />
      <div style={{margin:'0PX 10% 50PX 10%' ,width:'80%' ,boxShadow:'10px 10px 10px 10px black',background:'lightgray',fontSize:'20px' }}>
          <div style={{fontWeight:'bold',fontSize:'20px' ,boxShadow:'5px 5px 5px 5px black'}}>
                {allEvents.filter(allEvents=>{return(!allEvents.done && allEvents.workDay)}).length} left to do 
                {console.log(allEvents)}
          
          </div>
          <br/>
          < TodoList allEvents={allEvents.filter(events=>events.workDay)} toggleTodo={toggleTodo}  />
          <button onClick={handleClearEvent} style={{margin:'50PX 30% 50PX 25%' ,width:'50%' ,boxShadow:'10px 10px 10px 10px black'  ,fontWeight:'bold',  fontSize:'20px' , borderRadius:'10px'}}> Clear Done Events
          </button>
          <br/>
      </div>
    </div>
  );
}

export default App;

