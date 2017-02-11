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
    return (<div id='schedule-panel' className={this.props.show ? '' : 'hide'}>
      <div className='title'>
        <i className='fa fa-bar-chart' aria-hidden='true' /> Fasce Orarie
      </div>
      <div className='schedules'>
        <Schedule temperature={this.state.schedules[0]} />
        <Schedule temperature={this.state.schedules[1]} />
      </div>
    </div>)
  }
}
