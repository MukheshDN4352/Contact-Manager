import React from "react";
import {Link} from "react-router-dom";

import user from "../images/user.png";
import contacts from "../api/contacts";

const  ContactCard=(props) =>{
    const {id ,name,email}=props.contact;
return (
    <div className="item">
        <img className="ui avatar image" src={user} alt={user}/>
                <div className="content">
                <Link to={`/contact/${id}`} state={{ contact: props.contact }}
>
                    <div className="header">
                        {name}
                    </div>
                    <div>
                        {email}
                    </div>
                    </Link>
                    <i className="trash alternate outline icon"
                    style={{color:"red",marginTop:"7px",marginleft:"1opx"}}
                    onClick={()=>props.clickHandler(id)}
                    ></i>
                 <Link 
                 to={`/edit/${id}`} state={{contacts:props.contact}}>
                    <i className="edit alternate outline icon"
                    style={{color:"red",marginTop:"7px"}}
                   
                    ></i>
                    </Link>

                </div>
            </div>
)
}

export default ContactCard;