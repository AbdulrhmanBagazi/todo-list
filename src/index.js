import React, {Component} from 'react'

import {Router, Scene, Drawer, Lightbox} from 'react-native-router-flux'
import store from './Config/mobx'
import {Provider} from 'mobx-react/native'
import {normalize} from './Config/TextSize'

import main from './Screens/main'
import Redirect from './Config/Redirect'
import home from './Screens/home'
import firstlogin from './Screens/firstlogin'
import Drawertap from './Component/Drawertap'
import addtodo from './Screens/addtodo'
import deletetodo from './Screens/deletetodo'

class index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="all">
            {/*Authintication pages*/}
            <Scene key="redirectauth">
              <Scene key="Redirect" component={Redirect} hideNavBar={true} />
            </Scene>

            <Scene key="auth">
              <Scene key="main" component={main} hideNavBar={true} initial />
            </Scene>

            <Scene key="Firstlogin">
              <Scene key="firstlogin" component={firstlogin} hideNavBar={true} initial />
            </Scene>

            <Scene key="protected">
              <Drawer hideNavBar key="drawer" contentComponent={Drawertap} drawerWidth={200} drawerPosition="Left">
                <Lightbox>
                  <Scene key="home" component={home} hideNavBar={true} initial />
                  <Scene key="addtodo" component={addtodo} hideNavBar={false} />
                  <Scene key="deletetodo" component={deletetodo} hideNavBar={false} />
                </Lightbox>
              </Drawer>
            </Scene>
          </Scene>
        </Router>
      </Provider>
    )
  }
}

export default index
