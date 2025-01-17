import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProviders';


const Login = () => {
    // const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Successfully Logged In",
                    showClass: {
                        popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                    },
                    hideClass: {
                        popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                    }
                });
                navigate(from, { replace: true });
            })

    }
    // const handleValidateCaptcha = (e) => {
    //     const user_captcha_value = e.target.value;
    //     if (validateCaptcha(user_captcha_value)) {
    //         setDisabled(false);
    //     }
    //     else {
    //         setDisabled(true);
    //     }

    // }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                {/* <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" onBlur={handleValidateCaptcha} name='captcha' placeholder="Type the text above" className="input input-bordered" required /> */}
                                {/* <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button> */}
                            </div>
                            
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value='Login' />
                            </div>
                        </form>
                        <p className='mx-auto p-2'><small>New Hare? <Link to='/signup'>Create a new account</Link> </small></p>

                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;