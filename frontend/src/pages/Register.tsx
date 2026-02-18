import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


export default function Register() {
    const [email ,setEmail] = useState<string>("");
    const [password , setPassword] = useState<string>("");

    const navigate = useNavigate();  // 

    const handleRegister = async (e : FormEvent) => {
        e.preventDefault();
        try{
            const res = await api.post("/auth/register" , {email , password});
            alert(res.data.message);
            navigate("/");
        }catch(err : any){
            alert(err.response?.data?.message || "Server error");
        }
    };

    return (
        <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
    )
}