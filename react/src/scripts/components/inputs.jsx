import React from 'react';
import Input from 'react-debounce-input'

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
        <dl>
          <dt className="control"><label className="label" htmlFor={attachLabel('title')}>Title</label></dt>
          <dd className="control"><Input className="input" type="text" name={attachLabel('title')} placeholder={this.placeholders.title} onChange={(e) => { this.setState({title: e.target.value})}} /></dd>
          <dt className="control"><label className="label" htmlFor={attachLabel('name')}>Name</label></dt>
          <dd className="control"><Input className="input" type="text" name={attachLabel('name')} placeholder={this.placeholders.name} onChange={(e) => { this.setState({name: e.target.value})}} /></dd>
          <dt className="control"><label className="label" htmlFor={attachLabel('slide')}>Slide</label></dt>
          <dd className="control"><Input className="input" type="text" name={attachLabel('slide')} placeholder={this.placeholders.slide} onChange={(e) => { this.setState({slide: e.target.value})}} /></dd>
          <dt className="control"><label className="label" htmlFor={attachLabel('comment')}>Comment</label></dt>
          <dd className="control"><Input element="textarea" className="textarea" name={attachLabel('comment')} rows="5" placeholder={this.placeholders.comment} onChange={(e) => { this.setState({comment: e.target.value})}} /></dd>
        </dl>
        <hr />
      </div>
    );
  }
}
