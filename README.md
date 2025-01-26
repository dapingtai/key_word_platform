# Key Word Platform
# 多功能關鍵字辨識平台

## Project Overview
This platform combines a voice-enabled search interface with an audio processing backend to provide comprehensive keyword recognition functionality.

## Technology Stack
### Frontend
- TypeScript
- Modern web technologies for voice recording and audio processing

### Backend
- Python
- FastAPI framework
- Advanced audio processing capabilities

## Project Structure
```
project/
├── frontend/            # Voice-enabled search interface
│   ├── src/            # Frontend source code
│   └── public/         # Static assets
├── backend/            # Audio processing API
│   ├── app/           # Backend application code
│   └── tests/         # Test suite
```

## Installation Guide
### Prerequisites
- Node.js version 14 or higher
- Python 3.8 or higher
- Docker and Docker Compose (for containerized deployment)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application
### Using Docker Compose
The easiest way to run both frontend and backend services:
```bash
docker compose up
```

### Manual Start
#### Frontend
```bash
cd frontend
npm run dev
```

#### Backend
```bash
cd backend
uvicorn run:app --reload
```

## Core Features
1. Voice Recording
   - High-quality audio capture
   - Real-time audio processing

2. Audio Analysis
   - Endpoint: `/api/v1/audio/analysis`
   - Advanced audio processing capabilities
   - Keyword extraction and recognition

## API Documentation
The backend API provides several endpoints for audio processing and analysis. Access the interactive API documentation at:
```
http://localhost:8000/docs
```

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Environment Variables
Create `.env` files in both frontend and backend directories with appropriate configurations.

For detailed configuration options, refer to the respective documentation in each component's directory.