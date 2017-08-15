import React, { Component } from 'react';
import Data from './fares.json';
import Select from '../components/Select';
import TextField from '../components/TextField';
import Total from '../components/Total';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: Data.info,
      zones: Data.zones,
      zoneSelected: "Zone 1",
      daySelected: "weekday",
      helperText: Data.info.weekday,
      purchaseSelected: 'advance_purchase',
      rides: 1,
      total: 0.00,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleZoneSelection = this.handleZoneSelection.bind(this);
    this.handleDaySelection = this.handleDaySelection.bind(this);
    this.handlePurchaseSelection = this.handlePurchaseSelection.bind(this);
    this.handleRidesChange = this.handleRidesChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let zones = this.state.zones
    let zone = this.state.zoneSelected.slice(-1);

    let zoneInfo = zones.find(zones => zones.zone == zone);
    let fares = zoneInfo.fares
    let total = fares.find(fares => fares.type === this.state.daySelected && fares.purchase === this.state.purchaseSelected).price * this.state.rides;
    this.setState({ total: total.toFixed(2) });
  }

  handleZoneSelection(event) {
    event.preventDefault();
    this.setState({ zoneSelected: event.target.value });
  }
  handleDaySelection(event) {
    event.preventDefault();
    this.setState({
      daySelected: event.target.value,
      helperText: this.state.info[event.target.value],
     });

     console.log(this.state.info.value);
  }
  handlePurchaseSelection(event) {
    event.preventDefault();
    this.setState({ purchaseSelected: event.target.value });
  }
  handleRidesChange(event) {
    event.preventDefault();
    this.setState({ rides: event.target.value });
  }


  render() {
    let zones = this.state.zones
    let zoneOptions = zones.map(function(obj) {
       return 'Zone ' + obj.zone;
    });
    let dayOptions = [ 'weekday', 'evening_weekend'];
    let purchaseOptions = [ 'anytime', 'weekday', 'evening_weekend'];

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <Select
          handlerFunction={this.handleZoneSelection}
          name='zone'
          label='Where are you going?'
          options={zoneOptions}
          selectedOption={this.state.zoneSelected}
          /><br />
          <Select
          handlerFunction={this.handleDaySelection}
          name='zone'
          label='When are you riding?'
          options={dayOptions}
          selectedOption={this.state.daySelected}
          /><br />
          {this.state.helperText}
          <div><br />
            <input type="radio" name="purchase" checked={this.state.purchaseSelected === 'advance_purchase'} value='advance_purchase' onChange={this.handlePurchaseSelection} />Station Kiosk<br/>
            <input type="radio" name="purchase" checked={this.state.purchaseSelected === 'onboard_purchase'} onChange={this.handlePurchaseSelection} value='onboard_purchase' />On Board
          </div><br />
          <TextField
            content={this.state.foodItemConsumed}
            label='How many rides?'
            name='rides'
            handlerFunction={this.handleRidesChange}
          /><br />
          <div>
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>
        <Total total={this.state.total} />
      </div>

    );
  }
}

export default App;
