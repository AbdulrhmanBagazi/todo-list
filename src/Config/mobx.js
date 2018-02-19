import {observable, action, computed} from 'mobx'

class Store {
  @observable username = ''
  @observable user = {}
  @observable List = {}
}

export default new Store()
