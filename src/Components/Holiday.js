import React, { Component } from 'react'
import moment from 'moment';
//import axios from 'axios'
export default class Holiday extends Component {
    state ={
       holidays: [],
   }
   componentDidMount(){
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
       
      //  .then(res=>{
     //       console.log(res);
     //       this.setState({holidays:res.///data});
            
     //   })
   }
    render(){
         return (
           <div>Holidays</div>
        )
    }
    }
       


