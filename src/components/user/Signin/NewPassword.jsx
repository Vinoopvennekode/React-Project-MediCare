import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";
function NewPassword({ phone,setNewPassword }) {
    const Navigate=useNavigate()
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confPassword, setConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState("");
  const [required, setRequired] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
        phoneNumber: phone,
      password: data.get("password"),
      confPassword: data.get("confPassword"),
    };
    if (data.password && data.confPassword) {
      const regpassword =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (regpassword.test(data.password)) {
        setPassword(false);
        setPasswordError("");
        if (data.password === data.confPassword) {
          setPassword(false);
          setConfPassword(false);
          setPasswordError("");
          setConfPasswordError("");
          axios.post("/setNewPassword", data).then((res) => {
      
            if (res.data.status) {
              setNewPassword(false)
      
              Navigate('/signin')
            } else {
       
            }
          });
        } else {
          setPassword(true);
          setConfPassword(true);
          setPasswordError("Password is not match");
          setConfPasswordError("Password is not match");
        }
      } else {
        setPassword(true);
        setPasswordError(
          "Minimum eight characters, at least one letter, one number and one special character"
        );
      }
    } else {
      setRequired("Please enter your Details");
    }
  };

  return (
    <>
      <div className=" mt-10  bg-zinc-500 opacity-90 fixed inset-0 z-50  ">
        <div className="flex h-screen justify-center items-center ">
          <div className="flex flex-col items-center justify-center  bg-green-300 py-12 px-10 ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
              action=""
            >
              <input
                type="Text"
                placeholder="Password"
                id="password"
                name="password"
                class="border border-gray-400 py-1 px-2 w-full"
              />
              <p class="text-red-500 text-xs italic">{passwordError}</p>
              <input
                type="Text"
                placeholder="ConfirmPassword"
                id="confPassword"
                name="confPassword"
                class="border border-gray-400 py-1 px-2 w-full"
              />
              <p class="text-red-500 text-xs italic">{confPasswordError}</p>
              <p class="text-red-500 text-xs italic">{required}</p>

              <button type="sumbit" className="mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
