'use strict';

var server = "/chat";
// var server = "http://angularjs-chat-server.aws.af.cm/chat";

angular.module('angularAppApp').factory('chatService', function($http) {
    return {

        // RETURNS SockJS object
        socket : function(){
            return new SockJS(server, null, {debug: true});
        },

        press : function() {
            return $http({
                method: "POST",
                headers: {
                      accept: 'application/zip' //or whatever you need
                  },
                url: "/downloadPress",
                responseType: "arraybuffer",
                cache: false,
            });
        }

    }
});
