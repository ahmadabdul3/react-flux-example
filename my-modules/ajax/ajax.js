var ajax = {
    request: function (url, method, data, success, error) {
        if(typeof window !== 'undefined') {
            $.ajax({
              url: url,
              method: method,
              data: data
            })
            .done(function(data) {
                if(success) {
                    success(data);
                } else {
                    ajaxSuccess(data);
                }
            })
            .fail(function(jqXHR, errorString, exception) {
                if(error) {
                    error(jqXHR, errorString, exception)
                } else {
                    ajaxError(jqXHR, errorString, exception);
                }
            });
            function ajaxSuccess(data) {
                console.log('success: ' + data);
            }
            function ajaxError(jqXHR, errorString, exception) {
                console.error('error: ' + errorString);
            }
        }
    },
    methods: {
        get: 'GET',
        post: 'POST',
        put: 'PUT',
        delete: 'DELETE'
    }
}

module.exports = ajax;