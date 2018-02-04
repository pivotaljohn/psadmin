"use strict";

var React = require('react');
var PropTypes = require('react').PropTypes;
var TextInput = require('../common/textInput');

var AuthorForm = React.createClass({
  propTypes: {
    author: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  },
  render: function() {
    return (
      <form>
        <TextInput name="firstName" label="First Name"
                   onChange={this.props.onChange}
                   value={this.props.author.firstName}
                   error={this.props.errors.firstName} />
        <br/>
        <TextInput name="lastName" label="Last Name"
                   onChange={this.props.onChange}
                   value={this.props.author.lastName}
                   error={this.props.errors.lastName} />

        <input value="Save" type="submit"
               className="btn btn-default"
               onClick={this.props.onSave}
               />
      </form>
    );
  }
});

module.exports = AuthorForm;
