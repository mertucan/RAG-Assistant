# Gemini Chatbot with React and Flask

This is a simple chatbot application that uses a React frontend, a Flask backend, and Google's Gemini API.

## Project Structure

```
/
|-- backend/
|   |-- venv/               # Virtual environment (optional)
|   |-- app.py              # Flask application
|   |-- requirements.txt    # Python dependencies
|   |-- .env                # Environment variables (contains API key)
|-- frontend/
|   |-- node_modules/       # Node.js dependencies
|   |-- public/
|   |-- src/
|   |   |-- App.css         # Styles for the application
|   |   |-- App.jsx         # Main React component
|   |-- package.json
|-- .gitignore
|-- README.md
```

## Setup and Installation

### Backend (Flask)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv venv
    venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your API key:**
    -   Rename the `.env` file in the `backend` directory.
    -   Open the `.env` file and replace `"YOUR_API_KEY_HERE"` with your actual Gemini API key.

### Frontend (React + Vite)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install the required npm packages:**
    ```bash
    npm install
    ```

## How to Run the Application

You need to run both the backend and frontend servers simultaneously in two separate terminals.

1.  **Run the Backend Server:**
    -   Open a terminal and navigate to the `backend` directory.
    -   Make sure your virtual environment is activated.
    -   Run the Flask application:
        ```bash
        flask run
        ```
    -   The backend server will start on `http://127.0.0.1:5000`.

2.  **Run the Frontend Server:**
    -   Open a second terminal and navigate to the `frontend` directory.
    -   Run the React development server:
        ```bash
        npm run dev
        ```
    -   The frontend application will open in your browser at `http://localhost:5173` (or another port if 5173 is busy).

Now you can open the application in your browser and start chatting!
