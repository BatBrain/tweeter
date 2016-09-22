$(document).ready(readyFn);

function readyFn(jQuery) {

	console.log("Document ready!");
	$("#newTweetText").on("input", function() {
		var length = $(this).val().length
		if (length > 140) {
			$("#newTweetCounter").css('color', 'red');
			$("#newTweetCounter").text(`-${length - 140}`);
		} else {
			$("#newTweetCounter").css('color', 'black');
			$("#newTweetCounter").text(`${140 - length}`)
		}
	});

};

