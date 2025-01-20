import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EmployeeHr = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all employees with role "Employee"
    const { data: employees = [], isLoading } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data.filter((user) => user.role === "Employee");
        },
    });

    // Toggle verified status
    const toggleVerifyMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/users/verify/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Verification status updated.", "success");
            queryClient.invalidateQueries(["employees"]);
        },
    });

    const handleToggleVerified = (id) => {
        toggleVerifyMutation.mutate(id);
    };

    // Add payable property
    const addPayableMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/users/payable/${id}`, { payable: true });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Employee marked as payable.", "success");
            queryClient.invalidateQueries(["employees"]);
        },
    });

    const handleAddPayable = (id) => {
        addPayableMutation.mutate(id);
    };

    // Define table columns
    const columns = React.useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "verified",
                header: "Verified",
                cell: (info) => {
                    const verified = info.getValue();
                    const employeeId = info.row.original._id;
                    return (
                        <button
                            onClick={() => handleToggleVerified(employeeId)}
                            className={`btn btn-sm ${verified ? "btn-success" : "btn-error"}`}
                        >
                            {verified ? <FaCheck /> : <FaTimes />}
                        </button>
                    );
                },
            },
            {
                accessorKey: "bank_account_no",
                header: "Bank Account",
            },
            {
                accessorKey: "salary",
                header: "Salary",
                cell: (info) => `$${info.getValue()}`,
            },
            {
                accessorKey: "payable",
                header: "Pay",
                cell: (info) => {
                    const employeeId = info.row.original._id;
                    return (
                        <button
                            onClick={() => handleAddPayable(employeeId)}
                            className="btn btn-sm btn-primary"
                        >
                            Pay
                        </button>
                    );
                },
            },
        ],
        []
    );

    // Create table instance
    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (isLoading) {
        return <p>Loading employees...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl mb-4">Employee Management</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="btn btn-sm"
                >
                    Previous
                </button>
                <span className="mx-2">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="btn btn-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeHr;
