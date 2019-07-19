import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
const insideStyles = {
    padding: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
};
class Header  extends Component {
  
    
    render() {
        return (
                <Parallax bgImage={require('../images/P1090888-resize1.JPG')} className="App-header"  strength={500}>
                    <div style={{ height: 400 }}>
                <h1 id="top"  style={insideStyles} className="site-title">
                    TREVOR
                    FULL STACK
                  
                </h1>
                    </div>
                </Parallax>
          
        );
    }
}
export default Header;