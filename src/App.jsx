import './App.css'
import Home from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import {Routes, Route} from "react-router-dom"
import Register from './pages/RegisterPage'
import TimeLine from './pages/TimeLine'
import Layout from './components/layout/Layout'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import ProfileHabits from './pages/ProfileHabits'
import ProfileActivities from './pages/ProfileActivities'
function App() {

  return (
    <>
      <Routes>
        <Route index path='/home' element={<Home/>}/>
        <Route path='/login' element ={<LoginPage/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path= '/' element={<Layout/>}>
          <Route index path='' element = {<TimeLine/>}></Route>
          <Route path='explore' element = {<Explore/>}></Route>
          <Route path='profile/:username' element = {<Profile/>}>
            <Route index path='habits' element={<ProfileHabits/>}></Route> 
            <Route path='activities' element={<ProfileActivities/>}></Route>
            <Route path='likes'></Route> 
            <Route path='comments'></Route>
          </Route>
        </Route>
        
      </Routes>
    
    </>
  )
}

export default App
