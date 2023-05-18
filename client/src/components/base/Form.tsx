import {
  Children,
  isValidElement,
  forwardRef,
  FormHTMLAttributes,
  ElementType,
  ReactNode,
  PropsWithChildren,
} from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  validated?: boolean;
  as?: ElementType
}

const FormContainer = forwardRef<HTMLFormElement, FormProps>(({
  className,
  as: Component = 'form',
  ...props
}, ref): JSX.Element => {
  return (
    <Component
      {...props}
      ref={ref}
      className={clsx(className, 'block w-full')}
    />
  )
});

interface FromGroupProps extends PropsWithChildren {
  cols?: number;
}

// based on number of children inside form group make a flex container that has 2 children beside one another on lg and md and 1 per row on mobile / tablet screens
export const FormGroup = ({
  children,
  cols = 2
}: FromGroupProps) => {

  // TODO: Strong type this function
  const getValidChildren = (children: ReactNode) => {
    return Children.toArray(children).filter((child) => {
      return isValidElement(child)
    })
  }

  return (
    <div className="flex gap-4 flex-wrap py-2">
      {getValidChildren(children).map((child) => {
        return (
          <div className="flex-grow" key={'formItem-' + uuid()}>
            {child}
          </div>
        )
      })}
    </div>
  )
}

// Workaround for Forward Ref Typecheck
const Form = Object.assign(FormContainer, {
  Group: FormGroup
})

export default Form;