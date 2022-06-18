import React from "react";

function Login(props) {
  //Destructure the props received from AuthPanel
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    userName,
    setUsername,
    userNameError,
  } = props;

  return (
    <div className="login">
      <div className="loginContainer">
        <>
          {hasAccount ? (
            <></>
          ) : (
            <>
              <label>Username</label>
              <input
                type="text"
                autoFocus
                required
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
              />
              <p className="errorMsg">{userNameError}</p>
            </>
          )}
        </>
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin} className="login-button">
                Sign in
              </button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => setHasAccount(false)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup} className="login-button">
                Sign up
              </button>
              <p>
                Have an account?{" "}
                <span onClick={() => setHasAccount(true)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
