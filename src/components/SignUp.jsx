import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../libs/dbConnect';
import { useDispatch } from 'react-redux';
import { login } from '../libs/features/authReducer';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logoImg.png'

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pseudoUser, setPseudoUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const errorCodes = {
        "auth/email-already-in-use": "Email Already Exists. Please Login",
        "auth/invalid-email": "Invalid Email",
        "auth/weak-password": "Password is too weak",
    }
    const dispatcher = useDispatch();
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    const signUpUser = (user) => {
        dispatcher(login(user))
        navigate("/");
    }

    const signInWithEmail = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = {...userCredential.user};
                signUpUser(user)
            })
            .catch((error) => {
                const code = error.code
                setErrorMsg(errorCodes[code])
                console.log("Code", code, "Message", error.message);
                console.log(error);
            });

    }


    const loginWithGoogle = () => {
        console.log(email, password);
        signInWithPopup(auth, provider)
            .then((result) => {
                signUpUser(result.user)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="mx-auto min-h-screen max-w-[500px]">
            <div className="w-full py-10">
                <div className="w-full flex flex-col gap-3 p-10 items-start ">
                    <div className="logo-2 w-[100px]">
                        <img src={logoImg} alt="logo" />
                    </div>
                    <h1 className='text-3xl font-[600] text-secondary'>Welcome!</h1>
                    <h3 className='text-xl font-[500]'>Create Your Account</h3>
                    <form className="w-full mt-5" method='post' onSubmit={signInWithEmail}>
                        <div className="w-full flex flex-col gap-1 py-2">
                            <label className='text-lg opacity-65'>Email</label>
                            <input
                                type="email"
                                className="w-auto p-2.5 border-[1px] border-primary"
                                name='email'
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="abc@gmail.com" />
                        </div>
                        {/* <br /> */}
                        <div className="relative w-full flex flex-col gap-1 py-2 ">
                            <label className='text-lg opacity-65'>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-auto p-2.5 border-[1px] border-primary"
                                name="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true} />

                            {showPassword ?
                                <svg className='absolute right-2 bottom-3.5 w-[30px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 64 64" id="hide" onClick={() => setShowPassword(!showPassword)}>
                                    <rect width="64" height="64" fill="none"></rect>
                                    <path d="M568.687,32C571.83,39.211 581.07,58 592,58C596.706,58 601.092,54.436 604.807,49.893C605.768,48.717 606.989,49.454 607.532,51.537C608.074,53.62 607.734,56.265 606.773,57.44C602.492,62.675 597.422,66.667 592,66.667C576.826,66.667 564.463,34.772 564.463,34.772C563.846,33.166 563.846,30.834 564.463,29.228C564.463,29.228 576.826,-2.667 592,-2.667C607.174,-2.667 619.537,29.228 619.537,29.228C620.154,30.834 620.154,33.166 619.537,34.772C619.537,34.772 617.999,38.792 615.336,43.971C614.996,44.632 614.637,45.312 614.261,46.006C613.421,47.556 612.158,47.336 611.442,45.515C610.727,43.694 610.828,40.957 611.669,39.407C612.017,38.764 612.349,38.134 612.664,37.521C613.771,35.368 614.664,33.438 615.306,31.983C612.156,24.761 602.922,6 592,6C581.07,6 571.83,24.789 568.687,32Z" transform="matrix(1 0 0 .46154 -560 17.23)"></path>
                                    <path d="M592,22C586.481,22 582,26.481 582,32C582,37.519 586.481,42 592,42C597.519,42 602,37.519 602,32C602,26.481 597.519,22 592,22ZM592,26C595.311,26 598,28.689 598,32C598,35.311 595.311,38 592,38C588.689,38 586,35.311 586,32C586,28.689 588.689,26 592,26Z" transform="translate(-560)"></path>
                                    <path d="M648.824,15.82L692.824,51.82C693.716,52.55 694.968,52.328 695.617,51.323C696.267,50.319 696.069,48.911 695.176,48.18L651.176,12.18C650.284,11.45 649.032,11.672 648.383,12.677C647.733,13.681 647.931,15.089 648.824,15.82Z" transform="matrix(1 0 0 .88889 -640 3.556)"></path>
                                </svg> :
                                <svg className='absolute right-2 bottom-3.5 w-[30px] cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="eye" onClick={() => setShowPassword(!showPassword)}>
                                    <g data-name="Layer 2">
                                        <g data-name="eye">
                                            <rect width="24" height="24" opacity="0"></rect>
                                            <path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"></path>
                                            <path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"></path>
                                        </g>
                                    </g>
                                </svg>
                            }
                        </div>
                        <h2 className='mx-auto self-center text-red-500'>{errorMsg}</h2>
                        <br />
                        <div className='flex justify-between'>
                            <button className="px-3 py-2 bg-primary rounded-md text-[#fff] font-[600]" type='submit'>Submit</button>
                        </div>
                    </form>
                    <br />
                    <button className='mx-auto flex gap-2 border-2 border-primary hover:bg-primary hover:text-[#fff] transition-colors px-3 py-2 rounded-md text-primary font-[600]' onClick={loginWithGoogle}>
                        <svg className='w-[25px]' xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google">
                            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                        </svg>
                        SignUp With Google
                    </button>
                    <p className='mx-auto my-5'>Already Signed Up? <a href="/login" className="font-[600] underline underline-offset-2"> Login here</a></p>
                </div>
            </div >
        </div >
    )
}

export default SignUp;