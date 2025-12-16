const getProfileDetails = async (userId) => {
  console.log(userId)
  const res = await fetch(`https://learncode-i5lr.onrender.com/api/profile/user/${userId}`, {
    method: 'GET',
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const data = await res.json();
  console.log(data);
  return data;  
};


const uploadResume = async ( resume ) => {
  const res = fetch('https://learncode-i5lr.onrender.com/api/profile/update/link',  {
    method: 'PUT',
    credentials: 'include',
    headers: { "Content-Type": "multipart/form-data" },
    data : resume
  })

  return await res.json
}

const updateLinks = async ( data ) => {
  const res = fetch('https://learncode-i5lr.onrender.com/api/profile/update/link',
    {
      method: 'PUT',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data
      }),
    }
  );

  return await res.json
}

const updateEduData = async ( data ) => {
  const res = fetch('https://learncode-i5lr.onrender.com/api/profile/update/educationDetails',
    {
      method: 'PUT',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data
      }),
    }
  );

  return await res.json
}

export { updateLinks, updateEduData, uploadResume, getProfileDetails }