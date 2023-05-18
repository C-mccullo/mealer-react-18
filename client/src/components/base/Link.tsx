import { NavLink, NavLinkProps } from 'react-router-dom';
import clsx from 'clsx'
import { forwardRef } from 'react';

export interface BaseLinkProps extends NavLinkProps {
  buttonType?: 'primary' | 'secondary' | 'tertiary';
  activeClass?: string;
  pendingClass?: string;
  isExternal?: boolean;
}

const BaseLink = ({
  to,
  buttonType = 'primary',
  activeClass = '',
  pendingClass = '',
  children,
  isExternal,
  ...props
}: BaseLinkProps): JSX.Element => {

  {/* make primary secondary and tertiary colors for border on link */}
  const externalLinkClass = 'inline-flex items-center gap-2'
  return (
    <NavLink
      to={to}
      className={clsx(isExternal && externalLinkClass, "text-tertiary transition hover:text-darkTertiary hover:underline hover:underline-offset-4")}
      {...props}
    >
      {children}
    </NavLink>
  )
}

BaseLink.ExternalIcon = ({ ...isExternal }) => {
  if (isExternal) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        ></path>
      </svg>
    )
  }
  return ''
}

export default BaseLink
