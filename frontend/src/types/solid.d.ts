/// <reference types="solid-js" />
import { JSX } from "solid-js";

declare module "*.module.css" {
  const styles: { [key: string]: string };
  export default styles;
}

declare module "*.css" {
  const styles: { [key: string]: string };
  export default styles;
}