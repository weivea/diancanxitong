'use strict';

/**
 * @ngdoc function
 * @name diancanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the diancanApp
 */
angular.module('diancanApp')
    .controller('AboutCtrl', ['$scope','globalData',function ($scope,globalData) {


//        var aaaa=globalData.getPara('subpage');
//        console.log(aaaa);
        switch (globalData.getPara('subpage')){
            case '店铺宣传图': angular.element('#otherInfoTab a:first').tab('show');//初始化显示哪个tab
                break;
            case '菜单管理': angular.element('#otherInfoTab li:eq(1) a').tab('show');
                break;
            case '餐桌设置': angular.element('#otherInfoTab li:eq(2) a').tab('show');
                break;
            case '订单轨迹': angular.element('#otherInfoTab a:last').tab('show');
                break;
        }
        //angular.element('#otherInfoTab a:first').tab('show');//初始化显示哪个tab

        angular.element('#otherInfoTab a').click(function(e) {
            e.preventDefault();//阻止a链接的跳转行为
            angular.element(this).tab('show');//显示当前选中的链接及关联的content
            //$rootScope.tabName = angular.element(this).context.text;
            globalData.addPare('subpage',angular.element(this).context.text,'replace');
            //$routeParams.subPageId=angular.element(this).context.text;
            //$location.url('http://localhost:9000/#/about:'+angular.element(this).context.text);
            //console.log(angular.element(this).context.text);
        });


  }]);

angular.module('diancanApp')
    .controller('menuCtrl', ['$scope',function ($scope) {
        $scope.$emit('summon', 'set');
        $scope.addFlag = false;
        $scope.editFlag = false;
        $scope.delFlag = false;
        $scope.saveFlag = false;
        $scope.tianjia = function(){
            $scope.addFlag=true;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.xiugai = function(){
            $scope.addFlag=false;$scope.editFlag = true;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.shanchu = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = true;
            $scope.saveFlag = true;
        };
        $scope.quxiao = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = false;
            $scope.menudata = angular.copy($scope.menudatacopy);
            $scope.addgroup_ = [];
            $scope.addmenu_ =[];
            $scope.editgroup_ ={};
            $scope.editmenu_ = {};
            $scope.delgroup_ = [];
            $scope.delmenu_ = [];
        };
        $scope.baocun = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = false;
        };

//添加，修改，删除数据
        $scope.addgroup_ = [];
        $scope.addmenu_ =[];
        $scope.editgroup_ ={};
        $scope.editmenu_ = {};
        $scope.delgroup_ = [];
        $scope.delmenu_ = [];



        $scope.delgronp = function(index){
            $scope.delgroup_.push($scope.menudata[index].grunpId);
            $scope.menudata.splice(index,1);

        };
        $scope.delmenu = function(fIndex,index){
            $scope.delmenu_.push({
                groupId:$scope.menudata[fIndex].grunpId,
                theId:$scope.menudata[fIndex].grunpMenu[index].theId
            });
            $scope.menudata[fIndex].grunpMenu.splice(index,1);
        };
        $scope.addgroup = function(){
            var tempdata = {
                grunpName:'',
                grunpId:'add',
                grunpMenu:[]
            };
            $scope.addgroup_.push(tempdata);
            $scope.menudata.push($scope.addgroup_[$scope.addgroup_.length-1]);
        };
        $scope.addmenus = function(fIndex){
            var tempdata = {
                grunpId:$scope.menudata[fIndex].grunpId,
                data:{price:'',theName:'',theId:'add'}
            };
            if(tempdata.grunpId==='add'){//在心添加的组里边添加菜单，这里不添加到addmenu_
                $scope.menudata[fIndex].grunpMenu.push(tempdata.data);
            }else{
                $scope.addmenu_.push(tempdata);
                $scope.menudata[fIndex].grunpMenu.push(
                    $scope.addmenu_[$scope.addmenu_.length-1].data
                );
            }
        };
        $scope.groupedited = function(index){
            if($scope.menudata[index].grunpId!=='add'){//非新添加的组才加到editgroup_
                $scope.editgroup_[index] = {
                    grunpId:$scope.menudata[index].grunpId,
                    grunpName:$scope.menudata[index].grunpName
                };
            }
        };
        $scope.menuedited = function(fIndex,index){
            if($scope.menudata[fIndex].grunpMenu[index].price===undefined ||$scope.menudata[fIndex].grunpMenu[index].price===null){
                alert('请输入数字！');
                $scope.editmenu_['' + fIndex + index] = undefined;
                $scope.menudata[fIndex].grunpMenu[index].price=angular.copy($scope.menudatacopy[fIndex].grunpMenu[index].price);
                return;
            }
            if($scope.menudata[fIndex].grunpMenu[index].theId !== 'add'){//非新添加的菜单才加到editmenu_
                if($scope.editmenu_[''+fIndex+index] === undefined) {
                    $scope.editmenu_['' + fIndex + index] = {
                        grunpId:$scope.menudata[fIndex].grunpId,
                        data:$scope.menudata[fIndex].grunpMenu[index]
                    };
                }
            }
        };



        $scope.menudata = [
            {
                grunpName:'比如荤菜',
                grunpId:'zzz',
                grunpMenu:[
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'}
                ]
            },
            {
                grunpName:'比如蔬菜',
                grunpId:'zzz',
                grunpMenu:[
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'}
                ]
            },
            {
                grunpName:'小吃',
                grunpId:'zzz',
                grunpMenu:[
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'},
                    {price:28,theName:'xxx',theId:'xxx'}
                ]
            }
        ];
        $scope.menudatacopy = angular.copy($scope.menudata);
    }]);


