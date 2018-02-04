"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('./authorActions');
var AuthorStore = require('./authorStore');
var Toastr = require('toastr');

var EditAuthorPage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if(component.state.dirty
         && !confirm('If you leave now, your changes will be discarded.\nAre you sure?')) {
         transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      author: {
        id: '',
        firstName: '',
        lastName: ''
      },
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var authorId = this.props.params.id;

    if(authorId) {
      this.setState({author: AuthorStore.getAuthorById(authorId)});
    }
  },

  setAuthorState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },

  formIsValid: function() {
    var formIsValid = true;
    this.state.errors = {};  // clear any prior errors

    if(this.state.author.firstName.length < 1) {
      this.state.errors.firstName = 'Please supply a first name.';
      formIsValid = false;
    }
    if(this.state.author.lastName.length < 1) {
      this.state.errors.lastName = 'Please supply a last name.';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveAuthor: function(event) {
    event.preventDefault();

    if(!this.formIsValid()) {
      return;
    }

    if(this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
    } else {
      AuthorActions.createAuthor(this.state.author);
    }
    Toastr.success('Author ' + this.state.author.id + ' saved.');
    this.setState({dirty: false});
    this.transitionTo('authors');
  },

  render: function() {
    return (
      <div>
        <h1>Edit Author</h1>
        <AuthorForm author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                    errors={this.state.errors}
        />
      </div>
    );
  }

});

module.exports = EditAuthorPage;
