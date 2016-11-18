import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Input from 'react-debounce-input'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: () => { console.log('hi') }
  }
}

//connectでReduxとReactコンポーネントを繋ぐ
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class InputContainer extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  render() {
    const safeProps = ['name', 'className', 'htmlFor', 'placeholder', 'type', 'inputmode', 'readonly', 'rows', 'disabled', 'size', 'autocomplete', 'cols'];
    const props = _.pick(this.props, Object.keys(Input.propTypes).concat(safeProps));
    return React.createElement(Input, props)
  }
}
export default InputContainer;