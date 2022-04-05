import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <h1>Teste</h1>
      <h2>{JSON.stringify(user)}</h2>
      <a href="/api/auth/login/">Login</a>
    </div>
  );
}
