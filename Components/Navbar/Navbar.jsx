import Image from "next/image";
import React, { useState } from "react";

import { Menu, X } from "lucide-react";
import NavItems from "./NavItems";
import Link from "next/link";


const Navbar = () => {
  const [navModal, setNavModal] = useState(false);
  

  return (
    <>
      <section className="sticky top-0 bg-white w-full z-50 flex justify-center ">
        <div className="container hidden w-full justify-between py-2 px-4 lg:flex">
          <Link href="/">
            <h1 className="text-2xl font-medium py-5">Assignment</h1>
          </Link>
          <NavItems />
        </div>
      </section>
      <section
        className={`sticky top-0 -mt-3 bg-white flex h-20 items-center justify-between px-4 lg:hidden z-50`}
      >
        <Link href="/">
         <h1 className="text-2xl font-medium py-5">Assignment</h1>
        </Link>
        <div>
          {!navModal ? (
            <Menu
              className="h-10 w-10"
              onClick={() =>
                navModal ? setNavModal(false) : setNavModal(true)
              }
            />
          ) : null}
        </div>
        <div
          className={`fixed right-0 top-0 z-50 h-screen w-[240px] bg-white px-4 pt-5 shadow-xl shadow-black  ${
            !navModal ? "hidden" : "block lg:hidden"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
             <h1 className="text-2xl font-medium py-5">Assignment</h1>
            </Link>
            <span>
              {navModal ? (
                <X
                  className="z-50 h-10 w-10"
                  onClick={() =>
                    navModal ? setNavModal(false) : setNavModal(true)
                  }
                />
              ) : null}
            </span>
          </div>
          <NavItems />
        </div>
      </section>
    </>
  );
};

export default Navbar;
