'use strict';

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
// var appWidth = $(window).outerWidth(true) - $('#app-left-menu').outerWidth(true);
// var appHeight = $(window).height();
//
// const nameOfWeekDayBox = $('.app-calendar-inner-day');
// const dayOfMonthBox = $('.app-calendar-inner-month-day');
//
// nameOfWeekDayBox.innerWidth(appWidth/7);
// dayOfMonthBox.outerWidth(appWidth/7, true);
// dayOfMonthBox.outerHeight((appHeight - 70 - 57)/6, true);
//
//
// $(window).resize(function() {
//     var wWidth = $(window).outerWidth(true) - $('#app-left-menu').outerWidth(true);
//     var wHeight = $(window).height();
//
//     nameOfWeekDayBox.innerWidth(appWidth/7);
//     dayOfMonthBox.outerWidth(appWidth/7, true);
//     dayOfMonthBox.outerHeight((wHeight - 70 - 57)/6, true);
// });

// let h = $('.day-background-inner').innerHeight();
// let t = $('.day-inner-hours').height(h - $('.day-inner-title').height())
// console.log(t);

$('.show-left-menu').click(function() {
    $('.left-menu').toggleClass('hide-element');
});
$(".nav-expand").on('click', function(e){

  e.preventDefault();

  $(this).toggleClass('open');

});
