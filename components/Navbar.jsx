import Link from "next/link";
import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
const Navbar = () => {
  return (
    <nav className="navbar px-4 py-3">
      <Link href="/">
        <a className="navbar-brand">Superhero Navbar</a>
      </Link>
      <Link href="/crud/add" passHref>
        <MDBBtn>Add New Hero</MDBBtn>
      </Link>
    </nav>
  );
};

export default Navbar;
