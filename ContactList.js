import React from "react";
//
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";
const ContactList=(props)=>{


  const deleteContactHandler=(id)=>{
    props.getContactId(id);
  }
  
  
    const renderContactList=props.contacts.map((contact)=>{
        return(
         <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
        );
    
    })


 return(
  <div class="main">
    <h2>
      Contact list
      
    </h2>
   <Link to ="/add" ><button className="ui button blue rigth">add contact</button></Link>
  <div className="ui celled list">
    {renderContactList}
  </div>

  </div>
 );
}




export default ContactList;