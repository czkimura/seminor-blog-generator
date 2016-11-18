import React from 'react'
import { connect } from 'react-redux'
import Inputs from '../components/inputs'
import AppActions from '../actions/app'
import red from '../reducers/index'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(AppActions.addInputs());
      console.log(red())
    },
    handleChange: (bbbbb) => {
      console.log({bbbbb})
      dispatch(AppActions.changeInputsState());
    }
  }
}

//connectでReduxとReactコンポーネントを繋ぐ
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class InputsContainer extends React.Component {
  static propTypes = {
    entries: React.PropTypes.array.isRequired
  }
  static defaultProps = {
  }

  render() {
    const { handleClick, handleChange } = this.props;
    const inputsList = this.props.entries.map((v) => {
      return <Inputs key={v} id={v} onChange={handleChange} />
    });

    return (
      <div>
        {JSON.stringify([this.props, this.state])}
        {inputsList}
        <button className="button" onClick={handleClick}>Add</button>
      </div>
    );
  }
}
export default InputsContainer;