import React from 'react'
import { connect } from 'react-redux'
import Inputs from '../components/inputs'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => { dispatch(AppActions.increment()) }
  }
}

//connectでReduxとReactコンポーネントを繋ぐ
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class InputsContainer extends React.Component {
  static propTypes = {
    entries: React.PropTypes.array
  }
  static defaultProps = {
    entries: [0, 1]
  }


  render() {
    const inputsList = this.props.entries.map((v) => {
      return <Inputs key={v} id={v} />
    });

    return (
      <div>
        {inputsList}
      </div>
    );
  }
}
export default InputsContainer;