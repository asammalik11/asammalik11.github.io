/**
 * Created by Saim on 3/26/2015.
 */
$(document).ready(function() {
    // Hide/Show full name at the top-left corner of the page
    $('#initials').mouseover(function() {
        $('.fullName').show("fade");
    });

    $('#initials').mouseleave(function() {
        $('.fullName').hide("fade");
    });


    // Function to call when screen size changes
    var windowSizeChange = function() {
        // Calculate boxes' height in My Work section
        categoriesBox = $('#portfolio .categories_wrapper');
        boxWidth = categoriesBox.width();
        heightWidthRatio = 36/26;
        boxHeight = boxWidth/heightWidthRatio;
        categoriesBox.height(boxHeight);

        // Vertically center the category titles (i.e. make top/bottom padding: [Box's height - Title's height] / 2)
        categoryTitle = $('.categories_wrapper > .category');
        categoryTitleHeight = categoryTitle.height();
        paddingValue = (boxHeight - categoryTitleHeight)/2;
        categoryTitle.css('padding',paddingValue+'px 0');
    }

    // First line is for when the page loads
    // Second line if for when screen size is changed artificially (i.e. changing the browsers size)
    windowSizeChange();
    $(window).resize(windowSizeChange);

    var circleDrawn = false;

    // Function to call when user scrolls the window
    $(window).scroll(function() {    
        if ($(window).scrollTop() > 80) {
            $('#mainTopBtn').show('fade');
        } else {
            $('#mainTopBtn').hide('fade');
        }

        if (($(window).scrollTop() > 2000) && (circleDrawn == false)) {
            drawCircle("#progGPA",85);
            circleDrawn = true;
        }
    });

    // $('#topBtn').click(function() {
    //     $("html, body").animate({scrollTop:0}, 1500, "easeOutBounce");
    // });



/* Progress Bar Code Start */

    var easeOutCirc = function (t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t*t) + b;
    };

    var getAngle = function(percent) {
        return 360 * (percent/100);
    }

    var getArcCoord = function(centerX,centerY,radius,angleDeg) {
        var angleRad = angleDeg * Math.PI / 180.0;

        var x = centerX - radius * Math.cos(angleRad);
        var y = centerY + radius * Math.sin(angleRad);

        // console.log("X: "+x);
        // console.log("Y: "+y);

        return [y,x];
    }

    
    var percentFull = 0;
    var count = 0;

    var drawCircle = function(progressId,percentValue) {

        var interval = setInterval(function() {
                var angle = getAngle(percentFull);

                var xyCoords = getArcCoord(104,104,100,angle);
                var arcX = xyCoords[0];
                var arcY = xyCoords[1];

                var flagVal = (angle <= 180) ? 0 : 1;

                $(progressId).attr("d",
                        "M104,104 l0,-100 A100,100 0 "+flagVal+",1 "+arcX+","+arcY);

                if (percentFull < 10) $(progressId).attr("fill","#0B393B");
                else if (percentFull < 30) $(progressId).attr("fill","#13686B");
                else if (percentFull < 60) $(progressId).attr("fill","#1F9CA1");
                else $(progressId).attr("fill","#5F9EA0");

                console.log(percentValue);

                percentFull = easeOutCirc(count,1,99,100);

                count++;

                // percentFull = Math.pow(count2,(1/3)) * 15;

                if (!(percentFull < percentValue)) clearInterval(interval);
            }, 10);

    }


        // console.log("Flag: "+flagVal);

/* Progress Bar Code End */

});

function removeFocus(name1) {
    $("#"+name1).blur();
}

// function removeFocus2() {
//     $("#myWork").blur();
// }
