// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { MdAdminPanelSettings } from 'react-icons/md';
// import { FaGripfire, FaUserTie } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const AllUsers = () => {
//     const axiosSecure = useAxiosSecure();

//     // Fetch users with React Query
//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     });

//     // Handle role update to HR
//     const handleMakeHR = (user) => {
//         axiosSecure.patch(`/users/hr/${user._id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${user.name} is now an HR!`,
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                     refetch();
//                 }
//             });
//     };

//     // Handle role update to Admin
//     const handleMakeAdmin = (user) => {
//         axiosSecure.patch(`/users/admin/${user._id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${user.name} is now an Admin!`,
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                     refetch();
//                 }
//             });
//     };

//     const handleFire = (user) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "This action will mark the user as 'Fired'.",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, fire them!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/users/fire/${user._id}`)
//                     .then(res => {
//                         if (res.data.modifiedCount > 0) {
//                             Swal.fire({
//                                 title: "Fired!",
//                                 text: `${user.name} has been fired.`,
//                                 icon: "success"
//                             });
//                             refetch();
//                         }
//                     });
//             }
//         });
//     };

//     return (
//         <div>
//             <div className='flex justify-evenly'>
//                 <h2 className='text-3xl'>All Users</h2>
//                 <h2 className='text-3xl'>Total Users {users.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* Table Header */}
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Employee Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Make Admin</th>
//                             <th>Make HR</th>
//                             <th>Fire</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users.map((user, index) => (
//                                 <tr key={user._id}>
//                                     <th>{index + 1}</th>
//                                     <td>{user.name}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.role}</td>
//                                     <td>
//                                         {user.role !== 'admin' && (
//                                             <button
//                                                 onClick={() => handleMakeAdmin(user)}
//                                                 className="btn btn-primary flex items-center gap-2"
//                                             >
//                                                 <MdAdminPanelSettings className="text-white" /> Make Admin
//                                             </button>
//                                         )}
//                                     </td>
//                                     <td>
//                                         {user.role === 'Employee' && (
//                                             <button
//                                                 onClick={() => handleMakeHR(user)}
//                                                 className="btn btn-secondary flex items-center gap-2"
//                                             >
//                                                 <FaUserTie className="text-white" /> Make HR
//                                             </button>
//                                         )}
//                                     </td>
//                                     <td>
//                                         {user.status !== 'fired' ? (
//                                             <button
//                                                 onClick={() => handleFire(user)}
//                                                 className="btn btn-danger flex items-center gap-2"
//                                             >
//                                                 <FaGripfire className='text-red-700 text-2xl' />
//                                             </button>
//                                         ) : (
//                                             <span className="text-gray-500 ">Fired</span>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaGripfire, FaUserTie } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch users with React Query
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Handle role update to HR
    const handleMakeHR = (user) => {
        axiosSecure.patch(`/users/hr/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an HR!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };

    // Handle role update to Admin
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

    // Open the salary modal
    const openSalaryModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Handle salary update res.data.modifiedCount > 0
    const handleSalaryChange = () => {
        const salary = document.getElementById("salaryInput").value;
        if (selectedUser) {
            axiosSecure.patch(`/users/salary/${selectedUser._id}`, { salary })
                .then(res => {
                    // console.log(res.data);                   
                    if (res.data.message === 'Salary updated successfully') {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Salary updated for ${selectedUser.name}`,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            setShowModal(false); 
                            refetch(); 
                        });
                    }
                });
        }
    };

    return (
        <div>
            <div className='flex justify-evenly'>
                <h2 className='text-3xl font-bold my-4 border-b-2'>All Employees</h2>
                <h2 className='text-3xl font-bold my-4 border-b-2'>Total Employees {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* Table Header */}
                    <thead className='bg-orange-400 text-white'>
                        <tr>
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make HR</th>
                            <th>Fire</th>
                            <th>Adjust Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-primary flex items-center gap-2"
                                            >
                                                <MdAdminPanelSettings className="text-white" /> Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {user.role === 'Employee' && (
                                            <button
                                                onClick={() => handleMakeHR(user)}
                                                className="btn btn-secondary flex items-center gap-2"
                                            >
                                                <FaUserTie className="text-white" /> Make HR
                                            </button>
                                        )}
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
                                    <td>
                                        <button
                                            onClick={() => openSalaryModal(user)}
                                            className="btn btn-warning flex items-center gap-2"
                                        >
                                            Adjust Salary
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Salary Adjust Modal */}
            {showModal && selectedUser && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-semibold">Update Salary of {selectedUser.name}</h2>
                        <p>Email: {selectedUser.email}</p>
                        <div>
                            <label htmlFor="salaryInput" className="block mt-2">Update Salary</label>
                            <input
                                id="salaryInput"
                                type="number"
                                defaultValue={selectedUser.salary || 0}
                                className="input input-bordered w-full mt-2"
                            />
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setShowModal(false)} className="btn">Close</button>
                            <button onClick={handleSalaryChange} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
