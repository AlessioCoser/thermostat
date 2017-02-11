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
    return (<div id='schedule-panel'>
      <Schedule temperature={this.state.schedules[0]} />
    </div>)
  }
}
