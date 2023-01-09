import React from "react";
import {useNavigate} from "react-router-dom";
const Error = () => {
    const navigate = useNavigate();
    return (
        <div
            className='w-screen h-screen font-[Exo] text-black relative '
            style={{backgroundImage: "url(/images/404bg.jpg)", backgroundSize: "cover"}}>
            
            <div className='mt-[15px] flex items-center justify-center gap-x-[23px] text-[20px] text-light '>
                <div
                    className='py-[5px] px-[28px] border border-black rounded-[5px] cursor-pointer hover:bg-white/20 transition-50 '
                    onClick={() => {
                        navigate("/");
                    }}>
                    GO HOME
                </div>
                <div
                    className='py-[5px] px-[28px] border border-black rounded-[5px] cursor-pointer hover:bg-white/20 transition-50 '
                    onClick={() => {
                        navigate(-1);
                    }}>
                    GO BACK
                </div>
            </div>
        </div>
    );
};

export default Error;
