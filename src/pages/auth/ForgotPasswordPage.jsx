import LandingLayout from '../../components/layout/index.jsx'

export default function ForgotPasswordPage() {
  return (
    <LandingLayout>
      <div className="max-w-md mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full border rounded px-4 py-2" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
      </div>
    </LandingLayout>
  )
}
