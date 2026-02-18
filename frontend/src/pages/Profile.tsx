import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile"); // protected route
        setMessage(res.data.message); // e.g., user id from backend
      } catch {
        setMessage("Not authorized");
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
