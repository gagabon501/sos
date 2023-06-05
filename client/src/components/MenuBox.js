function MenuBox(props) {
  return (
    <>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#abe0d7",
          borderWidth: "0.5px",
          borderRadius: "10px",
          width: "100%",
          marginLeft: "10px",
          boxShadow: "5px 10px #888888",
        }}
      >
        <img
          src={props.img}
          width="60"
          height="60"
          className="d-inline-block align-middle"
          alt="SOS Logo"
          style={{ marginRight: "5px" }}
        />
        {props.text}
      </div>
    </>
  );
}

export default MenuBox;
