'use strict';

/**
 * @ngdoc overview
 * @name diancanApp
 * @description
 * # diancanApp
 *
 * Main module of the application.
 */

angular
  .module('diancanApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngSocket',
    'ngStorage'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
angular.module('diancanApp').controller('header-nav',['$scope','$location','$http','$sessionStorage',function($scope,$location,$http,$sessionStorage){
    $scope.logined=false;
    $scope.$on('summon', function(e, data) {
        if(data === 'main'){
            angular.element('.business-mng').addClass('active');
            angular.element('.setting-page').removeClass('active');
        }else if(data === 'set'){
            angular.element('.setting-page').addClass('active');
            angular.element('.business-mng').removeClass('active');
        }
    });
    //console.log('sadfasdfas'+$sessionStorage.$default);
    $scope.$storage = $sessionStorage.$default({
        accountId: '0',
        name:''
    });

    $scope.$on('logindata',function(e,data){

        $http.post('/adyd/web/merchant_login!login.do?account='+data.account+'&password='+data.password)
            .success(function(backData){
                $location.path('/main');$scope.logined=true;
                $scope.$storage.accountId = backData.data.merchantId;
                $scope.$storage.name = backData.data.name;
            });
    });
    if($scope.$storage.accountId !== '0'){
        $location.path('/main');$scope.logined=true;
    }

}]);
