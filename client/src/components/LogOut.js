import axios from "axios";

const LogOut = () => {
  const doLogOut = async () => {
    try {
      await axios.get("/api/sos/logout");
      localStorage.setItem("auth", "false");
      localStorage.setItem("user", null);

      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-white">Logged Out</h1>
      {doLogOut()}
    </div>
  );
};

export default LogOut;
