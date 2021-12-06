import React from "react";
// import Menu from "./Menu";
import "./styles/Welcome_style.css"
import {useNavigate} from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate()


    return(
        <div id="welcome_container" className={"container-xl bg-white align-items-center my-md-5"}>
            {/*<Menu renderField={renderGrid()}/>*/}
            <div className={"row h-50 bg-black align-items-center mx-lg-3 mt-lg-5"}>
                <h1 className={"text-center text-white"}>WELCOME TO FRAME</h1>
            </div>

            <div className={"row align-items-center h-25 mx-lg-3"}>
                <button id="manage_archive_btn" onClick={() => navigate("/archive")}>
                    Manage your archive
                </button>
            </div>

        </div>

    )
}
export default Welcome;
