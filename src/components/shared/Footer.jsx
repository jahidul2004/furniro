import { FaFacebook } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";

const Footer = () => {
    return (
        <div>
            <footer className="footer flex flex-col md:flex-row justify-between bg-base-200 text-base-content p-10">
                <div>
                    <h1 className="text-2xl font-bold">Furniro</h1>
                    <p>
                        400 University Drive Suite 200 Coral <br /> Gables, FL
                        33134 USA
                    </p>
                </div>
                <nav>
                    <h6 className="footer-title">Links</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Shop</a>
                    <a className="link link-hover">About</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Help</h6>
                    <a className="link link-hover">Payment Options</a>
                    <a className="link link-hover">Return policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <div>
                    <h6 className="footer-title">Newsletter</h6>
                    <div className="flex gap-2 items-center">
                        <input
                            placeholder="Enter Your Email"
                            className="input input-bordered"
                            type="text"
                        />
                        <button className="bg-[#ba8d2f] text-white shadow-none border-none btn ">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </footer>
            <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
                <aside className="grid-flow-col items-center">
                    <img src={logo} alt="" />
                    <p className="font-bold">
                        Furniro Industries Ltd.
                        <br />
                        <span className="font-normal">
                            Providing reliable tech since 1992
                        </span>
                    </p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4 text-[#ba8d2f]">
                        <a>
                            <FaFacebook size={25} />
                        </a>
                        <a>
                            <FaXTwitter size={25} />
                        </a>
                        <a>
                            <LuInstagram size={25} />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
