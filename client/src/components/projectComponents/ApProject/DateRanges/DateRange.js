import React, {useState} from "react";
import DatePicker from "react-datepicker";
import classes from './DateRange.module.scss';
import "react-datepicker/dist/react-datepicker.css";
import { ToggleButtonGroup, Row, Col} from 'react-bootstrap';
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from "./Dropdown";

import {
    getReadingsRange,
    getFirstLastReadings,
} from '../ApFunctions/apFunctions';
import moment from 'moment';
import {DropdownToggle} from "reactstrap";
class DateRange extends React.Component {
    //
    // todo: https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
    //  make the date selector sticky when it gets scrolled to https://developers.google.com/web/updates/2017/09/sticky-headers
    constructor(props) {
        super(props);

        this.state = {
            startDate:      new Date(),
            endDate:        new Date(),
            maxDate:        new Date(),
            minDate:        new Date(),
        };
    }

    mapDates = (requestFunction) =>{
        requestFunction()
            .then( query => {
                    const returnedDates = query.database1.slice();
                    this.setState({
                        startDate:new Date(moment(returnedDates[1].date_time).startOf('week').subtract(1, 'week')),
                        endDate:new Date(moment(returnedDates[1].date_time).endOf('week').subtract(1, 'week')),
                        maxDate:new Date(returnedDates[1].date_time),
                        minDate:new Date(returnedDates[0].date_time),
                    })

                let fromStr = moment(returnedDates[1].date_time).startOf('week').subtract(1, 'week').format('YYYY-MM-DD 00:00:00');
                let toStr = moment(returnedDates[1].date_time).endOf('week').subtract(1, 'week').format('YYYY-MM-DD 23:59:59');

                this.props.onDaySelect(getReadingsRange, fromStr, toStr);
                }
            )
    }
    componentDidMount() {
        this.mapDates(getFirstLastReadings);
    }

    setStartDate = date => {

        this.setState({
            startDate: date
        });

        let fromDateStr = moment(date).format('YYYY-MM-DD 00:00:00');
        let toDateStr = moment(this.state.endDate).format('YYYY-MM-DD 23:59:59');

        if (moment(fromDateStr).isAfter(toDateStr))
        {
            toDateStr = moment(fromDateStr).format('YYYY-MM-DD 23:59:59');
        }

        this.props.onDaySelect(getReadingsRange, fromDateStr, toDateStr);


    };

    setEndDate = date => {

        this.setState({
            endDate: date
        });

        let fromDateStr = moment(this.state.startDate).format('YYYY-MM-DD 00:00:00');
        let toDateStr = moment(date).format('YYYY-MM-DD 23:59:59');
        this.props.onDaySelect(getReadingsRange, fromDateStr, toDateStr);
    };

    setPeriodOfDates = period => {
        let fromPeriod = moment(this.state.maxDate).format('YYYY-MM-DD 00:00:00');
        let toPeriod = moment(this.state.maxDate).format('YYYY-MM-DD 23:59:59');

        if (period === 'day')
        {
            fromPeriod = moment(this.state.maxDate).subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
            toPeriod = moment(this.state.maxDate).subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
        }
        if (period === 'week')
        {
            fromPeriod = moment(this.state.maxDate).startOf('week').subtract(1, 'week').format('YYYY-MM-DD 00:00:00');
            toPeriod = moment(this.state.maxDate).endOf('week').subtract(1, 'week').format('YYYY-MM-DD 23:59:59');
        }
        if (period === 'month')
        {
            fromPeriod = moment(this.state.maxDate).startOf('month').subtract(1,'month').format('YYYY-MM-DD 00:00:00');
            toPeriod = moment(this.state.maxDate).endOf('month').subtract(1, 'month').format('YYYY-MM-DD 23:59:59');
        }
        if (period === 'year')
        {
            fromPeriod = moment(this.state.maxDate).startOf('year').subtract(1, 'year').format('YYYY-MM-DD 00:00:00');
            toPeriod = moment(this.state.maxDate).endOf('year').subtract(1, 'year').format('YYYY-MM-DD 23:59:59');
        }
        if (period === 'all')
        {
            fromPeriod = moment(this.state.minDate).format('YYYY-MM-DD 00:00:00');
        }

        this.props.onDaySelect(getReadingsRange, fromPeriod, toPeriod);

        this.setState({
            startDate:new Date(fromPeriod),
            endDate:new Date(toPeriod),
        })

    } ;



//
    render() {
       /* const [dropdownOpen, setDropdownOpen] = useState(false);*/


        return (
            <div id="range-select" className={classes.Wrap}>
                <Row>

                    <Col lg={4}>

<Dropdown  showDay={()=>this.setPeriodOfDates('day')}
          showWeek={()=>this.setPeriodOfDates('week')}
              showMonth={()=>this.setPeriodOfDates('month')}
              showYear={()=>this.setPeriodOfDates('year')}
              showAll={()=>this.setPeriodOfDates('all')}
/>

                    </Col>

                    <Col lg={4}>

                   <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={null}
                placeholderText="From"
                maxDate={this.state.endDate}
                minDate={this.state.minDate}
                onChange={this.setStartDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                className={classes.Fields}
                withPortal
            />
                    </Col>
                    <Col lg={4}>

                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.endDate}
                    maxDate={this.state.maxDate}
                    onChange={this.setEndDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    minDate={this.state.startDate}
                    className={classes.Fields}
                    withPortal
                />

                    </Col>
                </Row>
            </div>
        );
    }
}
export default DateRange;