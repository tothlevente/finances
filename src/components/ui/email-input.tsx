import { Input } from "./input";
import { Label } from "./label";

interface EmailInputProps {
  email: string;
  setEmail: (value: React.SetStateAction<string>) => void;
  placeholder?: string | undefined;
  autoComplete?: string | undefined;
  loading: boolean;
}

export const EmailInput = ({
  email,
  setEmail,
  placeholder,
  autoComplete,
  loading,
}: EmailInputProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder={placeholder || "Enter your email address"}
        value={email}
        autoComplete={autoComplete}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
        autoFocus
      />
    </div>
  );
};
