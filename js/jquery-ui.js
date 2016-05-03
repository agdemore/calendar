var $ = require('jquery');

var originWidth = 900;
var originHeight = 800;


$(document).on('click', ".message", function() {
    if ($(window).width() < originWidth) {
        $('.left-menu').addClass('hide-element');
        $('.nav-expand').toggleClass('open');
    }
    user.userId = $(this).attr('user_id');
    chat.chatId = $(this).attr('chat_id');
    $(this).attr('pagination', 50);
    //add method to delete class unread message
});

// to display chat window on start
var appWidth = $(window).width();
var appHeight = $(window).height();

$('.app-calendar-inner-day').outerWidth(appWidth/7);
$('.app-calendar-inner-month-day').outerWidth(appWidth/7);

$('.app-calendar-inner-month-day').outerHeight((appHeight - 77 - 70)/6);


$(window).resize(function() {
    var wWidth = $(window).width();
    var wHeight = $(window).height();

    $('.app-calendar-inner-day').outerWidth(wWidth/7);
    $('.app-calendar-inner-month-day').outerWidth(wWidth/7);

    $('.app-calendar-inner-month-day').outerHeight((wHeight - 77 - 70)/6);
});

$('.show-left-menu').click(function() {
    $('.left-menu').toggleClass('hide-element');
});
$(".nav-expand").on('click', function(e){

  e.preventDefault();

  $(this).toggleClass('open');

});
