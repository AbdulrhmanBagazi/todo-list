import {GoogleSignin} from 'react-native-google-signin'
import firebase from 'react-native-firebase'

const GoogleAuth = () => {
  // Add configuration settings here:
  GoogleSignin.configure() //latter can add iosClientId for ios
  GoogleSignin.hasPlayServices({autoResolve: true})
    .then(() => {
      // play services are available. can now configure library
    })
    .catch(err => {
      console.log('Play services error', err.code, err.message) //alret dashborde for me **
    })
    .then(() => {
      GoogleSignin.signIn()
        .then(data => {
          // create a new firebase credential with the token
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

          // login with credential
          firebase.auth().signInAndRetrieveDataWithCredential(credential)
        })
        .then(currentUser => {})
        .catch(error => {
          console.log(`Login fail with error: ${error}`) //later for dashbord firebase analyssi**<--
        })
    })
}

export default GoogleAuth
