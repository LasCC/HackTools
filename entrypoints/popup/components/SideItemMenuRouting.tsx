import React from "react";
import {
  BiLockOpen,
  BiLogoJavascript,
  BiNotepad,
  BiTransfer,
} from "react-icons/bi";
import { BsCardList, BsDatabaseFillGear, BsQrCode } from "react-icons/bs";
import { IoBandageOutline } from "react-icons/io5";
import { GiPirateHook, GiWebSpit } from "react-icons/gi";
import { HiOutlineTemplate } from "react-icons/hi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import {
  MdChecklist,
  MdOutlineAdb,
  MdOutlineOpenInBrowser,
} from "react-icons/md";
import { SiGnubash, SiJsonwebtokens, SiWindows } from "react-icons/si";
import { BsEye } from "react-icons/bs";
import { TbArrowRotaryLastRight, TbBinary } from "react-icons/tb";
import { LuFileLock2 } from "react-icons/lu";
import { PiShieldCheckeredFill } from "react-icons/pi";
import AboutUs from "./AboutUs";
import Checklists from "./misc/Checklists";
import CustomPayloadTable from "./misc/PrivateCheatSheet";
import Notepad from "./misc/Notepad";
import ADB from "./mobile/Android/ADB";
import Hooking from "./mobile/Hooking";
import MSFBuilder from "./system/CnCutils/MSFBuilder";
import FileTransfer from "./system/file_transfer/File_transfer";
import EchoBase64 from "./system/file_transfer/ObfuscatedFiles";
import LinuxCommands from "./system/linux/LinuxCommands";
import ReverseShell from "./system/linux/ReverseShell";
import TtySpawnShell from "./system/linux/TtySpawnShell";
import Windows from "./system/windows/Pentesting";
import WindowSecretDumper from "./system/windows/SecretsDumper";
import CSRF from "./web/CSRF";
import DBAttacks from "./web/DataBase/index";
import DataManipulation from "./web/DataManipulation";
import JWToken from "./web/JWToken";
import Path_traversal from "./web/Path_Traversal";
import SSRF from "./web/SSRF";
import SSTI from "./web/SSTI";
import WebShells from "./web/WebShells";
import XSS from "./web/XSS";
import APKPatching from "./mobile/Android/ADB/APKPatching";
import QRGenerator from "./misc/QRGenerator";
import NmapViz from "./misc/NmapViz";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaLinux } from "react-icons/fa";

export interface IRouterComponent {
  key: string;
  icon: JSX.Element;
  name: string;
  componentRoute: React.FunctionComponent;
  type: string;
}

const WebTab: Array<IRouterComponent> = [
  {
    key: "1",
    icon: (
      <GiWebSpit type="icon-php" style={{ fontSize: "1.5em", marginTop: 3 }} />
    ),
    name: "Web Shells",
    componentRoute: WebShells,
    type: "web",
  },
  {
    key: "2",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          d="M13.94 3.045a.75.75 0 0 0-1.38-.59l-4.5 10.5a.75.75 0 1 0 1.38.59l4.5-10.5ZM5 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          fill="white"
        ></path>
      </svg>
    ),
    name: "Path Traversal",
    componentRoute: Path_traversal,
    type: "web",
  },
  {
    key: "3",
    icon: <BiLogoJavascript style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "XSS",
    componentRoute: XSS,
    type: "web",
  },
  {
    key: "4",
    icon: <BsDatabaseFillGear style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Database attacks",
    componentRoute: DBAttacks,
    type: "web",
  },
  {
    key: "5",
    icon: <TbBinary style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Data Manipulation",
    componentRoute: DataManipulation,
    type: "web",
  },
  {
    key: "6",
    icon: <SiJsonwebtokens style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "JSON Web Token",
    componentRoute: JWToken,
    type: "web",
  },
  {
    key: "7",
    icon: (
      <TbArrowRotaryLastRight style={{ fontSize: "1.5em", marginTop: 3 }} />
    ),
    name: "SSRF",
    componentRoute: SSRF,
    type: "web",
  },
  {
    key: "8",
    icon: <HiOutlineTemplate style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "SSTI",
    componentRoute: SSTI,
    type: "web",
  },
  {
    key: "9",
    icon: (
      <MdOutlineOpenInBrowser style={{ fontSize: "1.5em", marginTop: 3 }} />
    ),
    name: "CSRF",
    componentRoute: CSRF,
    type: "web",
  },
];

const SystemTab: Array<IRouterComponent> = [
  {
    key: "1",
    icon: <SiGnubash style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Reverse Shell",
    componentRoute: ReverseShell,
    type: "system",
  },
  {
    key: "2",
    icon: (
      <HiOutlineComputerDesktop style={{ fontSize: "1.5em", marginTop: 3 }} />
    ),
    name: "TTY Spawn Shell",
    componentRoute: TtySpawnShell,
    type: "system",
  },

  {
    key: "3",
    icon: <FaLinux style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Linux",
    componentRoute: LinuxCommands,
    type: "system",
  },
  {
    key: "4",
    icon: <SiWindows style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Windows",
    componentRoute: Windows,
    type: "system",
  },
  {
    key: "5",
    icon: <PiShieldCheckeredFill style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "MSF Builder",
    componentRoute: MSFBuilder,
    type: "system",
  },
  {
    key: "6",
    icon: <LuFileLock2 style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Obfuscated Files or Information",
    componentRoute: EchoBase64,
    type: "system",
  },
  {
    key: "7",
    icon: <BiTransfer style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Transfer Methods",
    componentRoute: FileTransfer,
    type: "system",
  },
  {
    key: "8",
    icon: <BiLockOpen style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Secrets Dumper",
    componentRoute: WindowSecretDumper,
    type: "system",
  },
  {
    key: "9",
    icon: <AiFillInfoCircle style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "About us",
    componentRoute: AboutUs,
    type: "system",
  },
];

const MobileTab: Array<IRouterComponent> = [
  {
    key: "1",
    icon: <MdOutlineAdb style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "ADB Commands",
    componentRoute: ADB,
    type: "mobile",
  },
  {
    key: "2",
    icon: <IoBandageOutline style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "App Patching",
    componentRoute: APKPatching,
    type: "mobile",
  },

  {
    key: "3",
    icon: <GiPirateHook style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Hooking",
    componentRoute: Hooking,
    type: "mobile",
  },
];

const MiscTab: Array<IRouterComponent> = [
  {
    key: "1",
    icon: <BsQrCode style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "QR Code Generator",
    componentRoute: QRGenerator,
    type: "misc",
  },
  {
    key: "2",
    icon: <BiNotepad style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Notepad",
    componentRoute: Notepad,
    type: "misc",
  },
  {
    key: "3",
    icon: <BsCardList style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Private Cheat Sheet",
    componentRoute: CustomPayloadTable,
    type: "misc",
  },
  {
    key: "4",
    icon: <MdChecklist style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Checklist",
    componentRoute: Checklists,
    type: "misc",
  },
  {
    key: "5",
    icon: <BsEye style={{ fontSize: "1.5em", marginTop: 3 }} />,
    name: "Nmap Graph",
    componentRoute: NmapViz,
    type: "misc",
  },
];

// Make a single list of all tabs
const Tabs = [...WebTab, ...SystemTab, ...MobileTab, ...MiscTab];
export default Tabs;
