import Home from "../comps/Home";

import React from "react";
import { Link as LinkScroll, Element } from "react-scroll";

export default function Index() {
  return (
    <div>
      <Home>
        <p>Hello Ivan</p>
      </Home>
      <nav>
        <ul>
          <LinkScroll
            activeClass="active"
            to="/"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            Inicio
          </LinkScroll>
        </ul>
      </nav>
    </div>
  );
}
