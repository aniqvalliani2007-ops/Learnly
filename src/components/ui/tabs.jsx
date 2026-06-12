import { useState } from 'react'

export const Tabs = ({ className, children, defaultValue, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export const TabsList = ({ className, children, ...props }) => (
  <div className={`flex border-b ${className || ''}`} {...props}>
    {children}
  </div>
)

export const TabsTrigger = ({ value, active, onClick, className, children, ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium border-b-2 ${active ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'} ${className || ''}`}
    {...props}
  >
    {children}
  </button>
)

export const TabsContent = ({ value, active, className, children, ...props }) =>
  active ? (
    <div className={className} {...props}>
      {children}
    </div>
  ) : null
