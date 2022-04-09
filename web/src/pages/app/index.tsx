import {
  useUser,
  withPageAuthRequired,
  getAccessToken,
} from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

const Home: React.FC = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Hello word</h1>
      <pre>{JSON.stringify(user)}</pre>
      <a href="/api/auth/logout">Sair</a>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
