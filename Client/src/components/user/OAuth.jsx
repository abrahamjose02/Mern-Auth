import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import {app} from '../../firebase'
import { useDispatch } from 'react-redux';
import { signInSucess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
        const dispatch = useDispatch()
        const auth = getAuth(app)
        const navigate = useNavigate()
    const handleGoogleClick = async()=>{
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth,provider)

            const res = await fetch('http://localhost:3000/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials:'include',
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,

                }),
            });
            const data = await res.json();
            dispatch(signInSucess(data))
            navigate('/')
        } catch (error) {
            console.log('Could not Login with Google',error)
        }
    }

  return (
    
      <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 '>Continue With Google</button>
    
  )
}

export default OAuth
