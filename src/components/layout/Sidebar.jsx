import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Sidebar = ({ isOpen }) => {
  const { user } = useAuth()

  return (
    <aside
      className={`bg-white border-r w-64 ${isOpen ? 'block' : 'hidden'} md:block h-screen overflow-y-auto`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Learnly</h2>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/upload"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Upload PDF
          </Link>
          <Link
            to="/dashboard/uploads"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            My Uploads
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Settings
          </Link>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
        <p className="text-sm text-gray-600">{user?.email}</p>
      </div>
    </aside>
  )
}

export default Sidebar
