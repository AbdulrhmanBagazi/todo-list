import React, {Component} from 'react'
import {View, StyleSheet, TouchableHighlight, Alert} from 'react-native'
import Dimensions from 'Dimensions'

import {Actions} from 'react-native-router-flux'
import firebase from 'react-native-firebase'

import {Button, Text, Form, Item, Input, Label} from 'native-base'

import {normalize} from '../Config/TextSize'

import Icon from 'react-native-vector-icons/FontAwesome'

const {width, height} = Dimensions.get('window')
import {observer, inject} from 'mobx-react/native'

@inject('store')
@observer
export default class addtodo extends Component {
  constructor() {
    super()
    this.state = {
      todoname: ''
    }
  }

  goback() {
    Alert.alert('Cancle', '', [{text: 'No'}, {text: 'Yes', onPress: () => Actions.pop()}], {cancelable: false})
  }

  addTodo() {
    const db = firebase.firestore()

    if (this.state.todoname != '') {
      db
        .collection(this.props.store.user.uid)
        .doc()
        .set({
          Todo: this.state.todoname
        })
      Actions.pop()
    } else {
      console.log('fail')
    }
  }

  updatetodo(valuetodoname) {
    this.setState({todoname: valuetodoname})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={100}
          style={styles.Back}
          onPress={() => this.goback()}>
          <View />
        </TouchableHighlight>
        <View style={styles.ADDBody}>
          <View style={styles.boxone}>
            <Text style={styles.Text}>Add todo</Text>
          </View>

          <View style={styles.boxtwo}>
            <Text style={styles.Text}>Name:</Text>
            <Form>
              <Item style={styles.input}>
                <Input
                  keyboardType="email-address"
                  valuetodoname={this.state.todoname}
                  onChangeText={text => this.updatetodo(text)}
                />
              </Item>
            </Form>
          </View>

          <View style={styles.boxthree}>
            <Button style={styles.DoneButton} onPress={() => this.addTodo()}>
              <Text style={styles.ButtonText}>Save</Text>
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
    flexDirection: 'column'
  },
  ADDBody: {
    width: width / 1.1,
    height: height / 3,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-around',
    marginVertical: 200,
    borderWidth: 10,
    borderColor: '#8e44ad'
  },
  Back: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    width: width / 2
  },
  Text: {
    fontSize: normalize(40),
    color: '#8e44ad',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  boxone: {},
  boxtwo: {
    flexDirection: 'row'
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
  }
})
