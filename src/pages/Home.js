import React from 'react';
import { BodyContent } from "../globalStyles"; 


// Hero Feature Content Carousel

const Home = () => {
	return (
    <>
      {/* Add Body tag before each component otherwise it won't render :(*/}
      <BodyContent>
        <p>home</p>
        <a href="/my-trails"> Trails List</a>
        <br></br>
        <a href="/my-camps"> Camps List</a>
        <br></br>
        <a href="/added-trails"> My Trails </a>
        <br></br>
        <a href="/added-camps"> My Camps</a>
      </BodyContent>{" "}
    </>
  );
};

export default Home;
