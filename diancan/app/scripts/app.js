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
angular.module('diancanApp').controller('header-nav',['$rootScope','$scope','$location','$http','$sessionStorage',function($rootScope,$scope,$location,$http,$sessionStorage){
    $scope.logined=false;
    $scope.message='';

    $rootScope.safeApply = function( fn ) {//外部调用内部函数代理
        var phase = this.$root.$$phase;
        if(phase === '$apply' || phase === '$digest') {
            if(fn) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };


    $scope.$on('summon', function(e, data) {
        if(data === 'main'){
            angular.element('.business-mng').addClass('active');
            angular.element('.setting-page').removeClass('active');
        }else if(data === 'set'){
            angular.element('.setting-page').addClass('active');
            angular.element('.business-mng').removeClass('active');
        }else if(data === 'login'){
            if($scope.$storage.accountId !== '0'){
                $location.path('/main');
                $scope.logined=true;
            }
        }
    });

    $scope.printAskflag = 0;//问题弹出框
    $scope.printmenuING = 0;//正在打印菜单
    $scope.printmenupicING=0;//真在打印订单
    $scope.$on('printmenu',function(e,data){//打印菜单
        console.log(data);
        if(data === 'continue'){
            $scope.$broadcast('printmenuAsk', 0);
        }else{
            if($scope.printmenupicING===1){//由于正在打印订单，所以重新获取菜单来打印
                $scope.$broadcast('printmenuAsk', 0);
            }else {
                $scope.printmenuING = 1;
                colgarJS.messsage(data);  //打印菜单
            }

        }
    });

    $scope.$on('printmenuprice',function(e,data){//打印订单
        $scope.printmenupicING=1;
        colgarJS.messsage(data);
    });

    $scope.tiaoshiyong='';
    $scope.printBackMsg=function(msg){//打印反馈信息


        $scope.tiaoshiyong='msg:'+msg+'printmenuING:'+$scope.printmenuING;
        if(msg==='suc'){//打印成功，继续获取打印菜单
            if($scope.printmenuING === 1){//打印的是菜单，
                $scope.printmenuING = 0;
                $scope.$broadcast('printmenuAsk', 1);
            }else if($scope.printmenupicING===1){//打印的是订单
                $scope.printmenupicING=0;
                $scope.$broadcast('printpicAsk', 1);//订单答应成功
            }

        }else{//打印不成功
            $scope.printAskflag = 1;
            angular.element('#askmsg-show').modal('show');
        }
    };

    $scope.goAhead=function(){//未能成功打印，继续获取菜单打印
        if($scope.printAskflag === 1) {
            $scope.printAskflag = 0;
            if($scope.printmenuING === 1){//打印不成功的是菜单,ze需要重新打印
                $scope.printmenuING = 0;
                $scope.$broadcast('printmenuAsk', 0);

            }else if($scope.printmenupicING===1){//打印不成功的是订单
                $scope.printmenupicING=0;
                $scope.$broadcast('printpicAsk', 0);//订单答应不成功
            }
        }
    };
    $scope.$on('showmsg', function(e, data) {
        $scope.message=data;
        angular.element('.msg-show').slideDown('normal');
        setTimeout(function(){
            angular.element('.msg-show').slideUp('normal');
        },3000);

    });
    $scope.testconnect=function(){//重新连接
        $scope.printmenupicING=0;
        $scope.$broadcast('printmenuAsk', 0);
    };


    //console.log('sadfasdfas'+$sessionStorage.$default);
    $scope.$storage = $sessionStorage.$default({
        accountId: '0',
        name:''
    });

    $rootScope.accountId=$scope.$storage.accountId;

    $scope.$on('logindata',function(e,data){
        $http.post('/adyd/web/merchant_login!login.do?account='+data.account+'&password='+data.password)
            .success(function(backData){
                if(backData.flag!=='error') {
                    $location.path('/main');
                    $scope.logined = true;
                    $scope.$storage.accountId = backData.data.merchantId;
                    $scope.$storage.name = backData.data.name;
                    $rootScope.accountId = $scope.$storage.accountId;
                }
            });
    });
    if($scope.$storage.accountId === '0'){
        $location.path('/login');
        $scope.logined=false;
    }else{
        $scope.logined=true;
    }

}]);
