import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification';



const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push('/')
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
      <div className="login_page">
        <h2>Login</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              placeholder="Enter your email address"
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              value={password}
              name="password"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <button type="submit">Login</button>
            <Link to="/forgot_password">Forgot your password?</Link>
          </div>
        </form>

        <div className="hr">Now you can login with Google <br/> Wait for 5 seconds after selecting account!</div>

        <div className="social">
          <GoogleLogin
            clientId="228467480178-ivnfu5l6g19qn9u0oav99ukcqaq75e05.apps.googleusercontent.com"
            buttonText="Sign in"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />

        </div>

        <p>
          Didn't register already? <Link to="/register">Register</Link>
        </p>
      </div>
    );
}

export default Login
