'use strict';

/**
 * @ngdoc function
 * @name diancanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diancanApp
 */
angular.module('diancanApp')
    .controller('MainCtrl', function ($scope,$http) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    $http.get('/adyd/app/rolling!getRollings.do')
        .success(function(backData){
            console.log(backData);
    });
    $scope.getmenu = function(tableId){
        console.log(tableId);
        //$scope.tableInfo[0].showFlag=!$scope.tableInfo[0].showFlag;
        setShowFlag(tableId,true);
        console.log(
        $scope.tableInfo[1].showFlag
        );
    };
    $scope.tableInfo=[
        {
            groupId:'xxx',
            groupName:'xxx',
            tables:[
                {tableNum:1,tableId:122,showFlag:true},
                {tableNum:2,tableId:222,showFlag:false},
                {tableNum:3,tableId:322,showFlag:false},
                {tableNum:4,tableId:422,showFlag:false},
                {tableNum:5,tableId:522,showFlag:false},
                {tableNum:6,tableId:622,showFlag:false},
                {tableNum:7,tableId:722,showFlag:false},
                {tableNum:8,tableId:822,showFlag:false}
            ]
        },
        {
            groupId:'xxx',
            groupName:'xxx',
            tables:[
                {tableNum:1,tableId:122,showFlag:true},
                {tableNum:2,tableId:222,showFlag:false},
                {tableNum:3,tableId:322,showFlag:false},
                {tableNum:4,tableId:422,showFlag:false},
                {tableNum:5,tableId:522,showFlag:false},
                {tableNum:6,tableId:622,showFlag:false},
                {tableNum:7,tableId:722,showFlag:false},
                {tableNum:8,tableId:822,showFlag:false}
            ]
        },
        {
            groupId:'xxx',
            groupName:'xxx',
            tables:[
                {tableNum:1,tableId:122,showFlag:true},
                {tableNum:2,tableId:222,showFlag:false},
                {tableNum:3,tableId:322,showFlag:false},
                {tableNum:4,tableId:422,showFlag:false},
                {tableNum:5,tableId:522,showFlag:false},
                {tableNum:6,tableId:622,showFlag:false},
                {tableNum:7,tableId:722,showFlag:false},
                {tableNum:8,tableId:822,showFlag:false}
            ]
        }

    ];
    function setShowFlag(id,flag){
        for(var cnt=0; cnt<$scope.tableInfo.length; cnt++){
            for(var scnt=0;scnt<$scope.tableInfo[cnt].tables.length;scnt++){
                if(id === $scope.tableInfo[cnt].tables[scnt].tableId){
                    $scope.tableInfo[cnt].tables[scnt].showFlag = flag;
                    return;
                }
            }
        }
    }

    $scope.$emit('summon', 'main');//改变导航栏状态的信号


        //UI 初始化
    angular.element('#menu-tab').click(function(e){
        e.preventDefault();
        angular.element('.message').removeClass('active');
        angular.element('.themenu').addClass('active');
        angular.element('#message').removeClass('active');
        angular.element('#themenu').addClass('active');
    });
    angular.element('#message-tab').click(function(e){
        e.preventDefault();
        angular.element('.themenu').removeClass('active');
        angular.element('.message').addClass('active');
        angular.element('#themenu').removeClass('active');
        angular.element('#message').addClass('active');
    });

});
