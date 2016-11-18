import _ from 'lodash';

// 初期ステート設定
const initialState = {
  fuga: 0,
  entries: [0],
}

export default function reducer(state = initialState, action) {
  switch(_.get(action, 'type', '')) {
    case 'INCREMENT': {
      return { fuga: state.fuga + 1 }
    }
    case 'ADD_INPUTS': {
      return {
        entries: state.entries.concat([state.entries.length])
      }
    }
    case 'CHANGE_INPUTS_STATE': {
      console.log(state)
      return state
    }
    default:
      return state
  }
}