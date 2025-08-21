
// Импорт SVG как путь к svg-файлу: import url from "./icon.svg?url"
declare module "*.svg?url" {
  import type { StaticImageData } from 'next/image'
  const content: StaticImageData
  export default content
}

