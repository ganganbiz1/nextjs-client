import { useUser } from "hooks/useUser";


const Home = () => {
  const user = useUser();
  console.log(user);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export default Home;
