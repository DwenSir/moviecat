'use strict';

angular.module('moviecat', ['ngRoute','datailController',"moviecat_list",'myFilter'])
    .config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail/:id',{
          templateUrl:'views/detail.html',
            controller:'detailController'
     }).when('/:category/:page',{
          templateUrl:'views/view.html',
            controller:'MoviecatListController'
     }).when('/us_box',{
          templateUrl:'views/us_box.html',
            controller:'usBoxController'
     }).otherwise({ redirectTo: '/in_theaters/1' });
}]);
