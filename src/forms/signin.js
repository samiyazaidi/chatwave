import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signin(){
  const [email,setEmail]= useState('');
  const[password,setPassword]=useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:3020/users/signin',{
      email:email,
      password:password,
    })
    .then((res) => {
      const token = res.data;
      localStorage.setItem('token', token);
      // // Redirect to profile page after successful sign-in
      console.log(`${token}`)
      navigate('/chat');
    

   
    })
    
    .catch((err) => {
      console.error('Sign-in failed:', err);
      error('Invalid email or password');
    });
  };

return (
    <div className="SignIn">
       <form onSubmit={handleSubmit}>
       
      <label htmlFor="email">Email:</label>
      <input required type="text" value={email} onChange={(e)=>
       setEmail(e.target.value) } 
       />
    
      <label htmlFor="password">Password:</label>
      <input required type="password" value={password} onChange={(e)=>
       setPassword(e.target.value) }
       />
       <button type="submit">Sign In</button>
       </form>
       </div>
  );
}
export default Signin;