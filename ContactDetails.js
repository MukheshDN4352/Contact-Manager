import React from "react";

import user from "../images/user.png";
import { Link, useLocation } from 'react-router-dom';

const  ContactDetails=(props) =>{
   
    const location = useLocation();
    console.log(location);
    const contact = location.state?.contact || { name: 'Unknown', email: 'Unknown' };

     const { name, email } = contact;

    
  
    return (
    <div className="main">
        <div className="ui card centered">
            <div className="image">
                <img src={user} alt="user"/>   
            </div>
            <div className="content">
                <div className="header">{name}</div>
                <div className="description">{email}</div>
            </div>

        </div>
        <div className="centered-div">
            <Link to ="/">
            <button className="ui button blue center">back to contact list</button>
            </Link>
        </div>
    </div>
);
}

export default ContactDetails;