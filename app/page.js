'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

const page = () => {

  const [error,setError] = useState('')
  const router = useRouter();

  const addUser = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // console.log(name,email,password)

    const invalidEmail = (mail) =>{ 
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,}$/i;
      return emailRegex.test(mail)
   } 
  if(!name || name==""){
    setError('Name is Invalid')
    return;
  }
  if(!invalidEmail(email)){
    setError('Email is Invalid')
    return;
  }
  if(!password || password.length<8){
    setError('Password must be more than 8 characters')
    return;
  }
  try{
    const res = await fetch('/api/mongodb',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name,
        email,
        password
      })
    })
    if(res.status===200){
      setError("")
      alert('User created Successfully....')
      router.push('/login')
    }
  }
  catch(error){
    setError('Error, Pls try again..!')
  }
  }

  return (
    <div className="loginpage">
      <div className="form">
          <h1>Create a account</h1>
          <form onSubmit={addUser}>
              <input type="text" placeholder="Enter your name:"/>
              <input type="email" placeholder="Enter your email:"/>
              <input type="password" placeholder="Enter your password:"/>
              <button type="submit">Add User</button>
          </form>
          <p>{error}</p>
        </div>
    </div>
  )
}

export default page
