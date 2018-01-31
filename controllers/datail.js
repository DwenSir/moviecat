(function(angular) {
  'use strict';
  var module = angular.module("datailController",['ngRoute','moviecat.services.http']);
  
  module.controller('detailController',['$scope','$route','$routeParams','HttpService',function ($scope,$route,$routeParams,HttpService){
  	$scope.movie = {};
  	$scope.loading = true;
  	var id = $routeParams.id;
  	var apiAddress = "http://api.douban.com/v2/movie/subject/"+id;
  	HttpService.jsonp(apiAddress,{},function(data){
  		$scope.movie = data;
  		$scope.loading = false;
  		$scope.$apply();
  	});
  }])
})(angular);