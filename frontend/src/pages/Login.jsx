import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {


  const navigate = useNavigate();

  useEffect(() => {

  })


  return <>
    <section className="heading">

    </section>

    <section className="form">
      
      <div>
        <h1>
          <FaSignInAlt /> Login
        </h1> 
        <h3>Login to set goals</h3>
      </div>
    </section>
  
  </>
}

export default Login