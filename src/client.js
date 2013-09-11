collabPaint = {};

(function() {

	var raphael = Raphael;
	var paper;

	collabPaint.initializeDrawingArea = function(drawingAreaElement) {
		var startX = null;
			var startY = null;
			var isDragging = false;

			paper = new Raphael(drawingAreaElement);

			$(document).mousedown(function(event) {
				isDragging = true;
				// TODO: eliminate offset calculation
				var pageOffset = drawingArea.offset();

				startX = event.pageX - pageOffset.left;
				startY = event.pageY - pageOffset.top;
			});
			$(document).mouseup(function(event) {
				isDragging = false;
			});

			var drawingArea = $(drawingAreaElement);
			drawingArea.mousemove(function(event) {
				var pageOffset = drawingArea.offset();

				var endX = event.pageX - pageOffset.left;
				var endY = event.pageY - pageOffset.top;

				if (startX !== null && isDragging) collabPaint.drawLine(startX, startY, endX, endY);

				startX = endX;
				startY = endY;
			});
	};

	collabPaint.drawLine = function(startX, startY, endX, endY) {
		paper.path("M" + startX + "," + startY + "L" + endX + "," + endY);
	};

})();