// Fetch all supported languages
export const fetchSupportedLanguage = async () => {
  const result = await fetch("http://localhost:5000/api/data/getLanguage");
  const data = await result.json();
  return data;
};

// Fetch content for a specific language by slug
export const fetchLanguageContent = async (slug) => {
  const result = await fetch(
    `http://localhost:5000/api/data/getLanguage/${slug}`
  );
  const data = await result.json();
  return data;
};

// Fetch content for a specific topic by language and topic ID
export const fetchTopicContent = async (language, topicId) => {
  const result = await fetch(
    `http://localhost:5000/api/data/getTopic/${language}/${topicId}`
  );
  const data = await result.text();
  return data;
};

//fetch quiz data for a specific language by slug
export const fetchQuizData = async (slug) => {
  const result = await fetch(`http://localhost:5000/api/data/getQuiz/${slug}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await result.json();

  if (result.status == 401) {
    alert("Please login to access the quiz.");
    window.location.href = "/login";
    return;
  }

  return data;
};

export const generateCertificate = async (language, percent) => {
  const response = await fetch(
    `http://localhost:5000/api/certificates/generate`,
    {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseName: language,
        score: percent,
      }),
    }
  ); 

  const data = await response.json();
  console.log("Certificate API Response:", data);

  return data;
};

export const fetchCertificateById = async (id) => {
  const response = await fetch(
    `https://learn-code-t4ym.onrender.com/api/certificates/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();  
  return data;
};

export const fetchAllCertificate = async () => {
  const response = await fetch(
    `http://localhost:5000/api/certificates`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  return data;
};