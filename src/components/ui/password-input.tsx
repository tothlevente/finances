import { Input } from "./input";
import { Label } from "./label";

interface PasswordInputProps {
  id: string;
  label: string;
  password: string;
  setPassword: (value: React.SetStateAction<string>) => void;
  autoComplete?: string | undefined;
  loading: boolean;
}

export const PasswordInput = ({
  id,
  label,
  password,
  setPassword,
  autoComplete,
  loading,
}: PasswordInputProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="password"
        placeholder={label}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        autoComplete={autoComplete}
        required
      />
    </div>
  );
};
