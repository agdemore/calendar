'use strict';


let React = require('react');
let ReactDom = require('react-dom');
let Promise = require('promise');
let fs = require('fs');
let jQuery = require('jquery');


const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}
const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}


let LeftMenu = React.createClass({
    appShowSwitcher: function (menu) {
        if (menu == 'day') {
            ReactDom.render(<DaySingle />, document.getElementById('app-calendar'))
        } else if (menu == 'month') {
            ReactDom.render(<MonthCalendar />, document.getElementById('app-calendar'));
        } else if (menu == 'year') {

        } else {
            return;
        }
    },
    render: function () {
        let showDay = this.appShowSwitcher.bind(this, 'day');
        let showMonth = this.appShowSwitcher.bind(this, 'month');
        let showYear = this.appShowSwitcher.bind(this, 'year');

        return (
            <div className='app-left-menu-inner'>
                <div className='app-left-menu-inner-buttons'>
                    <div className='app-left-menu-inner-buttons-inner' onClick={showDay}>
                        <div><span>D</span></div>
                    </div>
                    <div className='app-left-menu-inner-buttons-inner' onClick={showMonth}>
                        <div><span>M</span></div>
                    </div>
                    <div className='app-left-menu-inner-buttons-inner' onClick={showYear}>
                        <div><span>Y</span></div>
                    </div>
                </div>
            </div>
        );
    }
});


let MonthCalendar = React.createClass({
    getInitialState: function () {
        return {
            month: '',
            day: '',
            year: '',
            date: ''
        };
    },
    componentDidMount: function() {
        let now = new Date();
        let current_mounth = now.getMonth();
        let current_date = now.getDate();
        let current_day = now.getDay();
        let current_year = now.getFullYear();
        this.setState({
            month: current_mounth,
            day: days[current_day],
            year: current_year,
            date: current_date
        })
    },
    switchMonth: function(direction, event) {
        if (direction == 'left') {
            if (this.state.month == 0) {
                this.setState({
                    month: (this.state.month + 11) % 12,
                    year: this.state.year - 1
                });
            } else {
                this.setState({
                    month: (this.state.month + 11) % 12
                });
            }
        } else {
            if (this.state.month == 11) {
                this.setState({
                    month: (this.state.month + 1) % 12,
                    year: this.state.year + 1
                });
            } else {
                this.setState({
                    month: (this.state.month + 1) % 12
                })
            }
        }
    },
    today: function(event) {
        let now = new Date();
        let current_mounth = now.getMonth();
        let current_year = now.getFullYear();
        this.setState({
            month: current_mounth,
            year: current_year
        });
    },
    render: function () {
        let left = this.switchMonth.bind(this, 'left');
        let createView = <MonthBox month={this.state.month} year={this.state.year}/>

        return (
            <div className='app-inner'>
                <div className='app-top-inner'>
                    <div className='app-top-inner-date'>
                        <span>{months[this.state.month]} {this.state.year}</span>
                    </div>
                    <div className='app-top-inner-date'>
                        <button onClick={left}>&lsaquo;</button>
                        <button onClick={this.today}>today</button>
                        <button onClick={this.switchMonth}>&rsaquo;</button>
                    </div>
                </div>
                <div className='calendar'>
                    {createView}
                </div>
            </div>
        );
    }
});

let MonthBox = React.createClass({
    setDaysSize: function () {
        var appWidth = jQuery(window).outerWidth(true) - jQuery('#app-left-menu').outerWidth(true);
        var appHeight = jQuery(window).height();

        const nameOfWeekDayBox = jQuery('.app-calendar-inner-day');
        const dayOfMonthBox = jQuery('.app-calendar-inner-month-day');

        nameOfWeekDayBox.innerWidth(appWidth/7);
        dayOfMonthBox.outerWidth(appWidth/7, true);
        dayOfMonthBox.outerHeight((appHeight - 70 - 57)/6, true);


        jQuery(window).resize(function() {
            var wWidth = jQuery(window).outerWidth(true) - jQuery('#app-left-menu').outerWidth(true);
            var wHeight = jQuery(window).height();

            nameOfWeekDayBox.innerWidth(wWidth/7);
            dayOfMonthBox.outerWidth(wWidth/7, true);
            dayOfMonthBox.outerHeight((wHeight - 70 - 57)/6, true);
        });
    },
    makeCalendar: function(month, year) {
        let lastDayOfMonth = new Date(year, month + 1,0).getDate();
        let date = new Date(year, month, lastDayOfMonth);
        let weekDayOfLastMonthDay = new Date(year, month, lastDayOfMonth).getDay();
        let weekDayOfFirstMonthDay = new Date(year, month, 1).getDay();
        let now = new Date();
        let dd = [];

        let lastDay = new Date(year, month, 0).getDate();

        console.log(lastDay);
        if (weekDayOfFirstMonthDay != 0) {
            for (let i = weekDayOfFirstMonthDay ; i > 1 ; i--)
                dd.push(['prev', lastDay - i + 2]);
        } else {
            for (let  i = 6; i > 0; i--)
                dd.push(['prev', lastDay - i + 2]);
        }

        for (let  i = 1; i <= lastDayOfMonth; i++) {
            dd.push(['cur',i]);
        }

        let l = dd.length;
        for (let i = 1; i <= 42 - l; i++)
            dd.push(['next', i])
        return dd
    },
    render: function() {
        let i = 0;
        let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        console.log('month box',this.props);

        let daysInMonth = daysInMonth = this.makeCalendar(this.props.month, this.props.year);

        let m = this.props.month,
            y = this.props.year;

        this.setDaysSize();

        return (
            <div className="app-calendar-inner">
                <div className="app-calendar-inner-days">
                    {days.map(function(day){
                        return <div className='app-calendar-inner-day' key={day}>{day.substring(0,3)}</div>
                    })}
                </div>
                <div className="app-calendar-inner-month-days">
                    {daysInMonth.map(function(day){
                        i += 1;
                        let divClassName = '';
                        if (day[1] == new Date().getDate() && day[0] == 'cur' && m == new Date().getMonth() && y == new Date().getFullYear()) {
                            divClassName = 'app-calendar-inner-month-day today';
                        } else {
                            divClassName = 'app-calendar-inner-month-day ' + day[0];
                        }
                        let newM = m,
                            newY = y;
                        if (day[0] == 'next') {
                            newM = m + 1;
                            if (newM > 11) {
                                newM = 0;
                                newY = y + 1;
                            }
                        } else if (day[0] == 'prev') {
                            newM = m - 1;
                            if (newM < 0) {
                                newM = 11;
                                newY = y - 1;
                            }
                        }
                        return <div className={divClassName} key={i}>
                            <DayBox day={day[1]} month={newM} year={newY} />
                        </div>
                    })}
                </div>
            </div>
        );
    }
});

//------------ NEED TO DO --------------------
let DayBox = React.createClass({
    getInitialState: function () {
        return {
            events: []
        };
    },
    onDoubleClick: function (e) {
        // only left mouse button
        // if (e.button !== 0) return;
        // // ReactDom.render(<Event />, document.getElementById('day-events'))
        // let ev = React.createElement(Event);
        // console.log(ev);
        // $(ReactDom.findDOMNode(this)).append(ev);  //"<div class='day-tip'>New event</div>");
        // e.stopPropagation();
        // e.preventDefault();
        console.log(this.state.events);
        let newEvent = this.state.events;
        newEvent.push('new');
        console.log(newEvent);
        this.setState({events: newEvent})
    },
    addEvent: function () {
        // choose local or not
    },
    loadEventsFromServer: function () {
        // load events from server
    },
    render: function() {
        let evs = this.state.events;
        return (
            <div className="calendar-day" onDoubleClick={this.onDoubleClick} >
                <div className='day-inner'>
                    <span>{this.props.day}</span>
                </div>
                <div className='day-events'>
                    {evs.map(function (event) {
                        return (
                            <div>
                                <Event e={event} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});
//------------ NEED TO DO --------------------
let NewEventForm = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            text: '',
            dateStart: '',
            dateEnd: '',
            place: ''
        };
    },
    handleTitleChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleCommentChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Title..."
                    value={this.state.author}
                    onChange={this.handleTitleChange}
                />
                <input
                    type="text"
                    placeholder="Comment..."
                    value={this.state.text}
                    onChange={this.handleCommentChange}
                />
                <input
                    type="date"
                    placeholder="Comment..."
                    value={this.state.text}
                    onChange={this.handleCommentChange}
                />
                <input
                    type="date"
                    placeholder="Comment..."
                    value={this.state.text}
                    onChange={this.handleCommentChange}
                />
                <input type="submit" value="Add" />
            </form>
        );
    }
});

//------------ NEED TO DO --------------------
let Event = React.createClass({
    render: function() {
        return (
            <div className="day-tip">
                {this.props.e}
            </div>
        );
    }
});


