import axios from "axios";

// login user
export async function loginUser(email, password) {
  try {
    const response = await axios.post("http://localhost:3001/api/user/login", {
      email,
      password,
    });
    if (response.data) {
      return response.data;
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}
// register user
export async function registerUser(userdata) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/user/register",
      userdata
    );
    if (response.data) {
      return response.data;
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}
