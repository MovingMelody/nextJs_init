import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useRouter } from "next/router";

function ViewHero({ selectedHero, message }) {
  /// grabbing params from url using next Router
  const router = useRouter();
  const heroId = router.query.id;
  const deleteHeroFromDb = async () => {
    try {
      const deleteRes = await axios(`http://localhost:3000/api/hero/${heroId}`, {
        method: "DELETE",
      });
      console.log(deleteRes);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="display-4">SuperHero Details</h1>
      <MDBCard style={{ maxWidth: "22rem" }}>
        <MDBCardBody>
          <MDBCardTitle>{selectedHero.superHero}</MDBCardTitle>
          <MDBCardText>{selectedHero.realName}</MDBCardText>
          <MDBCardText>ID : {heroId}</MDBCardText>
          {/* <MDBCardText>{message}</MDBCardText> */}
          <MDBBtn color="danger" onClick={deleteHeroFromDb}>
            DELETE
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const { id } = params;
  // server side rendering
  const response = await axios(`http://localhost:3000/api/hero/${id}`);
  console.log(response.data.hero);
  console.log("cool, single super hero data fetched from API");
  const { hero } = response.data;
  return {
    props: {
      message: "passing fetched data as props",
      selectedHero: hero,
    },
  };
}
export default ViewHero;
