import { IconType } from "react-icons";
import {
  FiHome,
  FiSlack,
  FiTrello,
  FiAlignCenter,
  FiVideo,
  // FiMail,
  FiUsers,
  FiClipboard,
  FiKey,
  FiTv,
  FiBook,
  FiMessageCircle,
  FiCalendar,
} from "react-icons/fi";

interface ItemProps {
  icon?: IconType;
  name: string;
  to: string;
  external: boolean;
}

export interface DivProps {
  div: boolean;
}

const Items: Array<ItemProps | DivProps> = [
  {
    name: "Home",
    icon: FiHome,
    to: "/",
    external: false,
  },
  {
    name: "Calendar",
    icon: FiCalendar,
    to: "/calendar",
    external: false,
  },
  {
    name: "Webcams",
    icon: FiVideo,
    to: "/webcams",
    external: false,
  },
  {
    name: "Quotes Board",
    icon: FiAlignCenter,
    to: "/quotes",
    external: false,
  },
  { div: true },
  // {
  //   name: "Webmail",
  //   icon: FiMail,
  //   to: "https://webmail.ystv.co.uk",
  //   external: true,
  // },
  {
    name: "Vault",
    icon: FiKey,
    to: "https://vault.ystv.co.uk",
    external: true,
  },
  {
    name: "Equipment Booking",
    icon: FiClipboard,
    to: "https://dash.adam-rms.com",
    external: true,
  },
  {
    name: "Crew Roles",
    icon: FiUsers,
    to: "/calendar/roles",
    external: false,
  },
  { div: true },
  {
    name: "Creator Studio",
    icon: FiTv,
    to: `${process.env.REACT_ENV_CREATOR_BASEURL}`,
    external: true,
  },
  { div: true },
  {
    name: "History Wiki",
    icon: FiBook,
    to: "https://wiki.ystv.co.uk",
    external: true,
  },
  {
    name: "Documentation Wiki",
    icon: FiBook,
    to: "https://docs.ystv.co.uk",
    external: true,
  },
  {
    name: "Welcome Pages",
    icon: FiBook,
    to: "https://welcome.ystv.co.uk",
    external: true,
  },
  { div: true },
  {
    name: "Trello",
    icon: FiTrello,
    to: "https://trello.com/ystv",
    external: true,
  },
  {
    name: "Slack",
    icon: FiSlack,
    to: "https://ystv.slack.com",
    external: true,
  },
  {
    name: "Tech Blog",
    icon: FiMessageCircle,
    to: "https://medium.com/ystv",
    external: true,
  },
  {
    name: "Constitution & Policy",
    icon: FiBook,
    to: "https://docs.ystv.co.uk/wiki/YSTV_Constitution",
    external: true,
  },
];

export default Items;
