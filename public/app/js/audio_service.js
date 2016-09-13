angular.module('AudioService', [])
	.factory('audio', ['$document', function($document) {
		var audioElement = $document[0].getElementById('audio');
  		return {
    		audioElement: audioElement,

	    	play: function(filename) {
	        	audioElement.src = filename;
	        	audioElement.play();
	    	}
  		}		
	}]);