import React, {Component} from "react";
import {Handles, Rail, Slider, Ticks, Tracks} from "react-compound-slider";
import {Handle, Tick, Track} from "./components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from './SettingsContainer.module.scss';
import { format } from 'd3-format'
// todo: Note there's a lot that needs fixing with regards  to passing state from the ApProjectContainer.js
const sliderStyle = {
    position: "relative",
    width: "100%",
    marginTop: 30,
};

const railStyle = {
    position: "absolute",
    width: "100%",
    height: 8,
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "red"
};


const domain = [.00, 1];
const color = ["green", "yellow"];
const tickFormat = format('.2f')

class SettingsNh3 extends Component {

    render(props) {

        return <Row className={classes.Wrap}>
            <Col lg={4} style={{textAlign: "center", borderRadius: "50px"}}>
                <h3 style={{textAlign: "center", marginTop: "10px"}}>Nh3</h3>
            </Col>
            <Col lg={4}>
                <p>
                    <p style={{textAlign: "center", padding: "7px", borderRadius: "10px"}}>
                        <strong style={{margin:"2px", textAlign: "center", borderRadius: "10px", background:'rgb(254, 254, 127) none repeat scroll 0% 0%', minWidth:"45px", display:"inline-table"}}>{this.props.updates[0].toFixed(2)}</strong>
                        <strong style={{margin:"2px", textAlign: "center", borderRadius: "10px", background:'#fe7f7f none repeat scroll 0% 0%', minWidth:"45px", display:"inline-table"}}>{this.props.updates[1].toFixed(2)}</strong>
                    </p>
                </p>
            </Col>
            <Col lg={4}>
                <Button variant="secondary" style={{margin: "10px 2%"}} onClick={this.props.reset}>Reset</Button>
                <Button style={{margin: "10px 2%"}}>Enter</Button>
            </Col>




            <Col lg={12}>


                <div style={{margin: "20px 8%", height: 60, width: "85%"}}>
                    <Slider

                        mode={2}
                        step={.001}
                        domain={[.00, 1]}  // this.props.values[0] - 5 ,this.props.values[3] + 5] this causes a crash sometimes due to the API call
                        rootStyle={sliderStyle}
                        //onUpdate={this.props.onUpdate}
                        onChange={this.props.onChange}
                        values={this.props.updates}

                    >
                        <Rail>
                            {({getRailProps}) => <div style={railStyle} {...getRailProps()} />}
                        </Rail>
                        <Handles>

                            {({handles, getHandleProps}) => <div className="slider-handles">

                                {handles.map(handle => (

                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        getHandleProps={getHandleProps}
                                        domain={domain}
                                        tiplabel = 'Nh3'
                                    />

                                ))}
                            </div>}

                        </Handles>
                        <Tracks left={true} right={false}>
                            {({tracks, getTrackProps}) => <div className="slider-tracks">
                                {

                                    tracks.map(({id, source, target}, index) => (

                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                            index={index}
                                            trackcolor={color}

                                        />

                                    ))}
                            </div>}
                        </Tracks>
                        <Ticks count={10}>
                            {({ticks}) => <div className="slider-ticks">
                                {ticks.map(tick => (
                                    <Tick key={tick.id} tick={tick} count={ticks.length} format={tickFormat}/>
                                ))}
                            </div>}
                        </Ticks>
                    </Slider>

                </div>

            </Col>
        </Row>;
    }
}

export default SettingsNh3;
