import {
    FaGreaterThan,
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaGoogle,
} from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";

const Register = () => {
    const { registerUser, updateDisplayName, googleSignIn, setUser } =
        useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);

        try {
            const result = await registerUser(email, password);

            await updateDisplayName(name);

            await axios.post("https://furniro-server-bay.vercel.app/addUser", {
                name,
                email,
                role: "user",
                creationTime: new Date(),
            });

            setLoading(false);
            form.reset();

            Swal.fire({
                title: "Registration Successful!",
                text: "Welcome to Furniro.",
                icon: "success",
                confirmButtonColor: "#b98e2f",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/");
        } catch (error) {
            console.error(error);
            setLoading(false);
            Swal.fire({
                title: "Registration Failed",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#b98e2f",
            });
        }
    };

    const handleGoogleRegister = () => {
        if (googleSignIn) {
            googleSignIn()
                .then((result) => {
                    const user = result.user;
                    setUser(user);

                    axios.post(
                        "https://furniro-server-bay.vercel.app/addUser",
                        {
                            name: user.displayName,
                            email: user.email,
                            role: "user",
                            creationTime: new Date(),
                        }
                    );

                    Swal.fire({
                        title: "Success",
                        text: "Registered with Google",
                        icon: "success",
                        confirmButtonColor: "#b98e2f",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    navigate("/");
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className="bg-white pb-10">
            <div
                style={{
                    backgroundImage: `url(${shopHeading})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className="relative h-[250px] w-full flex flex-col justify-center items-center"
            >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Register
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Register
                    </p>
                </div>
            </div>

            <div className="w-[95%] md:container mx-auto my-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100">
                <div className="w-full max-w-lg mx-auto p-8 md:p-12 order-2 lg:order-1">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Create Account
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Join us to explore the best furniture deals
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="relative">
                            <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="example@email.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-sm font-semibold text-gray-600 mb-1 block">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLock />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                />
                                <span
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#b98e2f]"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-3 bg-[#b98e2f] hover:bg-[#a17b2a] text-white font-bold rounded-lg shadow-md transition-all duration-300 transform active:scale-95 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500 font-medium">
                            Or join with
                        </span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <button
                        onClick={handleGoogleRegister}
                        className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-semibold text-gray-700"
                    >
                        <FaGoogle className="text-red-500" />
                        <span>Sign up with Google</span>
                    </button>

                    <p className="text-center mt-8 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#b98e2f] font-bold hover:underline"
                        >
                            Login Here
                        </Link>
                    </p>
                </div>

                <div className="hidden lg:block h-full relative group order-1 lg:order-2">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    <img
                        className="w-full h-full object-cover min-h-[650px]"
                        src="https://i.ibb.co.com/XkrTy93T/modern-img.webp"
                        alt="Register Visual"
                    />
                    <div className="absolute bottom-10 left-10 text-white z-10">
                        <h2 className="text-4xl font-bold mb-2">
                            Join Furniro
                        </h2>
                        <p className="opacity-90">
                            Create an account and start decorating your dream
                            home.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
