import React from 'react';
import HeartMareezTestForm from './forms/HeartMareezTestForm';
import DiabetesTestForm from './forms/DiabetesTestForm';
import LiverFunctionTestForm from './forms/LiverFunctionTestForm';
import ThyroidPanelTestForm from './forms/ThyroidPanelTestForm';
import CholesterolCheckTestForm from './forms/CholesterolCheckTestForm';

const registry = {
  'heart mareez': HeartMareezTestForm,
  'diabetes test': DiabetesTestForm,
  'liver function': LiverFunctionTestForm,
  'thyroid panel': ThyroidPanelTestForm,
  'cholesterol check': CholesterolCheckTestForm,
};

const TestFormLoader = ({ testName, report, data, onChange }) => {
  const key = testName.toLowerCase().trim();
  const Component = registry[key];

  if (!Component) {
    return (
      <div className="p-4 rounded border border-yellow-300 bg-yellow-50 text-sm text-yellow-800">
        No form component implemented for: {testName}
      </div>
    );
  }

  return (
    <Component
      report={report}
      data={data}
      onChange={onChange}
    />
  );
};

export default TestFormLoader;