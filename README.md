# AI Event Planning System

Complete full-stack application using CrewAI multi-agent system for automated event planning.

## 🌟 Features

- **Multi-Agent AI System**: Three specialized AI agents
  - Venue Coordinator: Finds and books venues
  - Logistics Manager: Coordinates catering and equipment
  - Marketing Agent: Creates marketing strategies
  
- **Modern Tech Stack**:
  - Backend: FastAPI + CrewAI 0.11.0
  - Frontend: React + Vite + TailwindCSS
  - Beautiful responsive UI

## 📋 Prerequisites

- Python 3.10-3.13
- Node.js 18+
- OpenAI API Key: https://platform.openai.com/api-keys
- Serper API Key: https://serper.dev/

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend:
```powershell
cd backend
```

2. Create virtual environment:
```powershell
python -m venv venv
```

3. Activate environment and install dependencies:
```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

4. Run server:
```powershell
python main.py
```

Or run in background:
```powershell
Start-Process -NoNewWindow -FilePath ".\venv\Scripts\python.exe" -ArgumentList "main.py"
```

Backend runs at: **http://localhost:8000**

### Frontend Setup

Open a **new terminal**:

1. Navigate to frontend:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Run development server:
```powershell
npm run dev
```

Frontend runs at: **http://localhost:3000**

## 🎯 Usage

1. Open browser: http://localhost:3000
2. Fill in event details:
   - Event Topic
   - Event City
   - Tentative Date
   - Expected Participants
   - Budget
   - Venue Type
   - Event Description
3. Enter API keys (OpenAI & Serper)
4. Click "Generate Event Plan"
5. Wait 1-2 minutes for AI processing
6. View results:
   - Venue details cards
   - Logistics confirmation
   - Marketing report

## 📁 Project Structure

```
CrewAI/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── crew_manager.py      # CrewAI agents & tasks
│   ├── requirements.txt     # Python dependencies
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EventForm.jsx
│   │   │   └── ResultsDisplay.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md
```

## 🔧 API Endpoints

### POST /run-event
Run event planning crew

**Request:**
```json
{
  "event_topic": "Tech Innovation Conference",
  "event_description": "A gathering...",
  "event_city": "Lahore",
  "tentative_date": "2025-11-22",
  "expected_participants": 200,
  "budget": 50000,
  "venue_type": "Conference Hall",
  "openai_api_key": "sk-...",
  "serper_api_key": "..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event planning completed successfully",
  "venue_details": {
    "name": "Grand Convention Center",
    "address": "Downtown Lahore",
    "capacity": 250,
    "booking_status": "Available"
  },
  "logistics_confirmation": "...",
  "marketing_report": "# Marketing Strategy..."
}
```

## 🛠️ Technologies

### Backend
- FastAPI 0.109.0
- CrewAI 0.11.0
- Pydantic 2.6.0
- Uvicorn

### Frontend
- React 18
- Vite
- TailwindCSS
- Axios
- React Markdown
- Lucide Icons

## ⚠️ Important Notes

- Processing takes 1-2 minutes
- API keys required for each request
- Files generated: `venue_details.json`, `marketing_report.md`
- CORS configured for localhost:3000

## 🐛 Troubleshooting

### Backend Issues
**"No module named 'fastapi'"**
```powershell
pip install -r requirements.txt
```

**"uvicorn not found"**
```powershell
python main.py
```

**Port 8000 in use**
- Change port in `main.py` line: `uvicorn.run(app, port=8001)`

### Frontend Issues
**"Cannot find module"**
```powershell
npm install
```

**Port 3000 in use**
- Change port in `vite.config.js`

**CORS errors**
- Ensure backend is running on port 8000

## 📝 Version Compatibility

This project uses **CrewAI 0.11.0** which is compatible with Python 3.10-3.13. The original tutorial code used 0.28.8 which doesn't exist in PyPI.

## 🤝 Support

For issues, check:
- Backend logs in terminal
- Browser console (F12)
- API documentation: http://localhost:8000/docs

---

Built with ❤️ using CrewAI, FastAPI, and React
