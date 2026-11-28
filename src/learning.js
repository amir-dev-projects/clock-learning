export const modules = [
 {id:"clock",title:"Learn the Clock",emoji:"🕒",theme:"clock-theme",kicker:"TIME & EVERYDAY LIFE",description:"Discover how clocks work, learn to read the time and practise using hours, minutes and seconds.",lessons:[
  {id:1,title:"What Is Time?",subtitle:"Discover seconds, minutes, hours and the events in your day.",available:true},
  {id:2,title:"Why Do We Need Clocks?",subtitle:"See how clocks help us organize our day.",available:true},
  {id:3,title:"Meet the Clock",subtitle:"Explore the clock face, numbers and hands.",available:true},
  {id:4,title:"The Hour Hand",subtitle:"Learn how to read and understand hours.",available:true},
  {id:5,title:"The Minute Hand",subtitle:"Discover minutes and count around the clock.",available:true},
  {id:6,title:"Reading O'Clock Times",subtitle:"Put the hour and minute hands together.",available:true},
  {id:7,title:"Past the Hour",subtitle:"Read 5, 10, 15, 20 and more minutes past.",available:true},
  {id:8,title:"Half Past and Quarter Past",subtitle:"Understand 15-minute and 30-minute intervals.",available:true},
  {id:9,title:"To the Next Hour",subtitle:"Learn quarter to and minutes to.",available:false},
  {id:10,title:"Analog and Digital Clocks",subtitle:"Read two different ways of showing time.",available:false},
  {id:11,title:"The Second Hand",subtitle:"Explore seconds and shorter moments.",available:false},
  {id:12,title:"AM and PM",subtitle:"Understand morning, afternoon and night.",available:false},
  {id:13,title:"12-Hour and 24-Hour Time",subtitle:"Explore two ways to write the time.",available:false},
  {id:14,title:"How Long Does It Take?",subtitle:"Measure and compare how long activities last.",available:false},
  {id:15,title:"Time in Everyday Life",subtitle:"Read schedules and plan activities.",available:false},
  {id:16,title:"Clock Master Challenge",subtitle:"Bring all your clock skills together.",available:false}
 ]},
 {id:"calendar",title:"Calendar & Time",emoji:"🗓️",theme:"calendar-theme",kicker:"DAYS, DATES & SEASONS",description:"Explore days, weeks, months, dates, birthdays, seasons and how we use calendars.",lessons:[
  "Days of the Week","Yesterday, Today and Tomorrow","Weeks and Weekends","The Twelve Months","Understanding Dates","Reading and Using a Calendar","Birthdays, Holidays and Important Events","Seasons of the Year","Understanding a Year and Leap Years","Time Around the World"
 ].map((title,i)=>({id:i+1,title,available:false}))},
 {id:"earth",title:"Space & Earth",emoji:"🌎",theme:"earth-theme",kicker:"OUR PLANET & THE WORLD AROUND US",description:"Discover our planet, maps, directions, the Sun, Moon, weather and the natural world.",lessons:[
  "Our Home Planet — Earth","Finding Places — Globes and Maps","Directions — North, South, East and West","The Sun — Daylight, Sunrise and Sunset","Day and Night — Why Earth Rotates","Seasons — Why Seasons Change","The Moon — Why It Changes Appearance","Weather — Clouds, Rain, Snow and Wind","Water on Earth — Oceans, Rivers and the Water Cycle","Our Environment — Nature and Caring for Earth","Our Solar System — The Sun and Eight Planets","Connecting Earth, Sun and Moon"
 ].map((title,i)=>({id:i+1,title,available:false}))}
];
