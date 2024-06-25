import React from 'react'
import { useRef, useState,useEffect } from 'react';


const Manager = () => {
  const ref = useRef()
  const passref=useRef()
  const [form, setform] = useState({site:"",username:"",password:""})
  const [passarr, setpassarr] = useState([])
  
  useEffect(() => {
    let passwords=localStorage.getItem("password");
  if(passwords){
    setpassarr(JSON.parse(passwords))
  }
  
  }, [])
  
  
  
  const savepassword = () => {
  
  setpassarr([...passarr,form])
  localStorage.setItem("passwords",JSON.stringify([...passarr,form]))
  console.log(passarr)
}
  const handlechange = (e) => {
  setform({...form,[e.target.name]:[e.target.value]})
  }

  const showpassword = () => {
    passref.current.type="text"
    if (ref.current.src.includes("icons/image1.png")) {
      ref.current.src = "icons/image.png"
      passref.current.type="password"
    }
    else {
      passref.current.type="text"
      ref.current.src = "icons/image1.png"
    
    }

  }




  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className='   mycontainer '>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-700'>&lt;</span>
          Pass<span className='text-green-700'>op/&gt;</span>
        </h1>



        <p className='text-green-700 text-lg text-center'>your own password manager</p>

        <div className=' flex flex-col p-4 text-black gap-8 items-center'>
          <input onChange={handlechange} value={form.site} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name='site' id='' />
          <i class="fa-regular fa-copy"></i>
          <div className='flex w-full justify-between gap-8'>
            <input onChange={handlechange} value={form.username} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name='username' id='' />

            <div className='relative '>
             <input  ref={passref} onChange={handlechange} value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type='password' name='password' id='' /> 
              <span className='absolute right-4 top-1 cursor-pointer ' onClick={showpassword}>
                < img ref={ref} className='p-1' width={30} src="icons/image.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savepassword} className='flex justify-center items-center bg-green-500  px-4 py-2 rounded-full w-fit hover:bg-gray-300 gap-2 border-black '>
            <i class="fa-solid fa-square-plus"></i>Add Password</button>
        </div>
      </div>
    </>
  )
}

export default Manager




