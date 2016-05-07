var rfr = require('rfr');
var AppDispatcher = require('../../dispatcher/appDispatcher.js');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var ajax = require('../../../my-modules/ajax/ajax.js');

var appConstants = {
  checkStrength: 'CHECK_STRENGTH'
}
var CHANGE_EVENT = 'change';

var storeFunctions = new storeFunctions();

var store = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getPasswordCheckResult: function() {
    return storeFunctions.getPasswordCheckResult();
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType) {
    case appConstants.checkStrength:
      storeFunctions.checkStrength(action.data);
      break;
    default:
      return true;
  }
});

function storeFunctions() {
  var self = this;
  self.passwordCheckResult = '';
  self.checkStrength = checkStrength;
  self.getPasswordCheckResult = getPasswordCheckResult;

  function checkStrength(password) {
    ajax.request('/checkStrength', ajax.methods.post, password, updatePasswordCheckResult, null);
  }
  function updatePasswordCheckResult(data) {
    self.passwordCheckResult = data;
    emitChange();
  }
  function getPasswordCheckResult() {
    return self.passwordCheckResult.status;
  }
  function emitChange() {
    store.emit(CHANGE_EVENT);
  }
}

module.exports = store;