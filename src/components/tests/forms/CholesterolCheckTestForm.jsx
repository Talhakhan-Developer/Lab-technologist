import React from 'react';

const CholesterolCheckTestForm = ({ report, data, onChange }) => {
  if (!data) return null;
  const v = data.values || {};
  const update = (k,val)=> onChange({ values: { ...v, [k]: val } });

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-700">Cholesterol Profile</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Total (mg/dL)">
          <input className="input" type="number" value={v.total || ''} onChange={e=>update('total', e.target.value)} />
        </Field>
        <Field label="HDL (mg/dL)">
          <input className="input" type="number" value={v.hdl || ''} onChange={e=>update('hdl', e.target.value)} />
        </Field>
        <Field label="LDL (mg/dL)">
          <input className="input" type="number" value={v.ldl || ''} onChange={e=>update('ldl', e.target.value)} />
        </Field>
        <Field label="Triglycerides (mg/dL)">
          <input className="input" type="number" value={v.trig || ''} onChange={e=>update('trig', e.target.value)} />
        </Field>
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

export default CholesterolCheckTestForm;