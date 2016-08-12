var app = angular.module('DrummingApp', ['ui.bootstrap']);

app.controller('MainCtrl', ['$scope', function($scope) {
	$scope.pushedClear = true;

	//Functions to create random beat
	var getRandomNumber = function() {
		return Math.ceil(Math.random() * 5);
	};

	var getRandomArray = function() {
		var arr = [];

		for(var i = 0; i < 8; i++) {
			arr.push([i + 1, getRandomNumber()]);
		}
		return arr;
	};

	var compare = function(elements, arr) {
		
		$(elements).each(function() {
			for(var i = 0; i < arr.length; i++) {
				var tableDataVal = $(this).data('gridId').toString();
				var arrVal = arr[i].toString();
				if(tableDataVal === arrVal) {
					$(this).animate({ opacity: 1 }, 500);
				}
			}
		});
	}

	$scope.getRandomBeat = function() {
		compare('.fa', getRandomArray());
		$scope.pushedCreate = true;
		$scope.pushedClear = false;
		
	};

	$scope.clear = function() {
		$('.fa').each(function() {
			$(this).animate({ opacity: 0 }, 500);
		});
		$scope.pushedCreate = false;
		$scope.pushedClear = true;
	};
}]);

