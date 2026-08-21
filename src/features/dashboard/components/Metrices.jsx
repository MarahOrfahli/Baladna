// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   BoxIconLine,
//   GroupIcon,
// } from "../../icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faArrowDown,
  // faArrowUp,
  faBuilding,
  faFile,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
// import { Badge } from "../../../components/ui";
export function EcommerceMetrics() {
  const infos = [
    {
      id: 1,
      icon: (
        <FontAwesomeIcon
          icon={faUserGroup}
          className="text-gray-800 size-6 dark:text-white/90"
        />
      ),
      title: "Users",
      num: 1500,
      badgeColor: "success",
      percent: 11.01
    },
    {
      id: 2,
      icon: (
        <FontAwesomeIcon
          icon={faFile}
          className="text-gray-800 size-6 dark:text-white/90"
        />
      ),
      title: "Reports",
      num: 5359,
      badgeColor: "error",
      percent: 9.05
    },
    {
      id: 3,
      icon: (
        <FontAwesomeIcon
          icon={faBuilding}
          className="text-gray-800 size-6 dark:text-white/90"
        />
      ),
      title: "Agencies",
      num: 35,
      badgeColor: "error",
      percent: 9.05
    }
  ];


  return (
    <div className="grid 2xsm:grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {/* <!-- Metric Item Start --> */}

      {infos.map((info) => (
        // استخدم ( هنا بدلاً من {
        <div
          key={info.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl dark:bg-gray-800">
            {info.icon}
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {info.title}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {info.num}
              </h4>
            </div>
            {/* <Badge color={info.badgeColor}>
              <FontAwesomeIcon
                icon={info.badgeColor === "success" ? faArrowUp : faArrowDown} // استخدم ===
              />
              {info.percent}%
            </Badge> */}
          </div>
        </div>
      ))}
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
