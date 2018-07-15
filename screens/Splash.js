/*************************************************************
 * Starting route of your app, this file must be loaded first 
 * in order to load up the database
 */

import React, {Component} from 'react'
import {View} from 'react-native'
import store from 'react-native-simple-store'
import {Database,KEYS} from '../lib/helpers'

export default class Splash extends Component{

  componentDidMount(){
    // load up the database 
    Database.start()
    
    // check if user is logged in
    store.get(KEYS.user).then(user => {
      const {navigate} = this.props.navigation
      // Lets redirect user if logged in or not
      navigate(user ? 'PatientList' : 'Login')
    })
  }

  render(){
    return <View />
  }

}