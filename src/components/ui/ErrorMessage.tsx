import { AlertCircle } from "lucide-react";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
    <p className="text-sm text-red-700">{message}</p>
  </div>
);

export default ErrorMessage;