let DaySingle = React.createClass({
    getInitialState: function () {
        let now = new Date();
        return {
            month: now.getMonth(),
            day: now.getDate(),
            year: now.getFullYear()
        };
    },
    slide: function (direction) {
        let dim = {0:31, 1:28, 2:31, 3:30, 4:31, 5:30, 6:31, 7:31, 8:30, 9:31, 10:30, 11:31}
        if ((this.state.year - 2016) % 4 == 0) {
            dim[1] = 29;
        } else {
            dim[1] = 28;
        }
        console.log(dim[1]);
        if (direction == 'left') {
            let prevDay = this.state.day - 1;
            let prevMonth = this.state.month;
            let prevYear = this.state.year;
            if (prevDay < 1) {
                prevMonth = prevMonth - 1;
                if (prevMonth < 0) {
                    prevMonth = 11;
                    prevYear = prevYear - 1;
                }
                prevDay = dim[prevMonth];
            }
            this.setState({
                year: prevYear,
                month: prevMonth,
                day: prevDay
            });
        } else {
            let nextDay = this.state.day + 1;
            let nextMonth = this.state.month;
            let nextYear = this.state.year;
            if (nextDay > dim[this.state.month]) {
                nextDay = 1;
                nextMonth = nextMonth + 1;
                if (nextMonth > 11) {
                    nextMonth = 0;
                    nextYear = nextYear + 1;
                }
            }
            this.setState({
                year: nextYear,
                month: nextMonth,
                day: nextDay
            });
        }
    },
    setSize: function () {
        let h = jQuery('.day-background-inner').innerHeight();
        let t = jQuery('.day-inner-hours').height(h - jQuery('.day-inner-title').height())
        console.log(t);
    },
    render: function () {
        let left = this.slide.bind(this, 'left');
        let hours24 = [];
        for (var i = 0; i < 24; i++) {
            hours24.push(i);
        }
        let d = this.state.day,
            m = this.state.month,
            y = this.state.year;

        this.setSize();

        return (
            <div className='day-background'>
                <div className='day-background-inner'>
                    <div className='day-inner-title'>
                        <div className='arrow' onClick={left}>&lsaquo;</div>
                        <div className='day-inner-title-inner'>
                            {this.state.day} {months[this.state.month]} {this.state.year}
                        </div>
                        <div className='arrow' onClick={this.slide}>&rsaquo;</div>
                    </div>
                    <div className='day-inner-hours'>
                        {hours24.map(function(hour) {
                            return (
                                <div className='day-hour' key={hour}>
                                    <HourBox hour={hour} day={d} month={m} year={y} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
});


let HourBox = React.createClass({
    createEvent: function () {

    },
    render: function () {
        let hr = React.createElement('hr');
        return (
            <div className='day-hour-inner'>
                <div className='day-time'>{this.props.hour}:00</div>
                <div className='day-event' onDoubleClick={this.createEvent}>
                    {hr}
                </div>
            </div>
        )
    }
});

ReactDom.render(<LeftMenu />, document.getElementById('app-left-menu'));
ReactDom.render(<MonthCalendar />, document.getElementById('app-calendar'));

//
// let DialogsBox = React.createClass({
//     getDialogsFromServer: function(offset) {
//         apiHelper.getDialogs(offset)
//             .then(dialogs => {
//                 let d = this.state.data.concat(dialogs)
//                 this.setState({data: d});
//             });
//     },
//     getInitialState: function() {
//         return {data: []};
//     },
//     componentDidMount: function() {
//         this.getDialogsFromServer('0');
//         jQuery('#app-container-dialogs').on('scroll', this.handleScroll);
//     },
//     componentWillUnmount: function () {
//         jQuery('#app-container-dialogs').empty();
//     },
//     handleScroll: function() {
//         let elem = jQuery('#app-container-dialogs')
//         if (elem.scrollTop() + elem.innerHeight()  == elem[0].scrollHeight) {
//             let page = jQuery('.app-container-inner').attr('data-pagination')
//             this.getDialogsFromServer(page);
//             console.log(this.state.data);
//             jQuery('.app-container-inner').attr('data-pagination', parseInt(page) + 20)
//         }
//     },
//     render: function() {
//         return (
//             <div className="app-container-inner" data-pagination="20">
//                 <DialogsList data={this.state.data} />
//             </div>
//         );
//     }
// });
//
//
// let UserMessagesBox = React.createClass({
//     getMessagesFromServer: function(userId, offset) {
//         apiHelper.loadUserMessageHistory(userId, offset)
//             .then(history => {
//                 let d = this.state.data.concat(history)
//                 this.setState({data: d});
//             });
//     },
//     getInitialState: function() {
//         return {data: [], id: ''};
//     },
//     componentDidMount: function() {
//     //     // let firstMessage = jQuery('.messages-list div:first');
//         // this.getMessagesFromServer(this.props.items, '0');
//         console.log('did mount: ', this.state.id);
//     //     jQuery('#app-container-messages').on('scroll', this.handleScroll);
//     //     console.log(jQuery('#app-container-messages')[0].scrollHeight);
//     //     jQuery('#app-container-messages').scrollTop(1000);
//     //     // jQuery('.right-menu-content').scrollTop(firstMessage.offset().top - 50);
//     },
//     componentWillUnmount: function () {
//         console.log('unmount');
//     },
//     componentWillMount: function () {
//         // this.getMessagesFromServer(this.props.items, '0');
//         console.log('wil mount: ', this.props.id);
//         this.setState({id: this.props.id})
//     },
//     handleScroll: function() {
//         let elem = jQuery('#app-container-messages');
//         // if (elem.scrollTop() == 223) {
//         //     let page = jQuery('.app-messages-container-inner').attr('data-pagination')
//         //     this.getMessagesFromServer(this.props.items, page);
//         //     console.log(this.state.data);
//         //     jQuery('.app-messages-container-inner').attr('data-pagination', parseInt(page) + 50)
//         // }
//     },
//     render: function() {
//         console.log('render: ', this.props.id);
//         // this.getMessagesFromServer(this.props.items, '0');
//         return (
//             <div className="app-messages-container-inner" data-pagination="50">
//                 <UserMessagesList data={this.state.data.reverse()} />
//             </div>
//         );
//     }
// });
