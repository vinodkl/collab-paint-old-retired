collabPaint = {};

(function() {

	var raphael = Raphael;
	var paper;

	collabPaint.initializeDrawingArea = function(drawingAreaId) {
		paper = new raphael(drawingAreaId, 200, 200);
	};

	collabPaint.drawLine = function(startX, startY, endX, endY) {
		paper.path("M1,1L2,2");
	};

})();