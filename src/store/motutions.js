import {
  SET_TITLE,
  SET_HOME_DATA,
  SET_CITYNAME,
  SET_CITYID,
  SET_CITYDATA,
  SET_CITYLOCATION
} from './motution_types'

const mutations = {
  [SET_TITLE](state,title){
    state.title = title
  },
  [SET_HOME_DATA](state,data){
    state.homedata = data
  },
  [SET_CITYNAME](state,data){
    state.cityname = data
  },
  [SET_CITYID](state,data){
    state.cityid = data
  },
  [SET_CITYDATA](state,data){
    state.citydata = data
  },
  [SET_CITYLOCATION](state,data){
    state.citylocaton = data
  }
}

export default mutations