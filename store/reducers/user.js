import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      if (action.user) {
        let user = action.user
        let group = user.group || user.groups
        let isArray = Array.isArray(group)

        if (isArray) {
          user.isAdmin = group.indexOf('admin') !== -1
          user.isModerator = group.indexOf('moderator') !== -1
          user.isOverseer = group.indexOf('overseer') !== -1
        } else {
          user.isAdmin = group === 'admin'
          user.isModerator = user.isAdmin || group === 'moderator'
          user.isOverseer = user.isModerator || group === 'overseer'
        }

        return Object.assign({}, state, user)
      }

    default:
      return state
  }
}