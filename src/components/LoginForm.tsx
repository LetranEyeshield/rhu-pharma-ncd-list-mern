import { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow bg-green-200 mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-l md:text-xl">Username:</label>
          <input
            className="w-full p-2 border rounded mt-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-l md:text-xl">Password:</label>
          <input
            className="w-full p-2 border rounded mt-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-l md:text-xl text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
