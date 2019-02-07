import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import chloe from '../images/chloe.png';
import '../CSS/Footer.css'

class Footer extends Component {
  render() {
    return (
        <div>
            <br />
            <br />
            <br />
        <hr />
        
        <div className="social" >
        <SocialIcon url="http://facebook.com/" />
        <SocialIcon url="http://twitter.com/" />
        <SocialIcon url="http://instagram.com/" />
        <SocialIcon url="http://gmail.com/" />
        </div>
        <img src={chloe} width='70px' alt="chloe" />
      </div>
    );
  }
}

export default Footer;
