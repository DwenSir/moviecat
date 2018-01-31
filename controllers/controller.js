(function(angular) {
  'use strict';
  var module = angular.module("moviecat_list",['ngRoute','moviecat.services.http']);
  
  module.controller('MoviecatListController',['$scope','$route','$routeParams','HttpService',function ($scope,$route,$routeParams,HttpService) {
      $scope.subjects = [];
      var count = 10;
      var page = parseInt($routeParams.page);
      var start = (page - 1) * count;
      $scope.currentPage = page;
      $scope.titles = "Loading...";
      $scope.totalCount = 0;
      $scope.totalPage = 0;
      $scope.loading = true;
      //动态跨域
      HttpService.jsonp(
          "http://api.douban.com/v2/movie/"+$routeParams.category, {start:start,count:count,q:$routeParams.q}, function (data) {
              $scope.subjects = data.subjects;
              $scope.totalCount = data.total;
              $scope.titles = data.title;
              $scope.totalPage = Math.ceil($scope.totalCount/count);
              $scope.loading = false;
              //重新同步
              $scope.$apply();
          });

 //    上下页处理
      $scope.go = function (page) {
          if(page >= 1 && page <= $scope.totalPage){
              $route.updateParams({page:page});
          }

      }
  }]).controller('usBoxController',['$scope','$route','HttpService',function ($scope,$route,HttpService){
  		$scope.subjects = [];
      $scope.titles = "";
      $scope.loading = true;
      //动态跨域
      HttpService.jsonp(
          "http://api.douban.com/v2/movie/us_box", {}, function (data) {
              $scope.subjects = data.subjects;
              $scope.titles = data.title;
              $scope.loading = false;
//            //重新同步
              $scope.$apply();
          });
  }]).controller('SearchController',['$scope','$route','$routeParams',function($scope,$route,$$routeParams){
		$scope.searchDoc=function(){
			if($scope.inp!=""){
				$route.updateParams({category:'search',q:$scope.inp});
				$scope.inp="";
			}
		}
  }])
  .controller('NavController',['$scope','$location',function ($scope,$location) {
        $scope.navs = [
            {"links":"#/in_theaters/1","val":"正在热映"},
            {"links":"#/coming_soon/1","val":"即将上映"},
            {"links":"#/us_box","val":"北美票房榜"},
            {"links":"#/top250/1","val":"TOP250"},
        ];
        $scope.$location = $location;
        $scope.$watch('$location.path()',function (now) {
            if(now.startsWith("/in_theaters")){
                $scope.type = '#/in_theaters';
            }else if(now.startsWith("/coming_soon")){
                $scope.type = '#/coming_soon';
            }else if(now.startsWith("/us_box")){
                $scope.type = '#/us_box';
            }else if(now.startsWith("/top250")){
                $scope.type = '#/top250';
            }else if(now.startsWith("/search")){
                $scope.type = '#/search';
            }
        });

    }]);
})(angular);