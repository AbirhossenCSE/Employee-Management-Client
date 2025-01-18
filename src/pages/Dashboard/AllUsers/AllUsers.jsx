import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import { FaGripfire, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch users with React Query
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

    const handleFire = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will mark the user as 'Fired'.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, fire them!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/fire/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Fired!",
                                text: `${user.name} has been fired.`,
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div>
            <div className='flex justify-evenly'>
                <h2 className='text-3xl'>All Users</h2>
                <h2 className='text-3xl'>Total Users {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* Table Header */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin'
                                            ? 'Admin'
                                            : <button onClick={() => handleMakeAdmin(user)} className="btn">{user.role}</button>
                                        }
                                    </td>
                                   
                                    <td>
                                        {user.status !== 'fired' ? (
                                            <button
                                                onClick={() => handleFire(user)}
                                                className="btn btn-danger flex items-center gap-2"
                                            >
                                                <FaGripfire className='text-red-700 text-2xl' />
                                            </button>
                                        ) : (
                                            <span className="text-gray-500 ">Fired</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
