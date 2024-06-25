import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Ban from './components/Ban'
import Footer from './components/Footer'
function App() {
  

  return (
    <>
      <div>
      
  
      <Navbar/>
      <div className='min-h-[80vh]'>
      <Ban/>
      </div>
      
      <Footer/>
      </div>
    </>
  )
}

export default App
