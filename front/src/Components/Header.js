import React, { Component } from 'react';
import { Navbar,Nav,FormControl,Button,Form } from 'react-bootstrap';
import {Link} from 'react-router-dom'
class Header extends Component {
  render() {
    return (
        <div>
<Navbar bg="light" variant="light">
    
    <Nav className="mr-auto">
      <Nav.Link><Link to="/">Home</Link></Nav.Link>
      <Nav.Link><Link to="/work">Work</Link></Nav.Link>
      <Nav.Link><Link to="/Biography">Biography</Link></Nav.Link>
      <Nav.Link><Link to="/">Contact</Link></Nav.Link>
    </Nav>
      
  </Navbar>      
  </div>
    );
  }
}

export default Header;
