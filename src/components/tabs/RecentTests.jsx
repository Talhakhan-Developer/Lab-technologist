// src/components/tabs/RecentTests.jsx
import React, { useState, useMemo } from 'react';

const RecentTests = () => {
  // Mock Data
  const mockRecentTests = [
    {
      id: 'T-2025-1001',
      patientName: 'Plankay',
      testName: 'Heart Mareez Test',
      status: 'positive',
      time: '2025-04-05T14:30:00',
      doctor: 'Dr. Ahmed',
    },
    {
      id: 'T-2025-1002',
      patientName: 'Amina Khan',
      testName: 'Diabetes Panel',
      status: 'negative',
      time: '2025-04-05T12:15:00',
      doctor: 'Dr. Lee',
    },
    {
      id: 'T-2025-1003',
      patientName: 'Rahim Ali',
      testName: 'Liver Function',
      status: 'positive',
      time: '2025-04-05T10:00:00',
      doctor: 'Dr. Patel',
    },
    {
      id: 'T-2025-1004',
      patientName: 'Zara Ahmed',
      testName: 'Thyroid Check',
      status: 'pending',
      time: '2025-04-05T09:45:00',
      doctor: 'Dr. Smith',
    },
    {
      id: 'T-2025-1005',
      patientName: 'Omar Malik',
      testName: 'Cholesterol Test',
      status: 'negative',
      time: '2025-04-04T16:20:00',
      doctor: 'Dr. Garcia',
    },
    {
      id: 'T-2025-1006',
      patientName: 'Fatima Yusuf',
      testName: 'Pregnancy Test',
      status: 'positive',
      time: '2025-04-04T14:10:00',
      doctor: 'Dr. Khan',
    },
    {
      id: 'T-2025-1007',
      patientName: 'Ali Hassan',
      testName: 'Urinalysis',
      status: 'negative',
      time: '2025-04-04T11:30:00',
      doctor: 'Dr. Lee',
    },
    {
      id: 'T-2025-1008',
      patientName: 'Sara Nabil',
      testName: 'Hepatitis Panel',
      status: 'pending',
      time: '2025-04-03T17:45:00',
      doctor: 'Dr. Ahmed',
    },
    {
      id: 'T-2025-1009',
      patientName: 'Khalid Omar',
      testName: 'CBC Blood Test',
      status: 'negative',
      time: '2025-04-03T10:20:00',
      doctor: 'Dr. Patel',
    },
    {
      id: 'T-2025-1010',
      patientName: 'Layla Samir',
      testName: 'Genetic Screening',
      status: 'positive',
      time: '2025-04-02T15:00:00',
      doctor: 'Dr. Smith',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 5;

  // Format time to "X hours ago"
  const formatTimeAgo = (isoString) => {
    const testDate = new Date(isoString);
    const now = new Date();
    const diffMs = now - testDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return testDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filtered data based on search
  const filteredTests = useMemo(() => {
    return mockRecentTests.filter(
      (test) =>
        test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📈 Recent Lab Tests
      </h2>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search recent tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Recent Tests Grid */}
      <div className="grid gap-4">
        {currentTests.length > 0 ? (
          currentTests.map((test) => (
            <div
              key={test.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{test.testName}</h3>
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        test.status === 'positive'
                          ? 'bg-red-100 text-red-800'
                          : test.status === 'negative'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Patient:</span> {test.patientName}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Doctor:</span> {test.doctor}
                  </p>
                  <p className="text-sm text-gray-500">{formatTimeAgo(test.time)}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition">
                    View
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition">
                    Export
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No recent tests found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg font-medium transition ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-2 rounded-lg font-medium transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg font-medium transition ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {indexOfFirstTest + 1}–
        {Math.min(indexOfLastTest, filteredTests.length)} of {filteredTests.length} tests
      </div>
    </div>
  );
};

export default RecentTests;