import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaGripfire, FaUserTie } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ClipLoader from 'react-spinners/ClipLoader';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [view, setView] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingPage, setLoadingPage] = useState(false);
    const itemsPerPage = 6;

    // Force card view on small devices
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setView('card');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

    const changePage = (pageNumber) => {
        setLoadingPage(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setLoadingPage(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    };

    const handleMakeHR = (user) => {
        axiosSecure.patch(`/users/hr/${user._id}`).then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", `${user.name} is now an HR!`, "success");
                refetch();
            }
        });
    };

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", `${user.name} is now an Admin!`, "success");
                refetch();
            }
        });
    };

    const handleFire = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to fire this user.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, fire!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/fire/${user._id}`).then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Fired!", `${user.name} has been fired.`, "success");
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

    const handleSalaryChange = () => {
        const salary = parseFloat(document.getElementById("salaryInput").value);
        if (salary >= selectedUser.salary) {
            axiosSecure.patch(`/users/salary/${selectedUser._id}`, { salary }).then(res => {
                if (res.data.message === 'Salary updated successfully') {
                    Swal.fire("Updated!", "Salary has been updated.", "success");
                    setShowModal(false);
                    refetch();
                }
            });
        } else {
            Swal.fire("Error!", "Salary cannot be decreased.", "error");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <ClipLoader size={50} color="#f97316" />
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold">All Employees</h2>
                <h2 className="text-xl font-semibold">Total: {users.length}</h2>
                {/* Toggle button hidden on small screens */}
                <button
                    onClick={() => {
                        setView(view === 'table' ? 'card' : 'table');
                        setCurrentPage(1);
                    }}
                    className="btn btn-neutral text-white hidden sm:inline-flex"
                >
                    {view === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
                </button>
            </div>

            {loadingPage ? (
                <div className="flex justify-center items-center h-64">
                    <ClipLoader size={50} color="#f97316" />
                </div>
            ) : (
                <>
                    {view === 'table' && window.innerWidth >= 640 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Admin</th>
                                        <th>HR</th>
                                        <th>Fire</th>
                                        <th>Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                {user.role !== 'admin' && (
                                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm btn-neutral">
                                                        <MdAdminPanelSettings /> Make Admin
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                {user.role === 'Employee' && (
                                                    <button onClick={() => handleMakeHR(user)} className="btn btn-sm btn-neutral">
                                                        <FaUserTie /> Make HR
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                {user.status !== 'fired' ? (
                                                    <button onClick={() => handleFire(user)} className="btn btn-sm text-red-600">
                                                        <FaGripfire />
                                                    </button>
                                                ) : (
                                                    <span className="text-red-500 font-semibold">Fired</span>
                                                )}
                                            </td>
                                            <td>
                                                <button onClick={() => openSalaryModal(user)} className="btn btn-sm btn-neutral">
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
                            {paginatedUsers.map((user) => (
                                <div key={user._id} className="bg-base-200 p-4 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Role:</strong> {user.role}</p>
                                    {user.designation && <p><strong>Designation:</strong> {user.designation}</p>}
                                    <div className="flex flex-wrap mt-3 gap-2">
                                        {user.role !== 'admin' && (
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm btn-neutral">
                                                <MdAdminPanelSettings />
                                            </button>
                                        )}
                                        {user.role === 'Employee' && (
                                            <button onClick={() => handleMakeHR(user)} className="btn btn-sm btn-neutral">
                                                <FaUserTie />
                                            </button>
                                        )}
                                        {user.status !== 'fired' ? (
                                            <button onClick={() => handleFire(user)} className="btn btn-sm text-red-600">
                                                <FaGripfire />
                                            </button>
                                        ) : (
                                            <span className="text-red-500 font-semibold">Fired</span>
                                        )}
                                        <button onClick={() => openSalaryModal(user)} className="btn btn-sm btn-neutral">
                                            Adjust Salary
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 gap-2 flex-wrap">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => changePage(index + 1)}
                                className={`btn ${currentPage === index + 1 ? 'bg-base-300' : 'btn-outline'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* Salary Modal */}
            {showModal && selectedUser && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Adjust Salary for {selectedUser.name}</h3>
                        <input
                            id="salaryInput"
                            type="number"
                            defaultValue={selectedUser.salary || 0}
                            className="input input-bordered w-full mt-2"
                            min={selectedUser.salary}
                        />
                        <div className="modal-action">
                            <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
                            <button onClick={handleSalaryChange} className="btn btn-success">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
