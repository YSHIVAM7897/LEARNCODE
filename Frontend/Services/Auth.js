const loginUser = async (user) => {
  return fetch("https://learncode-i5lr.onrender.com/api/login", {
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
  return fetch("https://learncode-i5lr.onrender.com/api/register", {
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
  const result = await fetch("https://learncode-i5lr.onrender.com/api/register/verify-otp", {
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
  return fetch("https://learncode-i5lr.onrender.com/api/logout", {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    return response;
  });
};

const isUserLoggedIn = async () => {
  try {
    const response = await fetch("https://learncode-i5lr.onrender.com/api/checkAuth", {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
    
  } catch (error) {
    return { success: false }; 
  }
};

export { loginUser, registerUser, logout, isUserLoggedIn, verifyOtp };
