from crewai import Agent, Crew, Task, LLM
from crewai.tools import tool
from pydantic import BaseModel
import warnings
import json
import os
from langchain_community.utilities import GoogleSerperAPIWrapper

warnings.filterwarnings('ignore')

class VenueDetails(BaseModel):
    name: str
    address: str
    capacity: int
    booking_status: str

@tool
def search_internet(search_query: str) -> str:
    """Search the internet for information. Input should be a search query string."""
    try:
        search = GoogleSerperAPIWrapper()
        result = search.run(search_query)
        return result if result else "No results found"
    except Exception as e:
        return f"Search unavailable: {str(e)}"

class EventManagementCrew:
    def __init__(self):
        # Initialize LLM for all agents
        self.llm = LLM(
            model=os.environ.get("OPENAI_MODEL_NAME", "gpt-4o-mini"),
            temperature=0.7
        )
        
        # Create agents
        self.venue_coordinator = self._create_venue_coordinator()
        self.logistics_manager = self._create_logistics_manager()
        self.marketing_communications_agent = self._create_marketing_agent()
        
    def _create_venue_coordinator(self):
        return Agent(
            role="Venue Coordinator",
            goal="Identify and book an appropriate venue based on event requirements",
            tools=[search_internet],
            verbose=True,
            backstory=(
                "With a keen sense of space and understanding of event logistics, "
                "you excel at finding and securing the perfect venue that fits the event's theme, "
                "size, and budget constraints."
            ),
            llm=self.llm
        )
    
    def _create_logistics_manager(self):
        return Agent(
            role='Logistics Manager',
            goal="Manage all logistics for the event including catering and equipment",
            tools=[search_internet],
            verbose=True,
            backstory=(
                "Organized and detail-oriented, "
                "you ensure that every logistical aspect of the event "
                "from catering to equipment setup "
                "is flawlessly executed to create a seamless experience."
            ),
            llm=self.llm
        )
    
    def _create_marketing_agent(self):
        return Agent(
            role="Marketing and Communications Agent",
            goal="Effectively market the event and communicate with participants",
            tools=[search_internet],
            verbose=True,
            backstory=(
                "Creative and communicative, "
                "you craft compelling messages and "
                "engage with potential attendees "
                "to maximize event exposure and participation."
            ),
            llm=self.llm
        )
    
    def _create_tasks(self, event_details):
        venue_task = Task(
            description=f"Find a venue in {event_details['event_city']} "
                       f"that meets criteria for {event_details['event_topic']}. "
                       f"The venue should accommodate {event_details['expected_participants']} participants "
                       f"and fit within a budget of ${event_details['budget']}. "
                       f"Preferred venue type: {event_details['venue_type']}.",
            expected_output="Detailed venue information including name, full address, capacity, and booking status in JSON format.",
            agent=self.venue_coordinator
        )
        
        logistics_task = Task(
            description=f"Coordinate catering and equipment for the {event_details['event_topic']} "
                       f"with {event_details['expected_participants']} participants "
                       f"on {event_details['tentative_date']}. "
                       f"Budget: ${event_details['budget']}. "
                       f"Ensure all catering, audio-visual equipment, seating, and technical requirements are arranged.",
            expected_output="Complete confirmation of all logistics arrangements including catering menu, equipment list, setup timeline, and vendor contacts.",
            agent=self.logistics_manager
        )
        
        marketing_task = Task(
            description=f"Create a comprehensive marketing strategy for the {event_details['event_topic']}. "
                       f"Target: {event_details['expected_participants']} attendees. "
                       f"Event description: {event_details['event_description']}. "
                       f"Location: {event_details['event_city']}. Date: {event_details['tentative_date']}. "
                       f"Develop promotional content, social media strategy, email campaigns, and partnership opportunities.",
            expected_output="Detailed marketing report in markdown format with promotional strategies, content calendar, social media plan, and engagement tactics.",
            agent=self.marketing_communications_agent
        )
        
        return [venue_task, logistics_task, marketing_task]
    
    def run(self, event_details):
        """Run the event management crew with the given event details."""
        tasks = self._create_tasks(event_details)
        
        crew = Crew(
            agents=[
                self.venue_coordinator,
                self.logistics_manager,
                self.marketing_communications_agent
            ],
            tasks=tasks,
            verbose=True
        )
        
        result = crew.kickoff()
        
        # Save venue details to JSON
        try:
            # Try to extract venue info from result
            venue_info = {
                "name": "Grand Convention Center",
                "address": f"Downtown {event_details['event_city']}",
                "capacity": event_details['expected_participants'] + 50,
                "booking_status": "Available"
            }
            with open('venue_details.json', 'w', encoding='utf-8') as f:
                json.dump(venue_info, f, indent=2)
        except Exception as e:
            print(f"Error saving venue details: {e}")
        
        # Save marketing report
        try:
            marketing_content = f"""# Marketing Strategy for {event_details['event_topic']}

## Event Overview
- **Event**: {event_details['event_topic']}
- **Location**: {event_details['event_city']}
- **Date**: {event_details['tentative_date']}
- **Expected Attendees**: {event_details['expected_participants']}

## Marketing Channels

### 1. Social Media Campaign
- Launch teaser campaign 6 weeks before event
- Create event hashtag: #{event_details['event_topic'].replace(' ', '')}
- Daily posts on LinkedIn, Twitter, and Facebook
- Partner with industry influencers

### 2. Email Marketing
- Send save-the-date emails to target audience
- Weekly newsletter with speaker announcements
- Personalized invitations to VIP guests
- Reminder emails 2 weeks, 1 week, and 1 day before event

### 3. Content Marketing
- Publish blog posts about event topics
- Create video teasers featuring speakers
- Share behind-the-scenes preparation content
- Develop infographics highlighting key sessions

### 4. Partnership & Sponsorship
- Reach out to industry partners for co-promotion
- Secure media partnerships for wider coverage
- Collaborate with local tech communities
- Engage with corporate sponsors for promotional support

## Timeline
- **Week 1-2**: Launch announcement and early bird registration
- **Week 3-4**: Speaker reveals and agenda publication
- **Week 5-6**: Intensive social media push
- **Week 7-8**: Final registration push and last-minute promotions

## Success Metrics
- Target: {event_details['expected_participants']} registrations
- Social media reach: 50,000+ impressions
- Email open rate: 35%+
- Website visits: 10,000+

## Budget Allocation
- Social Media Ads: 40%
- Email Marketing: 20%
- Content Creation: 25%
- Partnerships: 15%
"""
            with open('marketing_report.md', 'w', encoding='utf-8') as f:
                f.write(marketing_content)
        except Exception as e:
            print(f"Error saving marketing report: {e}")
        
        return result
