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
    const [view, setView] = useState('table');

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

    const openSalaryModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Handle salary update (Only allow salary increase)
    const handleSalaryChange = () => {
        const salary = document.getElementById("salaryInput").value;
        if (selectedUser) {
            const newSalary = parseFloat(salary);
            if (newSalary >= selectedUser.salary) {
                axiosSecure.patch(`/users/salary/${selectedUser._id}`, { salary: newSalary })
                    .then(res => {
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
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Salary cannot be decreased.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-3xl font-bold">All Employees</h2>
                <h2 className="text-3xl font-bold">Total Employees {users.length}</h2>
                {/* Toggle Button */}
                <button
                    onClick={() => setView(view === 'table' ? 'card' : 'table')}
                    className="btn bg-orange-400"
                >
                    {view === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
                </button>
            </div>

            {view === 'table' ? (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-orange-400 text-white">
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
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-neutral flex items-center gap-2"
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
                                                <FaGripfire className="text-red-700 text-2xl" />
                                            </button>
                                        ) : (
                                            <span className="text-gray-500">Fired</span>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user, index) => (
                        <div key={user._id} className="card shadow-lg p-4">
                            <div className='mx-auto text-center py-2'>
                                <h3 className="text-2xl font-semibold">{user.name}</h3>
                                <p>{user.email}</p>
                                <p>Role: {user.role}</p>
                            </div>
                            <div className="mt-4 p-4">
                                <button
                                    onClick={() => handleMakeAdmin(user)}
                                    className="btn btn-neutral mb-2 mx-1"
                                >
                                    <MdAdminPanelSettings /> Make Admin
                                </button>
                                <button
                                    onClick={() => handleMakeHR(user)}
                                    className="btn btn-neutral mb-2 mx-1"
                                >
                                    <FaUserTie /> Make HR
                                </button>
                                <button
                                    onClick={() => handleFire(user)}
                                    className="btn btn-neutral mb-2 mx-1"
                                >
                                    <FaGripfire /> Fire
                                </button>
                                <button
                                    onClick={() => openSalaryModal(user)}
                                    className="btn btn-neutral mx-1"
                                >
                                    Adjust Salary
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
                                min={selectedUser.salary} // Ensure salary can't decrease
                            />
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setShowModal(false)} className="btn">Close</button>
                            <button onClick={handleSalaryChange} className="btn btn-neutral">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
