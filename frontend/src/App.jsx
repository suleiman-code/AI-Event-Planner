import { useState } from 'react'
import EventForm from './components/EventForm'
import ResultsDisplay from './components/ResultsDisplay'
import { Calendar, Sparkles } from 'lucide-react'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Event Planner
            </h1>
            <Sparkles className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-gray-600 text-lg">
            Powered by CrewAI Multi-Agent System
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <EventForm 
            setResults={setResults} 
            loading={loading} 
            setLoading={setLoading} 
          />
          
          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
              <p className="mt-4 text-gray-600 text-lg">
                AI agents are planning your event... This may take 1-2 minutes.
              </p>
            </div>
          )}
          
          {results && !loading && <ResultsDisplay results={results} />}
        </div>
      </div>
    </div>
  )
}

export default App
