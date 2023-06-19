const UserProfile = ({ users }) => {
  const handleClick = (e) => {
    console.log(e.target);
  };
  return (
    <>
      {users.map((user) => (
        <div className="userbox" onClick={handleClick} key={user.id}>
          <img
            src={user.imgsrc}
            style={{
              border: "1px solid #ddd",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
            alt="preview"
          />

          <div>{user.firstname + " " + user.lastname}</div>
          <div>{user.company}</div>
          <div>{user.position}</div>
        </div>
      ))}
    </>
  );
};

export default UserProfile;
