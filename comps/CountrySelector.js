import React from "react";
import { Select } from "antd";
import country from "country-state-city";

const { Option } = Select;

class CountrySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      state: "",
      city: "",
      phonecodes: [],
      stateDisabled: true,
      cityDisabled: true
    };
  }

  countryData = {
    countries: [],
    states: [],
    cities: []
  };

  UNSAFE_componentWillMount() {
    let data = country.getAllCountries();

    this.countryData.countries = data;
    // console.log("countryData: ", this.countryData.countries);

    let c = data.map(x => {
      return x.phonecode;
    });

    this.countryData.phonecodes = [...new Set(c.sort((a, b) => a - b))];

    let phonecodeItems = this.countryData.phonecodes.map(item => (
      <Option key={item}> {`+${item}`} </Option>
    ));

    // console.log("countryData: ", phonecodeItems);

    this.setState({
      phonecodeItems: phonecodeItems
    });
  }

  handleCountryChange = value => {
    let data = value.split(">");
    //let Country = country.getCountryById(value)

    this.setState({
      country: data[1],
      stateDisabled: false
    });

    let states = country.getStatesOfCountry(data[0]);
    this.countryData.states = states;
  };

  handleStateChange = value => {
    let data = value.split(">");
    //let state = country.getStateById(value)
    this.setState({
      state: data[1],
      cityDisabled: false
    });

    let cities = country.getCitiesOfState(data[0]);
    this.countryData.cities = cities;
  };

  handleCitiesChange = value => {
    let data = value.split(">");
    //let city = country.getCityById(value)
    this.setState({
      city: data[1]
    });
  };

  render() {
    // console.log("CS phoneCodeItems", this.state.phonecodeItems);
    let countryItems = this.countryData.countries.map(count => (
      <Option key={count.id} value={`${count.id}>${count.name}`}>
        {" "}
        {count.name}{" "}
      </Option>
    ));

    let stateItems = this.countryData.states
      ? this.countryData.states.map(state => (
          <Option key={state.id} value={`${state.id}>${state.name}`}>
            {" "}
            {state.name}{" "}
          </Option>
        ))
      : null;

    let cityItems = this.countryData.cities
      ? this.countryData.cities.map(city => (
          <Option key={city.id} value={`${city.id}>${city.name}`}>
            {" "}
            {city.name}{" "}
          </Option>
        ))
      : null;

    return (
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <Select
              style={{ width: "100%" }}
              showSearch
              size="large"
              placeholder="País"
              onChange={this.handleCountryChange}
            >
              {countryItems}
            </Select>
          </div>
          <div className="col-12">
            <Select
              style={{ width: "100%" }}
              showSearch
              disabled={this.state.stateDisabled}
              size="large"
              placeholder="Estado"
              onChange={this.handleStateChange}
            >
              {stateItems}
            </Select>
          </div>
          <div className="col-12">
            <Select
              style={{ width: "100%" }}
              showSearch
              disabled={this.state.cityDisabled}
              size="large"
              placeholder="Ciudad"
              onChange={this.handleCitiesChange}
            >
              {cityItems}
            </Select>
          </div>
        </div>
      </div>
    );
  }
}

export default CountrySelector;
