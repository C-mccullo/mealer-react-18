import { Link, } from 'react-router-dom';
import { PropsWithChildren, HTMLProps, } from 'react'
import clsx from 'clsx';

export interface CtaProps {
  href?: string;
  isLink?: boolean;
  isExternal?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'lightPrimary' | 'secondary' | 'lightSecondary' | 'tertiary' | 'lightTertiary';
  theme?: 'light' | 'dark';
  [x: string | number | symbol]: unknown;
}

const Cta = ({
  href,
  isLink = false,
  isExternal = false,
  disabled = false,
  color = 'primary',
  children,
  ...props
}: PropsWithChildren<CtaProps>) => {
  // if isLink then use a Link Element to interact with react router
  // if isExternal then use an <a> tag and
  // if isLink false them use a button (role needs to be included) and allow a callback to determine action

  const ctaColorMap = {
    'primary': 'bg-primary',
    'lightPrimary': 'bg-lightPrimary',
    'secondary': 'bg-secondary',
    'lightSecondary': 'bg-lightSecondary',
    'tertiary': 'bg-tertiary',
    'lightTertiary': 'bg-lightTertiary'
  }

  if (isLink) {
    return (
      <Link
        {...props}
        className='group relative inline-block focus:outline-none focus:ring'
        to={href}
      >
        <span
          className={clsx(ctaColorMap[color], 'absolute inset-0 translate-x-0 translate-y-0 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5 rounded-sm')}
        ></span>

        <span
          className='relative inline-block border-2 border-current rounded-sm px-6 py-1.5 text-sm font-bold uppercase tracking-widest'
        >
          { children }
        </span>
      </Link>
    )
  }
  return (
    <button
      className="group relative inline-block focus:outline-none focus:ring"
      {...props}
      disabled={disabled}
    >
      <span
        className={clsx(ctaColorMap[color], 'absolute inset-0 translate-x-0 translate-y-0 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5 rounded-sm')}
      ></span>
      <span
        className='relative inline-block border-2 border-current rounded-sm px-6 py-1.5 text-sm font-bold uppercase tracking-widest'
      >
        { children }
      </span>
    </button>
  )
}

export default Cta