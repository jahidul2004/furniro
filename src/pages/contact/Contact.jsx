import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";

const Contact = () => {
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
                <h1 className="text-3xl font-semibold">Contact</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> Contact
                </p>
            </div>
            {/* Header end */}

            {/* Main content start */}
            <div className="my-10">
                {/* Header area start */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Get In Touch With Us</h1>
                    <p className="text-[#9f9f9f] mt-4">
                        For More Information About Our Product & Services.
                        Please Feel Free To Drop Us An Email. <br /> Our Staff
                        Always Be There To Help You Out. Do Not Hesitate!
                    </p>
                </div>
                {/* Header area start end */}

                {/* Address and contact form start */}
                <div>
                    {/* Address area start */}
                    <div></div>
                    {/* Address area end */}

                    {/* Contact form start */}
                    <div></div>
                    {/* Contact form end */}
                </div>
                {/* Address and contact form end */}
            </div>
            {/* Main content end */}
        </div>
    );
};

export default Contact;
