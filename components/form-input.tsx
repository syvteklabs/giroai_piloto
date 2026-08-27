interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ label, error, className = '', ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-giro-grafite">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-2 border border-giro-borda rounded-lg text-giro-texto placeholder-giro-texto-sec focus:outline-none focus:ring-2 focus:ring-giro-vermelho ${className} ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  error?: string
}

export function FormSelect({ label, options, error, className = '', ...props }: FormSelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-giro-grafite">
        {label}
      </label>
      <select
        {...props}
        className={`w-full px-4 py-2 border border-giro-borda rounded-lg text-giro-texto focus:outline-none focus:ring-2 focus:ring-giro-vermelho ${className} ${
          error ? 'border-red-500' : ''
        }`}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function FormTextarea({ label, error, className = '', ...props }: FormTextareaProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-giro-grafite">
        {label}
      </label>
      <textarea
        {...props}
        className={`w-full px-4 py-2 border border-giro-borda rounded-lg text-giro-texto placeholder-giro-texto-sec focus:outline-none focus:ring-2 focus:ring-giro-vermelho resize-none ${className} ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
