"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
      localStorage.setItem("token", jsonData.token);
    } catch (error) {
      alert("ログイン失敗");
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="メールアドレス" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="パスワード" required />
        <button>ログイン</button>
      </form>
    </div>
  );
}

export default Login;