/* add fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* add some free styles */
import { faDAndD } from "@fortawesome/free-brands-svg-icons";

import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/* add each imported icon to the library */
library.add(
  faDAndD,
  faUserSecret,
  faDiceD20,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faMagnifyingGlass,
  faPlus
);
