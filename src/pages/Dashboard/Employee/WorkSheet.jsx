import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const WorkSheet = () => {
    const [task, setTask] = useState("");
    const [hoursWorked, setHoursWorked] = useState(0);
    const [date, setDate] = useState(new Date());
    const [editData, setEditData] = useState(null); // For editing
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch employee-specific tasks
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tasks");
            return res.data;
        },
    });

    // Add new task
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

    // Update task
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


    // Delete task
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
        };

        addMutation.mutate(newTask);
        setTask("");
        setHoursWorked(0);
        setDate(new Date());
    };

    const handleEdit = (task) => {
        setEditData({ ...task });
    };


    const handleUpdate = () => {
        if (!editData.task || editData.hoursWorked <= 0) {
            Swal.fire("Error!", "Please fill out all fields correctly.", "error");
            return;
        }   
        const { _id, ...updatePayload } = editData;
        updateMutation.mutate({ _id, ...updatePayload });
    };
    
    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Employee WorkSheet</h2>
            {/* Form */}
            <form className="flex items-center gap-4 mb-6">
                <select
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="" disabled>
                        Select Task
                    </option>
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
                    className="input input-bordered"
                />

                <ReactDatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    className="input input-bordered"
                />

                <button type="button" onClick={handleAddTask} className="btn btn-primary">
                    Add
                </button>
            </form>

            {/* Task Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Hours Worked</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>{task.task}</td>
                                <td>{task.hoursWorked}</td>
                                <td>{new Date(task.date).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => handleEdit(task)}
                                    >
                                        🖊
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error ml-2"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editData && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Task</h3>
                        <form className="flex flex-col gap-4">
                            <select
                                value={editData.task}
                                onChange={(e) =>
                                    setEditData((prev) => ({ ...prev, task: e.target.value }))
                                }
                                className="select select-bordered"
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
                                className="input input-bordered"
                            />

                            <ReactDatePicker
                                selected={new Date(editData.date)}
                                onChange={(date) =>
                                    setEditData((prev) => ({ ...prev, date }))
                                }
                                className="input input-bordered"
                            />

                            <div className="modal-action">
                                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => setEditData(null)}
                                >
                                    Close
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
