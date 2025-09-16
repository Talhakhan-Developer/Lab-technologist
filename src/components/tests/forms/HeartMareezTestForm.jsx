import React from 'react';

const HeartMareezTestForm = ({ report, data, onChange }) => {
  if (!data) return null;
  const values = data.values || {};

  const update = (field, value) => {
    onChange({ values: { ...values, [field]: value } });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-700">Cardiac Panel</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Blood Pressure (mmHg)">
          <input
            type="text"
            value={values.bp || ''}
            onChange={(e) => update('bp', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Heart Rate (bpm)">
          <input
            type="number"
            value={values.hr || ''}
            onChange={(e) => update('hr', e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Troponin (ng/L)">
            <input
              type="number"
              value={values.troponin || ''}
              onChange={(e) => update('troponin', e.target.value)}
              className="input"
            />
        </Field>
        <Field label="Cholesterol (mg/dL)">
          <input
            type="number"
            value={values.chol || ''}
            onChange={(e) => update('chol', e.target.value)}
            className="input"
          />
        </Field>
      </div>
      <Field label="Notes">
        <textarea
          value={data.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="input h-24 resize-none"
        />
      </Field>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="block text-sm">
    <span className="text-gray-600 font-medium">{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

export default HeartMareezTestForm;