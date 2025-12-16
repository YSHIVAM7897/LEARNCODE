export const summitFrom = async(formData) => { 
  const res = fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: {  "Content-Type": "application/json"  },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
  return data;
}
 