import React, {Component} from 'react'
import {View, StyleSheet, StatusBar} from 'react-native'
import Dimensions from 'Dimensions'

import {Actions} from 'react-native-router-flux'

import {Header, Left, Body, Right, Button, Title, Text, Form, Item, Input, Label} from 'native-base'

import Icon from 'react-native-vector-icons/FontAwesome'

import {normalize} from '../Config/TextSize'

import firebase from 'react-native-firebase'

const {width, height} = Dimensions.get('window')

import {observer, inject} from 'mobx-react/native'

@inject('store')
@observer
export default class firstlogin extends Component {
  constructor() {
    super()
    this.state = {
      Username: ''
    }
  }

  addProfile() {
    const db = firebase.firestore()

    if (this.state.Username !== '') {
      db
        .collection('Users')
        .doc(this.props.store.user.uid)
        .set({
          name: this.state.Username
        })

      this.props.store.username = this.state.Username
      Actions.reset('protected')
    } else {
      console.log('reallly')
    }
  }

  updateName(valueusername) {
    this.setState({Username: valueusername})
  }

  render() {
    return (
      <View style={styles.container} androidStatusBarColor="#1F242C">
        <StatusBar backgroundColor="#181C23" barStyle="light-content" />
        <Header style={styles.headerstyle} androidStatusBarColor="#1F242C">
          <Body style={styles.headerbody}>
            <Text style={styles.TitleText}>Welcome to the Todolist app</Text>
          </Body>
        </Header>
        <View style={styles.Title}>
          <Text style={styles.TitleTextsmall}>please Enter Profile Username:</Text>
        </View>
        <View style={styles.profilebody}>
          <Form>
            <Item fixedLabel style={styles.profileinput}>
              <Label
                style={{
                  color: '#ffffff',
                  fontFamily: 'AnnieUseYourTelescope-Regular',
                  fontSize: normalize(30)
                }}>
                Username
              </Label>
              <Input
                style={{
                  color: '#ffffff',
                  fontFamily: 'AnnieUseYourTelescope-Regular',
                  fontSize: normalize(30)
                }}
                valueusername={this.state.Username}
                onChangeText={text => this.updateName(text)}
                placeholderTextColor="#ffffff"
              />
            </Item>
          </Form>
        </View>

        <View style={styles.profilebodytwo}>
          <Button style={styles.DoneButton} onPress={() => this.addProfile()}>
            <Text style={styles.ButtonText}>Done</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#8e44ad'
  },
  headerstyle: {
    backgroundColor: '#ffffff'
  },
  headerbody: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilebody: {
    flex: 1,
    width,
    height,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  profilebodytwo: {
    flex: 1,
    width,
    height,
    justifyContent: 'center'
  },
  DoneButton: {
    backgroundColor: '#ffffff',
    width: width / 3.2,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  ButtonText: {
    color: '#dd4b39',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  profileinput: {
    width: width / 1.2,
    marginTop: 15
  },
  Title: {
    flex: 1.5,
    width,
    height,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  Icons: {
    color: '#dd4b39',
    fontSize: normalize(24)
  },
  TitleText: {
    fontSize: normalize(35),
    color: '#8e44ad',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  TitleTextsmall: {
    fontSize: normalize(30),
    color: '#ffffff',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  }
})
