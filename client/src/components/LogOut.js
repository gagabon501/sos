import axios from "axios";

const LogOut = () => {
  const doLogOut = async () => {
    try {
      await axios.delete("/api/sos/logout");
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
