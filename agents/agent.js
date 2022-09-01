var current, timer, before;

function call(top1) {
    //remove active class
    $(".active").removeClass("active");
    //add active class
    //to make changes in dots
    //so the displayed agent
    //is indicated by the agent dots
    $(".dot" + current).addClass("active");
    $(".agent" + before).fadeOut(300, function() {
        $(".agent" + current).fadeIn(300);
    });
    $(".agents").animate({top: top1 + "%"});
    $(".skill-wrap" + before).hide();
    $(".skill-wrap" + current).show();
    clearInterval(timer);
    timer = setInterval('$(".next").click()', 6000);
}

function actionDot(number) {
    var diff = number - current;
    var howTop = diff * 100;
    before = current;
    current = number;
    call("-=" + howTop);
}

function nextAgent() {
    if (current < 10) {
        current++;
        before = current - 1;
        call("-=100");
    }
    else if (current == 10) {
        // if current is last agent
        // if user click next, set it back to first agent
        before = 10;
        current = 1;
        call("+=900");
    }
}

function prevAgent() {
    if (current > 1) {
        current--;
        before = current + 1;
        call("+=100");
    }
    else if (current == 1) {
        //if current is first agent
        //when user click prev set it to last agent
        before = 1;
        current = 10;
        call("-=900");
    }
}

$(document).ready(function() {
    //Set current to 1
    //So the one displayed when web is loaded first
    //Is the first agent
    current = 1;
    //set autoslide 6 seconds
    timer = setInterval('$(".next").click()', 6000);

    $(".next").click(function() {
        nextAgent();
    });

    $(".pre").click(function() {
        prevAgent();
    });

    $(".dots").on('click', 'img', function(e) {
        // get the class name of the dot that
        // user currently click
        var className = this.className;
        // get the number of class name (last character)
        // e.g. .dot7, get 7
        var dotNumber = parseInt(className.slice(-1));
        // there is only agent with last characater
        // of .dot img is 0 (number 10)
        // so when dotNumber is 0 it means 10
        if (dotNumber == 0) {
            dotNumber = 10;
        }
        // if the current and the dot clicked
        // is for the same agent
        // it will return something non-numeric
        // so validate that dotNumber is numeric
        if ($.isNumeric(dotNumber)) {
            actionDot(dotNumber);
        }
    });

    //similar to setting .dots img or .dots button
    //cursor to pointer in css
    $(".dots").on('mouseenter', 'img, button', function(e) {
        $(this).css('cursor', 'pointer');
    });

    $("body").keydown(function(e) {
        // when user press the right arrow key
        // will go to next agent
        if (e.keyCode == 39) {
            nextAgent();
        }
        // when user press the left arrow key
        // will go to previous agent
        else if (e.keyCode == 37) {
            prevAgent();
        }
    });

    // stop auto slide
    // until user click prev/next/agent dots
    $('.stop').click(function() {
        clearInterval(timer);
    });

    $('.skill-section').mouseenter(function() {
        // alert("Stop");
        clearInterval(timer);
    });

    $('.skill-section').mouseleave(function() {
        // alert("Stop");
        timer = setInterval('$(".next").click()', 6000);
    });

});