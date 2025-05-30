import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const WorkSheet = () => {
    const [task, setTask] = useState("");
    const [hoursWorked, setHoursWorked] = useState(0);
    const [date, setDate] = useState(new Date());
    const [editData, setEditData] = useState(null);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/tasks", {
                params: { email: user?.email },
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    const addMutation = useMutation({
        mutationFn: async (newTask) => {
            const res = await axiosSecure.post("/tasks", newTask);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Task added successfully", "success");
            refetch();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedTask) => {
            const res = await axiosSecure.put(`/tasks/${updatedTask._id}`, updatedTask);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Task updated successfully", "success");
            setEditData(null);
            refetch();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/tasks/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Task has been deleted.", "success");
            refetch();
        },
    });

    const handleAddTask = () => {
        if (!task || hoursWorked <= 0) {
            Swal.fire("Error!", "Please fill out all fields correctly.", "error");
            return;
        }
        const newTask = {
            task,
            hoursWorked,
            date,
            email: user?.email,
            EmployeeName: user?.displayName,
        };

        addMutation.mutate(newTask);
        setTask("");
        setHoursWorked(0);
        setDate(new Date());
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-dashed border-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-10">Employee WorkSheet</h2>

            {/* Form */}
            <div className="p-6 rounded-xl shadow-md mb-10 max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Add New Work</h3>
                <form className="grid md:grid-cols-4 gap-4">
                    <select
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>Select Task</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Content">Content</option>
                        <option value="Paper-work">Paper-work</option>
                    </select>

                    <input
                        type="number"
                        value={hoursWorked}
                        onChange={(e) => setHoursWorked(+e.target.value)}
                        placeholder="Hours Worked"
                        className="input input-bordered w-full"
                    />

                    <ReactDatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="input input-bordered w-full"
                    />

                    <button
                        type="button"
                        onClick={handleAddTask}
                        className="btn btn-neutral text-white"
                    >
                        Add Task
                    </button>
                </form>
            </div>

            {/* Task Table */}
            <div className="overflow-x-auto max-w-6xl mx-auto shadow rounded-lg">
                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr className="text-base-200 text-md">
                            <th className="hidden md:flex">#</th>
                            <th>Task</th>
                            <th>Hours</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id} className="hover">
                                <td className="hidden md:flex">{index + 1}</td>
                                <td>{task.task}</td>
                                <td>{task.hoursWorked}</td>
                                <td>{new Date(task.date).toLocaleDateString()}</td>
                                <td className="space-x-2">
                                    <button
                                        className="btn btn-sm btn-outline btn-info"
                                        onClick={() => setEditData(task)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline btn-error"
                                        onClick={() => deleteMutation.mutate(task._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editData && (
                <div className="modal modal-open bg-black bg-opacity-50">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl mb-4">Edit Task</h3>
                        <form className="space-y-4">
                            <select
                                value={editData.task}
                                onChange={(e) =>
                                    setEditData((prev) => ({ ...prev, task: e.target.value }))
                                }
                                className="select select-bordered w-full"
                            >
                                <option value="Sales">Sales</option>
                                <option value="Support">Support</option>
                                <option value="Content">Content</option>
                                <option value="Paper-work">Paper-work</option>
                            </select>

                            <input
                                type="number"
                                value={editData.hoursWorked}
                                onChange={(e) =>
                                    setEditData((prev) => ({
                                        ...prev,
                                        hoursWorked: +e.target.value,
                                    }))
                                }
                                className="input input-bordered w-full"
                            />

                            <ReactDatePicker
                                selected={new Date(editData.date)}
                                onChange={(date) =>
                                    setEditData((prev) => ({ ...prev, date }))
                                }
                                className="input input-bordered w-full"
                            />

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => updateMutation.mutate(editData)}
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline btn-error"
                                    onClick={() => setEditData(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkSheet;
