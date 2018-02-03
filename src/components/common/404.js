"use strict";

var React = require('react');
var Link = require('react-router').Link;

var FourOhFourPage = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Ooops!</h1>
        <p>Couldn't find the page you were looking for.</p>
        <p><Link to="app">Back to home</Link></p>
      </div>
    );
  }
});

module.exports = FourOhFourPage;

