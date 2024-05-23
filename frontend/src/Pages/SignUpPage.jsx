import React, { useState } from 'react';
import axios from 'axios';
import signupImageUrl from "../Pictures/signup.jpg"
import Header from '../Components/Header';
import "../css/SignUpPage.css"

function App() {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [wantOffers, setWantOffers] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { firstName,lastName,age,gender,country,wantOffers,message, email, password,confirmPassword };

    try {
      const response = await axios.post('http://localhost:3000/signup', user);
      setMessage(response.data);
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
      <div>
      <Header imageUrl={signupImageUrl}/>
        <div className="floating-form">
          <h1>Sign Up</h1>
         <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
        /> 
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input 
          type="text" 
          placeholder="Country" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          required 
        /> 
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={password} 
          onChange={(e) => setConfrimPassword(e.target.value)} 
          required 
        />
        <select 
          value={wantOffers} 
          onChange={(e) => setWantOffers(e.target.value)} 
          required
        >
          <option value="">Do Want Offers From Us</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
        </div>
      
    </div>
  );
}

export default App;