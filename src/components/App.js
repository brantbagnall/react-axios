import React, { Component } from 'react';
import './App.css';
import { getCustomerList, postCustomer, getCustomer, updateCustomer, deleteCustomer } from '../customer'

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
  }

  saveEdit(id, obj){
    updateCustomer(id, obj)
      .then(()=>
    getCustomerList()
      .then((response)=> {
        this.setState({
          customerList: response
        })
      })
    )
  }

  componentDidMount(){
    getCustomerList()
    .then( response => {
      this.setState({
        customerList: response
      })
  })
      
  }

  

  createCustomer(obj) {
    postCustomer(obj)
    .then((response) => {
      getCustomerList()
      .then( response => {
        this.setState({
          customerList: response,
          initialLoad: true
        })
    })
      })
  }

  startNewCustomer(){
    this.setState({
      creating: true,
      initialLoad: false,
      currentCustomer: null
    })
  }

  selectCustomer(id){
    getCustomer(id)
      .then(response => {
        this.setState({
          currentCustomer: response,
          initialLoad: false
        })
      })
  }

  removeCustomer(id){
    deleteCustomer(id)
      .then(response => {
        this.setState({
          currentCustomer: response
        })
      })
  }


  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              startNewCustomer = {this.startNewCustomer}
              selectCustomer = {this.selectCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                    saveEdit = {this.saveEdit}
                    removeCustomer ={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
