import sys
import os

# Add backend to path
sys.path.insert(0, 'E:\\CrewAI\\backend')

# Test imports
try:
    print("Testing imports...")
    from crew_manager import EventManagementCrew
    print("✅ crew_manager imported successfully")
    
    # Test basic initialization with dummy keys
    os.environ["OPENAI_API_KEY"] = "test-key"
    os.environ["SERPER_API_KEY"] = "test-key"
    
    print("Creating EventManagementCrew instance...")
    crew = EventManagementCrew()
    print("✅ EventManagementCrew created successfully")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