angular.module('diancanApp')
    .controller('tableCtrl', ['$scope',function ($scope) {
        $scope.$emit('summon', 'set');
        $scope.addFlag = false;
        $scope.editFlag = false;
        $scope.delFlag = false;
        $scope.saveFlag = false;
        $scope.tianjia = function(){
            $scope.addFlag=true;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.xiugai = function(){
            $scope.addFlag=false;$scope.editFlag = true;$scope.delFlag = false;
            $scope.saveFlag = true;
        };
        $scope.shanchu = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = true;
            $scope.saveFlag = true;
        };
        $scope.quxiao = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = false;
            $scope.menudata = angular.copy($scope.menudatacopy);
            $scope.addgroup_ = [];
            $scope.addmenu_ =[];
            $scope.editgroup_ ={};
            $scope.editmenu_ = {};
            $scope.delgroup_ = [];
            $scope.delmenu_ = [];
        };
        $scope.baocun = function(){
            $scope.addFlag=false;$scope.editFlag = false;$scope.delFlag = false;
            $scope.saveFlag = false;
        };

//添加，修改，删除数据
        $scope.addgroup_ = [];
        $scope.addmenu_ =[];
        $scope.editgroup_ ={};
        $scope.editmenu_ = {};
        $scope.delgroup_ = [];
        $scope.delmenu_ = [];



        $scope.delgronp = function(index){
            $scope.delgroup_.push($scope.menudata[index].grunpId);
            $scope.menudata.splice(index,1);

        };
        $scope.delmenu = function(fIndex,index){
            $scope.delmenu_.push({
                groupId:$scope.menudata[fIndex].grunpId,
                theId:$scope.menudata[fIndex].grunpMenu[index].theId
            });
            $scope.menudata[fIndex].grunpMenu.splice(index,1);
        };
        $scope.addgroup = function(){
            var tempdata = {
                grunpName:'',
                grunpId:'add',
                grunpMenu:[]
            };
            $scope.addgroup_.push(tempdata);
            $scope.menudata.push($scope.addgroup_[$scope.addgroup_.length-1]);
        };
        $scope.addmenus = function(fIndex){
            var tempdata = {
                grunpId:$scope.menudata[fIndex].grunpId,
                data:{theName:'',theId:'add'}
            };
            if(tempdata.grunpId==='add'){//在心添加的组里边添加菜单，这里不添加到addmenu_
                $scope.menudata[fIndex].grunpMenu.push(tempdata.data);
            }else{
                $scope.addmenu_.push(tempdata);
                $scope.menudata[fIndex].grunpMenu.push(
                    $scope.addmenu_[$scope.addmenu_.length-1].data
                );
            }
        };
        $scope.groupedited = function(index){
            if($scope.menudata[index].grunpId!=='add'){//非新添加的组才加到editgroup_
                $scope.editgroup_[index] = {
                    grunpId:$scope.menudata[index].grunpId,
                    grunpName:$scope.menudata[index].grunpName
                };
            }
        };
        $scope.menuedited = function(fIndex,index){
            if($scope.menudata[fIndex].grunpMenu[index].theId !== 'add'){//非新添加的菜单才加到editmenu_
                if($scope.editmenu_[''+fIndex+index] === undefined) {
                    $scope.editmenu_['' + fIndex + index] = {
                        grunpId:$scope.menudata[fIndex].grunpId,
                        data:$scope.menudata[fIndex].grunpMenu[index]
                    };
                }
            }
        };


        $scope.menudata = [
            {
                grunpName:'大房间',
                grunpId:'aaa',
                grunpMenu:[
                    {theName:'dsf',theId:'xxx'},
                    {theName:'xsdxx',theId:'xxx'},
                    {theName:'xdddddxx',theId:'xxx'},
                    {theName:'xssdxx',theId:'xxx'},
                    {theName:'xgfdgxx',theId:'xxx'},
                    {theName:'xxdfdx',theId:'xxx'},
                    {theName:'xdfgdgxx',theId:'xxx'}
                ]
            },
            {
                grunpName:'小房间',
                grunpId:'sss',
                grunpMenu:[
                    {theName:'xdgdfgxx',theId:'xxx'},
                    {theName:'xdgdfgxx',theId:'xxx'},
                    {theName:'xdgdfgxx',theId:'xxx'},
                    {theName:'xdgdfgxx',theId:'xxx'},
                    {theName:'xdgdfgxx',theId:'xxx'},
                    {theName:'xdgdfgxx',theId:'xxx'},
                    {theName:'xdgdfgxx',theId:'xxx'}
                ]
            },
            {
                grunpName:'mini房间',
                grunpId:'ggg',
                grunpMenu:[
                    {theName:'xxdgdfx',theId:'xxx'},
                    {theName:'xxdgdfx',theId:'xxx'},
                    {theName:'xxdgdfx',theId:'xxx'},
                    {theName:'xxdgdfx',theId:'xxx'},
                    {theName:'xxdgdfx',theId:'xxx'},
                    {theName:'xxdgdfx',theId:'xxx'},
                    {theName:'xxdgdfx',theId:'xxx'},
                    {theName:'xxdgdfx',theId:'xxx'}
                ]
            }
        ];
        $scope.menudatacopy = angular.copy($scope.menudata);
    }]);





