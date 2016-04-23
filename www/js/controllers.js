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
        current:{name:'',type:'',index:null},
        previous:{name:'',type:''},
        next:{name:'',type:''},
        index:0,
        states:[{name:'Generell Informasjon', type:'general_info'}, {name:'Virksomhet / Lokale', type:'virksomhet_lokale'}],
        addIndicator:function(ind){
            this.states.push(ind);
        },
        addTestObject:function(tobj){
            this.states.push(tobj);
        },
        setStates:function(){
            this.current=this.states[this.index];
            if(this.index==0){this.previous=''}else{this.previous=this.states[this.index-1]}
            if(this.index==(this.states.length-1)){this.next=''}else{this.next=this.states[this.index+1]}
                console.log("Setting state: " + this.states[this.index].type)
            console.log(this.states)
        },
        next2:function(){
            console.log("lenght: " + this.states.length + " index: " + this.index)
            console.log(this.states)
            if(!(this.index >= this.states.length-1)){
                this.index++;
                this.setStates();
                console.log("burp2")
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
        indicators:[],
        test_objects:[]
    }
    var t=0,t1=0;

    for(i=0;i<$scope.template.test_objects.length;i++){
        TestObjectService.get({id:$scope.template.test_objects[i]}, function(d){
            $scope.test_objects.push(d);
            var obj={name:d.name, type:'test_object', index:t}
            t++;
            $scope.test_state.addTestObject(obj);
            $scope.test_state.setStates();
        })
    }
    for(i=0; i < $scope.template.indicators.length; i++){
        IndicatorService.get({id:$scope.template.indicators[i]}, function(r){
            $scope.indicators.push(r);
            var obj={name:r.name, type:'indicator', index:t1}
            t1++;
            $scope.test_state.addIndicator(obj);
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