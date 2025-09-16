import React from 'react';

const DiabetesTestForm = ({ report, data, onChange }) => {
  if (!data) return null;
  const values = data.values || {};
  const update = (f, v) => onChange({ values: { ...values, [f]: v } });

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-700">Diabetes Panel</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Fasting Glucose (mg/dL)">
          <input className="input" type="number" value={values.fasting || ''} onChange={e => update('fasting', e.target.value)} />
        </Field>
        <Field label="Random Glucose (mg/dL)">
          <input className="input" type="number" value={values.random || ''} onChange={e => update('random', e.target.value)} />
        </Field>
        <Field label="HbA1c (%)">
          <input className="input" type="number" step="0.1" value={values.hba1c || ''} onChange={e => update('hba1c', e.target.value)} />
        </Field>
        <Field label="Ketones (urine)">
          <select className="input" value={values.ketones || ''} onChange={e => update('ketones', e.target.value)}>
            <option value="">Select</option>
            <option>Negative</option>
            <option>Trace</option>
            <option>Small</option>
            <option>Moderate</option>
            <option>Large</option>
          </select>
        </Field>
      </div>
      <Field label="Diet / Notes">
        <textarea
          className="input h-24 resize-none"
          value={data.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
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

export default DiabetesTestForm;