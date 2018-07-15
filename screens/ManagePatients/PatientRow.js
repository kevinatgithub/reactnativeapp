import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, Button} from 'react-native'

export default class PatientRow extends Component{

  render(){
    
    const {patient , navigate} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {patient.gender == 'M' ? 
            <Image source={require('../../assets/profile-male.png')} style={styles.profile} /> :
            <Image source={require('../../assets/profile-female.png')} style={styles.profile} /> 
          }
          <Text style={styles.name}>{patient.fname} {patient.mname} {patient.lname}</Text>
          <Button 
          title="View" 
          onPress={() => {navigate('ViewPatient',{patient})}}
          color="#4C5454" />
          <Button 
          title="Edit" 
          onPress={() => {navigate('EditPatient',{patient})}}
          color="#4C5454" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    borderWidth : 1,
    borderColor : '#c1c1c1',
    height : 50,
    padding : 2,
    margin: 2
  },
  innerContainer : {
    height:'100%',
    flexDirection : 'row',
    padding : 0,
    alignItems : 'center',
    justifyContent : 'space-evenly'
  },
  profile : {
    width : 45,
    height : 45
  },
  name : {
    fontSize : 15,
    width : 150,
    color : '#523F38'
  }
})