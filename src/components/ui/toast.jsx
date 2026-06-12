export const Toast = ({ message, type = 'info' }) => {
  const types = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  }

  return (
    <div className={`${types[type]} text-white px-4 py-3 rounded-md shadow-lg`}>
      {message}
    </div>
  )
}
