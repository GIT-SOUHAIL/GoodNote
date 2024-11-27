import { useState } from "react"
import PasswordInput from "../../components/Input/PasswordInput"
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import axios from "axios"
import { toast } from "react-toastify"
import { FiFileText } from 'react-icons/fi'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter your name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    // sign up api
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { username: name, email, password },
        { withCredentials: true }
      )

      if (res.data.success === false) {
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)

      setError("")

      navigate("/login")
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
      setError(error.message)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create an account</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <p className="mt-8 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-indigo-600 flex items-center justify-center">
        <div className="max-w-md text-white px-10">
          <FiFileText className="text-5xl mb-4" />
          <h2 className="text-4xl font-bold mb-4">Welcome to NOTE-APP</h2>
          <p className="text-xl mb-6">
            Organize your thoughts, capture ideas, and boost your productivity with our intuitive note-taking application.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Create and manage notes effortlessly</li>
            <li>Sync across all your devices</li>
            <li>Collaborate with team members in real-time</li>
            <li>Secure your data with end-to-end encryption</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Signup

