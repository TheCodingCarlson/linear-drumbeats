var app = angular.module('DrummingApp', ['ui.bootstrap']);

app.controller('MainCtrl', ['$scope', function($scope) {
	
	var getRandomNumber = function() {
		return Math.ceil(Math.random() * 5);
	}

	$scope.getRandomArray = function() {
		$scope.arr = [];

		for(var i = 0; i < 8; i++) {
			$scope.arr.push(getRandomNumber());
		}
		return $scope.arr;
	}

}]);

