import React from 'react';

export default class WordGetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };
  }
  handleBlur(event) {
    this.setState({ msg: event.target.value });
  }
  render() {
    return (
      <div>
        <input type='text' onChange={this.handleBlur.bind(this)} />
        <p>Your message: {this.state.msg}</p>
      </div>
    );
  }
}
