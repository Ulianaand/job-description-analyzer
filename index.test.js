const request = require('supertest');
const app = require('./index'); // Ensure your server file exports 'app'
const axios = require('axios');

jest.mock('axios'); // This lets us control axios responses during tests

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done);
});

describe('POST /analyze', () => {
  it('should process a valid job description and return structured insights', async () => {
    // Simulate an API response from the external model
    axios.post.mockResolvedValue({
      data: [
        {
          summary_text: "We are seeking a Full-Stack Developer with 3 years of experience in JavaScript, Node.js, and Express. Experience with React is a plus. We value agile methodologies and continuous integration. Based in New York City."
        }
      ]
    });
    
    const jobDescription = "We are seeking a Full-Stack Developer with 3 years of experience in JavaScript, Node.js, and Express. Experience with React is a plus. We value agile methodologies and continuous integration.";
    
    const response = await request(app)
      .post('/analyze')
      .send({ jobDescription })
      .set('Content-Type', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('key_skills');
    expect(response.body).toHaveProperty('experience_required');
    expect(response.body).toHaveProperty('industry_trends');
    
    // Additional checks on the extracted data can be done if expected outputs are known
    expect(response.body.experience_required).toMatch(/3\s*years/i);
  });

  it('should return a 400 error when jobDescription is missing', async () => {
    const response = await request(app)
      .post('/analyze')
      .send({})
      .set('Content-Type', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should handle external API failures gracefully', async () => {
    // Simulate an error from the external API
    axios.post.mockRejectedValue(new Error("External API error"));
    
    const jobDescription = "We are seeking a Backend Engineer.";
    
    const response = await request(app)
      .post('/analyze')
      .send({ jobDescription })
      .set('Content-Type', 'application/json');
    
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  }); 
});
