import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import axios from 'axios'

export default function Profile() {
  const [message, setMessage] = useState<string>("");
  const navigate=useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile"); // protected route
        setMessage(res.data.message); // e.g., user id from backend
      } catch(err:unknown) {
          if (axios.isAxiosError(err) && err.response?.status === 401) {
          navigate("/login", { replace: true });
        } else {
          setMessage("Failed to load profile. Please try again.");
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <p>{message}</p>
    </div>
  );
}
