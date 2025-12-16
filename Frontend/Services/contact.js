export const summitFrom = async(formData) => { 
  const res = fetch('https://learncode-i5lr.onrender.com/api/contact', {
    method: 'POST',
    headers: {  "Content-Type": "application/json"  },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
  return data;
}
 