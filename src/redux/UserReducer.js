import instance from '../../common/axios'
import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { setToken, removeToken } from '../../common/token'

class UserRedux {
  constructor (options = {}) {
    this._options = options
    this.actionTypes = {
      MY_INFO: 'MY_INFO',
      LOG_IN: 'LOG_IN',
      LOG_OUT: 'LOG_OUT',
      CHECK_DUP_EMAIL: 'CHECK_DUP_EMAIL',
      CHECK_DUP_NICKNAME: 'CHECK_DUP_NICKNAME',
      TEMP_SAVE: 'TEMP_SAVE',
      EDIT_INFO: 'EDIT_INFO'
    }
    this.actions = {
        myInfo: createAction(this.actionTypes.MY_INFO, (userInfo) => ({ userInfo })),
        logIn: createAction(this.actionTypes.LOG_IN, (token) => ({ token }))
    }
    this.initialState = {
      token: null,
      is_login: false,
      is_check_email: false,
      is_check_nickname: false,
      userId: null,
      nickname: null,
      tempInfo: null
    }
  }

  get myInfoDB () {
    return (dispatch, getState) => {
      instance.post('/api/user/me')
        .then(res => dispatch(this.actions.myInfo(res.data)))
        .catch(console.error)
    }
  }
}

const actions = {
    MY_INFO: 'MY_INFO',
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    CHECK_DUP_EMAIL: 'CHECK_DUP_EMAIL',
    CHECK_DUP_NICKNAME: 'CHECK_DUP_NICKNAME',
    TEMP_SAVE: 'TEMP_SAVE',
    EDIT_INFO: 'EDIT_INFO'
}