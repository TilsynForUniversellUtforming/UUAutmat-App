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
.controller('newTestCtrl', function($scope, $stateParams, TestObjectService, IndicatorService, TestService){
    TestService.setTemplate($stateParams.temp);
    $scope.test=TestService.getTemplate();
    TestService.setupTest();
    
    $scope.indicators = TestService.getIndicators();
    $scope.test_objects = TestService.getTestObjects();
    $scope.test_state = TestService.state;

    $scope.test=function(){
        console.log(TestService.getTemplate());
        console.log(TestService.getIndicators());
    }
   $scope.testf=function(o){
    console.log("Hei")
    console.log(o);
   }
   $scope.setRadioAltAnswer=function(input,alt){
    input.answer=alt.text;
   }
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