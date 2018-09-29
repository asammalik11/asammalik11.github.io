$(document).ready(function() {
	// Set quantified variables
	var sliderImageWidth = 720;
	var animationSpeed = 1000;

	// Get the currently active portfolio item so only its slider is affected
	var portfolioItemNum;
	// Stores the slideCount value at which the slider was closed on (make sure its initially set a non-starting image)
	var oldSlideCount = 2;
	var prevPortfolioItemNum = 1;

	$('.portfolio-item').click(function() {
		console.log('OldCount: ' + oldSlideCount);
		console.log('PreviousItem: ' + prevPortfolioItemNum);

		// Unbind previously accessed item's buttons
		$('#portfolioModal' + prevPortfolioItemNum + ' .slider-wrapper > .arrows > .left').unbind('click');
		$('#portfolioModal' + prevPortfolioItemNum + ' .slider-wrapper > .arrows > .right').unbind('click');

		// Store the portfolio-item's id (i.e. category number that was clicked on)
		portfolioItemNum = $(this).index() + 1;

		slideCount = 1; // Image number slider starts at
		descriptionCount = slideCount;
		console.log('Load: ' + slideCount);

		// Set variables to cache the DOM tree parts that are needed 
		// (makes performance faster since the program doesn't have to go through the entire tree everytime)
		portfolioId = '#portfolioModal' + portfolioItemNum;
		$sliderWrapper = $(portfolioId + ' .slider-wrapper');
		$slider = $sliderWrapper.find('.slides');
		$slides = $slider.find('.slide');

		// Total number of images in the slider (-1 b/c first image appears twice)
		totalImages = $slides.length - 1;
		if (totalImages == 0) totalImages = 1;

		// console.log("Item No.: " + portfolioId);

		$arrowsWrapper = $(portfolioId + ' .slider-wrapper > .arrows');
		$leftArrow = $arrowsWrapper.find('.left');
		$rightArrow = $arrowsWrapper.find('.right');

		$imageNumber = $sliderWrapper.find('.image-number');

		// Cache DOM tree for the description part
		$descriptions = $(portfolioId + ' .description-wrapper > .descriptions');

		// Functions to show/hide the arrow buttons
		function showArrows() {
			$leftArrow.fadeIn();
	    	$rightArrow.fadeIn();
		}

		function hideArrows() {
			$leftArrow.fadeOut();
	    	$rightArrow.fadeOut();
		}

		// Hide and show functions for descriptions
		function hideDescription() { $descriptions.find('.description:nth-child(' + descriptionCount + ')').fadeOut(animationSpeed); }
		function showDescription() { $descriptions.find('.description:nth-child(' + descriptionCount + ')').fadeIn(animationSpeed); }

		// Function to call when screen size changes
	    var windowSizeChange = function() {
	    	windowWidth = $( window ).width();

	    	// Change the width variable to compensate for slider's width change when screen is too small
	    	if (windowWidth < 360) {
	    		wrapperWidth = windowWidth;
	    		wrapperHeight = Math.floor(wrapperWidth / 1.8);

	    		$sliderWrapper.css('width', wrapperWidth);
	    		$slider.children().css('width', wrapperWidth);
	    		$slider.css('width', wrapperWidth*(totalImages+1));
	    		$imageNumber.css('width', wrapperWidth);

	    		$sliderWrapper.css('height', wrapperHeight);
	    		$slider.css('height', '100%');
	    		$slider.children().css('height', '100%');

	    		sliderImageWidth = wrapperWidth;
	    	}
	    	else if (windowWidth < 600) sliderImageWidth = 360;
	    	else if (windowWidth < 768) sliderImageWidth = 540;
	    	else sliderImageWidth = 720;

	    	// Remove all the style attributes from slider-wrapper when the window size is greater than 360
	    	// (This is so the styles defined in the slider.css files could take affect)
	    	if (windowWidth >= 360) {
	    		$sliderWrapper.removeAttr("style");
	    		$sliderWrapper.find("*").removeAttr("style");
	    	}
	    }
	    windowSizeChange();
	    // Call windowSizeChange function when screen size is changed dynamically
	    $(window).resize(windowSizeChange);

		// Make sure slider and description are on the first image on load
		var initialLoad = function() {
		    // Set the margin of the slider so initial image (set above) shows first
			// initialImageMargin = (slideCount - 1) * sliderImageWidth;
			// $slider.css('margin-left',initialImageMargin);

			// Hide all the descriptions; only show the initial slide's description
			$descriptions.children().css('display','none');
			$descriptions.find('.description:nth-child(' + descriptionCount + ')').css('display','initial');

			// Initially set image-number text to '1/<number of images in slider>'
			$imageNumber.text('1/'+totalImages);
		}();

		// Update the image-num section (when one of the arrows is triggered)
		function updateImageNum() {
			$imageNumber.text(descriptionCount+'/'+totalImages);
		}

		// Function to go the next image in the slider
		function nextImage() {
			// Check to see if the slider is on the last image
			// If it is, change the left margin of the slider to 0 (i.e. margin-left of the first image)
			var lastImageCheck = function() {
				if (slideCount == $slides.length) {
					slideCount = 1;
					$slider.css('margin-left','0');
				}
			}

			// Hide the current item's description right away 
			// (BEFORE reseting counter b/c if it's currently on the last image, 
			// it will reset to the first image - which has a different index value)
			hideDescription();
			lastImageCheck();

			// PARTIALLY SLIDE STUFF

			// // Store the width and current margin-left of the slider for calculations below
			// // NOTE: animationDistance is negative b/c we want the slider to move left when the left arrow is clicked
			// animationDistance = width * -1;
			// currentSliderMargin = parseInt($slider.css('margin-left'));

			// // Calculate how much of the current (left) image and the next (right) image are part of the total width
			// sizeImgRight = Math.abs(currentSliderMargin) % width;
			// sizeImgLeft = width - sizeImgRight;

			// // If the current (left) image is taking up the entire width (i.e. sizeImgRight == 0), then keep (animationDistance = width)
			// // Otherwise, calculate the new animationDistance based on which image is showing more
			// if (sizeImgRight != 0) {
			// 	// If there's more of the right image then the left, move the slider left (negative); otherwise move it right (positive)
			// 	if (sizeImgRight >= sizeImgLeft) animationDistance = -1 * sizeImgLeft;
			// 	else animationDistance = sizeImgRight;
			// }

			animationDistance = sliderImageWidth;

			$slider.animate({'margin-left':'-='+animationDistance}, animationSpeed, function() {
				// After the animation ends, increase counter and check to see if its on the last image
				slideCount++;
				lastImageCheck();

				descriptionCount++;
				if (descriptionCount > $slides.length-1) descriptionCount = 1;
				
				// Show the next item's description
				showDescription();

				// Update the image-num section after the image changes
				updateImageNum();

				console.log("Left: " + slideCount);

				// Store the slide and item numbers of the current item to unbind when next item is opened
				prevPortfolioItemNum = portfolioItemNum;
				oldSlideCount = slideCount;
			});
		}

		// Function to go the previous image in the slider
		function prevImage() {
			// Check to see if slider is on the first image (which it is initially)
			// If it is, change the left margin of the slider to (number of images - 1) * sliderImageWidth * -1 (i.e. margin-left of the last image)
			var firstImageCheck = function() {
				if (slideCount == 1) {
					slideCount = totalImages + 1; // +1 to compensate for the repetition of the first image
					lastPicMargin = sliderImageWidth * (totalImages) * -1;
					$slider.css('margin-left', lastPicMargin);
				}
			}

			// Hide the current item's description
			// (BEFORE reseting counter b/c if it's currently on the first image, 
			// it will reset to the last image - which has a different index value)
			hideDescription();
			firstImageCheck();

			$slider.animate({'margin-left':'+='+sliderImageWidth}, animationSpeed, function() {
				// After the animation ends, decrease counter and check to see if its on the first image
				slideCount--;
				firstImageCheck();

				descriptionCount--;
				if (descriptionCount < 1) descriptionCount = $slides.length-1;
				
				// Show the next item's description
				showDescription();

				// Update the image-num section after the image changes
				updateImageNum();

				console.log("Right: " + slideCount);

				// Store the slide and item numbers of the current item to unbind when next item is opened
				prevPortfolioItemNum = portfolioItemNum;
				oldSlideCount = slideCount;
			});
		}

		// Show arrows only when slider-wrapper is hovered over
		// (NOTE: This doesn't affect the sliders with a single image b/c we're only hiding the arrows, not the wrapper they're inside - 
		// whereas for single image sliders, we hide the wrapper itself and the display property of its children doesn't matter)
		$sliderWrapper.mouseover(function() { showArrows(); });
		$sliderWrapper.mouseleave(function() { hideArrows(); });


		if (totalImages > 1) {
			// Method for handling finger swipes for mobile users - Using the swipe plugin
			$slider.swipe( {
		        //Generic swipe handler for all directions
		        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
		            if (direction === 'right') prevImage();
		            else if (direction === 'left') nextImage();
		        },
		        allowPageScroll: "vertical",
		        threshold:0
		    });
		}

		// Runs when the left arrow is clicked
		$leftArrow.click(function() {
			prevImage();
		});


		// Runs when the right arrow is clicked
		$rightArrow.click(function() {
			nextImage();
		});

	});

});