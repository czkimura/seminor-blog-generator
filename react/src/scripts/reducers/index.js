// 初期ステート設定
const initialState = {
  fuga: 0,
  entries: [0],
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT': {
      return { fuga: state.fuga + 1 }
    }
    case 'ADD_INPUTS' : {
      console.log('aaaa', state);
      return { entries: state.entries.concat([state.entries.length]) }
    }
    default:
      return state
  }
}