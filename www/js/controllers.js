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
    $scope.template = $stateParams.temp;
    $scope.indicators = [];
    $scope.test_objects = [];
    $scope.test_state={
        current:'',
        previous:'',
        next:'',
        index:0,
        states:['Generell Informasjon', 'Virksomhet / Lokale'],
        addIndicator:function(ind){
            this.states.push("Indikator: " + ind.name);
        },
        addTestObject:function(tobj){
            this.states.push("TestObject: " + tobj.name);
        },
        setStates:function(){
            this.current=this.states[this.index];
            if(this.current==0){this.previous=''}else{this.previous=this.states[this.index-1]}
            if(this.current==(this.states.length-1)){this.next=''}else{this.next=this.states[this.index+1]}
        },
        next2:function(){
            console.log("burp")
            console.log(this.states)
            if(!this.index>=(this.states.length-1)){
                this.index++;
                this.setStates();
            }
        },
        previous2:function(){

            if(!this.index==0){
                this.index--;
                this.setStates();
            }
        }

    };
    $scope.test={

    }
    for(i=0;i<$scope.template.test_objects.length;i++){
         var r = TestObjectService.get({id:$scope.template.test_objects[i]}, function(){
            $scope.test_objects.push(r);
            $scope.test_state.addTestObject(r);
            $scope.test_state.setStates();
        })
    }
    for(i=0; i < $scope.template.indicators.length; i++){
        var r = IndicatorService.get({id:$scope.template.indicators[i]}, function(){
            $scope.indicators.push(r);
            $scope.test_state.addIndicator(r);
            $scope.test_state.setStates();
        })
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