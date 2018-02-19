import React, {Component} from 'react'
import {StyleSheet, Dimensions, View, Text, StatusBar} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Button} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

import {normalize} from '../Config/TextSize'

//googleSignin
import GoogleAuth from '../Config/GoogleAuth'
import {GoogleSignin} from 'react-native-google-signin'

const {width, height} = Dimensions.get('window')

export default class main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#181C23" barStyle="light-content" />

        <View style={styles.loginTitle}>
          <Icon style={styles.Iconslogo} name="pencil" />
          <Text style={styles.TitleText}>Todolist</Text>
        </View>

        <View style={styles.loginBody}>
          <View style={styles.SocialBody}>
            <Button style={styles.GoogleButtons} onPress={GoogleAuth}>
              <Icon style={styles.Icons} name="google-plus" />
              <Text style={styles.SocialText}>Sign up with Google</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8e44ad',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginTitle: {
    flex: 1.5,
    width,
    height,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  Icons: {
    color: '#dd4b39',
    fontSize: normalize(24)
  },
  Iconslogo: {
    color: '#ffffff',
    fontSize: normalize(100)
  },
  TitleText: {
    fontSize: normalize(100),
    color: '#ffffff',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  loginBody: {
    flex: 1.5,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  GoogleButtons: {
    backgroundColor: '#ffffff',
    width: width / 1.5,
    alignSelf: 'center',
    justifyContent: 'space-around'
  },
  SocialText: {
    color: '#dd4b39',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  SocialBody: {
    height: height / 6,
    justifyContent: 'space-around'
  }
})
