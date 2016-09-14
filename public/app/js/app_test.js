$(document).ready(function() {
	
	//Sound Clips

	var hihat = new Audio('../app/sound_clips/high_hat.wav');
	var snare = new Audio('../app/sound_clips/snare.wav');
	var kick = new Audio('../app/sound_clips/kick.wav');
	var highTom = new Audio('../app/sound_clips/high_tom.wav');
	var lowTom = new Audio('../app/sound_clips/low_tom.wav');

	var soundClipArr = [hihat, highTom, snare, lowTom, kick];
	var soundArr = [];

	//Helper Functions

	var getRandomNumber = function() {
		return Math.ceil(Math.random() * 5);
	};

	var getRandomArray = function() {
		var arr = [];

		for(var i = 0; i < 8; i++) {
			var num = getRandomNumber();
			arr.push([i + 1, num]);
			soundArr.push(num - 1);

		}
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

	var playBeat = function(key) {
		
		var count = 0;
		setInterval(function() {
			if(count < 8) {
				var currentSound = soundClipArr[soundArr[count]];
				currentSound.load();
				currentSound.play();
				count++;
			}
		}, 250)
		
	}


	//Change Icon Size Depending on Screen Width

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

	//Vue Instance

	new Vue({
		el: '#app',

		data: {
			pushedCreate: undefined,
			pushedClear: false,
			pushedPlay: true,
			test: undefined
		},

		methods: {

			create: function() {
				compare('.fa', getRandomArray());
				this.pushedCreate = true;
				this.pushedClear = false;
				$('.reg').css('border-top', '5px solid #75AF96');
				this.pushedPlay = false;
			},

			clear: function() {
				$('.fa').each(function() {
					$(this).animate({ opacity: 0 }, 500);
				});

				$('td').each(function() {
					$(this).css('border-right', '5px solid transparent');
				});

				clearTopBeams();

				$('.note-grouping').css('border-top', '5px solid transparent');

				this.pushedCreate = false;
				this.pushedClear = true;
				this.pushedPlay = true;

				soundArr = [];
			},

			play: function() {
				this.test = setInterval(playBeat, 2000);
			},

			stop: function() {
				clearInterval(this.test, 250);
				
				
			}
		}
	});
});