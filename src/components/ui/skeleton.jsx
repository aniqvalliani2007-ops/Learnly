export const Skeleton = ({ className, ...props }) => (
  <div
    className={`bg-gray-200 animate-pulse rounded-md ${className || ''}`}
    {...props}
  />
)
