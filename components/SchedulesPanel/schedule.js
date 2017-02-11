import React from 'react'
import Rcslider from 'rc-slider'

const marks = {
   0.00: <strong>0°C</strong>,
  14.25: '5 °C',
  28.50: '10°C',
  42.75: '15°C',
  57.00: '20°C',
  71.25: '25°C',
  85.50: '30°C',
  100.0: <strong>35°C</strong>
}

module.exports = class Schedule extends React.Component {
  constructor (props) {
    props.unit = props.unit || 2.85
    super(props)
    this.state = {
      schedule: props.temperature || 5
    }
  }

  convertToTemp(value) {
    return Math.round(value / this.props.unit)
  }

  convertFromTemp(value) {
    return value * this.props.unit
  }

  setSchedule (value) {
    this.setState({schedule: this.convertToTemp(value)})
  }

  render () {
    return (<div className="schedule">
      <div>{this.state.schedule} °C</div>
      <Rcslider
        min={0}
        marks={marks}
        step={this.props.unit}
        onChange={(value) => this.setSchedule(value)}
        defaultValue={this.convertFromTemp(this.state.schedule)}
      />
    </div>)
  }
}
