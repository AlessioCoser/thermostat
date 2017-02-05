class TemperaturePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: props.url,
      temperature: '...',
      status: null
    }

    this.getStatus()
    setInterval(getStatus, 5000)
  }

  getStatus() {
    this.setState({status: this.state.status || "ciao"})
  }

  render() {
    return <div>Stato: {this.state.status}</div>
  }
}

ReactDOM.render(
  <TemperaturePanel />,
  document.getElementById('temperature-panel')
)
