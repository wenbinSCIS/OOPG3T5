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

} from "./adminstyles";

import  logoSVG  from "../../assets/img/log.jpg";

import {
    AiOutlineApartment,
    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics, MdAssignment,MdBuild } from "react-icons/md";
import { BsPeople } from "react-icons/bs";


import { useLocation } from "react-router-dom";

const Sidebar = () => {


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();



    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo>
                <img src={logoSVG} alt="logo" />
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
            {secondaryLinksArray.map(({ icon, label }) => (
                <SLinkContainer key={label}>
                    <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
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
        to: "/AdminApprovalList",
   
    },
    {
        label: "View Forms",
        icon: <MdOutlineAnalytics />,
        to: "/AdminApprovalList",
      
    },
    {
        label: "Assign Forms",
        icon: <MdAssignment />,
        to: "/AssignForm",
      
    },
    {
        label: "Create Forms",
        icon: <MdBuild />,
        to: "/testadmin",
      
    },
    {
        label: "Create Vendor",
        icon: <BsPeople />,
        to: "/AdminCreation",
       
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