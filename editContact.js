import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = ({ contacts, updateContactHandler }) => {
  const { id } = useParams();  // Get id from the URL
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", email: "" });

  useEffect(() => {
    // Find the contact with the matching id and set it as the initial form state
    const contactToEdit = contacts.find(contact => contact.id === id);
    if (contactToEdit) {
      setContact(contactToEdit);
    }
  }, [id, contacts]);

  const update = (e) => {
    e.preventDefault();
    if (contact.name === '' || contact.email === '') {
      alert('All fields are mandatory');
      return;
    }

    updateContactHandler(contact);  // Call the handler to update the contact
    navigate('/');  // Navigate back to the home page
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
