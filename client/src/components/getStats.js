import axios from "axios";

const getStats = async () => {
  try {
    const response = await axios.get("/api/sos/stats");
    console.log("Client side: ", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    // setError(err.response.data.msg);
  }
};

export default getStats;
