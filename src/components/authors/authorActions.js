"use strict";

var Dispatcher = require('../../dispatcher');
var AuthorApi = require('../../api/authorApi');
var ActionTypes = require('./authorActionTypes');

var AuthorActions = {
  init: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.INIT,
      authors: AuthorApi.getAllAuthors()
    });
  },

  createAuthor: function(author) {
    var newAuthor = AuthorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType:  ActionTypes.CREATE_AUTHOR,
      author: newAuthor
    });
  },

  updateAuthor: function(author) {
    var updatedAuthor = AuthorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor
    });
  },

  deleteAuthor: function(authorId) {
    AuthorApi.deleteAuthor(authorId);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      authorId: authorId
    });
  }
};

module.exports = AuthorActions;
