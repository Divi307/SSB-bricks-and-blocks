export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, email, productEnquiry } = req.body;

  if (!name || !contact || !email || !productEnquiry) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyTSarEkeNgH2WGp7_QYfYyhydDQ_-GviJgSYKbsXDTzNxu8tEB_WhzZl8wBUvda-Drqw/exec'; // Replace with your Apps Script URL

    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, contact, email, productEnquiry })
    });

    const data = await response.json();

    if (data.result === 'success') {
      return res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      return res.status(500).json({ error: data.message || 'Failed to submit form' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
