import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);
export const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      if (data?.user) {
        console.log(data.user);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={signOutUser}
        className="border border-gray-500 bg-slate-200 rounded-md px-3 py-1"
      >
        SignOut
      </button>
    </div>
  );
};
