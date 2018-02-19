import React, {Component} from 'react'
import {View, StyleSheet, TouchableHighlight, Image, Alert} from 'react-native'
import Drawer from 'react-native-drawer'
import {Actions, DefaultRenderer} from 'react-native-router-flux'
import Dimensions from 'Dimensions'

import {Icon, Button} from 'native-base'

const {width, height} = Dimensions.get('window')

import {Text} from 'native-base'

import firebase from 'react-native-firebase'

import {normalize} from '../Config/TextSize'

import {observer, inject} from 'mobx-react/native'
@inject('store')
@observer
export default class Drawertap extends Component {
  // signout
  signOutUser = async () => {
    try {
      await firebase.auth().signOut()
      //here clear mobx
      this.props.store.useremail = null
      Actions.reset('auth')
    } catch (error) {
      console.log(error)
    }
  }
  // signout

  logout() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout ?',
      [{text: 'Cancel'}, {text: 'Yes', onPress: () => this.signOutUser()}],
      {cancelable: false}
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameview}>
          <Text style={styles.drawerText}>{this.props.store.username}</Text>
        </View>
        <View style={styles.dataview}>
          <Text style={styles.countText}>Todos count</Text>
          <Text style={styles.countText}>{this.props.store.List.length}</Text>
        </View>
        <View style={styles.endview}>
          <Button style={styles.DoneButton} onPress={this.logout.bind(this)}>
            <Text style={styles.ButtonText}>signout</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8e44ad',
    flex: 1,
    width,
    height
  },
  drawerText: {
    fontSize: normalize(25),
    color: '#8e44ad',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  nameview: {
    alignItems: 'center',
    width: 200,
    height: height / 5,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    elevation: 100
  },
  dataview: {
    width: 200,
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonText: {
    color: '#dd4b39',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  DoneButton: {
    backgroundColor: '#ffffff',
    width: width / 3.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  endview: {
    width: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    fontSize: normalize(40),
    color: '#ffffff',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  }
})
