import React, {Component} from 'react'
import {StyleSheet, ToastAndroid, View, Text, TextInput, Button} from 'react-native'
import ProgressBar from 'ProgressBarAndroid'
import store from 'react-native-simple-store'
import _ from 'lodash'
import {Database,KEYS,Web,refreshReferences} from '../lib/helpers'


export default class Login extends Component {

  state = {
    username : null, password : null, loading : false
  }

  formUI(){
    return (
      <View style={{justifyContent:'center',alignItems : 'center', width : 300}}>
          <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:30}}>User Login</Text>
          
          <TextInput
          placeholder="Username"
          value={this.state.username} 
          onChangeText={username => {this.setState({username})} } 
          style={styles.input} 
          underlineColorAndroid="#fff" 
          />

          <TextInput
          placeholder="Password"
          value={this.state.password} 
          onChangeText={password => {this.setState({password})} } 
          style={styles.input}
          secureTextEntry={true} 
          underlineColorAndroid="#fff"
          />

          <View style={styles.row}>
            <Button 
            title="Login" 
            onPress={this.processLogin.bind(this)}
            color="#523F38" />

            <Button 
            title="Update Accounts" 
            onPress={this.sync.bind(this)}
            color="#523F38" />
          </View>

        </View>
    )
  }

  loadingUI(){
    return (
      <View style={{justifyContent : 'center',  width:'100%'}}>
        <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff',fontSize:20}}>Please wait..</Text>
        <ProgressBar style={{marginTop:20}} color="#fff" />
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        
        {this.state.loading ? 
          this.loadingUI() : 
          this.formUI()
        }

      </View>
    );
  }

  processLogin(){
    refreshReferences()
    store.get(KEYS.accounts).then(({accounts}) => {
      if(accounts){
        this.doLogin(accounts)
      }else{
        alert("Can't Login")
        this.setState({username : null, password : null})
      }
    })

  }

  doLogin(accounts){
    let {username,password} = this.state
    if(!username || !password){
      return
    }

    let isExisting = _.findLast(accounts,{username,password})

    if(isExisting){
      store.save(KEYS.user,username)
      this.props.navigation.navigate('PatientList')
    }else{
      ToastAndroid.show('Invalid Login', ToastAndroid.LONG);
      this.setState({username : null, password : null})
    }
  }

  sync(){
    this.setState({loading:true})

    // I've designed the app to download too all the references needed here,
    // not only the accounts
    Web.post('references',null,data => {

      this.setState({accounts, loading : false})

      let {accounts,genders,patientTypes} = data      

      // ************Save references to Database***************************
        Database.run(db => {

          db.executeSql("DELETE FROM genders")
          db.executeSql("DELETE FROM patientTypes")
          genders.map(gender => {
            db.executeSql("INSERT INTO genders VALUES (null,?,?)",[gender.code,gender.desc])
          })

          patientTypes.map(ptype => {
            db.executeSql("INSERT INTO patientTypes VALUES (null,?,?)",[ptype.code,ptype.desc])
          })

        })
      //************** */

      store.save(KEYS.accounts,data)
      ToastAndroid.show('Accouts and References Updated', ToastAndroid.SHORT);
    })
  }

}

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
    alignItems : 'center',
    height : '100%',
    backgroundColor : '#1EA896'
  },
  input : {
    width : '100%',
    margin : 20,
    textAlign : 'center',
    borderWidth:1,
    borderColor:'#fff',
    backgroundColor:'#fff',
    height:40
  },
  row : {
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    width : '100%'
  }
})