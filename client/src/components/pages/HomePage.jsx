import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { api_url } from "../../config.json";
import axios from "axios";

export const HomePage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verification, setVerification] = useState(false);

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
        axios.post(`${api_url}/setRegister`, { email, password }).then((res) => {
            if (res.data.success === true) {
                setVerification(true);
            } else {
                alert(res.data.message);
            };
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <Helmet>
                <title>Login/Register System - Register</title>
            </Helmet>
            {
                verification ?
                    <div className="hero bg-base-200 min-h-screen">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">Verification System</h1>
                                <p className="py-6">
                                    A verification code has been sent to your email.
                                </p>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        placeholder="Enter your Verification Code"
                                        className="input border-none ring-2 ring-white mb-4"
                                        onChange={(e) => {
                                            if (e.target.value.length === 6) {
                                                axios.post(`${api_url}/setVerification`, { email, password, code: e.target.value }).then((res) => {
                                                    console.log(res.data);
                                                    if (res.data.success === true) {
                                                        localStorage.setItem("email", email);
                                                        localStorage.setItem("password", password);
                                                        window.location.href = "/login";
                                                    } else {
                                                        alert(res.data.message);
                                                    };
                                                }).catch((err) => {
                                                    console.log(err);
                                                });
                                            };
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="hero bg-base-200 min-h-screen">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">Register System</h1>
                                <p className="py-6">
                                    A simple login system with React, Express, and MongoDB.
                                </p>
                                <div className="flex flex-col">
                                    <input
                                        type="email"
                                        placeholder="Enter your E-Mail"
                                        className="input border-none ring-2 ring-white mb-4 "
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                        className="input border-none ring-2 ring-white mb-4"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <a href="/login" className="text-start text-red-500 hover:opacity-90 mb-4">Zaten bir hesabım var.</a>
                                    <button className="btn btn-ghost bg-green-500 hover:bg-green-500 hover:opacity-80" onClick={SubmitClickHandler}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
};