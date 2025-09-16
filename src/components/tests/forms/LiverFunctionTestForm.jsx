import React from 'react';

const LiverFunctionTestForm = ({ report, data, onChange }) => {
  if (!data) return null;
  const v = data.values || {};
  const update = (k, val) => onChange({ values: { ...v, [k]: val } });

  const inputs = [
    { key: 'alt', label: 'ALT (U/L)' },
    { key: 'ast', label: 'AST (U/L)' },
    { key: 'alp', label: 'ALP (U/L)' },
    { key: 'bilirubin', label: 'Bilirubin (mg/dL)' },
    { key: 'albumin', label: 'Albumin (g/dL)' },
    { key: 'ggt', label: 'GGT (U/L)' },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-700">Liver Function Panel</h4>
      <div className="grid sm:grid-cols-3 gap-4">
        {inputs.map(i => (
          <Field label={i.label} key={i.key}>
            <input
              type="number"
              className="input"
              value={v[i.key] || ''}
              onChange={(e) => update(i.key, e.target.value)}
            />
          </Field>
        ))}
      </div>
      <Field label="Notes">
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
  <label className="block text-xs">
    <span className="text-gray-600 font-medium">{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

export default LiverFunctionTestForm;