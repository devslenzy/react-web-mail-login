import { useEffect } from "react";
import { api_url } from "../../../config.json";
import axios from "axios";

export const Home = () => {
    useEffect(() => {
        if (localStorage.getItem("email") && localStorage.getItem("password")) {
            axios.post(`${api_url}/checkLogin`, { email: localStorage.getItem("email"), password: localStorage.getItem("password") }).then((res) => {
                if (res.data.success !== true) return window.location.href = "/";
            }).catch((err) => {
                console.log(err);
            });
        } else { window.location.href = "/" };
    }, []);

    return (
        <div className="flex flex-col">
            <span>E-Mail <span className="text-sky-500">{localStorage.getItem("email")}</span></span>
            <span>Password <span className="text-sky-500">{localStorage.getItem("password")}</span></span>
            <button className="text-red-500 hover:opacity-90 w-16" onClick={() => {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
                window.location.href = "/";
            }}>Log Out</button>
        </div>
    );
};