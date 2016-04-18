angular.module('appMain.controllers', [])

.controller('loginCtrl', function ($scope, LoginService, $ionicPopup, $state){
    $scope.data = {};

     $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('mainMenu');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.controller('mainMenuCtrl', function($scope){

})
.controller('testsListCtrl', function($scope, $state, TestTemplateService, TestObjectService){
     $scope.templates=[];
     $scope.templates = TestTemplateService.query();
     console.log($scope.templates)
     $scope.infoMsg = {
        messages:[{text:"Velg en test mal for å starte."},{text:"Dra listen nedover for å oppdatere innhold."}],
        hide:false
     }
     $scope.startTest=function(temp){
        $state.go('startNew',{temp:temp});
     }

})
.controller('newTestCtrl', function($scope, $stateParams, TestObjectService, IndicatorService){
    // $scope.template = $stateParams.temp;
    // $scope.indicators = [];
    // for(i=0; i < $scope.template.indicators.length; i++){
    //     var r = IndicatorService.get({id:$scope.template.indicators[i]}, function(){
    //         $scope.indicators.push(r);
    //         console.log($scope.indicators)
    //     })
    // }

    // console.log($scope.indicators)
})
.controller('overviewCtrl', function ($scope, dummyData){

    $scope.testTyper = dummyData.getTyper();
    console.log($scope.testTyper[0]);


    var activeTestType={};
    $scope.testObjects = [];
    $scope.TestTypeClick = function(obj)
    {
        activeTestType = obj;
        $scope.testObjects = dummyData.getTestObjekter(obj.ID);

    }
    $scope.changeActiveTestType = function(obj)
    {
        if(obj==activeTestType) return true;
        return false;
    }
    




});