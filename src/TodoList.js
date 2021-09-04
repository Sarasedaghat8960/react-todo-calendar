import React from 'react'
import Todo from './Todo'
export default function TodoList({allEvents, toggleTodo}) {
    return (
        allEvents.map(allEvents =>{
           return <Todo key={allEvents.id}  allEvents={allEvents} toggleTodo={toggleTodo}/>
        })
      
    )
    
}
