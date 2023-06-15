import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "./FormInput";
import Progress from "./Progress";

const RegisterForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    lastname: "",
    firstname: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [filepreview, setFilePreview] = useState("");

  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Lastname",
      label: "Lastname",
    },
    {
      id: 3,
      name: "firstname",
      type: "text",
      placeholder: "Firstname",
      label: "Firstname",
    },
    {
      id: 4,
      name: "company",
      type: "text",
      placeholder: "Company",
      label: "Company",
    },
    {
      id: 5,
      name: "position",
      type: "text",
      placeholder: "Position",
      label: "Position",
      required: false,
    },

    {
      id: 6,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 7,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 8,
      name: "file",
      type: "file",
      placeholder: "Upload profile photo",
      label: "Upload profile photo",
      required: true,
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Create Formdata - did this due to the addition of file in the submission of data
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("lastname", values.lastname);
    formData.append("firstname", values.firstname);
    formData.append("company", values.company);
    formData.append("position", values.position);
    formData.append("file", values.file);

    try {
      const response = await axios.post("/api/sos/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 10000);
      const { fileName, filePath } = response.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
      // window.location.replace("/");
      navigate("/", { replace: true });
      // history.push("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);

      setFilePreview(URL.createObjectURL(e.target.files[0]));

      // Image preview
      const reader = new FileReader();
      reader.onload = function (e) {
        reader.readAsDataURL(e.target.files[0]);

        return true;
      };
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {uploadedFile ? (
          <div className="mt-4">
            <img
              src={filepreview}
              style={{
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: "200px",
                height: "200px",
              }}
              alt="preview"
            />
          </div>
        ) : null}

        <Progress percentage={uploadPercentage} />
        {error}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