//上传图片
angular.module('diancanApp').directive('fileUploader', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: '<div><input type="file" multiple /><button ng-click="upload()">上传</button></div>'+'<ul><li ng-repeat="file in files"> - </li></ul>',
        controller: function($scope, $fileUpload) {
            $scope.notReady = true;
            $scope.upload = function() {
                $fileUpload.upload($scope.files);
            };
        },
        link: function($scope, $element) {
            var fileInput = $element.find('input[type="file"]');
            fileInput.bind('change', function(e) {
                $scope.notReady = e.target.files.length === 0;
                $scope.files = [];
                for(var i in e.target.files) {
                    //Only push if the type is object for some stupid-ass reason browsers like to include functions and other junk
                    if(typeof e.target.files[i] === 'object'){ $scope.files.push(e.target.files[i]);}
                }
            });
        }
    };
});





angular.module('diancanApp').service('$fileUpload', ['$http', function($http) {
    this.upload = function(files) {
        //Not really sure why we have to use FormData().  Oh yeah, browsers suck.
        var formData = new FormData();
        for(var i in files) {
            formData.append('file_'+i, files[i]);
        }
        console.log(formData);
        $http({method: 'POST', url: '/api/files', data: formData, headers: {'Content-Type': undefined}, transformRequest: angular.identity})
            .success(function(data, status, headers, config) {
                console.log(data);
            });
    };
}]);

//////////
angular.module('diancanApp')
    .factory('globalData',function(){
        var a = {};
        function addPara(name,v,r){
            if(a[name] !== undefined && r !== 'replace'){
                return false;
            }
            a[name]=v;
            return a[name];
        }

        function replacePara(name,v) {
            if(a[name] === undefined){
                return false;
            }else{
                a[name] = v;
            }
        }
        function getPara(name){
            return a[name];
        }
        return {
            addPare:addPara,
            getPara:getPara,
            replacePara:replacePara
        };
    });