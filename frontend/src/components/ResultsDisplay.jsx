import ReactMarkdown from 'react-markdown'
import { MapPin, Users, CheckCircle, TrendingUp, Building } from 'lucide-react'

const ResultsDisplay = ({ results }) => {
  if (!results || !results.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800">
        <h3 className="text-xl font-semibold mb-2">❌ Error</h3>
        <p>{results?.message || 'An error occurred'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-green-800">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          {results.message}
        </h3>
      </div>

      {/* Venue Details */}
      {results.venue_details && !results.venue_details.error && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Building className="w-8 h-8 text-blue-600" />
            Venue Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Venue Name</p>
                  <p className="text-xl font-bold text-gray-800">
                    {results.venue_details.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-xl font-bold text-gray-800">
                    {results.venue_details.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Capacity</p>
                  <p className="text-xl font-bold text-gray-800">
                    {results.venue_details.capacity} people
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Booking Status</p>
                  <p className="text-xl font-bold text-gray-800">
                    {results.venue_details.booking_status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logistics Confirmation */}
      {results.logistics_confirmation && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            Logistics Confirmation
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm">
              {results.logistics_confirmation}
            </pre>
          </div>
        </div>
      )}

      {/* Marketing Report */}
      {results.marketing_report && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            Marketing Report
          </h2>
          <div className="prose prose-lg max-w-none bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-800 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-800 mb-3 mt-6" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-800 mb-2 mt-4" {...props} />,
                p: ({node, ...props}) => <p className="text-gray-700 mb-3" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
              }}
            >
              {results.marketing_report}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultsDisplay
