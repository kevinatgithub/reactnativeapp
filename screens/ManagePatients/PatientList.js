import React, {Component} from 'react'
import {StyleSheet, View, Text, FlatList, Button} from 'react-native'
import PatientRow from './PatientRow'
import {DB,KEYS,refreshListOfPatients,refreshReferences} from '../../lib/helpers'
import store from 'react-native-simple-store'

export default class PatientList extends Component {


  state = {
    patients : [], loading : false
  }

  constructor(props){
    super(props)
    store.get(KEYS.patients).then(patients => {
      this.setState({patients})
    })
  }

  componentDidMount(){
    // Remove this in production
    // Database.quickStart()
    refreshListOfPatients()
    refreshReferences()
  }

  componentDidUpdate(){
    store.get(KEYS.patients).then(patients => {
      this.setState({patients})
    })
  }

  refreshList(){
    this.setState({loading : true})
    store.get(KEYS.patients)
    .then(patients => {
      this.setState({patients,loading:false})
    })
    
  }

  test(){
    DB.transaction(db => {
      db.executeSql('SELECT * FROM genders',[],(db,response) => {
        var len = response.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.rows.item(i);
          alert(JSON.stringify(row))
        }
  
      })
    },e => alert(e.message))
  }

  render(){
        // <Text>{JSON.stringify(this.state.patients)}</Text>
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={{fontSize:20,color:'#fff', width:150}}>Patient List</Text>
          <Button 
          title="New Patient" 
          onPress={()=>{this.props.navigation.navigate('AddPatient')}}
          color="#FF715B" />
          <Button 
          title="Logout" 
          onPress={()=>{store.delete(KEYS.user); this.props.navigation.navigate('Login')}}
          color="#FF715B" />
        </View>

        {this.state.loading ? 
          <Text style={{textAlign:'center'}}>Please wait..</Text> :

          <FlatList 
          data={this.state.patients} 
          renderItem={({item}) => 
          <PatientRow patient={item} navigate={this.props.navigation.navigate} />}
          /> 
        }
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
    marginTop : 0
  },
  header : {
    flexDirection:'row',
    justifyContent : 'space-between', 
    marginBottom : 15,
    paddingTop:30,
    padding:5,
    paddingBottom:20,
    backgroundColor : '#1EA896'
  }
})