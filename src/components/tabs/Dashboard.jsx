// src/components/tabs/DashboardTab.jsx
import React, { useState, useMemo } from 'react';

const Dashboard = () => {
  // ===== MOCK DATA =====
  const mockTests = [
    { id: 'T-001', patient: 'Plankay', doctor: 'Dr. Ahmed', test: 'Heart Mareez', status: 'positive', date: '2025-04-05' },
    { id: 'T-002', patient: 'Amina Khan', doctor: 'Dr. Lee', test: 'Diabetes Panel', status: 'negative', date: '2025-04-05' },
    { id: 'T-003', patient: 'Rahim Ali', doctor: 'Dr. Patel', test: 'Liver Function', status: 'positive', date: '2025-04-05' },
    { id: 'T-004', patient: 'Zara Ahmed', doctor: 'Dr. Smith', test: 'Thyroid Check', status: 'pending', date: '2025-04-05' },
    { id: 'T-005', patient: 'Omar Malik', doctor: 'Dr. Garcia', test: 'Cholesterol Test', status: 'negative', date: '2025-04-04' },
    { id: 'T-006', patient: 'Fatima Yusuf', doctor: 'Dr. Ahmed', test: 'Pregnancy Test', status: 'positive', date: '2025-04-04' },
    { id: 'T-007', patient: 'Ali Hassan', doctor: 'Dr. Lee', test: 'Urinalysis', status: 'negative', date: '2025-04-04' },
    { id: 'T-008', patient: 'Sara Nabil', doctor: 'Dr. Ahmed', test: 'Hepatitis Panel', status: 'pending', date: '2025-04-03' },
    { id: 'T-009', patient: 'Khalid Omar', doctor: 'Dr. Patel', test: 'CBC Blood Test', status: 'negative', date: '2025-04-03' },
    { id: 'T-010', patient: 'Layla Samir', doctor: 'Dr. Smith', test: 'Genetic Screening', status: 'positive', date: '2025-04-02' },
  ];

  // ===== STATE =====
  const [filters, setFilters] = useState({
    doctor: '',
    dateRange: 'all', // 'today', 'last7', 'custom'
    testType: '',
    status: '',
    customStartDate: '',
    customEndDate: '',
  });

  // ===== FILTER LOGIC =====
  const filteredTests = useMemo(() => {
    return mockTests.filter((test) => {
      // Filter by doctor
      if (filters.doctor && test.doctor !== filters.doctor) return false;

      // Filter by test type
      if (filters.testType && test.test !== filters.testType) return false;

      // Filter by status
      if (filters.status && test.status !== filters.status) return false;

      // Filter by date
      const testDate = new Date(test.date);
      const now = new Date();
      switch (filters.dateRange) {
        case 'today':
          if (test.date !== now.toISOString().split('T')[0]) return false;
          break;
        case 'last7':
          const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
          if (testDate < sevenDaysAgo) return false;
          break;
        case 'custom':
          if (filters.customStartDate && new Date(test.date) < new Date(filters.customStartDate)) return false;
          if (filters.customEndDate && new Date(test.date) > new Date(filters.customEndDate)) return false;
          break;
        default:
          break;
      }

      return true;
    });
  }, [filters]);

  // ===== STATS CALCULATION =====
  const stats = useMemo(() => {
    const total = filteredTests.length;
    const pending = filteredTests.filter(t => t.status === 'pending').length;
    const completedToday = filteredTests.filter(
      t => t.status !== 'pending' && t.date === new Date().toISOString().split('T')[0]
    ).length;
    const positive = filteredTests.filter(t => t.status === 'positive').length;

    return { total, pending, completedToday, positive };
  }, [filteredTests]);

  // ===== DATE HELPERS =====
  const getTodayISO = () => new Date().toISOString().split('T')[0];
  const getLast7DaysISO = () => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  };

  // ===== EVENT HANDLERS =====
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      doctor: '',
      dateRange: 'all',
      testType: '',
      status: '',
      customStartDate: '',
      customEndDate: '',
    });
  };

  // ===== UNIQUE OPTIONS FOR DROPDOWNS =====
  const doctors = [...new Set(mockTests.map(t => t.doctor))];
  const testTypes = [...new Set(mockTests.map(t => t.test))];
  const statuses = ['pending', 'positive', 'negative'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          🧪 Lab Dashboard
        </h2>
        <p className="text-gray-600 mt-2">Monitor lab activity, performance, and key metrics.</p>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Tests */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Tests</p>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium uppercase tracking-wide">Pending</p>
              <p className="text-3xl font-bold mt-1">{stats.pending}</p>
            </div>
            <div className="bg-amber-400 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed Today */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium uppercase tracking-wide">Completed Today</p>
              <p className="text-3xl font-bold mt-1">{stats.completedToday}</p>
            </div>
            <div className="bg-green-400 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Positive Results */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium uppercase tracking-wide">Positive Results</p>
              <p className="text-3xl font-bold mt-1">{stats.positive}</p>
            </div>
            <div className="bg-red-400 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FILTERS SECTION ===== */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Filter Tests</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              name="doctor"
              value={filters.doctor}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Doctors</option>
              {doctors.map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
            <select
              name="testType"
              value={filters.testType}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Tests</option>
              {testTypes.map((test) => (
                <option key={test} value={test}>{test}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {filters.dateRange === 'custom' && (
            <div className="flex gap-2">
              <input
                type="date"
                name="customStartDate"
                value={filters.customStartDate}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                max={getTodayISO()}
              />
              <input
                type="date"
                name="customEndDate"
                value={filters.customEndDate}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                min={filters.customStartDate || getLast7DaysISO()}
                max={getTodayISO()}
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm bg-red-200 text-red-700 rounded hover:bg-gray-300 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* ===== RECENT ACTIVITY TABLE ===== */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">📋 Recent Tests ({filteredTests.length} results)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTests.length > 0 ? (
                filteredTests.slice(0, 10).map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{test.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{test.patient}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{test.doctor}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{test.test}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          test.status === 'positive'
                            ? 'bg-red-100 text-red-800'
                            : test.status === 'negative'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{test.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    No tests match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;