

let event_holder = [
  {
    text: 'New event',
    date: '25',
    month: 'Nov',
    year: '2018',
    id: 0
  },{
    text: 'Hit the gym',
    date: '18',
    month: 'Dec',
    year: '2018',
    id: 1
  },{
    text: 'October 31',
    date: '31',
    month: 'Oct',
    year: '2018',
    id: 2
  },{
    text: 'October 1',
    date: '01',
    month: 'Oct',
    year: '2018',
    id: 3
  },{
    text: 'Another One',
    date: '01',
    month: 'Dec',
    year: '2018',
    id: 4
  }
]

let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

let today = new Date(),
currentDate  = today.getDate(),
currentMonth = today.getMonth(),
currentYear  = today.getFullYear();

showTime();
function showTime() {
  let now = new Date(),
      dy = now.getDay(),
      hr = now.getHours(),
      min = now.getMinutes(),
      sec = now.getSeconds(),

      days = ["sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  let headerTime = document.querySelector('.header-time');
  headerTime.innerHTML = 
  `
    <span>${days[dy]}</span>
    <span>${hr = hr < 10 ? '0' + hr : hr}</span>:
    <span>${min = min < 10 ? '0' + min : min}</span>:
    <span>${sec = sec < 10 ? '0' + sec : sec}</span>
  `;

  setTimeout(showTime, 1000);
}


cal(currentDate, currentMonth, currentYear);
function cal(cDate, month, year) {
  let date = 1,
  firstDay = (new Date(year, month)).getDay(),
  daysInMonth = 32 - new Date(year, month, 32).getDate(),
  calendar = document.querySelector('.calendar');
  calendar.innerHTML = '';
  
  let html = '';
  html += `
  <div class='calendar-nav'>
  <div class='view'>
  <span class='big'>${months[month]}</span>
  <span>${year}</span>
  </div>
  <div class='pager'>
  <span class='prevMonth' onclick='prevMonth()'><i class='ion-chevron-left'></i></span>
  <span class='nextMonth' onclick='nextMonth()'><i class='ion-chevron-right'></i></span>
  </div>
  </div>
  <div class='week'>
  ${weeks.map((week)=> `<span>${week}</span>`).join('')}
  </div>
  `
  calendar.innerHTML += html;
  
  // create the board for the dates
  let board = document.createElement('div');
  board.className += 'board';
  calendar.appendChild(board);
  
  
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('div');
    row.className += 'row';
    
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('div');
      cell.className += 'cell';
      
      row.appendChild(cell);
      if (i === 0 && j < firstDay) {
        cell.setAttribute('data-month', 
        (currentMonth === 0) ? 11 : currentMonth - 1
        );
        cell.setAttribute('data-year', 
        (currentMonth === 0) ? currentYear - 1 : currentYear
        );
        cell.classList.add('prev');
        cell.innerText = '';
      }else if (date > daysInMonth) {
        cell.setAttribute('data-month', (currentMonth + 1)%12);
        cell.setAttribute('data-year', 
        (currentMonth === 11) ? currentYear + 1 : currentYear
        );
        cell.classList.add('next')
        cell.innerText = '';
      }else {
        cell.setAttribute('data-month', currentMonth);
        cell.setAttribute('data-year', currentYear);
        cell.classList.add('current')
        cell.innerText = date < 10 ? '0' + date : date;
        
        if (date == new Date().getDate() && 
        currentYear == new Date().getFullYear() &&
        currentMonth == new Date().getMonth()) {
          cell.classList.add('active-time');
          cell.classList.add('active-click');
        }
        
        if (date == cDate) {
          cell.classList.add('active-click');
        }
        
        date++;
      }
    }
    board.appendChild(row);
  }
}

getDaysInPrevMonth(currentYear, currentMonth)
function getDaysInPrevMonth(y,m) {
  let cell = document.querySelectorAll('.cell.prev'),
  getDates = new Date(y,m,0).getDate(),
  x = (getDates+1) - cell.length;
  cell.forEach(el=> {
    el.innerText = x++;
  })
}

getDaysInNextMonth();
function getDaysInNextMonth() {
  let cell = document.querySelectorAll('.cell.next');
  var x = 1
  cell.forEach(el=> {
    el.innerText = x < 10 ? '0'+x : x
    x++
  });
}

function nextMonth() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  cal(currentDate, currentMonth, currentYear);
  getDaysInNextMonth();
  getDaysInPrevMonth(currentYear, currentMonth);
  checkForValidEvents();
}

function prevMonth() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  cal(currentDate, currentMonth, currentYear);
  getDaysInNextMonth();
  getDaysInPrevMonth(currentYear, currentMonth);
  checkForValidEvents();
}

window.addEventListener('click', (evt)=> {
  let that = evt.target,
      inside = that.classList

  if (inside.contains('current') || inside.contains('next') || inside.contains('prev')) {
    document.querySelector('.active-click').classList.remove('active-click');
    that.classList.add('active-click');
  }

  event_add();
  // returnPanelTwoHTML();
  evt.preventDefault();
});

