// index.js
const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST /analyze route
app.post('/analyze', async (req, res) => {
  const { jobDescription } = req.body;
  if (!jobDescription) {
    return res.status(400).json({ error: 'Job description is required.' });
  }

  console.log('Received job description:', jobDescription);

  try {
    const llmResponse = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: jobDescription },
            { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
          );

    const analysis = processLLMResponse(llmResponse.data);
    res.json(analysis);
  } catch (error) {
    console.error('Error in /analyze:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sample function to process LLM response (update as needed)
function processLLMResponse(data) {
  if (!Array.isArray(data) || data.length === 0 || !data[0].summary_text) {
    return {
      key_skills: [],
      experience_required: 'Not specified',
      industry_trends: []
    };
  }
  
  const summary = data[0].summary_text;
  console.log('LLM Summary:', summary);

  let experienceMatch = summary.match(/(\d+\s*(?:-|\+)?\s*\d*\s*years?)/i);
  const experience_required = experienceMatch ? experienceMatch[0] : 'Not specified';

  const potentialSkills = [
    'JavaScript', 'Node.js', 'Express.js', 'React', 'Angular', 'Vue.js',
    'Python', 'Java', 'C#', 'Ruby', 'PHP', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Agile', 'Scrum', 'CI/CD', 'Git'
  ];
  
  const key_skills = potentialSkills.filter(skill => 
    summary.toLowerCase().includes(skill.toLowerCase())
  );
  
  const trends = ['AI', 'machine learning', 'cloud', 'big data', 'automation', 'DevOps'];
  const industry_trends = trends.filter(trend => 
    summary.toLowerCase().includes(trend.toLowerCase())
  );

  return {
    key_skills,
    experience_required,
    industry_trends
  };
}

// Only start the server if this file is run directly, not when imported for testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
