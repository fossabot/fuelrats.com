/* globals $IS_DEVELOPMENT:false */
// Module imports
import {
  bindActionCreators,
  createStore,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk'





// Component imports
import initialState from './initialState'
import reducer from './reducers'
import actionStatus from './actionStatus'





import * as actions from './actions'





const middlewares = $IS_DEVELOPMENT
  ? composeWithDevTools(
    applyMiddleware(
      require('redux-immutable-state-invariant').default(),
      thunkMiddleware,
    ),
  )
  : applyMiddleware(
    thunkMiddleware,
  )





const initStore = (state = initialState) => createStore(reducer, state, middlewares)





const connectDecorator = (target) => {
  const {
    mapDispatchToProps: mDTP,
    mapStateToProps,
    mergeProps,
    reduxOptions,
  } = target
  let mapDispatchToProps = mDTP

  if (Array.isArray(mDTP)) {
    mapDispatchToProps = (dispatch) => bindActionCreators(
      mDTP.reduce((acc, actionName) => ({
        ...acc,
        [actionName]: actions[actionName],
      }
      ), {}),
      dispatch,
    )
  }

  return connect(
    mapStateToProps || (() => ({})),
    mapDispatchToProps || {},
    mergeProps,
    reduxOptions,
  )(target)
}





const getActionCreators = (action, dispatch) => {
  let resolvedAction = action

  if (Array.isArray(action) && typeof action[0] === 'string') {
    resolvedAction = action.reduce((acc, actionName) => ({
      ...acc,
      [actionName]: actions[actionName],
    }), {})
  }

  if (typeof action === 'string') {
    resolvedAction = actions[action]
  }

  return bindActionCreators(resolvedAction, dispatch)
}





export {
  actions,
  actionStatus,
  getActionCreators,
  connectDecorator as connect,
  initStore,
}
