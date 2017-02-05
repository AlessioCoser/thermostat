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
    this.getCurrentSchedule()

    setInterval(() => {
      this.getStatus()
      this.getCurrentSchedule()
    }, 5000)

    this.getTemperature()
    setInterval(() => this.getTemperature(), 300000)
  }

  getStatus() {
    ajax.get('/thermostat/status')
    .then((status) => {
      this.setState({status: status})
    })
  }

  getCurrentSchedule() {
    ajax.get('/schedules/current')
    .then((schedule) => {
      this.setState({schedule: schedule})
    })
  }

  getTemperature() {
    ajax.get('/thermostat/temperature')
    .then((temperature) => {
      this.setState({temperature: temperature})
    })
  }

  render() {
    var schedulePeriod = ''

    if (this.state.schedule.fromTime && this.state.schedule.toTime) {
      schedulePeriod = this.state.schedule.fromTime + " - " + this.state.schedule.toTime
    }

    return (<div>
      <div className='temperature'>
        <i className="fa fa-thermometer-full" aria-hidden="true"></i> {this.state.temperature + ' °C'}
      </div>
      <div className='current-schedule'>
        <div className={this.state.status ? 'circle on' : 'circle off'}>
          <div className='circle-inner'>
            <div className='icon'>
              <i className={this.state.status ? 'fa fa-fire' : 'fa fa-power-off'} aria-hidden="true"></i>
            </div>
            <div className='scheduled-temperature'>{this.state.schedule.temperature} °C</div>
            <div className='scheduled-time'>{schedulePeriod}</div>
          </div>
        </div>
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </div>
      <div className='next-schedule'>
        <span className='circle'>
          <span className='temp'>{this.state.schedule.temperature} °C</span>
          <span className='next-time'>{schedulePeriod}</span>
        </span>
        <span className='next-time'>{schedulePeriod}</span>
      </div>
    </div>)
  }
}

ReactDOM.render(
  <ThermostatPanel />,
  document.getElementById('thermostat-panel')
)
