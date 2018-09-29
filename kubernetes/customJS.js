$(document).ready(function() {
	var win;

	var windowSizeChange = function() {
		win = $( window ).width();
		
		// if (win < 665) { 
		// 	$('.floatBox > h3').css({'font-size':'16px', 'line-height':'24px'});
		// }
		// else if (win < 1115) {
		// 	$('.floatBox > h3').css({'font-size':'20px', 'line-height':'32px'});
		// }
		// else {
		// 	$('.floatBox > h3').css({'font-size':'24px', 'line-height':'36px'});
		// }

		// // Side by side
		// if (win > 930) {
		// 	$('#firstLink').css({'float':'left'});
		// 	$('#secondLink').css({'margin-top':'0px'});
		// 	$('#secondLink > a').css({'margin-left':'40px'})
		// } 
		// // Top and bottom
		// else {
		// 	$('#firstLink').css({'float':'none'});
		// 	$('#secondLink').css({'margin-top':'20px'});
		// 	$('#secondLink > a').css({'margin-left':'0px'})
		// }

		// Change the height of the image in the right small floatbox so left and right small floatboxes have the same height
		var heightSmallLeft = $('.leftSide').height();
		$('#smallRightImage').height(heightSmallLeft-61);

		// Change the height of the background in FAQ based on height on Floatbox with the content
		var heightFAQContent = $('#faqContent').height();
		$('#faqContentBG').height(heightFAQContent+300);

		// Change height of the small floatboxes to the bigger of the two (in party.html)
		var heightPartyLeft = $('#partyLeft').height();
		var heightPartyRight = $('#partyRight').height();
		var bigger;

		if (heightPartyLeft >= heightPartyRight) bigger = heightPartyLeft;
		else bigger = heightPartyRight;

		$('#partyLeft').height(bigger);
		$('#partyRight').height(bigger);

		// console.log(bigger);
	}

	windowSizeChange();

	$(window).resize(windowSizeChange);

});