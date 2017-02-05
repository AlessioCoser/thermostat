class ThermostatPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: props.url,
      status: null,
      temperature: '.. .',
      schedule: {}
    }
  }

  componentDidMount() {
    this.getStatus()
    setInterval(() => this.getStatus(), 5000)
    this.getTemperature()
    setInterval(() => this.getTemperature(), 300000)
    this.getCurrentSchedule()
    setInterval(() => this.getCurrentSchedule(), 5000)
  }

  getStatus() {
    ajax.get('/thermostat/status')
    .then((status) => {
      this.setState({status: status})
    })
  }

  getTemperature() {
    ajax.get('/thermostat/temperature')
    .then((temperature) => {
      this.setState({temperature: temperature})
    })
  }

  getCurrentSchedule() {
    ajax.get('/schedules/current')
    .then((schedule) => {
      this.setState({schedule: schedule})
    })
  }

  render() {
    var schedulePeriod = ''

    if (this.state.schedule.fromTime && this.state.schedule.toTime) {
      schedulePeriod = this.state.schedule.fromTime + " - " + this.state.schedule.toTime
    }

    return (<div class='thermostat'>
      <div class='temperature'>
        {this.state.temperature + ' °C'}
      </div>
      <div class='current-schedule'>
        <div class='circle'>
          <div class='icon'>{this.state.status ? 'on' : 'off'}</div>
          <div class='text'>{this.state.status ? 'Acceso' : 'Spento'}</div>
          <div class='scheduled-temperature'>{this.state.schedule.temperature}</div>
          <div class='scheduled-time'>{schedulePeriod}</div>
        </div>
      </div>
    </div>)
  }
}

ReactDOM.render(
  <ThermostatPanel />,
  document.getElementById('temperature-panel')
)
