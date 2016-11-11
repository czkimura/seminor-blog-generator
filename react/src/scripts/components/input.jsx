import React from 'react';
import DebounceInput from 'react-debounce-input';

export default class Input extends React.Component {
  render() {
    return (
      <DebounceInput ...props onChange={(e) => {
        console.log(e.target.value)
      }} />
    );
  }
}
