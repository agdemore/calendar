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
                    <MonthBox month={this.state.month} year={this.state.year}/>
                </div>
            </div>
        );
    }
});

let MonthBox = React.createClass({
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
        let daysInMonth = this.makeCalendar(this.props.month, this.props.year);
        let m = this.props.month,
            y = this.props.year
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
                        return <div className={divClassName} key={i}>
                            <DayBox day={day[1]} month={this.props.month} year={this.props.year} />
                        </div>
                    })}
                </div>
            </div>
        );
    }
});


let DayBox = React.createClass({
    onDoubleClick: function (e) {
        // only left mouse button
        if (e.button !== 0) return;
        $(ReactDom.findDOMNode(this)).append("<div class='day-tip'>New event</div>");
        e.stopPropagation();
        e.preventDefault();
    },
    render: function() {
        return (
            <div className="calendar-day" onMouseDown={this.onDoubleClick}>
                <div className='day-inner'>
                    <span>{this.props.day}</span>
                </div>
            </div>
        );
    }
});


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
