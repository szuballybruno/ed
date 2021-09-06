import React from "react";
import { MainWrapper } from "../../HOC/MainPanels";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import ProfileWrapper from "./profile_components/ProfileWrapper";

const ProfileMain = () => {
    return <MainWrapper>
        <Navbar />
        <ProfileWrapper />
    </MainWrapper>;
};

export default ProfileMain
