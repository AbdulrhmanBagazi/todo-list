import React, {Component} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import Dimensions from 'Dimensions'

import {normalize} from './TextSize'
import Icon from 'react-native-vector-icons/FontAwesome'

import {Actions} from 'react-native-router-flux'

import firebase from 'react-native-firebase'

import {inject, observer} from 'mobx-react/native'

const {width, height} = Dimensions.get('window')

@inject('store')
@observer
class Redirect extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        const db = firebase.firestore()
        const docRef = db.collection('Users').doc(user.uid)

        // User is signed in.
        this.props.store.useremail = user.email
        this.props.store.user = user._user

        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              const data = doc.data()

              this.props.store.username = data.name
              this.props.store.user = user._user

              Actions.reset('protected')
              console.log('yay we got a document!')
            } else {
              console.log('No such document!')
              Actions.reset('Firstlogin')
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error)
          })
      } else {
        // No user is signed in.
        Actions.reset('auth')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.Iconslogo} name="pencil" />
        <Text style={styles.TitleText}>Todolist</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#8e44ad',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Iconslogo: {
    color: '#ffffff',
    fontSize: normalize(100)
  },
  TitleText: {
    fontSize: normalize(100),
    color: '#ffffff',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  }
})

export default Redirect
