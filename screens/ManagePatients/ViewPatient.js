import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, Button } from 'react-native';
import store from 'react-native-simple-store'
import {Grid,Row,Col} from 'react-native-easy-grid'
import { Database, refreshListOfPatients, KEYS } from '../../lib/helpers';
import _ from 'lodash'

export default class ViewPatient extends Component {
  state = {
    genders: [],
    types: [],
    fname: '',
    mname: '',
    lname: '',
    gender: 'M',
    bdate: '',
    type: 'I',
    loading : false,
  };
  
  componentDidMount() {
    store.get(KEYS.genders).then(genders => this.setState({genders}))
    store.get(KEYS.patientTypes).then(types => this.setState({types}))
  }

  confirmDelete(){
    Alert.alert(
      'Delete Patient',
      'Are you sure you want to delete patient?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.doDelete()},
      ],
      { cancelable: false }
    )
  }

  doDelete(){
    const {state, navigate} = this.props.navigation

    Database.run(db => {
      db.executeSql("DELETE FROM patients WHERE id = ? ",[state.params.patient.id])
      refreshListOfPatients()
      navigate('PatientList')
    })
  }

  render() {
    // <Text>{JSON.stringify(this.state.genders)}</Text>
    const {patient} = this.props.navigation.state.params
    const {fname,mname,lname,gender,bdate,type} = patient
    let ptype = _.find(this.state.types,{code : type})
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:20,color:'#fff', width:200}}>Patients Details</Text>
          <Button
            title="Back to List"
            onPress={() => {
              this.props.navigation.navigate('PatientList');
            }}
            color="#FF715B"
          />
        </View>

        <View style={{flexDirection : 'row', justifyContent : 'flex-start'}}>
          <View style={{marginLeft:15}}>
            <Button 
            title="Edit" 
            onPress={()=>this.props.navigation.navigate('EditPatient',{patient})}
            color="#4C5454" /> 
          </View>
          <View style={{marginLeft:20}}>
            <Button 
            title="Delete" 
            onPress={this.confirmDelete.bind(this)}
            color="#4C5454" /> 
          </View>
        </View>

        <View style={styles.info}>
          <Grid>
            <Row>
              <Col size={0.5}>
                <Text>Patient Name</Text>
              </Col>
              <Col>
                <Text style={{color:'#523F38'}}>{fname} {mname} {lname}</Text>
              </Col>
            </Row>
            <Row>
              <Col size={0.5}>
                <Text>Gender</Text>
              </Col>
              <Col>
                <Text style={{color:'#523F38'}}>{gender == 'M' ? 'Male' : 'Female'}</Text>
              </Col>
            </Row>
            <Row>
              <Col size={0.5}>
                <Text>Date of Birth</Text>
              </Col>
              <Col>
                <Text style={{color:'#523F38'}}>{bdate}</Text>
              </Col>
            </Row>
            <Row>
              <Col size={0.5}>
                <Text>Patient Type</Text>
              </Col>
              <Col>
                <Text style={{color:'#523F38'}}>{type}</Text>
              </Col>
            </Row>
          </Grid>
        </View>
        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  header : {
    flexDirection:'row',
    justifyContent : 'space-between', 
    marginBottom : 15,
    paddingTop:30,
    padding:5,
    paddingBottom:20,
    backgroundColor : '#1EA896'
  },
  info : {
    margin : 20,
    height : 200
  }
});
