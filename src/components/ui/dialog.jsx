export const Dialog = ({ open, onOpenChange, children, ...props }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" {...props}>
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export const DialogContent = ({ className, children, ...props }) => (
  <div className={`p-6 ${className || ''}`} {...props}>
    {children}
  </div>
)

export const DialogHeader = ({ className, children, ...props }) => (
  <div className={`mb-4 ${className || ''}`} {...props}>
    {children}
  </div>
)

export const DialogTitle = ({ className, children, ...props }) => (
  <h2 className={`text-lg font-semibold ${className || ''}`} {...props}>
    {children}
  </h2>
)

export const DialogFooter = ({ className, children, ...props }) => (
  <div className={`mt-6 flex justify-end gap-3 ${className || ''}`} {...props}>
    {children}
  </div>
)
