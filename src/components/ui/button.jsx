import '@/styles/globals.css'

export const Button = ({ className, children, ...props }) => (
  <button
    className={`px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors ${className || ''}`}
    {...props}
  >
    {children}
  </button>
)
