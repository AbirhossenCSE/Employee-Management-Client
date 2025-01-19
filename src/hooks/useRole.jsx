import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isPending: roleLoading } = useQuery({
        queryKey: [user?.email, "role"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            console.log(res.data);
            return res.data?.role;
        },
    });

    return [role, roleLoading];
};

export default useRole;
