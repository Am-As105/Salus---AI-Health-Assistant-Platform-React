const inputStyle = (hasError) => ({
  width: '100%',
  padding: '8px 10px',
  boxSizing: 'border-box',
  border: `1px solid ${hasError ? '#c62828' : '#ccc'}`,
  borderRadius: 4,
  fontSize: 14,
  outline: 'none',
})

export function FormField({ label, error, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#333' }}>
        {label}
      </label>
      {children}
      {error && <span style={{ color: '#c62828', fontSize: 12 }}>{error}</span>}
    </div>
  )
}

export function TextInput({ name, value, onChange, placeholder, type = 'text', error }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={inputStyle(!!error)}
    />
  )
}

export function SelectInput({ name, value, onChange, options, error }) {
  return (
    <select name={name} value={value} onChange={onChange} style={{ ...inputStyle(!!error), background: '#fff' }}>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
