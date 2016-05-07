var AppDispatcher = require('../../dispatcher/appDispatcher.js');
var constants = {
    checkStrength: 'CHECK_STRENGTH'
};
var todoActions = {
    checkPassStrength: function(password){
        AppDispatcher.handleViewAction({
          actionType: constants.checkStrength,
          data: password
        });
    }
};

module.exports = todoActions;