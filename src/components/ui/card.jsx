export const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className || ''}`}
    {...props}
  >
    {children}
  </div>
)

export const CardHeader = ({ className, children, ...props }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className || ''}`} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ className, children, ...props }) => (
  <h2 className={`text-lg font-semibold ${className || ''}`} {...props}>
    {children}
  </h2>
)

export const CardContent = ({ className, children, ...props }) => (
  <div className={`px-6 py-4 ${className || ''}`} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ className, children, ...props }) => (
  <div className={`px-6 py-4 border-t border-gray-200 ${className || ''}`} {...props}>
    {children}
  </div>
)
