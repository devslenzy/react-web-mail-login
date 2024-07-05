import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { api_url } from "../../config.json";
import { Helmet } from "react-helmet";
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("email") && localStorage.getItem("password")) {
            axios.post(`${api_url}/checkLogin`, { email: localStorage.getItem("email"), password: localStorage.getItem("password") }).then((res) => {
                if (res.data.success === true) {
                    window.location.href = "/dashboard";
                } else {
                    alert(res.data.message);
                };
            }).catch((err) => {
                console.log(err);
            });
        };
    }, []);

    const SubmitClickHandler = () => {
        axios.post(`${api_url}/checkLogin`, { email, password }).then((res) => {
            if (res.data.success === true) {
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                window.location.href = "/dashboard";
            } else {
                alert(res.data.message);
            };
        }).catch((err) => {
            toast.error("An error occurred. Please try again later.");
            console.log(err);
        });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>Login/Register System - Login</title>
            </Helmet>
            <Toaster position="top-center" richColors />
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Login System</h1>
                    <p className="py-6">
                        Please login to continue.
                    </p>
                    <div className="flex flex-col">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="input border-none ring-2 ring-white mb-4"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            className="input border-none ring-2 ring-white mb-4"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <a href="/" className="text-start text-red-500 hover:opacity-90 mb-4">Bir hesabım yok, hesap oluştur.</a>
                        <button className="btn btn-ghost bg-green-500 hover:bg-green-500 hover:opacity-80" onClick={SubmitClickHandler}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};