import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegisterUser(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const status = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (status.ok) {
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleRegisterUser}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            id="fullName"
            value={user.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            placeholder="User Name"
            name="username"
            id="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}
