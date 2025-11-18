import { useState } from 'react'
import axios from 'axios'
import { Send, Key } from 'lucide-react'

const EventForm = ({ setResults, loading, setLoading }) => {
  const [formData, setFormData] = useState({
    event_topic: 'Tech Innovation Conference',
    event_description: 'A gathering of tech innovators and industry leaders to explore future technologies.',
    event_city: 'Lahore',
    tentative_date: '2025-11-22',
    expected_participants: 200,
    budget: 50000,
    venue_type: 'Conference Hall',
    openai_api_key: '',
    serper_api_key: ''
  })

  const [showKeys, setShowKeys] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'expected_participants' || name === 'budget' 
        ? parseFloat(value) || 0 
        : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.openai_api_key || !formData.serper_api_key) {
      alert('Please enter both API keys')
      return
    }

    setLoading(true)
    setResults(null)

    try {
      const response = await axios.post('http://localhost:8000/run-event', formData)
      setResults(response.data)
    } catch (error) {
      console.error('Error:', error)
      alert('Error: ' + (error.response?.data?.detail || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span>📋</span> Event Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* API Keys Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <button
            type="button"
            onClick={() => setShowKeys(!showKeys)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors"
          >
            <Key className="w-5 h-5" />
            API Keys (Required)
            <span className="text-sm text-gray-500">
              {showKeys ? '▼' : '▶'}
            </span>
          </button>
          
          {showKeys && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OpenAI API Key *
                </label>
                <input
                  type="password"
                  name="openai_api_key"
                  value={formData.openai_api_key}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="sk-..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serper API Key *
                </label>
                <input
                  type="password"
                  name="serper_api_key"
                  value={formData.serper_api_key}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Serper API key"
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Event Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Topic *
            </label>
            <input
              type="text"
              name="event_topic"
              value={formData.event_topic}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event City *
            </label>
            <input
              type="text"
              name="event_city"
              value={formData.event_city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tentative Date *
            </label>
            <input
              type="date"
              name="tentative_date"
              value={formData.tentative_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Participants *
            </label>
            <input
              type="number"
              name="expected_participants"
              value={formData.expected_participants}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget ($) *
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Type *
            </label>
            <select
              name="venue_type"
              value={formData.venue_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Conference Hall">Conference Hall</option>
              <option value="Hotel Ballroom">Hotel Ballroom</option>
              <option value="Convention Center">Convention Center</option>
              <option value="Outdoor Venue">Outdoor Venue</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Description *
          </label>
          <textarea
            name="event_description"
            value={formData.event_description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              Planning Event...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Generate Event Plan
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default EventForm
