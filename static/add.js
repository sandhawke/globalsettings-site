'use strict'

console.log('running')

function showProposed () {
  var parts = document.location.hash.slice(1).split('=')
  var key = decodeURIComponent(parts[0])
  var val = decodeURIComponent(parts[1])
  var keyEl = document.getElementById('key')
  var valEl = document.getElementById('val')
  keyEl.textContent = key
  valEl.textContent = val
  var saveEl = document.getElementById('savep')
  saveEl.innerHTML = ''
  if (localStorage.getItem(key) == val) {
    saveEl.innerHTML = "<b>Saved.</b>"
  } else {
    var button = document.createElement('button')
    button.textContent = 'Make This Data Public!'
    button.addEventListener('click', function () {
      localStorage.setItem(key,val)
      showProposed()
      showCurrent()
    })
    saveEl.appendChild(button)
  }
}

function showCurrent () {
  var table = document.getElementById('table')
  if (localStorage.length === 0) {
    table.innerHTML = '<tr><th style="padding: 1em">No Data Stored</th></tr>';
    return
  }
  table.innerHTML = "<tr><th>Name</th><th>Value</th><th>Action</th></tr>";
  // remove the ones we added so we can re-draw
  for (var i=0; localStorage.length > i; i++) {
    const key = localStorage.key(i);
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('th');
    td1.textContent = key
    td1.className = 'key'
    td2.textContent = localStorage.getItem(key);
    td3.innerHTML = '<button>delete</button>';
    td3.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem(key)
      console.log('removing', key)
      showProposed()
      showCurrent() 
    }, true)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    table.appendChild(tr)
  }
}

showCurrent()
showProposed()

addEventListener('hashchange', showProposed)

