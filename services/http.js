'use strict';

(function(angular) {
  // 由于默认angular提供的异步请求对象不支持自定义回调函数名
  // angular随机分配的回调函数名称不被豆瓣支持
  var http = angular.module('moviecat.services.http', []);
  http.service('HttpService', ['$window', '$document', function($window, $document) {
      this.jsonp = function (url,data,callback) {
       
        var querystring = url.indexOf("?") === -1?"?":"&";
        for(var key in data){
          querystring+=key+"="+data[key]+"&";
        }
        var cbFunc ="my_json_" + Math.random().toString().replace(".","");
        querystring += "callback="+ cbFunc;
        var scriptElement = $document[0].createElement("script");
        scriptElement.src = url + querystring;
        $window[cbFunc] = function(data){
        	callback(data);
        	$document[0].body.removeChild(scriptElement);
        };
        $document[0].body.appendChild(scriptElement);
      };
  }]);
})(angular);
