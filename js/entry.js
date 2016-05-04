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


let AppTop = React.createClass({
    getInitialState: function () {
        return {month: '', day: '', year: '', date: ''};
    },
    componentDidMount: function() {
        let now = new Date();
        let current_mounth = now.getMonth();
        let current_date = now.getDate();
        let current_day = now.getDay();
        let current_year = now.getFullYear();
        this.setState({
            month: months[current_mounth],
            day: days[current_day],
            year: current_year,
            date: current_date
        })
    },
    scrollMounth: function() {

    },
    scrollYear: function(direction) {
        // if (direction == 'left') {
        //     this.setState(this.state.year - 1);
        // } else {
        //     this.setState(this.state.year + 1);
        // }
    },
    render: function () {
        return (
            <div className='app-top-inner'>
                <div className='app-top-inner-month'>
                    <button>&lsaquo;</button>
                    <span>{this.state.month}</span>
                    <button>&rsaquo;</button>
                </div>
                <div className='app-top-inner-year'>
                    <button onClick={this.scrollYear('left')}>&lsaquo;</button>
                    <span>{this.state.year}</span>
                    <button onClick={this.scrollYear('right')}>&rsaquo;</button>
                </div>
            </div>
        );
    }
});

let MonthBox = React.createClass({
    getInitialState: function() {
        return {
            days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            daysInMonth: []
        };
    },
    makeCalendar: function() {
        let now = new Date();
        let lastDayOfMonth = new Date(now.getFullYear(), now.getMonth()+ 1,0).getDate();
        let weekDayOfLastMonthDay = new Date(now.getFullYear(), now.getMonth(), lastDayOfMonth).getDay();
        let weekDayOfFirstMonthDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
        console.log(lastDayOfMonth, weekDayOfLastMonthDay, weekDayOfFirstMonthDay);
        let dd = [];

        let lastDay = new Date(now.getFullYear(), now.getMonth(),0).getDate();

        console.log(lastDay);
        if (weekDayOfLastMonthDay != 0) {
            for (let  i = weekDayOfFirstMonthDay; i > 1 ; i--)
                dd.push(['prev', lastDay - i + 2]);
        } else { // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток
            for (let  i = 6; i > 0; i--)
                dd.push(lastDay - 1);
        }

        for (let  i = 1; i <= lastDayOfMonth; i++) {
            if (i != now.getDate()) {
                dd.push(['cur',i]);
            } else {
                dd.push(['today',i]);  // сегодняшней дате можно задать стиль CSS
            }
        }

        let l = dd.length;
        for (let i = 1; i <= 42 - l; i++)
            dd.push(['next', i])
        console.log(dd);
        this.setState({daysInMonth: dd})
    },
    componentDidMount: function() {
        this.makeCalendar();
    },
    render: function() {
        let i = 0;
        return (
            <div className="app-calendar-inner">
                <div className="app-calendar-inner-days">
                    {this.state.days.map(function(day){
                        return <div className='app-calendar-inner-day' key={day}>{day.substring(0,3)}</div>
                    })}
                </div>
                <div className="app-calendar-inner-month-days">
                    {this.state.daysInMonth.map(function(day){
                        i += 1;
                        let divClassName = 'app-calendar-inner-month-day ' + day[0];
                        return <div className={divClassName} key={i}>
                            <span className='day-inner' >{day[1]}</span>
                        </div>
                    })}
                </div>
            </div>
        );
    }
});


let DayBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {

    },
    componentWillUnmount: function () {

    },
    render: function() {
        return (
            <div className="app-container-inner">
                <FriendsList data={this.state.data} />
            </div>
        );
    }
});


ReactDom.render(<AppTop/>, document.getElementById('app-top'));
ReactDom.render(<MonthBox />, document.getElementById('app-calendar'));

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
