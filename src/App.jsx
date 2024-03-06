import './App.css'
import Home from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import {Routes, Route} from "react-router-dom"
import Register from './pages/RegisterPage'
import TimeLine from './pages/TimeLine'
import Layout from './components/layout/Layout'
import Explore from './pages/Explore'
function App() {

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element ={<LoginPage/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path= '/' element={<Layout/>}>
          <Route path='' element = {<TimeLine/>}></Route>
          <Route path='explore' element = {<Explore/>}></Route>
        </Route>
        
      </Routes>
    
    </>
  )
}

export default App
