import React from 'react'
import { connect } from 'react-redux'
import App from '../components/app'
import Inputs from '../components/inputs'
import AppActions from '../actions/app'

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
class AppContainer extends React.Component {
  render() {
    const { fuga, handleClick } = this.props;
    return (
      <div>
        <App fuga={fuga} handleClick={handleClick} />
        <Inputs />
      </div>
    );
  }
}
export default AppContainer;