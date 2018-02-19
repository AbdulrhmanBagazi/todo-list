import React, {Component} from 'react'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import Dimensions from 'Dimensions'

import {Actions} from 'react-native-router-flux'
import firebase from 'react-native-firebase'

import {Button, Text} from 'native-base'

import {normalize} from '../Config/TextSize'

const {width, height} = Dimensions.get('window')
import {observer, inject} from 'mobx-react/native'

@inject('store')
@observer
export default class deletetodo extends Component {
  deleteTodo() {
    const db = firebase.firestore()
    db
      .collection(this.props.store.user.uid)
      .doc(this.props.listID)
      .delete(Actions.pop())
      .then(() => {
        console.log('Document successfully deleted!')
      })
      .catch(function(error) {
        console.error('Error removing document: ', error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={100}
          style={styles.Back}
          onPress={() => Actions.pop()}>
          <View />
        </TouchableHighlight>
        <View style={styles.GalleryBody}>
          <View>
            <Text style={styles.Text}>Delete The TODO</Text>
          </View>
          <View style={styles.box}>
            <Button style={styles.DoneButton} onPress={() => Actions.pop()}>
              <Text style={styles.ButtonText}>no</Text>
            </Button>
            <Button style={styles.DoneButton} onPress={() => this.deleteTodo()}>
              <Text style={styles.ButtonText}>Yes</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0000000A',
    position: 'absolute',
    height,
    width,
    justifyContent: 'center'
  },
  GalleryBody: {
    width: width / 1.1,
    height: height / 3,
    backgroundColor: '#8e44ad',
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-around',
    borderColor: 'red',
    borderWidth: 2
  },
  Back: {
    flex: 1,
    justifyContent: 'center'
  },
  Text: {
    fontSize: normalize(40),
    color: '#ffffff',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  ButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  DoneButton: {
    backgroundColor: '#dd4b39',
    width: width / 3.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  box: {
    flexDirection: 'row',
    width: width / 1.15,
    justifyContent: 'space-around'
  }
})
