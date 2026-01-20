export default function StatusBar() {
  return (
    <div className="border-b border-gray-200 bg-white px-6 h-8 flex items-center">
      <div className="flex items-center flex-wrap gap-4" style={{ fontSize: '12px' }}>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span className="text-gray-700">Instance: My Instance</span>
          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Database: neo4j <span className="text-[0.5rem] leading-[0.75rem]" style={{ color: '#5E636A' }}>CYPHER 5</span></span>
          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">User: Aura (placeholder@neo4j.com)</span>
          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
