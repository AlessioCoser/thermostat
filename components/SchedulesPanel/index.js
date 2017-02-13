import React from 'react'
import Schedule from './schedule'

module.exports = class SchedulePanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schedules: [5, 10]
    }
  }

  render () {
    var schedules = []

    for(var id = 0; id < 24; id++) {
      schedules.push(<Schedule hours={id} temperature={this.state.schedules[id]} />)
    }

    return (<div id='schedule-panel' className={this.props.show ? '' : 'hide'}>
      <div className='title'>
        <i className='fa fa-bar-chart' aria-hidden='true' /> Fasce Orarie
      </div>
      <div className='schedules'>
        {schedules}
      </div>
    </div>)
  }
}
