var app = angular.module('DrummingApp', ['ui.bootstrap']);

app.controller('MainCtrl', ['$scope', function($scope) {
	
	var getRandomNumber = function() {
		return Math.ceil(Math.random() * 5);
	};

	var getRandomArray = function() {
		var arr = [];

		for(var i = 0; i < 8; i++) {
			arr.push([i + 1, getRandomNumber()]);
		}
		console.log(arr);
		return arr;
	};

	var compare = function(tableRow, arr) {
		
		$(tableRow).each(function(index) {
			
			for(var i = 0; i < arr.length; i++) {
				var tableDataVal = $(this).data('gridId').toString();
				var arrVal = arr[i].toString();

				if(tableDataVal === arrVal) {
					$(this).css('visibility', 'visible');
				}
			}
		});
	}

	$scope.getRandomBeat = function() {
	
		compare('.fa', getRandomArray());
		
	};
}]);