event_add();
function event_add() {
  let final_event = [],
      itemSelect = document.querySelector('.active-click');
  let date = itemSelect.innerHTML,
      month = shortMonths[itemSelect.attributes['data-month'].value],
      year = itemSelect.attributes['data-year'].value;

  for (let i = 0; i < event_holder.length; i++) {
    if (date == event_holder[i].date && month == event_holder[i].month && year == event_holder[i].year) {
      final_event.push(event_holder[i]);
    }
  }

  
  returnPanelOneHTML(final_event)
  returnPanelTwoHTML(event_holder);

  if (final_event == '' || final_event == null) {
    document.querySelector('.panel-1').innerHTML = `
    <h1>No Event Planned</h1>
    <p>click the + button to add new event</p>
    `
  }

  if (event_holder == '' || event_holder == null) {
    document.querySelector('.panel-2').innerHTML = `
    <h1>No Event Planned</h1>
    <p>click the + button to add new event</p>
    `
  }

}

let add_event_btn = document.querySelector('.add-event');
add_event_btn.addEventListener('click', ()=> {
  addNewEvent();
})

function addNewEvent() {

  if (!document.querySelector('.active-click')) return;

  let pop_up = document.querySelector('.input-event');
  let ovelay = document.querySelector('.overlay');
  let input_event = document.querySelector('.input-event input');
  pop_up.classList.add('visible');
  ovelay.classList.add('visible');

  window.addEventListener('click', (evt)=> {

    if (evt.target.classList.contains('cancel-input-event') || 
        evt.target.classList.contains('close-input-event') ||
        evt.target.classList.contains('ok-input-event') ||
        evt.target.classList.contains('overlay')) {

      pop_up.classList.remove('visible');
      ovelay.classList.remove('visible');

      input_event.value = '';
      
    }

    evt.preventDefault();
  })

}

document.querySelector('.ok-input-event').addEventListener('click', ()=> {

  let activeClick = document.querySelector('.active-click'),
      input_event = document.querySelector('.input-event input');
  let date = activeClick.innerHTML,
      month = activeClick.attributes['data-month'].value,
      year = activeClick.attributes['data-year'].value;
  
  if (input_event.value == '') return;

  let event_data = {
    text: input_event.value,
    date: date,
    month: shortMonths[month],
    year: year
  }

  event_holder.push(event_data);

  checkForValidEvents();
  
});

function checkForValidEvents() {
  for (let i = 0; i < event_holder.length; i++) {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(el=> {
      checkDate = el.innerHTML == event_holder[i].date;
      checkMonth = shortMonths[el.attributes['data-month'].value] == event_holder[i].month;
      checkYear = el.attributes['data-year'].value == event_holder[i].year;

      if (!(checkDate && checkMonth && checkYear)) {
        return
      }else {
        el.classList.add('active-event');
      }

    })
  }
}

checkForValidEvents();
// console.log(document.querySelector('.active-event'));


function returnEventHTML(item) {
  let html = 
      `<div class="event-item">
        <div class="event-text">
          <div class="text">
            <div class="word">
              <h2>${item.text}</h2>
              <input type="text">
            </div>
            <h5>${item.month}-${item.date}-${item.year}</h5>
          </div>
          <span class="dropdown">
            <i class="ion-chevron-down" onclick="openDrop(this,${item.id})"></i>
          </span>
        </div>
        <div class="event-control" id="${item.id}">
          <span><i class="ion-edit"></i></span>
          <span><i class="ion-trash-a"></i></span>
        </div>
      </div>
      `
  return html;
}

returnPanelOneHTML();
function returnPanelOneHTML(event) {
  if (!event) return;
  let html = event.map((elem)=> {
    return returnEventHTML(elem);
  }).join('');
  document.querySelector('.panel-1').innerHTML = html;
}


returnPanelTwoHTML(event_holder);
function returnPanelTwoHTML(event_holder) {
  if (!event_holder) return;
  let html = event_holder.map((elem)=> {
    return returnEventHTML(elem);
  }).join('');
  document.querySelector('.panel-2').innerHTML = html;
}



// Change Panel Views

chanelEventPanel();
function chanelEventPanel() {
  let eventPanels = document.querySelectorAll('.panel-dot');
  let change = document.querySelector('.change');
  let panelView = document.querySelectorAll('.panel-view');

  panelView[0].style.display = 'block';
  eventPanels.forEach((elem, idx)=> {
    elem.addEventListener('click', function () {
      change.style.left = `${this.offsetLeft}px`;
      
      for (let i = 0; i < panelView.length; i++) {
        panelView[i].style.display = 'none';
      }

      panelView[idx].style.display = 'block';
    })
  })
}

// Open Dropdown


function openDrop(el,id) {
  // if (!el) return;
  console.log(el);
  
  var eventControl = document.getElementById(id);
  eventControl.classList.add('isActive')
  
  console.log(eventControl);
  // returnPanelOneHTML();
  // returnPanelTwoHTML();
}
































