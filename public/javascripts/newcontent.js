var mark=true;
var id = $(".nid").text();
var img = document.getElementById("heart");
var content = document.getElementById("content");

$(".like").click(function () {
		var nextNode = $(this).next();
		var a = parseInt(nextNode.html());
		if (mark) {
		   a += 1;
		   nextNode.html(a);
		   img.src="/images/heart-fill.svg";
		   window.location.replace("/uploadthumb");
		   mark=false;
		} else {
			a -= 1;
			nextNode.html(a);
			img.src="/images/heart.svg";
			mark=true;
		}
	});

	content.onfocus = function() {
		this.placeholder = "";
	}