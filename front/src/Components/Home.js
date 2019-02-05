import React, { Component } from 'react';
import { Navbar,Nav,FormControl,Button,Form } from 'react-bootstrap';
class Header extends Component {
  render() {
    return (
        <div>
<Navbar bg="light" variant="light">
    
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/work">Work</Nav.Link>
      <Nav.Link href="/Biography">Biography</Nav.Link>
      <Nav.Link href="/Contact">Contact</Nav.Link>
    </Nav>
      
  </Navbar>      
  </div>
    );
  }
}

export default Header;
