const loginUser = async (user) => {
  return fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  }).then((response) => {
    return response.json();
  });
};

const registerUser = async (user) => {
  return fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    return response.json();
  });
};

const verifyOtp = async (email, otp) => {
  const result = await fetch("http://localhost:5000/api/register/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
    credentials: "include"
  });

  return result.json();
 }

const logout = async () => {
  return fetch("http://localhost:5000/api/logout", {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    return response;
  });
};

const isUserLoggedIn = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/checkAuth", {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
    
  } catch (error) {
    return { success: false }; 
  }
};

export { loginUser, registerUser, logout, isUserLoggedIn, verifyOtp };
