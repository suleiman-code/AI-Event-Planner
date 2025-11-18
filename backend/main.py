from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import json
import warnings
from crew_manager import EventManagementCrew

warnings.filterwarnings('ignore')

app = FastAPI(title="Event Planning API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class EventRequest(BaseModel):
    event_topic: str
    event_description: str
    event_city: str
    tentative_date: str
    expected_participants: int
    budget: float
    venue_type: str
    openai_api_key: str
    serper_api_key: str

class EventResponse(BaseModel):
    success: bool
    message: str
    venue_details: Optional[dict] = None
    logistics_confirmation: Optional[str] = None
    marketing_report: Optional[str] = None

@app.get("/")
def read_root():
    return {
        "message": "Event Planning API",
        "status": "running",
        "endpoints": {
            "POST /run-event": "Run event planning crew",
            "GET /health": "Health check"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/run-event", response_model=EventResponse)
async def run_event_planning(request: EventRequest):
    """
    Run the CrewAI event planning system with the provided event details.
    """
    try:
        # Set environment variables BEFORE importing crew
        os.environ["OPENAI_API_KEY"] = request.openai_api_key
        os.environ["SERPER_API_KEY"] = request.serper_api_key
        os.environ["OPENAI_MODEL_NAME"] = "gpt-3.5-turbo"
        
        # Clear any proxy settings that might interfere
        os.environ.pop("HTTP_PROXY", None)
        os.environ.pop("HTTPS_PROXY", None)
        os.environ.pop("http_proxy", None)
        os.environ.pop("https_proxy", None)
        
        # Prepare event details
        event_details = {
            'event_topic': request.event_topic,
            'event_description': request.event_description,
            'event_city': request.event_city,
            'tentative_date': request.tentative_date,
            'expected_participants': request.expected_participants,
            'budget': request.budget,
            'venue_type': request.venue_type
        }
        
        # Initialize and run the crew
        crew_manager = EventManagementCrew()
        result = crew_manager.run(event_details)
        
        # Read generated files
        venue_details = None
        marketing_report = None
        
        try:
            with open('venue_details.json', 'r', encoding='utf-8') as f:
                venue_details = json.load(f)
        except FileNotFoundError:
            venue_details = {"error": "Venue details not generated"}
        except Exception as e:
            venue_details = {"error": f"Error reading venue details: {str(e)}"}
        
        try:
            with open('marketing_report.md', 'r', encoding='utf-8') as f:
                marketing_report = f.read()
        except FileNotFoundError:
            marketing_report = "Marketing report not generated yet"
        except Exception as e:
            marketing_report = f"Error reading marketing report: {str(e)}"
        
        # Extract logistics info from result
        logistics_confirmation = str(result) if result else "Logistics arrangements completed"
        
        return EventResponse(
            success=True,
            message="Event planning completed successfully",
            venue_details=venue_details,
            logistics_confirmation=logistics_confirmation,
            marketing_report=marketing_report
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error during event planning: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
