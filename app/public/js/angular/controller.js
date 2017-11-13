var app = angular.module('MyApp',[]);

app.controller('MyCon',function($scope,$http){
	$scope.index = function(){
	    $http({
	        method: 'GET',
	        url:'http://192.168.216.131:7002/' ,
	    }).then(function successCallback(response) {
	    		console.log(response.data.data.info);
	    		//$scope.index_data = ;
	        }, function errorCallback(response) {
	            throw('errorCallback')
	    });
	}
})
