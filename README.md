# Job Description Analyzer

This project is a Node.js API that analyzes job descriptions and extracts key skills, required experience, and industry trends using an AI model. 
The API is deployed on Render and processes job descriptions through Hugging Face's NLP models.

## Skills and Tools Used

1. Backend: Node.js, Express.js
2. AI Model: Hugging Face Transformers (facebook/bart-large-cnn)
3. Testing: Jest, Supertest
4. Deployment: Render
5. Version Control: Git, GitHub
6. API Requests: Axios

## Project Overview

### How It Works

A user submits a job description via a POST request to the API.
The API sends the text to a pre-trained AI model to analyze the content.
The model extracts:

- Key skills (e.g., Node.js, Express.js, Python)
- Experience requirements (e.g., "4 years")
- Industry trends (e.g., AI, cloud computing)

The API returns the extracted insights as a JSON response.

### Project Setup and Installation
1. Clone the Repository
```  
git clone https://github.com/your-username/job-description-analyzer.git
cd job-description-analyzer
```
2. Install Dependencies
```    
npm install
``` 
3. Set Up Environment Variables

Create a .env file in the project root and add (use api key from https://huggingface.co/ it's free):
``` 
HUGGINGFACE_API_KEY=your_api_key_here 
``` 
4. Start the Server Locally
```
node index.js
```
The API will run on http://localhost:3000/.


## API Endpoints

1. Health Check

Endpoint: GET /

Response: "Job Description Analyzer API is running!"

2. Analyze Job Description
   
Endpoint: POST /analyze

Request Body (JSON):
```
{"jobDescription": "Looking for a backend developer with experience in Node.js and Express.js. 4 years of experience"}
```
Response (JSON):
```
{"key_skills": ["Node.js", "Express.js"],
  "experience_required": "4 years",
  "industry_trends": [] }
```

## Running Tests

The project includes Jest tests for API validation. 

Run tests using: 
```
npm test
```


## Deployment

The API is deployed on Render. You can access it at:
```
https://job-description-analyzer.onrender.com
```

## Future Improvements

Fine-tune the AI model for more accurate job description analysis.

Build a frontend UI for easier job description input.

Store analyzed job descriptions in a database for future reference.



## License

This project is open-source and available under the MIT License.
