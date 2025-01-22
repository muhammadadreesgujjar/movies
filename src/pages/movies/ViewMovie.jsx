import React, { useEffect } from "react";
import ViewCard from "../../components/movies/ViewCard";
import { getItem } from "../../helpers/utils/localStorage";

const ViewMovie = () => {
  useEffect(() => {
    const getuserMail = getItem("userMail");
    if (!getuserMail) {
      navigate("/signIn");
      return;
    }
    const users = getItem("users");
    if (!users) {
      navigate("/signIn");
      return;
    }
    const findUser = users.find((item) => item.email == getuserMail);
    if (!findUser) {
      navigate("/signIn");
      return;
    }
  }, []);
  return (
    <div className="w-full">
      <ViewCard
        id={1}
        imgSrc="/src/assets/images/boxImg1.png"
        name="Adrees"
        publishYear="2019"
      />
    </div>
  );
};

export default ViewMovie;
