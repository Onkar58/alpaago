import { Route, Routes, redirect } from 'react-router-dom'
import './App.css'
import { auth } from './libs/dbConnect'
import { Home, Login, SignUp, PrivateRoutes } from './components'
import { useDispatch } from 'react-redux'
import { login } from './libs/features/authReducer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {

  const dispatcher = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatcher(login(user.toJSON()))
        navigate("/")
      }
    })
  }, [])

  return (

    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
export default App


//TODO: Add themes in tailwind config, create a openweather accound get API_KEY, User navigator to get user location, 