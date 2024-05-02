import { Roles } from "../constants";
import { useState } from "react";
import { clsx } from "clsx";

function Register() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setotp] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState(Roles.STUDENT);
  const [block_id, setBlock_id] = useState("");
  const [usn, setUsn] = useState("");
  const [room, setRoom] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault()
    if (email !== "") {
      try {
        const response = await fetch("https://arjun-college-project-backend.onrender.com/verify-email", {
          method: "POST",
          headers: { "content-type": "application/json " },
          body: JSON.stringify({ email }),
        });
        console.log(response)
        const data = await response.json();
        console.log(data);
        if (data) {
          alert(data.message)
          localStorage.setItem("complaintsOtp", data.otp)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("enter your email..")
    }

  }






  const onSubmit = async (e) => {
    e.preventDefault();

    const existingOtp = localStorage.getItem("complaintsOtp")
    if (existingOtp) {
      if (otp === existingOtp) {
        try {
          // const body = {full_name:fullname, email, password,phone, type: role, block_id, usn, room}
          let body;
          if (role === Roles.WARDEN) {
            body = { full_name: fullname, email, password, otp, phone, type: role, block_id };
          } else {
            body = { full_name: fullname, email, password, otp, phone, type: role, block_id, usn, room };
          }
          const response = await fetch("https://arjun-college-project-backend.onrender.com/register", {
            method: "POST",
            headers: { "content-type": "application/json " },
            body: JSON.stringify(body),
          });
          console.log(response)
          const data = await response.json();
          console.log(data);

          if (data.jwtToken) {
            window.location = "/"

            alert("user Register successfully")
            localStorage.removeItem("complaintsOtp");
          }
          else {
            alert("user already exists")
            localStorage.removeItem("complaintsOtp")
          }
        } catch (err) {
          console.log(err.message);
        }
      } else {
        alert("invalid otp. please check otp once.")
      }

    } else {
      alert("verify your email before sign up")
    }
  }

  return (
    <>
      <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-white-100">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">

          </div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">

          </div>


          <div className="relative flex flex-col sm:w-full md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] rounded-lg border-gray-400 bg-green shadow-lg px-4">
            <div className="flex-auto p-6">

              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                  <span className=" text-3xl font-black  tracking-tight opacity-100">Signup</span>
                </a>







              </div>






              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <img src={"data:image/jpeg;base64,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"} alt="Act logo" />
              </div>
              <h1 className="flex-shrink-0 text-2xl   tracking-tight  text-indigo-500 no-underline hover:text-indigo-500 opacity-100">Arjun College Of Technology</h1>

              <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome!</h4>
              <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

              <form className="mb-4" action="#" method="POST">

                <div className="mb-4">
                  <div className="flex justify-between">
                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Full Name</label>

                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch">
                    <input type="text" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="full-name" placeholder="Enter your full name" onChange={(e) => setFullname(e.target.value)} />
                  </div>
                </div>

                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                    <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="email-username" placeholder="Enter your email " autoFocus onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={sendOtp} className="bg-indigo-500 px-3 rounded mt-4 text-white font-semibold text-lg ">SEND OTP</button>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700 ">
                      STUDENT TYPE
                      <select className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow mt-3" >
                        <option value="option1">Hosteller</option>
                        <option value="option2">Dayscholar</option>
                      </select>
                    </label>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Phone Number</label>
                    <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>



                {/* <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Block ID</label>
                  <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="email-username" placeholder="Enter your Block ID" autoFocus onChange={(e) => setBlock_id(e.target.value)} />
                </div>
                <div className="flex-1">
                  <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Room</label>
                  <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"  name="password" placeholder="Enter your Room" onChange={(e) => setRoom(e.target.value)}/>
                </div>
              </div> */}
                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">

                  {role === Roles.WARDEN ? null : (
                    <div className="flex-1">
                      <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                        Room
                      </label>
                      <input
                        type="text"
                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        name="password"
                        placeholder="Enter your Room"
                        onChange={(e) => setRoom(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                {/* <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
    {role === Roles.STUDENT && (
      <div className="flex-1">
        <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
          USN
        </label>
        <input
          type="text"
          className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
          name="email-username"
          placeholder="Enter your USN"
          autoFocus
          onChange={(e) => setUsn(e.target.value)}
        />
      </div>
    )}
    <div className={role === Roles.STUDENT ? "flex-1 w-full" : "flex-1"}>
      <label htmlFor="role" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
        Role
      </label>
      <div className="flex gap-x-3 w-fit pl-2 pr-2 bg-slate-100 rounded-md text-sm">
        <button
          type="button"
          onClick={() => setRole(Roles.WARDEN)}
          className={`rounded-md p-2 my-1 transition-all text-black ${role === Roles.WARDEN && " bg-indigo-500 text-white"}`}
        >
          Warden
        </button>
        <button
          type="button"
          onClick={() => setRole(Roles.STUDENT)}
          className={`rounded-md p-2 my-1 transition-all text-black ${role === Roles.STUDENT && "bg-indigo-500 text-white"}`}
        >
          Student
        </button>
      </div>
    </div>
  </div>


              <div className="mb-4">
                <div className="flex justify-between">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
              
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input type="password" id="password" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" placeholder="············" onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div> */}

                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className={role === Roles.STUDENT ? "flex-1 w-full" : "flex-1"}>
                    {role === Roles.STUDENT && (
                      <>
                        <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                          REG NO
                        </label>
                        <input
                          type="text"
                          className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                          name="email-username"
                          placeholder="Enter your REG NO"
                          autoFocus
                          onChange={(e) => setUsn(e.target.value)}
                        />
                      </>
                    )}
                    <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="relative block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />




                    <label htmlFor="otp" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      otp
                    </label>
                    <input
                      type="otp"
                      id="otp"
                      className="relative block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="otp"
                      placeholder="Enter Your Otp"
                      value={otp}
                      onChange={(e) => setotp(e.target.value)}
                    />









                  </div>
                  <div className="flex-1">
                    <label htmlFor="role" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      Role
                    </label>
                    <div className="flex gap-x-2 w-fit pl-2 pr-2 bg-slate-100 rounded-md text-sm">
                      <button
                        type="button"
                        onClick={() => setRole(Roles.WARDEN)}
                        className={`rounded-md p-5 my-0  text-white ${role === Roles.WARDEN && "bg-indigo-500 "}`}
                      >
                        Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole(Roles.STUDENT)}
                        className={`rounded-md  p-5 my-1 transition-all text-black ${role === Roles.STUDENT && "bg-indigo-500 text-white"}`}
                      >
                        Student
                      </button>
                    </div>
                  </div>
                </div>


                <div className="mb-4">
                  <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit" onClick={onSubmit}>Sign up</button>
                </div>
              </form>

              <p className="mb-4 text-center">
                Already have an account?
                <a href="/login" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Login </a>
              </p>
            </div>
          </div >

        </div >
      </div >
    </>
  );
}

export default Register;
