(function(angular) {
    'use strict';
    var module = angular.module("myFilter",[]);
    module.filter('stringFilter',function () {  	
        return function (txt) {
        	if(txt.indexOf("us_box")>-1){
        		return txt
        	}else if(txt.indexOf("search")>-1){
        		return "search"
        	}
        	else{
        		var i = txt.lastIndexOf("/");
	            var newTxt = txt.slice(0,i);
	            return newTxt
        	}
            
        }
    })
})(angular);