import React, {Component} from 'react'
import {StyleSheet, Dimensions, View, Alert, StatusBar, TouchableHighlight, FlatList, ScrollView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Header, Left, Body, Right, Button, Title, Text, Form, Item, Input, Label, Fab} from 'native-base'

import {normalize} from '../Config/TextSize'

import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome'

const {width, height} = Dimensions.get('window')

import {observer, inject} from 'mobx-react/native'

@inject('store')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection(this.props.store.user.uid)
    this.unsubscribe = null

    this.state = {
      Thetodos: []
    }
  }

  componentWillMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onCollectionUpdate = querySnapshot => {
    const db = firebase.firestore()
    var todos = []

    db
      .collection(this.props.store.user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          todos.push({
            list: doc.data(),
            listID: doc.id
          })
        })
        this.setState({
          Thetodos: todos
        })
        this.props.store.List = this.state.Thetodos
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#8e44ad" barStyle="light-content" />
        <Header style={styles.headerstyle} androidStatusBarColor="#1F242C">
          <Left>
            <Button transparent onPress={() => Actions.drawerOpen()}>
              <Icon style={{color: '#8e44ad', fontSize: normalize(24)}} name="bars" />
            </Button>
          </Left>
          <Body style={styles.headerbody}>
            <Text style={styles.TitleText}>TODOLIST</Text>
          </Body>
        </Header>
        <ScrollView>
          <View style={styles.homeboyd}>
            <FlatList
              data={this.state.Thetodos}
              keyExtractor={(x, i) => i}
              renderItem={({item}) => (
                <TouchableHighlight style={styles.TH}>
                  <View style={styles.THcontent}>
                    <Text style={styles.todoText}>{item.list.Todo}</Text>
                    <Button transparent style={styles.Button} onPress={() => Actions.deletetodo(item)}>
                      <Icon style={{color: '#dd4b39', fontSize: normalize(40)}} name="times-circle" />
                    </Button>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
        </ScrollView>

        <Fab direction="up" style={{backgroundColor: '#ffffff'}} position="bottomRight" onPress={() => Actions.addtodo()}>
          <Icon style={{color: '#8e44ad', fontSize: normalize(30)}} name="plus" />
        </Fab>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8e44ad'
  },
  headerstyle: {
    backgroundColor: '#ffffff'
  },
  TitleText: {
    fontSize: normalize(35),
    color: '#8e44ad',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  headerbody: {
    justifyContent: 'flex-end'
  },
  Text: {
    fontSize: normalize(40),
    color: '#ffffff',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  homeboyd: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  TH: {
    backgroundColor: '#ffffff',
    width: width / 1.08,
    height: height / 10,
    elevation: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  THcontent: {
    width: width / 1.15,
    height: height / 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  todoText: {
    fontSize: normalize(40),
    color: '#8e44ad',
    fontFamily: 'AnnieUseYourTelescope-Regular'
  },
  Button: {
    width: width / 5,
    alignSelf: 'center',
    justifyContent: 'center'
  }
})
