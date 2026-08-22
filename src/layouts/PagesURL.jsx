import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faUserCircle,
  faAreaChart,
  // faBuilding,
  faUser,
  faFile,
  faShapes,
  faBuilding,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";

/////////////////////////////////////////////
/// Items
/////////////////////////////////////////////
const PROFILE = {
    icon: <FontAwesomeIcon icon={faUserCircle} className="w-5 h-5" />,
    name: "User Profile",
    path: "/profile"
  },
  DASHBOARD = {
    icon: <FontAwesomeIcon icon={faBorderAll} className="w-5 h-5" />,
    name: "Dashboard",
    subItems: [{ name: "Statues", path: "/dashboard", pro: false }]
  },
  USERS = {
    name: "Users",
    icon: <FontAwesomeIcon icon={faUser} className="w-5 h-5" />,
    subItems: [{ name: "Users", path: "/users", pro: false }]
  },
  AGENCIES = {
    name: "Agencies",
    icon: <FontAwesomeIcon icon={faBuilding} className="w-5 h-5" />,
    subItems: [{ name: "Agencies", path: "/agencies", pro: false }]
  },
  REPORTS = {
    name: "Reports",
    icon: <FontAwesomeIcon icon={faFile} className="w-5 h-5" />,
    subItems: [{ name: "Reports", path: "/reports-to-assign", pro: false }]
  },
  AREAS = {
    name: "Areas",
    icon: <FontAwesomeIcon icon={faAreaChart} className="w-5 h-5" />,
    subItems: [
      { name: "Areas", path: "/areas", pro: false },
      { name: "Area Suggestions", path: "/area-suggestions", pro: false }
    ]
  },
  CATEGORIES = {
    name: "Categories",
    icon: <FontAwesomeIcon icon={faShapes} className="w-5 h-5" />,
    subItems: [{ name: "Categories", path: "/categories", pro: false }]
  },
  POSTS = {
    name: "Community",
    icon: <FontAwesomeIcon icon={faUserGroup} className="w-5 h-5" />,
    subItems: [{ name: "Posts", path: "/community", pro: false }]
  },
  PROPOSE_AREA = {
    name: "Areas Suggestions",
    icon: <FontAwesomeIcon icon={faAreaChart} className="w-5 h-5" />,
    subItems: [
      {
        name: "My Areas Suggestions",
        path: "/my-areas-suggestions",
        pro: false
      }
    ]
  },
  //////////////// Admin //////////////////
  ADMIN_ITEMS = [PROFILE, DASHBOARD, USERS, AGENCIES],
  ADMIN_OTHER_ITEMS = [AREAS, CATEGORIES],
  //////////////// Employee //////////////////
  EMPLOYEE_ITEMS = [PROFILE, DASHBOARD, POSTS, PROPOSE_AREA, REPORTS];

/////////////////////////////////////////////
//////////// Sidebar Items //////////////////
/////////////////////////////////////////////

export const getSidebarItems = (role) => {

  const adminSidebar =
    role === "admin"
      ? [
          { title: "Menu", items: ADMIN_ITEMS },
          { title: "Others", items: ADMIN_OTHER_ITEMS }
        ]
      : [{ title: "Menu", items: EMPLOYEE_ITEMS }];

  return adminSidebar;
};
