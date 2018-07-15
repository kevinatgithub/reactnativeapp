/**
 * Database Helper File for doing sqlite transactions
 */
import SQLite from 'react-native-sqlite-storage'
import {
  create_patients, create_genders, create_types, 
  drop_patients, drop_types, drop_genders, 
  seed_patients, seed_genders, seed_types
} from './schema'

const DATABASE_NAME = 'womb'  

const DB = SQLite.openDatabase({name : DATABASE_NAME, createFromLocation : "~"+DATABASE_NAME+".db"},null,e=>alert(e))

const Database = {

  /**
   * Call this method to make sure the 
   * necessary tables are created
   */
  start(){
    Database.run(db => {
      db.executeSql(create_patients)
      db.executeSql(create_genders)
      db.executeSql(create_types)
    })
  },
  
  /**
   * Same as start(), Call this method when testing 
   * some component without passing through Splash.js
   */
  
  quickStart(callback){

    Database.run(db => {
      db.executeSql(drop_patients)
      db.executeSql(drop_genders)
      db.executeSql(drop_types)
      db.executeSql(create_patients)
      db.executeSql(create_genders)
      db.executeSql(create_types)
      db.executeSql(seed_patients)
      db.executeSql(seed_genders)
      db.executeSql(seed_types)
    }, () => {
      if(typeof callback == 'function'){
        callback()
      }
    })
  },

  /**
   * Helper for running SQL 
   */
  run(todo,callback){
    DB.transaction(tx => {
      todo(tx)
    }, e => alert(e), () => {
      if(typeof callback == 'function'){
        callback()
      }

    },e => alert(e.message))
  },

}

module.exports = {
  Database, DB, SQLite
}