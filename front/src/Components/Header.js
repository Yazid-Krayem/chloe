import React, { Component } from "react";
import { Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'

class NavbarPage extends Component {


render() {
  return (
   
    <div>
    <Navbar bg="light" expand="lg">
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link><Link to="/">Home</Link></Nav.Link>
    <NavDropdown title="WORK" id="basic-nav-dropdown">
      <NavDropdown.Item><Link to ="/economics">Economics </Link></NavDropdown.Item>
      <NavDropdown.Item><Link to ="/articles">Articles  </Link></NavDropdown.Item>
      <NavDropdown.Item><Link to ="/stories">Stories   </Link></NavDropdown.Item>
      <NavDropdown.Item><Link to ="/videos">Videos    </Link></NavDropdown.Item>

      </NavDropdown>
      <Nav.Link><Link to ="/Biography">Biography</Link></Nav.Link>
      <Nav.Link><Link to ="/contact">contact  </Link></Nav.Link>

    </Nav>
   
  </Navbar.Collapse>
</Navbar>
</div>
  )
}
}

export default NavbarPage;