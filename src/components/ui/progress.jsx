export const Progress = ({ className, value = 0, ...props }) => (
  <div
    className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className || ''}`}
    {...props}
  >
    <div
      className="h-full bg-blue-500 transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
)
