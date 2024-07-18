import { useEffect, useState } from "react";
import CommonLayout from "../../layouts/commonLayout";
import Services from "../../services";

const Home = () => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    Services.UserService.getUserDetails()
      .then((res) => setUser(res))
      .catch(() => console.log({ err: "error fetching user details" }));
  };

  return (
    <CommonLayout>
      <h2 className="text-center font-bold text-base">
        Welcome Home : {user?.name}
      </h2>
    </CommonLayout>
  );
};

export default Home;
