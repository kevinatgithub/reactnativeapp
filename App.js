import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

// ***********Put all screen imports here*************
import Splash from './screens/Splash'
import Login from './screens/Login'
import PatientList from './screens/ManagePatients/PatientList'
import AddPatient from './screens/ManagePatients/AddPatient'
import EditPatient from './screens/ManagePatients/EditPatient'
import ViewPatient from './screens/ManagePatients/ViewPatient'
// ***************************************************

const App = createStackNavigator({

  // ***********Set the routes to the screen**********
  'Splash' : Splash,
  'Login' : Login,
  'PatientList' : PatientList,
  'AddPatient' : AddPatient,
  'EditPatient' : EditPatient,
  'ViewPatient' : ViewPatient,
  // *************************************************

},{
  initialRouteName : 'Splash',
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

export default App;