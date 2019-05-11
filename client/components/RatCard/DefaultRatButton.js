// Module imports
import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



// Component imports
import { connect } from '../../store'
import { selectUserId, selectUserDisplayRatId } from '../../store/selectors'





// Component Constants





@connect
class ClassName extends React.Component {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  state = {}





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleSetDisplayRat = () => {
    const {
      updateUser,
      userId,
      ratId,
    } = this.props

    updateUser(userId, { displayRatId: ratId })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      isDefaultRat,
    } = this
    return (
      <button
        className="inline display-rat-button"
        type="button"
        disabled={isDefaultRat}
        title={isDefaultRat ? 'This rat represents you.' : 'Use this rat to represent you. (Display Rat)'}
        onClick={this._handleSetDisplayRat}>
        <FontAwesomeIcon icon="id-card-alt" size="lg" fixedWidth />
      </button>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get isDefaultRat () {
    const {
      displayRatId,
      ratId,
    } = this.props

    return displayRatId === ratId
  }



  /***************************************************************************\
    Redux Properties
  \***************************************************************************/

  static mapDispatchToProps = ['updateUser']

  static mapStateToProps = (state) => ({
    userId: selectUserId(state),
    displayRatId: selectUserDisplayRatId(state),
  })





  /***************************************************************************\
    Prop Definitions
  \***************************************************************************/

  static defaultProps = {}

  static propTypes = {
    ratId: PropTypes.string.isRequired,
  }
}





export default ClassName
