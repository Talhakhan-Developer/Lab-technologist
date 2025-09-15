// src/components/tabs/PendingReports.jsx
import React, { useState } from 'react';

const PendingReports = () => {
  // Mock Data (replace with API call later)
  const mockReports = [
    { id: 'PT-2025-001', patientName: 'Plankay', testName: 'Heart Mareez', status: 'positive', date: '2025-04-05' },
    { id: 'PT-2025-002', patientName: 'Amina Khan', testName: 'Diabetes Test', status: 'negative', date: '2025-04-04' },
    { id: 'PT-2025-003', patientName: 'Rahim Ali', testName: 'Liver Function', status: 'positive', date: '2025-04-03' },
    { id: 'PT-2025-004', patientName: 'Zara Ahmed', testName: 'Thyroid Panel', status: 'negative', date: '2025-04-02' },
    { id: 'PT-2025-005', patientName: 'Omar Malik', testName: 'Cholesterol Check', status: 'positive', date: '2025-04-01' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState(mockReports);

  // Filter reports based on search term
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = mockReports.filter(
      (report) =>
        report.patientName.toLowerCase().includes(term) ||
        report.testName.toLowerCase().includes(term) ||
        report.id.toLowerCase().includes(term)
    );
    setFilteredReports(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        Pending Reports
      </h2>

      {/* Search Bar */}
      <div className="mb-6 relative w-full">
        <input
          type="text"
          placeholder="Search by name, test, or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 absolute right-3 top-2.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{report.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{report.patientName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{report.testName}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'positive'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{report.date}</td>
                  <td className="px-4 py-3 text-right text-sm space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => alert(`View/Edit report for ${report.patientName}`)}
                    >
                      View/Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-medium"
                      onClick={() => alert(`Notify ${report.patientName} about result`)}
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No reports found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {filteredReports.length} of {mockReports.length} pending reports
      </div>
    </div>
  );
};

export default PendingReports;