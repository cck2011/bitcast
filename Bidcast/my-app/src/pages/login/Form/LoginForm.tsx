import { useForm } from "react-hook-form"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { login, loadToken } from "../../../redux/user/actions";
import { useState } from "react";
import { push } from "connected-react-router";
import ReactFacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";

const { REACT_APP_BACKEND_URL } = process.env


export function LoginForm() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch();
  const [error, setError] = useState('')
 
  const fBOnCLick = ()=> {
    return null;
}
const fBCallback = async (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => {
    if (userInfo.accessToken) {
      try {
        const res = await axios.post<any>(`${process.env.REACT_APP_BACKEND_URL}/login/facebook`, {
          accessToken: userInfo.accessToken
        })
        
        if (res.data.token != null) {
          localStorage.setItem('token', res.data.token)
          dispatch(login(res.data.token))
          dispatch(push('/'))
        } else {
          setError('email or password wrong')
        }
      } catch (e: any) {
        if (e?.response.status === 401) {
          setError('發生未知錯誤')
        } else {
          console.error(e)
          setError('發生未知錯誤')
        }
      }
    }
    return null;
}
  return (
    <div>
      {/* login form */}
      <form onSubmit={handleSubmit(async data => {
        try {
          const res = await axios.post<any>(`${REACT_APP_BACKEND_URL}/login`, {
            email: data.loginEmail,
            password: data.loginPassword
          })
          // console.log(res.data.result.data.msg)
          
          if (res.data.token != null) {
            
            localStorage.setItem('token', res.data.token)
            dispatch(login(res.data.token))
            dispatch(loadToken(res.data.token))
            dispatch(push('/'))
          }
          else{
            setError(`${res.data.data.msg}`)
          }
        } catch (e: any) {
          setError('unknown error')
        }
      })}>
       
        email<input {...register('loginEmail')} />
        pw<input {...register('loginPassword')} />
        
        <input type="submit" />
      </form>
      {error}
      


      <ReactFacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
          autoLoad={false}
          fields="name,email,picture"
          onClick={fBOnCLick}
          callback={fBCallback}
      />  

</div>
  )
}


