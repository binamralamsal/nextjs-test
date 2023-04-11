import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLoginUser(e) {
    e.preventDefault();

    const status = await signIn("credentials", {
      email: user.username,
      password: user.password,
      username: user.username,
      callbackUrl: "/profile/binamralamsal",
    });

    if (status.ok) {
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLoginUser}>
        <div>
          <label htmlFor="username">User Name or Email</label>
          <input
            type="text"
            placeholder="User Name or Email"
            name="username"
            id="username"
            value={user.username}
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
