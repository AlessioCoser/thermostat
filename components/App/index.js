import React from 'react'
import ReactDom from 'react-dom'

import ThermostatPanel from '../ThermostatPanel'
import SchedulePanel from '../SchedulesPanel'

class App extends React.Component {
  render () {
    return (<div className='root-app'>
      <ThermostatPanel />
      <SchedulePanel />
    </div>)
  }
}

ReactDom.render(
  <App />,
  document.getElementById('page-top')
)
