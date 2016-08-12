var app = angular.module('DrummingApp', ['ui.bootstrap']);

app.controller('MainCtrl', ['$scope', function($scope) {
	$scope.pushedClear = true;
	

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

	var drawStems = function(coordinate) {

		var col = coordinate[0];
		var row = coordinate[1];

		$('.phantom-' + col).css('border-right', '5px solid #75AF96');

		if(row > 1) {
			for(var i = row - 1; i > 0; i--) {
				$('.col-' + col + '.row-' + i).css('border-right', '5px solid #75AF96');
			}
		}	
	}


	var compare = function(elements, arr) {
		
		$(elements).each(function() {
			for(var i = 0; i < arr.length; i++) {
				var tableDataVal = $(this).data('gridId').toString();
				var arrVal = arr[i].toString();
				if(tableDataVal === arrVal) {
					$(this).animate({ opacity: 1 }, 500);

					drawStems(arrVal.split(','));
					console.log(arrVal);

				}
			}
		});
	}

	$scope.getRandomBeat = function() {
		compare('.fa', getRandomArray());
		$scope.pushedCreate = true;
		$scope.pushedClear = false;
		$('.note-grouping').css('border-top', '5px solid #75AF96');
		
	};

	$scope.clear = function() {
		$('.fa').each(function() {
			$(this).animate({ opacity: 0 }, 500);
		});

		$('td').each(function() {
			$(this).css('border-right', '5px solid transparent');
		});

		$('.note-grouping').css('border-top', '5px solid transparent');

		$scope.pushedCreate = false;
		$scope.pushedClear = true;
	};
}]);

