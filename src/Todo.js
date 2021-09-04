import React from 'react'
import moment from 'moment';


export default function Todo({allEvents,toggleTodo}) {
    const handleTodoClick =()=>{
        toggleTodo(allEvents.id)
    }
    return (
       
        <div>
           
        <label >
            
            
            <input type="checkbox" defaultChecked={allEvents.done} onChange={handleTodoClick}/>
             {moment(allEvents.start ).format("D MMM  YYYY")}:{allEvents.title}
            
        </label>
            
      {console.log('to do from todo.js:',allEvents)}
      
      
      

        </div>
            
           
       
    )
}
