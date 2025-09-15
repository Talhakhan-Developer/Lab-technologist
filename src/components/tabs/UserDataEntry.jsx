// src/components/tabs/PatientDataEntry.jsx
import React, { useState, useEffect } from 'react';

const PatientDataEntry = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    idType: '',
    idNumber: '',
    patientId: '', // ← Will auto-generate
    referringDoctor: '', // ← From dropdown
    referringDoctorOther: '', // ← Shows if "Other" selected
    reasonForVisit: '', // ← From dropdown
    allergies: '',
    medicalHistory: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const [errors, setErrors] = useState({});

  // 🧬 Auto-generate Patient ID on component mount
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    // In real app, you'd fetch last ID from backend — here we simulate
    const randomSeq = Math.floor(1000 + Math.random() * 9000); // Simulate sequence
    const generatedId = `PT-${year}${month}${day}-${randomSeq}`;
    setFormData((prev) => ({ ...prev, patientId: generatedId }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.idType) newErrors.idType = 'ID type is required';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    if (!formData.patientId.trim()) newErrors.patientId = 'Patient ID is required';
    if (!formData.reasonForVisit.trim())
      newErrors.reasonForVisit = 'Reason for visit is required';
    if (
      formData.referringDoctor === 'other' &&
      !formData.referringDoctorOther.trim()
    ) {
      newErrors.referringDoctorOther = 'Please specify doctor/clinic name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // If "Other" is selected, use the custom input value
      const finalData = {
        ...formData,
        referringDoctor:
          formData.referringDoctor === 'other'
            ? formData.referringDoctorOther
            : formData.referringDoctor,
      };

      alert('✅ New Patient Registered Successfully!');
      console.log('New Patient Data:', finalData);

      // TODO: POST to backend
      // await fetch('/api/patients', { method: 'POST', body: JSON.stringify(finalData) })
    }
  };

  const handleReset = () => {
    // Reset form but keep auto-generated ID logic on next mount
    setFormData({
      fullName: '',
      dob: '',
      gender: '',
      phone: '',
      email: '',
      idType: '',
      idNumber: '',
      patientId: '',
      referringDoctor: '',
      referringDoctorOther: '',
      reasonForVisit: '',
      allergies: '',
      medicalHistory: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
    });
    setErrors({});
  };

  // 🏥 Sample Doctor/Clinic List — replace with real data from API later
  const referringDoctors = [
    { value: '', label: 'Select Doctor/Clinic' },
    { value: 'dr-ahmed-cardio', label: 'Dr. Ahmed — Cardiology' },
    { value: 'dr-lee-neuro', label: 'Dr. Lee — Neurology' },
    { value: 'city-hospital', label: 'City General Hospital' },
    { value: 'medilife-clinic', label: 'MediLife Clinic' },
    { value: 'other', label: 'Other (Specify Below)' },
  ];

  // 🧪 Common Test Reasons
  const testReasons = [
    { value: '', label: 'Select Test Reason' },
    { value: 'blood-test-cbc', label: 'Blood Test (CBC)' },
    { value: 'urine-analysis', label: 'Urine Analysis' },
    { value: 'glucose-test', label: 'Glucose / Diabetes Screening' },
    { value: 'cholesterol-panel', label: 'Cholesterol Panel' },
    { value: 'thyroid-test', label: 'Thyroid Function Test' },
    { value: 'pregnancy-test', label: 'Pregnancy Test' },
    { value: 'genetic-screening', label: 'Genetic Screening' },
    { value: 'infection-panel', label: 'Infection Panel (e.g., Hepatitis, HIV)' },
    { value: 'other-test', label: 'Other (Specify in Notes)' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        🩺 Register New Patient
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-blue-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.dob ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="unknown">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1234567890"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Type *
            </label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.idType ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select ID Type</option>
              <option value="national">National ID</option>
              <option value="passport">Passport</option>
              <option value="driver">Driver’s License</option>
              <option value="other">Other</option>
            </select>
            {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Number *
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              placeholder="Enter ID number"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.idNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
          </div>
        </div>

        {/* Lab/Medical Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-green-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient ID *
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              readOnly
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Auto-generated on form load</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Referring Doctor / Clinic *
            </label>
            <select
              name="referringDoctor"
              value={formData.referringDoctor}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.referringDoctor ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              {referringDoctors.map((doc) => (
                <option key={doc.value} value={doc.value}>
                  {doc.label}
                </option>
              ))}
            </select>
            {errors.referringDoctor && (
              <p className="text-red-500 text-xs mt-1">{errors.referringDoctor}</p>
            )}
          </div>

          {/* Conditionally show "Other Doctor" input */}
          {formData.referringDoctor === 'other' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Please Specify Doctor or Clinic Name *
              </label>
              <input
                type="text"
                name="referringDoctorOther"
                value={formData.referringDoctorOther}
                onChange={handleInputChange}
                placeholder="Enter full name or clinic"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.referringDoctorOther ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.referringDoctorOther && (
                <p className="text-red-500 text-xs mt-1">{errors.referringDoctorOther}</p>
              )}
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit / Test Requested *
            </label>
            <select
              name="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                errors.reasonForVisit ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              {testReasons.map((test) => (
                <option key={test.value} value={test.value}>
                  {test.label}
                </option>
              ))}
            </select>
            {errors.reasonForVisit && (
              <p className="text-red-500 text-xs mt-1">{errors.reasonForVisit}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Known Allergies (Optional)
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="Penicillin, Latex, etc."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brief Medical History (Optional)
            </label>
            <input
              type="text"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              placeholder="Diabetes, Hypertension, etc."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Address & Emergency Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-amber-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="2"
              placeholder="Street, City, State, ZIP"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              placeholder="Next of Kin"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleInputChange}
              placeholder="+1234567890"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition transform hover:scale-105"
          >
            🩺 Register Patient
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 transition"
          >
            🧹 Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientDataEntry;