import { useState } from "react"
import PasswordInput from "../../components/Input/PasswordInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import { useDispatch } from "react-redux"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice"
import axios from "axios"
import { toast } from "react-toastify"
import { FiLock } from 'react-icons/fi'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    // Login API
    try {
      dispatch(signInStart())

      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        toast.error(res.data.message)
        console.log(res.data)
        dispatch(signInFailure(res.data.message))
      }

      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
      navigate("/")
    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome back</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
          <p className="mt-8 text-sm text-gray-600 text-center">
            Don&apos;t  have an account?{" "}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-indigo-600 flex items-center justify-center">
        <div className="max-w-md text-white px-10">
          <FiLock className="text-5xl mb-4" />
          <h2 className="text-4xl font-bold mb-4">Secure Access to NOTE-APP</h2>
          <p className="text-xl mb-6">
            Sign in to access your notes, ideas, and important information. Your digital notebook awaits!
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access your notes from anywhere</li>
            <li>Securely stored and encrypted data</li>
            <li>Seamless sync across all your devices</li>
            <li>Collaborate with team members in real-time</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login

