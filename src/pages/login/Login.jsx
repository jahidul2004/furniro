import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const Login = () => {
    const { login, setUser } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((result) => {
                const loggedUser = result.user;
                setUser(loggedUser);
                form.reset();
            })
            .catch((error) => {
                console.error("Login error:", error.message);
            });
    };
    return (
        <div>
            {/* Header */}
            <div
                style={{
                    backgroundImage: `url(${shopHeading})`,
                    width: "100%",
                }}
                className="h-[220px] w-full bg-cover flex flex-col justify-center items-center"
            >
                <h1 className="text-3xl font-semibold">Login</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> Login
                </p>
            </div>
            {/* Header end */}

            {/* Main content */}
            <div className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Register form */}
                <div className="order-2 md:order-1 w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <form
                        onSubmit={handleLogin}
                        noValidate=""
                        action=""
                        className="space-y-6"
                    >
                        <div className="space-y-1 text-sm">
                            <label
                                htmlFor="username"
                                className="block dark:text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                            />
                        </div>
                        <div className="space-y-1 text-sm">
                            <label
                                htmlFor="password"
                                className="block dark:text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                            />
                        </div>
                        <button className="block w-full p-3 text-center rounded-sm bg-[#b98e2f] text-white">
                            Login
                        </button>
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        <p className="px-3 text-sm dark:text-gray-600">
                            Login with social accounts
                        </p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            aria-label="Log in with Google"
                            className="p-3 rounded-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                        </button>
                    </div>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-600">
                        Don't Have an account?
                        <Link
                            to={"/register"}
                            href="#"
                            className="underline dark:text-gray-800"
                        >
                            Register
                        </Link>
                    </p>
                </div>
                {/* Register form end */}
                {/* Image div */}
                <div className="order-1 md:order-2">
                    <img
                        className="w-full h-full rounded"
                        src="https://i.ibb.co.com/Xr5MCRyN/hero1.jpg"
                        alt=""
                    />
                </div>
                {/* Image div end */}
            </div>
            {/* Main content end */}
        </div>
    );
};

export default Login;
