/**
 * Created by jufei on 2017/4/24.
 */
import React, {Component} from "react";
import {Select} from "antd";
import axios from "axios";
//================================================
import API from "../../../API";
import "./less/areaSelect.less";

const Option = Select.Option;

export default class AreaSelect extends Component {
  constructor(props){
    super(props);
    this.onChange = props.onChange;
  }

  state = {
    province: [],
    city: [],
    county: [],
    value: {
      province: [],
      city: [],
      county: []
    }
  };

  componentWillMount() {
    axios.get(API.GET_AREA_SELECT(1))
      .then(res => {
        this.setState({
          province: res.data.data,
          value: {
            province: res.data.data[0].id,
            city: this.state.value.city,
            county: this.state.value.county
          }
        });

        return axios.get(API.GET_AREA_SELECT(res.data.data[0].id))
      })
      .then(res => {
        this.setState({
          city: res.data.data,
          value: {
            province: this.state.value.province,
            city: res.data.data[0].id,
            county: this.state.value.county
          }
        });

        return axios.get(API.GET_AREA_SELECT(res.data.data[0].id))
      })
      .then( res => {
        this.setState({
          county: res.data.data,
          value: {
            province: this.state.value.province,
            city: this.state.value.city,
            county: res.data.data[0].id
          }
        }, () => {
          this.onChange(this.state.value)
        });
      })
  }


  privinceSelected(value) {
    axios.get(API.GET_AREA_SELECT(value))
      .then(res => {
        this.setState({
          city: res.data.data,
          value: {
            province: value,
            city: res.data.data[0].id,
            county: this.state.value.county
          }
        })

        return  axios.get(API.GET_AREA_SELECT(res.data.data[0].id))
      }).then( res => {
      this.setState({
        county: res.data.data,
        value: {
          province: this.state.value.province,
          city: this.state.value.city,
          county: res.data.data[0].id
        }
      },() => {
        this.onChange(this.state.value)
      })
    })
  }

  citySelected(value) {
    axios.get(API.GET_AREA_SELECT(value))
      .then(res => {
        this.setState({
          county: res.data.data,
          value: {
            province: this.state.value.province,
            city: value,
            county: res.data.data[0].id
          }
        })
      },() => {
        this.onChange(this.state.value)
      })
  }


  countySelected(value) {
    this.setState({
      value: {
        province: this.state.value.province,
        city: this.state.value.city,
        county: value
      }
    },() => {
      this.onChange(this.state.value)
    })
  }

  render() {
    return (
      <div className="area-select">
          <Select
            onChange={this.privinceSelected.bind(this)}
            value={this.state.value.province}
            onSelect={(a,b)=> {
              console.log(a,b)
            }}
            className="area-select-province"
          >
            {
              this.state.province.map(item => {
                return <Option value={item.id} key={item.id}>{item.name}</Option>
              })
            }
          </Select>
          <Select
            onChange={this.citySelected.bind(this)}
            value={this.state.value.city}
            className="area-select-city"
          >
            {
              this.state.city.map(item => {
                return <Option value={item.id} key={item.id}>{item.name}</Option>
              })
            }
        </Select>
        <Select
          onChange={this.countySelected.bind(this)}
          value={this.state.value.county}
          className="area-select-county"
        >
          {
            this.state.county.map(item => {
              return <Option value={item.id} key={item.id}>{item.name}</Option>
            })
          }
        </Select>
      </div>
    )
  }
}
