export const Badge = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    primary: 'bg-blue-200 text-blue-800',
    success: 'bg-green-200 text-green-800',
    error: 'bg-red-200 text-red-800',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </span>
  )
}
