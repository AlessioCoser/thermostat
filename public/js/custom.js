$(document).ready(function(){
  function changeHtmlClassesBy(status) {
    var statusClass = status ? 'on' : 'off'
    var statusText = status ? 'Acceso' : 'Spento'
    var buttonClass = status ? 'btn-info' : 'btn-warning'
    var iconClass = status ? 'fa-power-off' : 'fa-fire'
    var buttonText = status ? 'Spegni' : 'Accendi'

    $('header').attr('class', statusClass)
    $('#currentState').attr('class', 'star-light ' + statusClass)
    $('#currentText').html(statusText)
    $('#changeStatus').attr('class', 'btn btn-large ' + buttonClass)
    $('#changeStatus > i').attr('class', 'fa ' + iconClass)
    $('#changeStatus > span').html(buttonText)
  }

  function hasNoErrors(response) {
    if(response.err) {
      location.reload()
      return false
    }
    return true
  }

  function handleStatus(response) {
    if (hasNoErrors(response)) {
      changeHtmlClassesBy(response.value)
    }
  }

  function handleTemperature(response){
    if (hasNoErrors(response)) {
      $('#currentTemperature').html(response.value)
    }
  }

  function getTemperature() {
    $.get('/thermostat/temperature', handleTemperature)
  }

  function getStatus() {
    var toggleStatus = $('#currentState').hasClass('off')
    $.get('/thermostat/status', handleStatus)
  }

  function updateStatus() {
    var toggleStatus = $('#currentState').hasClass('off')
    $.post('/thermostat/status', {status: toggleStatus}, handleStatus)
  }

  $('#changeStatus').on('click', function (){
    updateStatus()
  })

  getStatus()
  getTemperature()
  setInterval(getStatus, 10000)
  setInterval(getTemperature, 300000)
})
