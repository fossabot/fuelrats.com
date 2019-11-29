import actionTypes from '../actionTypes'
import imageLoader from '../../services/imageLoader'





const getImage = (payload) => (dispatch) => {
  imageLoader(dispatch).postMessage(payload)
}





const disposeImage = ({ id, url }) => (dispatch) => {
  window.URL.revokeObjectURL(url)

  return dispatch({
    type: actionTypes.images.dispose,
    status: 'success',
    payload: id,
  })
}





export {
  getImage,
  disposeImage,
}
