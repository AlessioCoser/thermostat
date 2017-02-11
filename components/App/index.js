import React from 'react'
import ReactDom from 'react-dom'

import ThermostatPanel from '../ThermostatPanel'
import SchedulePanel from '../SchedulesPanel'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showThermostat: true
    }
  }

  changeView () {
    this.setState({showThermostat: !this.state.showThermostat})
  }

  render () {
    var changeViewClass = 'change-view ' + (this.state.showThermostat ? '': 'dark')

    return (<div className='root-app'>
      <div className={changeViewClass} onClick={() => this.changeView()}>
        <i className='fa fa-gear' aria-hidden='true' />
      </div>
      <ThermostatPanel show={this.state.showThermostat} />
      <SchedulePanel show={!this.state.showThermostat} />
    </div>)
  }
}

ReactDom.render(
  <App />,
  document.getElementById('page-top')
)
