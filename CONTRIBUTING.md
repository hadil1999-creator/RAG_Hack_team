# Contributing to FinAI 

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

<!-- ### Reporting Bugs -->

<!-- ### Suggesting Enhancements -->

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Python Style Guide

All Python code must adhere to [PEP 8](https://www.python.org/dev/peps/pep-0008/).

### JavaScript Style Guide

All JavaScript code is linted with [Prettier](https://prettier.io/).

### React Style Guide

- Use functional components and hooks instead of class components
- Use PropTypes for type checking

### CSS Style Guide

We use Tailwind CSS for styling. Please refer to the [Tailwind CSS documentation](https://tailwindcss.com/docs) for best practices.

## Setting up your development environment

### Backend (FastAPI)

1. Ensure you have Python 3.7+ installed
2. Clone the repository: `git clone https://github.com/hadil1999-creator/RAG_Hack_team.git`
3. Navigate to the backend directory: `cd backend`
4. Create a virtual environment: `python -m venv venv`
5. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`
6. Install dependencies: `pip install -r requirements.txt`
7. Run the FastAPI server: `uvicorn main:app --reload`

### Frontend (React + Tailwind CSS)

1. Ensure you have Node.js and npm installed
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

<!-- ## Running Tests

- Backend: Run `pytest` in the backend directory
- Frontend: Run `npm test` in the frontend directory -->

Thank you for your contributions!