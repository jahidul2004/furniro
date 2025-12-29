import {
    FaGreaterThan,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaGoogle,
} from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
    const { login, setUser, setDbUser, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);

        login(email, password)
            .then((result) => {
                const loggedUser = result.user;
                setUser(loggedUser);

                // Fetch user data from the database
                fetch(`https://furniro-server-bay.vercel.app/user/${email}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data) {
                            setDbUser(data);
                        }
                        setLoading(false);
                        form.reset();

                        Swal.fire({
                            title: "Welcome Back!",
                            text: "Login successful.",
                            icon: "success",
                            confirmButtonColor: "#b98e2f",
                            timer: 1500,
                            showConfirmButton: false,
                        });

                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error("Login error:", error.message);
                setLoading(false);
                Swal.fire({
                    title: "Login Failed",
                    text: "Invalid email or password.",
                    icon: "error",
                    confirmButtonColor: "#b98e2f",
                });
            });
    };

    const handleGoogleLogin = () => {
        if (googleSignIn) {
            googleSignIn()
                .then((result) => {
                    const user = result.user;
                    setUser(user);
                    // Optional: You might want to save google user to DB here if not exists
                    Swal.fire({
                        title: "Success",
                        text: "Logged in with Google",
                        icon: "success",
                        confirmButtonColor: "#b98e2f",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    navigate(from, { replace: true });
                })
                .catch((err) => console.error(err));
        } else {
            Swal.fire(
                "Note",
                "Google Sign In method not found in context",
                "info"
            );
        }
    };

    return (
        <div className="bg-white pb-10">
            {/* Header */}
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
                        Login
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Login
                    </p>
                </div>
            </div>
            {/* Header end */}

            {/* Main content */}
            <div className="w-[95%] md:container mx-auto my-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100">
                {/* Image Section */}
                <div className="hidden lg:block h-full relative group">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    <img
                        className="w-full h-full object-cover min-h-[600px]"
                        src="https://i.ibb.co.com/Xr5MCRyN/hero1.jpg"
                        alt="Login Visual"
                    />
                    <div className="absolute bottom-10 left-10 text-white z-10">
                        <h2 className="text-4xl font-bold mb-2">
                            Welcome Back
                        </h2>
                        <p className="opacity-90">
                            Sign in to continue your furniture journey.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full max-w-lg mx-auto p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Sign In
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Enter your details to access your account
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Input */}
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

                        {/* Password Input */}
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
                            <div className="flex justify-end mt-2">
                                <a
                                    href="#"
                                    className="text-xs text-[#b98e2f] hover:underline font-semibold"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            disabled={loading}
                            className="w-full py-3 bg-[#b98e2f] hover:bg-[#a17b2a] text-white font-bold rounded-lg shadow-md transition-all duration-300 transform active:scale-95 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500 font-medium">
                            Or continue with
                        </span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Social Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-semibold text-gray-700"
                    >
                        <FaGoogle className="text-red-500" />
                        <span>Sign in with Google</span>
                    </button>

                    {/* Register Link */}
                    <p className="text-center mt-8 text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#b98e2f] font-bold hover:underline"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
