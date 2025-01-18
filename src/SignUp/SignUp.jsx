import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProviders';
import useAxiosPublic from '../hooks/useAxiosPublic';
import SocialLogin from '../pages/Shared/SocialLogin/SocialLogin';

const SignUp = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            bank_account_no: data.bank_account_no,
                            salary: data.salary,
                            designation: data.designation,
                            photo: data.photoURL
                        };

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your Profile has been updated",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            });
                    });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            });
    };

    return (
        <>
            <div className="bg-base-200 w-10/12 mx-auto">
                <div className="card bg-base-100">
                    <h1 className="text-5xl font-bold mt-24 text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                            {errors.email && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} placeholder="Password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <span className='text-red-500'>This field is required</span>}
                            {errors.password?.type === 'minLength' && <span className='text-red-500'>Password must be at least 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className='text-red-500'>Password must be less than 20 characters</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select {...register("role", { required: true })} className="input input-bordered">
                                <option value="">Select Role</option>
                                <option value="Employee">Employee</option>
                                <option value="HR">HR</option>
                            </select>
                            {errors.role && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bank Account Number</span>
                            </label>
                            <input type="text" {...register("bank_account_no", { required: true })} placeholder="Bank Account Number" className="input input-bordered" />
                            {errors.bank_account_no && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Salary</span>
                            </label>
                            <input type="number" {...register("salary", { required: true })} placeholder="Salary" className="input input-bordered" />
                            {errors.salary && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Designation</span>
                            </label>
                            <input type="text" {...register("designation", { required: true })} placeholder="Designation" className="input input-bordered" />
                            {errors.designation && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value='Sign Up' />
                        </div>
                    </form>

                    <p className='mx-auto p-2'><small>Already have an account? <Link to='/login'>Login</Link></small></p>

                    <SocialLogin></SocialLogin>
                </div>

            </div>
        </>
    );
};

export default SignUp;
