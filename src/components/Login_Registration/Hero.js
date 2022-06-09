import React from 'react'
// import {useNavigate} from "react-router-dom"

function Hero({handleLogout, user}) {
  
  // let navigate = useNavigate();
  const checkStorage = localStorage.getItem('token')
  let isLoggedIn = false;
  if(checkStorage == 'true')
  {
    isLoggedIn = true;
  }
  else
  {
    isLoggedIn = false;
  }

  const getUserName = localStorage.getItem('userName')

  const clickHandler =() => {
    handleLogout()
    // navigate("/notes")
  }

  return (
    <section className="hero">
        <nav>
            <>
              {
                getUserName ?  (<><h2>Welcome {getUserName}!</h2></>) : (<><h2>Welcome {user.displayName}!</h2></>)
              }
            </>
            <>
                {
                    isLoggedIn ? (<button className="login-button" onClick={()=> clickHandler()}>Logout</button> ) : <></>
                }
            </>
            {/* <button className="login-button" onClick={() => clickHandler()}>Logout</button> */}
        </nav>
    </section>
  )
}

export default Hero