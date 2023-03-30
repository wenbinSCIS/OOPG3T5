import React, { useContext, useRef, useState } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSidebar,
    SSidebarButton,

} from "./styles";

import  logoSVG  from "../../assets/img/log.jpg";

import {
    AiOutlineApartment,
    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics, MdArticle } from "react-icons/md";
import { BsPeople } from "react-icons/bs";


import { useLocation } from "react-router-dom";

const Sidebar = () => {


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const handleLogout = () => {
      sessionStorage.clear();
      // You can also do additional clean up or state updates here.
    }

    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo>
            <a href="/home">
                <img src={logoSVG} alt="logo" />
            </a>
        </SLogo>


            <SDivider />
            {linksArray.map(({ icon, label, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {/* if notifications are at 0 or null, do not display */}

                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {secondaryLinksArray.map(({ icon, label, to }) => (
                <SLinkContainer key={label}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}} onClick={label === "Logout" ? handleLogout : null}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />

        </SSidebar>
    );
};

const linksArray = [
    {
        label: "Home",
        icon: <AiOutlineHome />,
        to: "/Home",
     
    },
    {
        label: "Uncompleted Forms",
        icon: <MdOutlineAnalytics />,
        to: "/UncompletedForms",
    
    },
    {
        label: "Completed Forms",
        icon: <MdArticle />,
        to: "/CompletedForms",
   
    },

];

const secondaryLinksArray = [

    {
        label: "Logout",
        to: "/",
        icon: <MdLogout />,
    },
];

export default Sidebar;
