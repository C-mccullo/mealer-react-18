import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx'
const BaseLink = ({
  to,
  from,
  buttonType = 'primary',
  activeClass = '',
  pendingClass = '',
  children,
  ...props
}) => {

  const buttonColor = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    tertiary: 'border-tertiary'
  }

  return (
    <NavLink
      to={to}
      from={from}
      className={clsx(buttonColor[buttonType], "px-1.5 py-2.5 border border-solid border-black")}
      {...props}
    >
      {/* make primary secondary and tertiary colors for border on link */}
      {children}
    </NavLink>
  )
}

export default BaseLink
