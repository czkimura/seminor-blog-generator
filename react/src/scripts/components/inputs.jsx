import React from 'react';

export default class Inputs extends React.Component {
  static propTypes = {
    id: React.PropTypes.any.isRequired,
    title: React.PropTypes.string,
    name: React.PropTypes.string,
    slide: React.PropTypes.string,
    comment: React.PropTypes.string,
  };

  static defaultProps = {
    title: 'Title',
    name: 'Name',
    slide: '',
    comment: '',
  };

  render() {
    const attachLabel = (key) => {
      return `${key}[${this.props.id}]`;
    };

    return (
      <div>
        {JSON.stringify(this.props)}
        <dl>
          <dt><label htmlFor={attachLabel('title')}>Title</label></dt>
          <dd><input type="text" name={attachLabel('title')} defaultValue={this.props.title} /></dd>
          <dt><label htmlFor={attachLabel('name')}>Name</label></dt>
          <dd><input type="text" name={attachLabel('name')} defaultValue={this.props.name} /></dd>
          <dt><label htmlFor={attachLabel('slide')}>Slide</label></dt>
          <dd><input type="text" name={attachLabel('slide')} defaultValue={this.props.slide} /></dd>
          <dt><label htmlFor={attachLabel('comment')}>Comment</label></dt>
          <dd><textarea name={attachLabel('comment')} rows="5" defaultValue={this.props.comment} /></dd>
        </dl>
        <hr />
      </div>
    );
  }
}
