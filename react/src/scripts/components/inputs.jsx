import React from 'react';
import DebounceInput from 'react-debounce-input';


class Input extends DebounceInput {
  // static defaultProps = Object.assign({}, DebounceInput.defaultProps, {onChange: onChange})
}

export default class Inputs extends React.Component {
  static propTypes = {
    id: React.PropTypes.any.isRequired,
    title: React.PropTypes.string,
    name: React.PropTypes.string,
    slide: React.PropTypes.string,
    comment: React.PropTypes.string,
  };

  static defaultProps = {
  };

  placeholders = {
    title: 'Title',
    name: 'Name',
    slide: 'Slide Tag',
    comment: 'About',
  };

  render() {
    const attachLabel = (key) => {
      return `${key}[${this.props.id}]`;
    };

    return (
      <div>
        {JSON.stringify(this.placeholders)}
        <dl>
          <dt className="control"><label className="label" htmlFor={attachLabel('title')}>Title</label></dt>
          <dd className="control"><Input className="input" type="text" name={attachLabel('title')} placeholder={this.placeholders.title} /></dd>
          <dt className="control"><label className="label" htmlFor={attachLabel('name')}>Name</label></dt>
          <dd className="control"><Input className="input" type="text" name={attachLabel('name')} placeholder={this.placeholders.name} /></dd>
          <dt className="control"><label className="label" htmlFor={attachLabel('slide')}>Slide</label></dt>
          <dd className="control"><Input className="input" type="text" name={attachLabel('slide')} placeholder={this.placeholders.slide} /></dd>
          <dt className="control"><label className="label" htmlFor={attachLabel('comment')}>Comment</label></dt>
          <dd className="control"><textarea className="textarea" name={attachLabel('comment')} rows="5" placeholder={this.placeholders.comment} /></dd>
        </dl>
        <hr />
      </div>
    );
  }
}
