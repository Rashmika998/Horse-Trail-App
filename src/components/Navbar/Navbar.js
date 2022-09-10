import React, { useState } from "react";
import { FaRProject, FaTimes } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { IconContext } from "react-icons/lib/cjs";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
} from "./NavbarStyles.js";
import { useLocation, useNavigate } from "react-router-dom";
import { data, data2 } from "../../data/NavbarData";
import { useAuth } from "../../contexts/AuthContext"
const Navbar = () => {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  const { currentUser} = useAuth()
  let navMenu;

  if(currentUser){
    navMenu = <NavMenu show={show}>
    {data2.map((el, index) => (
      <NavItem key={index}>
        <NavLinks onClick={() => closeMobileMenu(el.to, el.id)}>
          {el.text}
        </NavLinks>
      </NavItem>
    ))}
  </NavMenu>
  }
  else{
    navMenu = <NavMenu show={show}>
    {data.map((el, index) => (
      <NavItem key={index}>
        <NavLinks onClick={() => closeMobileMenu(el.to, el.id)}>
          {el.text}
        </NavLinks>
      </NavItem>
    ))}
  </NavMenu>
  }

  const handleClick = () => {
    setShow(!show);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const closeMobileMenu = (to, id) => {
    if (id && location.pathname === "/") {
      scrollTo(id);
    }

    navigate(to);
    setShow(false);
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon src="./assets/logo.png" alt="logo" />
            Top Horse Trails
          </NavLogo>
          <MobileIcon onClick={handleClick}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>
          {navMenu}
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
