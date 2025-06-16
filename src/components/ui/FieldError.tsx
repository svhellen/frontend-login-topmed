const FieldError: React.FC<{ error?: string }> = ({ error }) => {
  if (!error) return null;
  return <p className="text-xs text-red-600 mt-1">{error}</p>;
};

export default FieldError;
