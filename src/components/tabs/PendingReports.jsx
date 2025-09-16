// src/components/tabs/PendingReports.jsx
import React, { useState, useEffect } from 'react';
import TestFormLoader from '../tests/TestFormLoader'; // NEW

const PendingReports = () => {
  // Mock Data (replace with API call later)
  const mockReports = [
    { id: 'PT-2025-001', patientName: 'Plankay', testName: 'Heart Mareez', status: 'positive', date: '2025-04-05' },
    { id: 'PT-2025-002', patientName: 'Amina Khan', testName: 'Diabetes Test', status: 'negative', date: '2025-04-04' },
    { id: 'PT-2025-003', patientName: 'Rahim Ali', testName: 'Liver Function', status: 'positive', date: '2025-04-03' },
    { id: 'PT-2025-004', patientName: 'Zara Ahmed', testName: 'Thyroid Panel', status: 'negative', date: '2025-04-02' },
    { id: 'PT-2025-005', patientName: 'Omar Malik', testName: 'Cholesterol Check', status: 'positive', date: '2025-04-01' },
  ];

  // Base reports state (will get updated when saving)
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState(mockReports);

  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Test-specific data state
  const [testData, setTestData] = useState(null);
  const [loadingTestData, setLoadingTestData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Simulated API fetch
  const fetchTestData = async (report) => {
    setLoadingTestData(true);
    setError(null);
    try {
      await new Promise(r => setTimeout(r, 400));
      // If already saved previously, preload stored data
      const existing = reports.find(r => r.id === report.id);
      if (existing?.savedData) return existing.savedData;
      return {
        notes: '',
        values: {},
        lastUpdated: new Date().toISOString(),
      };
    } catch (e) {
      setError('Failed to load test data');
      return null;
    } finally {
      setLoadingTestData(false);
    }
  };

  // Simulated save
  const saveTestData = async (report, payload) => {
    setSaving(true);
    setError(null);
    try {
      await new Promise(r => setTimeout(r, 500));
      console.log('Saving payload:', { reportId: report.id, payload });
      return true;
    } catch {
      setError('Save failed');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Load test data when modal opens
  useEffect(() => {
    if (isModalOpen && selectedReport) {
      fetchTestData(selectedReport).then(d => setTestData(d));
    } else {
      setTestData(null);
      setError(null);
    }
  }, [isModalOpen, selectedReport, reports]);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = reports.filter(
      (report) =>
        report.patientName.toLowerCase().includes(term) ||
        report.testName.toLowerCase().includes(term) ||
        report.id.toLowerCase().includes(term)
    );
    setFilteredReports(filtered);
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
    setTestData(null);
    setError(null);
  };

  const handleTestDataChange = (partial) => {
    setTestData(prev => ({ ...prev, ...partial, lastUpdated: new Date().toISOString() }));
  };

  const handleSave = async () => {
    if (!selectedReport) return;
    const payload = {
      reportMeta: {
        id: selectedReport.id,
        status: selectedReport.status,
        date: selectedReport.date,
        testName: selectedReport.testName,
      },
      testData
    };
    const success = await saveTestData(selectedReport, payload);
    if (success) {
      // Persist saved state on the report
      setReports(prev =>
        prev.map(r =>
          r.id === selectedReport.id
            ? { ...r, hasResult: true, savedData: testData }
            : r
        )
      );
      // Re-apply current filter
      setFilteredReports(prev =>
        prev.map(r =>
          r.id === selectedReport.id
            ? { ...r, hasResult: true, savedData: testData }
            : r
        )
      );
      closeModal();
    }
  };

  const printReport = (report) => {
    const data = report.savedData || {};
    const values = data.values || {};
    const rows = Object.keys(values).length
      ? Object.entries(values)
          .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
          .join('')
      : '<tr><td colspan="2">No values entered</td></tr>';

    const notesBlock = data.notes
      ? `<h3 style="margin-top:18px;font-size:14px;">Notes</h3><p style="white-space:pre-wrap;border:1px solid #ccc;padding:8px;border-radius:4px;">${data.notes}</p>`
      : '';

    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Report ${report.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 32px; color:#222; }
            h1 { margin: 0 0 4px; font-size:20px; }
            .meta { font-size:12px; color:#555; margin-bottom:16px; }
            table { width:100%; border-collapse: collapse; margin-top:8px; }
            th, td { border:1px solid #444; padding:6px 8px; font-size:12px; text-align:left; }
            th { background:#f2f2f2; }
            footer { margin-top:40px; font-size:11px; color:#666; text-align:center; }
          </style>
        </head>
        <body>
          <h1>Laboratory Report</h1>
          <div class="meta">
            <strong>Report ID:</strong> ${report.id}<br/>
            <strong>Patient:</strong> ${report.patientName}<br/>
            <strong>Test:</strong> ${report.testName}<br/>
            <strong>Status:</strong> ${report.status}<br/>
            <strong>Saved:</strong> ${data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'N/A'}<br/>
            <strong>Printed:</strong> ${new Date().toLocaleString()}
          </div>
          <h3 style="font-size:14px;margin:0;">Result Values</h3>
          <table>
            <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          ${notesBlock}
          <footer>Generated by Bacha Khan Lab Technologist</footer>
          <script>window.print();</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const total = reports.length;
  const completed = reports.filter(r => r.hasResult).length;

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
                          : report.status === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{report.date}</td>
                  <td className="px-4 py-3 text-right text-sm space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => openModal(report)}
                    >
                      {report.hasResult ? 'Edit' : 'View / Edit'}
                    </button>
                    {report.hasResult && (
                      <button
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                        onClick={() => printReport(report)}
                      >
                        Print
                      </button>
                    )}
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
        Showing {filteredReports.length} of {total} reports • Ready to print: {completed}
      </div>

      {/* Modal */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
            <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-xl p-6">
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedReport.testName} - {selectedReport.patientName}
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Report ID: {selectedReport.id} • Date: {selectedReport.date} • Status: {selectedReport.status}{' '}
                {selectedReport.hasResult && <span className="text-green-600 font-medium">• Saved</span>}
              </p>

              {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
                  {error}
                </div>
              )}

              {loadingTestData && (
                <div className="py-10 text-center text-gray-500 text-sm">Loading test data...</div>
              )}

              {!loadingTestData && !error && (
                <TestFormLoader
                  testName={selectedReport.testName}
                  report={selectedReport}
                  data={testData}
                  onChange={handleTestDataChange}
                />
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  disabled={saving}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || loadingTestData}
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
                  Save
                </button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PendingReports;