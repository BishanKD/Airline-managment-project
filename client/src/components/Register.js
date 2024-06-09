import React, {useState} from 'react';
import axios from'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://localhost:3000/api/register', {
                email,
                password
            });
            console.log(response.data);
            navigate('/login');
        } catch(error){
            console.error('Registration failed', error);
        }
    };

    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="eg: abc@gmail.com"
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

export default Register;