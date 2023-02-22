import React from 'react'
import clsx from 'clsx'
import { Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { AtlasNavbar, useLogout, withStyles } from '@webonyx/react-atlas'

const styles = () => ({
  dropdown: {
    '& .dropdown-toggle': {
      padding: 0,
    },
  },
})

function Navbar({ apps, user, children, classes, ...props }) {
  const logout = useLogout()

  return (
    <AtlasNavbar apps={apps} {...props}>
      <Nav>
        <NavLink to="/" className="nav-link" exact>
          Home
        </NavLink>
        <NavLink to="/_error" className="nav-link">
          Error Page
        </NavLink>
      </Nav>
      <Nav>
        <NavDropdown
          className={clsx(classes.dropdown)}
          alignRight
          title={<img alt="User profile" src={user.photo} width={40} className="rounded-circle" />}
          id="collasible-profile-dropdown"
        >
          <NavDropdown.Item key="logout" onClick={logout}>
            Sign out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </AtlasNavbar>
  )
}

export default withStyles(styles)(Navbar)
