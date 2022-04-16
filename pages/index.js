import axios from "axios";
import React from "react";
import styles from "../styles/Home.module.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import Link from "next/link";
function home({ heros }) {
  return (
    <div className={styles.container}>
      <h3 className="display-5 my-2">SuperHero Dashboard</h3>
      <p>Total heros length : {heros.length}</p>
      <main className={styles.main}>
        <div className={styles.grid} id="allHeros">
          {heros.map((eachHero) => {
            return (
              <div key={eachHero._id} className={styles.card}>
                <h2>{eachHero.superHero} &rarr;</h2>
                <p>Find real name by clicking on view.</p>
                <Link passHref href={`/crud/${eachHero._id}`}>
                  <MDBBtn className="mx-2 my-2">View Hero</MDBBtn>
                </Link>
                <Link passHref href={"/edit"}>
                  <MDBBtn className="my-2">Edit Hero</MDBBtn>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

/// getInitialProps enables server-side rendering in a page and allows you to do
/// initial data population, it means sending the page with
/// the data already populated from the server. This is especially useful for SEO.

/// old way of fetching data
// home.getInitialProps = async () => {
//   const response = await axios('http://localhost:3000/api/hero');
//   // const json = response.json();
//   console.log(response.data.hero);
//   console.log("cool after fetching the data");
//   return {};
// };

// now we can use getServerSideProps instead of getInitialProps, next latest recommendation
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export async function getServerSideProps(context) {
  // server side rendering
  const response = await axios("http://localhost:3000/api/hero");
  // const json = response.json();
  console.log(response.data.hero);
  console.log("cool, data fetched from API");
  const { hero } = response.data;
  return {
    props: {
      message: "passing fetched data as props",
      heros: hero,
    },
  };
}

export default home;
