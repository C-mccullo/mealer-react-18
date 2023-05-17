import clsx from 'clsx'

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(className,
        "bg-white rounded-md border-2 border-night shadow-md"
      )}
    >
      {children}
    </div>
  )
}

export default Card