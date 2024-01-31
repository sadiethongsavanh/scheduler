 $(document).ready(function(){
  
//Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  let x = $("div[id^='hour-'] > button");
  // console.log("x= ",x)
  for (const i of x) {
    i.addEventListener("click",function(){
      // console.log("this= ",this.parentNode.attributes[0].nodeValue)
      // console.log("this ",$(this).siblings('textarea').val());
      let data_array = []
      const obj = {
        id: this.parentNode.attributes[0].nodeValue,
        text: $(this).siblings('textarea').val()
      }
      save_form_data(obj)
     
    })
  }
  function save_form_data(obj){
    
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    console.log("storedFormData= ",storedFormData)

    storedFormData.push(obj)

    localStorage.setItem('formData', JSON.stringify(storedFormData));
  }

  let ob = JSON.parse(localStorage.getItem('formData'))
  // console.log("x= ",x)
  $.each(x, function(index, value){
    const o = {
      id: this.parentNode.attributes[0].nodeValue,
      // text: $(this).siblings('textarea').val()
    }
    console.log("ob= ",ob)
    for(const i in ob){
      if(ob[i].id === o.id){
        $(this).siblings("textarea").val(ob[i].text)
      }
    }

    
  })
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  let hour = dayjs().hour()
  
  const time = [9,10,11,12,13,14,15,16,17]
  $.each(x, function(i, value){
    if(hour > time[i]){
      console.log("pass= ",$(this.parentNode).addClass("past"))
    } 
    else if(hour === time[i]){
      console.log("present= ",$(this.parentNode).addClass("present"))
    }
    else{
      console.log("future= ",$(this.parentNode).addClass("future"))
    }

  })
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  //
  // TODO: Add code to display the current date in the header of the page.
  let day = dayjs().day() // gets day of current week
  let date = dayjs().date() // gets day of current month
  let month = dayjs().month() // gets current month
  // console.log("day= ",day)
  // console.log("date= ",date)
  // console.log("month= ",month)
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // console.log("days= ",days[day])
  const months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  // console.log("months= ",months[month])
  // console.log("day number= ",date+"th")
  let displayDate = document.getElementById("currentDay")
  displayDate.innerHTML = days[day]+", "+months[month]+" "+date+"th"
});
});