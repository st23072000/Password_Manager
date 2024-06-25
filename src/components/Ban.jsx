import React from 'react'
import { useRef, useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Ban = () => {
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
  
  setpassarr([...passarr,{...form, id:uuidv4()}])

  localStorage.setItem("passwords",JSON.stringify([...passarr,form,{...form,id:uuidv4()}]))
  console.log(passarr)
  setform({site:"",username:"",password:""})
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

  const copyToClipboard = (text) => {
    
    toast('🦄 text is copied!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
  };


  const deleteItem = (id) => {
    
    console.log("deleting password with id",id);
    let c=confirm("do you really want to delete this password ")
    if(c){
    setpassarr([passarr.filter(item=>item.id!==id)])
    localStorage.setItem("passwords",JSON.stringify([...passarr.filter(item=>item.id!==id)]))
    }
    toast('deleting password successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
};



const editItem = (id) => {
  
  console.log(`Item with ID ${id} being edited`);
  setform(passarr.filter(i=>i.id===id)[0])
  setpassarr([passarr.filter(item=>item.id!==id)])

  
};
  return (
    <>
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />



      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className='   mycontainer '>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-700'>&lt;</span>
          Pass<span className='text-green-700'>op/&gt;</span>
        </h1>



        <p className='text-green-700 text-lg text-center'>your own password manager</p>

        <div className=' flex flex-col p-4 text-black gap-8 items-center'>
          <input onChange={handlechange} value={form.site} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name='site' id='' />
          <div className='flex w-full justify-between gap-8'>
            <input onChange={handlechange} value={form.username} placeholder='Enter username' className='rounded-full border border-green-500 w-full p-4 py-1' type='text' name='username' id='' />

            <div className='relative'>
              <input ref={passref} onChange={handlechange} value={form.password} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type='password' name='password' id='' />
              <span className='absolute right-4 top-1 cursor-pointer ' onClick={showpassword}>
                < img ref={ref} className='p-1' width={30} src="icons/image.png" alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savepassword} className='flex justify-center items-center bg-green-500  px-4 py-2 rounded-full w-fit hover:bg-gray-300 gap-2 border-black '>
            <i class="fa-solid fa-square-plus"></i>Add Password</button>
        </div>
        <div className="password">
          <h2 className='font-bold text-2xl py-4'>password</h2>
          {passarr.length===0 &&<div>No password to show</div> }
          
          {passarr.length!==0 &&
          <table className ="table-auto rounded-md overflow-hidden w-full ">
  <thead className=' bg-green-800  text-white'>
    <tr>
      <th className='text-center py-2'>Site</th>
      <th className='text-center py-2'>Username</th>
      <th className='text-center py-2'>Password</th>
      <th className='text-center py-2'>Action</th>

    </tr>
  </thead>
  <tbody className='bg-green-100'>
    {passarr.map((item,index)=>{
       return <tr key={(index)}>
       <td className='text-center w-32 py-2 boder border-white '>{item.site}
       <button onClick={() => copyToClipboard(item.site)} className='ml-2 cursor-pointer'>
                        <i className="fas fa-copy"></i>
                      </button>
       </td>
       <td className='text-center w-32 py-2 boder border-white'>{item.username}
       <button onClick={() => copyToClipboard(item.username)} className='ml-2 cursor-pointer' >
                        <i className="fas fa-copy "></i>
        </button>
       </td>
       <td className='text-center w-32 py-2 boder border-white'>{item.password}
       <button onClick={() => copyToClipboard(item.password)} className='ml-2 cursor-pointer'>
                        <i className="fas fa-copy "></i>
        </button>
       </td>

       <td className='text-center w-32 py-2 boder border-white'>
       <div className='gap-3'>
       <button onClick={() => deleteItem(item.id)} className='ml-2 mx-4 cursor-pointer'>
        <i className="fas fa-trash-alt"></i>
        </button>
        <button onClick={() => editItem(item.id)} className='ml-2 cursor-pointer'>
        <i className="fas fa-edit"></i>
        </button>
</div>
       </td>
     </tr>
    })}
    
    
  </tbody>

</table>}
        </div>
      </div>
    </>
  )
}

export default Ban

