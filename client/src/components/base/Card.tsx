import clsx from 'clsx'

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx(className,
        "bg-white flex items-start justify-between rounded-md border border-gray-100 p-4 shadow-md sm:p-6 lg:p-8"
      )}
    >
      {children}
    </div>
  )
}

export default Card