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
// var appWidth = $(window).width();
// var appHeight = $(window).height();
//
// const nameOfWeekDayBox = $('.app-calendar-inner-day');
// const dayOfMonthBox = $('.app-calendar-inner-month-day');
//
// nameOfWeekDayBox.outerWidth(true);
// dayOfMonthBox.outerWidth(true);
//
// nameOfWeekDayBox.outerWidth(appWidth/7, true);
// dayOfMonthBox.outerWidth(appWidth/7, true);
// dayOfMonthBox.outerHeight((appHeight - 70 - 57)/6, true);
//
//
// $(window).resize(function() {
//     var wWidth = $(window).width();
//     var wHeight = $(window).height();
//
//     nameOfWeekDayBox.outerWidth(wWidth/7, true);
//     dayOfMonthBox.outerWidth(wWidth/7, true);
//     dayOfMonthBox.outerHeight((wHeight - 70 - 57)/6, true);
// });

$('.show-left-menu').click(function() {
    $('.left-menu').toggleClass('hide-element');
});
$(".nav-expand").on('click', function(e){

  e.preventDefault();

  $(this).toggleClass('open');

});
