import type { IconType } from "react-icons";
import { FaJava, FaDatabase } from "react-icons/fa";
import {
  SiSpringboot, SiReact, SiFlutter, SiPostgresql, SiMongodb, SiFirebase, SiNodedotjs,
  SiExpress, SiTailwindcss, SiGit, SiPostman, SiAndroidstudio, SiIntellijidea, SiHibernate,
  SiDart, SiCplusplus, SiC, SiJavascript, SiHtml5, SiSpring, SiCursor, SiAnthropic,
  SiGooglecloud, SiTensorflow, SiJsonwebtokens, SiChartdotjs, SiApachemaven,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Code2 } from "lucide-react";

const map: Record<string, IconType> = {
  java: FaJava,
  "spring boot": SiSpringboot,
  "spring mvc": SiSpring,
  struts: SiApachemaven,
  hibernate: SiHibernate,
  react: SiReact,
  "react.js": SiReact,
  flutter: SiFlutter,
  dart: SiDart,
  postgresql: SiPostgresql,
  oracle: FaDatabase,
  mongodb: SiMongodb,
  firebase: SiFirebase,
  firestore: SiFirebase,
  "node.js": SiNodedotjs,
  express: SiExpress,
  tailwind: SiTailwindcss,
  "git/github": SiGit,
  postman: SiPostman,
  "android studio": SiAndroidstudio,
  "intellij idea": SiIntellijidea,
  "vs code": VscVscode,
  "c++": SiCplusplus,
  c: SiC,
  javascript: SiJavascript,
  "html/css": SiHtml5,
  html: SiHtml5,

  "ml kit": SiGooglecloud,
  nlp: SiTensorflow,
  jwt: SiJsonwebtokens,
  "claude code": SiAnthropic,
  cursor: SiCursor,
};

export function iconFor(name: string): IconType {
  return map[name.toLowerCase()] ?? Code2;
}

export default function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconFor(name);
  return <Icon className={className} aria-hidden />;
}

export { SiChartdotjs };
