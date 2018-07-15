import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Button } from 'react-native';
import ProgressBar from  'ProgressBarAndroid';
import DatePicker from 'react-native-datepicker';
import store from 'react-native-simple-store'
import { Database, DropDown, refreshListOfPatients, KEYS } from '../../lib/helpers';

export default class EditPatient extends Component {
  
  state = {
    id : null,
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
  
  componentWillMount() {
    store.get(KEYS.genders).then(genders => this.setState({genders}))
    store.get(KEYS.patientTypes).then(types => this.setState({types}))

    let {patient : {id,fname,mname,lname,gender,bdate,type}} = this.props.navigation.state.params
    this.setState({id,fname,mname,lname,gender,bdate,type})
  }

  savePatient() {
    let { id,fname, mname, lname, gender, bdate, type } = this.state;
    
    if(!fname || !mname || !lname || !bdate){
      alert('Please complete the form')
      return
    }
    const {navigate} = this.props.navigation
    this.setState({loading:true})
    Database.run(db => {
      db.executeSql("UPDATE patients SET fname = ? , mname = ? , lname = ? , gender = ? , bdate = ? , type = ? WHERE id = ?",
      [fname,mname,lname,gender,bdate,type,id])
    }, () => {
      refreshListOfPatients()
      this.setState({loading:false})
      navigate('PatientList')
    })
  }

  render() {
    
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={{fontSize:20,color:'#fff', width:200}}>Edit Patient</Text>
            <Button
              title="Back to List"
              onPress={() => {
                this.props.navigation.navigate('PatientList');
              }}
              color="#FF715B"
            />
          </View>

          {!this.state.loading ?
          
          <View style={{padding:10}}>
            <TextInput 
            style={styles.input} 
            placeholder="First Name"
            value={this.state.fname}
            onChangeText={fname => this.setState({fname})} />
            <TextInput 
            style={styles.input} 
            placeholder="Middle Name"
            value={this.state.mname}
            onChangeText={mname => this.setState({mname})} />
            <TextInput 
            style={styles.input} 
            placeholder="Last Name"
            value={this.state.lname}
            onChangeText={lname => this.setState({lname})} />

            <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:30}}>

              {this.state.genders.length ? (
                <DropDown
                  onSelect={gender => this.setState({ gender })}
                  items={this.state.genders}
                />
              ) : <View/>}

              {this.state.types.length ? (
                <DropDown
                  onSelect={type => this.setState({ type })}
                  items={this.state.types}
                />
              ) : <View/>}

            </View>

            
            <DatePicker
              style={{ width: 200 }}
              date={this.state.bdate}
              placeholder="Date of Birth"
              format="YYYY-MM-DD"
              onDateChange={bdate => {
                this.setState({ bdate });
              }}
            />
            
            <View style={{marginTop:20}}>
              <Button
                title="Save"
                onPress={this.savePatient.bind(this)}
                color="#4C5454"
              />
            </View>
            
          </View> :

          <View style={{marginTop:20}}>
            <Text style={{textAlign:'center'}}>Please wait..</Text>
            <ProgressBar style={{marginTop:20}} />
          </View>

          }
        </ScrollView>


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
  input: {
    height: 50,
  },
});
