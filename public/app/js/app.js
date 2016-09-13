var app = angular.module('DrummingApp', ['ui.bootstrap', 'AudioService']);

app.controller('MainCtrl', ['$scope', 'audio', function($scope, audio) {


	$scope.pushedClear = true;

	var soundsArr = undefined;
	

	var getRandomNumber = function() {
		return Math.ceil(Math.random() * 5);
	};

	var getRandomArray = function() {
		var arr = [];

		for(var i = 0; i < 8; i++) {
			arr.push([i + 1, getRandomNumber()]);
		}
		soundsArr = arr;
		return arr;
	};

	var drawStems = function(coordinate) {

		var col = coordinate[0];
		var row = coordinate[1];

		if(col != 1 && col != 5) {
			$('.phantom-' + col).css({ borderTop: '5px solid #75AF96' });
		}

		$('.phantom-' + col).css({ borderRight: '5px solid #75AF96' });



		if(row > 1) {
			for(var i = row - 1; i > 0; i--) {
				$('.col-' + col + '.row-' + i).css({ borderRight: '5px solid #75AF96' });
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

				}
			}
		});
	}

	var clearTopBeams = function() {
		for(var i = 2; i < 9; i++) {
			if(i !== 5) {
				$('.phantom-' + i).css({ borderTop: '5px solid transparent' });
			}
		};
	}

	$scope.getRandomBeat = function() {
		compare('.fa', getRandomArray());
		$scope.pushedCreate = true;
		$scope.pushedClear = false;
		$('.reg').css('border-top', '5px solid #75AF96');
		
	};

	$scope.playBeat = function() {
		audio.play('../sound_clips/high_hat.wav');	
	}

	$scope.clear = function() {
		$('.fa').each(function() {
			$(this).animate({ opacity: 0 }, 500);
		});

		$('td').each(function() {
			$(this).css('border-right', '5px solid transparent');

		});

		clearTopBeams();

		$('.note-grouping').css('border-top', '5px solid transparent');

		$scope.pushedCreate = false;
		$scope.pushedClear = true;
	};

	var windowWidth = $(window).width();

	var iconResize = function(width) {
		if(width < 450) {
			$('.fa').each(function() {
				$(this).removeClass('fa-2x').addClass('fa-lg');
			});
		} else if(width > 450) {
			$('.fa').each(function() {
				$(this).removeClass('fa-lg').addClass('fa-2x');
			});
		}
	};

	iconResize(windowWidth);

	$(window).resize(function() {
		var newWindowWidth = $(window).width();

		iconResize(newWindowWidth);
	});
}]);