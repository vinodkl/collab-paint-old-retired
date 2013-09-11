describe("Drawing area", function(){
	it('should be initialized in predefined div', function() {
		var div = document.createElement("div");
		div.setAttribute("id", "collab-drawingArea");
		document.body.appendChild(div);

		collabPaint.initializeDrawingArea("collab-drawingArea");

		var tagName = $(div).children()[0].tagName;
		expect(tagName).to.equal("svg");
	});
});