"use strict";

var React = require('react');
var PropTypes = React.PropTypes;

var TextInput = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
  },
  render: function() {
    var wrapperClassName = 'form-group';
    if(this.props.error && this.props.error.length > 0) {
      wrapperClassName += ' has-error';
    }
    var placeholder = this.props.placeholder || this.props.label;

    return (
      <div className={wrapperClassName}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type="text" name={this.props.name} ref={this.props.name}
                 className="form-control"
                 placeholder={placeholder}
                 value={this.props.value}
                 onChange={this.props.onChange} />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = TextInput;
