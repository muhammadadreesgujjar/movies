import ViewCard from "../../components/movies/ViewCard";

const ViewMovie = () => {
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
