import React,{useState} from 'react'
import axios from 'axios';
function Signup(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userDetails, setUserDetails] = useState({
    EnrollmentNo: '',
    FacultyNo: '',
    Course: '',
    Semester: '',
    MobileNo: ''
  });
  const [superUserDetails, setSuperUserDetails] = useState({
    EmployeeId: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      type,
      password,
      confirmPassword,
      ...(type === 'user' && { userDetails }),
      ...(type === 'superUser' && { superUserDetails })
    };
    // console.log({ username, email, password });
    axios.post('http://localhost:3020/users/register',data)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  };
  return (
    <div className="SignUp">
       <form onSubmit={handleSubmit}>
       <label htmlFor="firstName">First Name:</label>
        <input
          required
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          required
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="type">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="user">User</option>
          <option value="superUser">Super User</option>
        </select>
        
        {type === 'user' && (
          <>
            <label htmlFor="EnrollmentNo">Enrollment No:</label>
            <input
              required
              type="text"
              value={userDetails.EnrollmentNo}
              onChange={(e) => setUserDetails({ ...userDetails, EnrollmentNo: e.target.value })}
            />
            <label htmlFor="FacultyNo">Faculty No:</label>
            <input
              required
              type="text"
              value={userDetails.FacultyNo}
              onChange={(e) => setUserDetails({ ...userDetails, FacultyNo: e.target.value })}
            />
            <label htmlFor="Course">Course:</label>
            <input
              required
              type="text"
              value={userDetails.Course}
              onChange={(e) => setUserDetails({ ...userDetails, Course: e.target.value })}
            />
            <label htmlFor="Semester">Semester:</label>
            <input
              required
              type="text"
              value={userDetails.Semester}
              onChange={(e) => setUserDetails({ ...userDetails, Semester: e.target.value })}
            />
            <label htmlFor="MobileNo">Mobile No:</label>
            <input
              required
              type="text"
              value={userDetails.MobileNo}
              onChange={(e) => setUserDetails({ ...userDetails, MobileNo: e.target.value })}
            />
          </>
        )}
        
        {type === 'superUser' && (
          <>
            <label htmlFor="EmployeeId">Employee ID:</label>
            <input
              required
              type="text"
              value={superUserDetails.EmployeeId}
              onChange={(e) => setSuperUserDetails({ EmployeeId: e.target.value })}
            />
          </>
        )}
        
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Signup;