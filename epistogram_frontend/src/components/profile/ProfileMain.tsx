import React from "react";
import Navbar from "../universal/navigation/navbar/AllNavbar";
import ProfileWrapper from "./profile_components/ProfileWrapper";
import menuItems from "../../configuration/menuItems.json";
import { MainWrapper } from "../../HOC/MainPanels";

const ProfileMain = () => {
    return <MainWrapper>
        <Navbar showHighlightedButton={true} menuItems={menuItems["user"]} showLastButton={true} showNavigation={true} />
        <ProfileWrapper />
    </MainWrapper>;
};

export default ProfileMain
