import './App.css';
import {Calendar , dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfDay';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, {useState, useEffect,  Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import TodoList from './TodoList';
import { v4 } from 'uuid';
import moment from 'moment';
import Holiday from './Components/Holiday';




const locales = {
  "en-US" : require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events =[]

const holidays= []
const LocalStorage ='todoApp.todos'
function App() {
   const [newEvent, setNewEvent] = useState({title:"", start:""  , done:false})

   const [allEvents, setAllEvents] = useState(events)

  
   

 const componentDidMount=()=>{
     fetch('https://sholiday.faboul.se/dagar/v2.1/2021')
     .then(res=>res.json())
     .then(res=>{
         let redDay=res.data;
         console.log(res)
         for (let i = 0; i < redDay.length; i++) {
          redDay[i].start =    moment.utc(redDay[i].start).toDate();
             redDay[i].end = moment.utc(redDay[i].end).toDate();
             
           }
           this.setState({
             cal_events:redDay
           })
     })   
    }


useEffect(()=>{
  const storedTodos=JSON.parse(localStorage.getItem(LocalStorage))
  if (storedTodos) setAllEvents(storedTodos)
},[])
useEffect(()=>{
  localStorage.setItem(LocalStorage , JSON.stringify(allEvents))
},[allEvents])
  function handleAddEvent(){
    setAllEvents(prevAllEvents =>{
      return [...prevAllEvents , {title:newEvent.title, start:moment(newEvent.start ).format("D MMM  YYYY") , done:false,id:v4()}]
    })
   
  }
  function toggleTodo(id){
    const newEvents=[... allEvents]
    
   const doneEvent=newEvents.find(doneEvent=> doneEvent.id ===id )
   doneEvent.done =! doneEvent.done
    setAllEvents(newEvents)
  }
  const handleClearEvent = ()=>{
    const newEvent=allEvents.filter(clearEvents=>!clearEvents.done)
    setAllEvents(newEvent)
  }
  return (
    <div className="App">
      <h1>Calendar</h1>
      <input type="text" placeholder="Add text" style={{width:"20%", marginRighr:"10px"}} value={newEvent.title} onChange={(e)=> setNewEvent({...newEvent,title: e.target.value})}/>

      <DatePicker placeholderText="Start Date" 
            selected={newEvent.start} onChange={(start)=> setNewEvent({...newEvent , start})} />
           <button style={{marginTop: "10px "}} onClick={handleAddEvent}>Add Event</button>
      
      <Calendar localizer={localizer} events={allEvents} 
      startAccessor ="start" endAccessor="start" style={{height:500 , margin:"50px"}} />
      <div style={{marginLeft:'100px' ,width:'80%' ,boxShadow:'10px 10px 10px 10px black',background:'lightgray',fontSize:'20px' }}>
      <div style={{fontWeight:'bold',fontSize:'20px' ,boxShadow:'5px 5px 5px 5px black',background:'lightgray'}}>
      {allEvents.filter(allEvents=>!allEvents.done).length} left to do 

      </div>
      <br/>
      < TodoList allEvents={allEvents} toggleTodo={toggleTodo}  />
      
      
      <button onClick={handleClearEvent} style={{margin:'100px' ,width:'50%' ,boxShadow:'10px 10px 10px 10px black',fontWeight:'bold',fontSize:'20px' }}> Clear Done Events</button>
      <br/>
      </div>
     
      
    {  console.log('allevents',allEvents)}
  
      
     
    </div>
  );
}

export default App;

