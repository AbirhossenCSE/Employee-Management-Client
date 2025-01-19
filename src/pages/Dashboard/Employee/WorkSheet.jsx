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
    const mutation = useMutation({
        mutationFn: async (newTask) => {
            const res = await axiosSecure.post("/tasks", newTask);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Task added successfully", "success");
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

        mutation.mutate(newTask);
        setTask("");
        setHoursWorked(0);
        setDate(new Date());
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
                                    <button className="btn btn-sm btn-warning">Edit</button>
                                    <button className="btn btn-sm btn-error ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkSheet;
