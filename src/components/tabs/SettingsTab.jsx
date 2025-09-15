// src/components/tabs/SettingsTab.jsx
import React, { useState } from 'react';

const SettingsTab = () => {
  // Mock Lab Tests Data
  const [tests, setTests] = useState([
    { id: 1, name: 'CBC Blood Test', category: 'Hematology', min: '4.2', max: '5.9', unit: 'million/μL', active: true },
    { id: 2, name: 'Liver Function Test', category: 'Biochemistry', min: '0', max: '40', unit: 'U/L', active: true },
    { id: 3, name: 'Thyroid Panel (TSH)', category: 'Endocrinology', min: '0.4', max: '4.0', unit: 'mIU/L', active: true },
    { id: 4, name: 'Urine Analysis', category: 'Urinalysis', min: '', max: '', unit: 'N/A', active: true },
    { id: 5, name: 'Cholesterol Test', category: 'Lipid Profile', min: '0', max: '200', unit: 'mg/dL', active: false },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Start editing a test
  const handleEdit = (test) => {
    setEditingId(test.id);
    setFormData({ ...test });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  // Save edited test
  const handleSave = () => {
    setTests((prev) =>
      prev.map((test) => (test.id === editingId ? { ...formData } : test))
    );
    setEditingId(null);
    setFormData({});
    alert('✅ Test updated successfully!');
  };

  // Delete test (with confirmation)
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setTests((prev) => prev.filter((test) => test.id !== id));
    }
  };

  // Add new test
  const handleAddTest = () => {
    const newTest = {
      id: Date.now(), // Temporary ID
      name: 'New Test Name',
      category: 'General',
      min: '',
      max: '',
      unit: '',
      active: true,
    };
    setTests((prev) => [...prev, newTest]);
    handleEdit(newTest); // Start editing immediately
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        ⚙️ Lab Test Configuration
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Manage available tests, reference ranges, and units.
      </p>

      {/* Add New Test Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={handleAddTest}
          className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition flex items-center gap-2"
        >
          ➕ Add New Test
        </button>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  {editingId === test.id ? (
                    // ➤ Edit Mode
                    <>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.min}
                          onChange={(e) => setFormData({ ...formData, min: e.target.value })}
                          placeholder="e.g. 0.4"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.max}
                          onChange={(e) => setFormData({ ...formData, max: e.target.value })}
                          placeholder="e.g. 4.0"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={formData.unit}
                          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                          placeholder="e.g. mg/dL"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 font-medium text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-500 hover:text-gray-700 font-medium text-sm"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    // ➤ View Mode
                    <>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{test.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{test.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{test.min || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{test.max || '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{test.unit || '—'}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            test.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {test.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(test)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(test.id, test.name)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        {tests.filter((t) => t.active).length} active tests out of {tests.length} total
      </div>
    </div>
  );
};

export default SettingsTab;