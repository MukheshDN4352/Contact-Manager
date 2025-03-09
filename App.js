import React ,{useState,useEffect}from "react"; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import './App.css';
import Header from "./Header";
import EditContact from "./editContact";
import AddContact from"./AddContact";
import ContactList from"./ContactList";
import ContactDetails from "./ContactDetails";
import api  from "../api/contacts";



function App() {
  const Local_Storage_Key = "contacts";
  const [contacts, setContacts] = useState([]);

  //retrieve contacts
  const retrieveContacts= async ()=>{
    const response=await api.get("/contacts");
    return response.data;
  }

  const updateContactHandler = async (updatedContact) => {
    const response = await api.put(`/contacts/${updatedContact.id}`, updatedContact);
    setContacts(contacts.map(contact => 
      contact.id === updatedContact.id ? response.data : contact
    ));
  };
  const addContactHandler = async (contact) => {
    const request={
      id:uuid(),
      ...contact
    }
    const response=await api.post("/contacts",request)
    if (contact.name && contact.email) { 
      setContacts([...contacts, response.data]);
    } else {
      console.error("Invalid contact details");
    }
  };
  
  const removeContactHandler=async (id)=>{
    await api.delete(`/contacts/${id}`);
    const newContactlist=contacts.filter((contact)=>{
      return contact.id !==id;
    });
    setContacts(newContactlist);

  };
  useEffect(() => {
    //const retrieveContacts = JSON.parse(localStorage.getItem(Local_Storage_Key));
    //if (retrieveContacts && Array.isArray(retrieveContacts)) {
    //  setContacts(retrieveContacts);
    //}
    const getAllContacts=async ()=>{
      const allContacts=await retrieveContacts();
      if (allContacts){
        setContacts(allContacts)
      }
    }
    getAllContacts();

  }, []);

 
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(Local_Storage_Key, JSON.stringify(contacts));
    }
  }, [contacts]);

  return (
    <div className="ui container">
     <Router>
     <Header />
    
    <Routes>
       <Route 
        path="/" 
        element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} 
       />
       <Route 
        path="/add" 
        element={<AddContact addContactHandler={addContactHandler} />} 
       />
       <Route
       path="/contact/:id"
       element={<ContactDetails />}
       />
       <Route 
       path="/edit/:id" 
      element={<EditContact contacts={contacts} updateContactHandler={updateContactHandler} />} 
       />
    </Routes>


</Router>

    {/*element={<AddContact addContactHandler={addContactHandler} />} */}
    {/*element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}*/}
    </div>
  );
}

export default App;
