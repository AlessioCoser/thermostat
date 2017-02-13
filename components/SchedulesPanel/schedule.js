import React from 'react'
import Rcslider from 'rc-slider'

const marks = {
   0: <strong>05 °C</strong>,
  20: '10 °C',
  40: '15 °C',
  60: '20 °C',
  80: '25 °C',
  100.0: <strong>30 °C</strong>
}

module.exports = class Schedule extends React.Component {
  constructor (props) {
    props.unit = props.unit || 4
    super(props)
    this.state = {
      schedule: props.temperature || 5,
    }
  }

  temperatureUnit () {
    return this.props.unit || 4
  }

  convertToTemp(value) {
    return (value / this.temperatureUnit()) + 5
  }

  convertFromTemp(value) {
    return (value - 5) * this.temperatureUnit()
  }

  setSchedule (value) {
    this.setState({schedule: this.convertToTemp(value)})
  }

  getHours () {
    var hours = this.props.hours

    return hours < 10 ? `0${hours}:00` : `${hours}:00`
  }

  render () {
    return (<div className="schedule">
      <div className="title">{this.state.schedule} °C</div>
      <div>
        <div className="hour">{this.getHours()}</div>
        <Rcslider
          min={0}
          marks={marks}
          step={this.temperatureUnit()}
          onChange={(value) => this.setSchedule(value)}
          defaultValue={this.convertFromTemp(this.state.schedule)}
        />
        <div className='clear'></div>
      </div>
    </div>)
  }
}
