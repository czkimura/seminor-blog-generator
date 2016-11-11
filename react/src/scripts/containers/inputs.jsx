import React from 'react'
import { connect } from 'react-redux'
import Inputs from '../components/inputs'
import AppActions from '../actions/app'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => { dispatch(AppActions.addInputs()) }
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
  }

  render() {
    const { handleClick } = this.props;
    const inputsList = this.props.entries.map((v) => {
      return <Inputs key={v} id={v} />
    });

    return (
      <div>
        {inputsList}
        <button className="button" onClick={handleClick}>Add</button>
      </div>
    );
  }
}
export default InputsContainer;