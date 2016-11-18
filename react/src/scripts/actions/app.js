export default {
  increment: () => {
    return { type: 'INCREMENT' }
  },
  addInputs: () => {
    return { type: 'ADD_INPUTS' }
  },
  changeInputsState: (aaaaa) => {
    console.log({aaaaa})
    return { type: 'CHANGE_INPUTS_STATE'}
  }
}