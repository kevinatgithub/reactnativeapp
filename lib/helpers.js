/**
 * Helper module so that we dont need to specifically import
 * any of the helpers inside the /lib folder
 */
import ToastAndroid from 'react-native'
import {Database,DB,SQLite} from './database'
import Web from './Web'
import DropDown from './DropDown'
import store from 'react-native-simple-store'

/**
 * List of STORE KEYS, because its a good practice to maintain 
 * lists of strings as keys instead of using string itself,
 * so that we can avoid typo errors 
 */
const KEYS = {
  user : 'user',
  accounts : 'accounts',
  patients : 'patients',
  genders : 'genders',
  patientTypes : 'patientTypes',
}


/**
 * The trick here is that we maintain a global variable containing
 * the list of patients, this method is called every time
 * we need to INSERT/DELETE/UPDATE in the patients 
 */
const refreshListOfPatients = function(){
  Database.run(db => {
    db.executeSql("SELECT * FROM patients ORDER BY id desc",[],(tx, result) => {
      let patients = []

      var len = result.rows.length;
      for (let i = 0; i < len; i++) {
        let row = result.rows.item(i);
        patients.push(Object.assign({key : row.id + ''},row))
      }

      store.save(KEYS.patients,patients)
      // return patients
    })
  })
}

/**
 * Same Idea to the patients global variable, in this case the 
 * references like genders, patientTypes
 */
const refreshReferences = function(){
  Database.run(db => {

      db.executeSql('SELECT * FROM genders', [], (tx, result) => {
        
        let genders = []

        var len = result.rows.length;
        for (let i = 0; i < len; i++) {
          let row = result.rows.item(i);
          genders.push(row)
        }

        store.save(KEYS.genders,genders)
      });

      db.executeSql('SELECT * FROM patientTypes', [], (tx, result) => {

        let patientTypes = []

        var len = result.rows.length;
        for (let i = 0; i < len; i++) {
          let row = result.rows.item(i);
          patientTypes.push(row)
        }

        store.save(KEYS.patientTypes,patientTypes)
      });

    });
}

/**
 * We tell Javascript what Object/Functions 
 * we can pull and use in this file
 */
module.exports = {
  Database, DB,SQLite,
  KEYS,
  Web,
  DropDown,
  refreshListOfPatients,
  refreshReferences
}