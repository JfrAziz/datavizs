import type { FC } from "react"
import { Config } from "./config"
import { ChartLayouts } from "./chart-layouts"
// import pako from "pako"
import { useVizsStore } from "../store/visz-store"

export const Visualization: FC = () => {
  // const viszs = useVizsStore((state) => state.visz)

  // const compressed = pako.deflate(JSON.stringify(viszs))

  // useEffect(() => {
  //   const base64_arraybuffer = async (data: Uint8Array) => {
  //     // Use a FileReader to generate a base64 data URI
  //     const base64url = await new Promise<string>((r) => {
  //       const reader = new FileReader()
  //       reader.onload = () => r(reader.result as string)
  //       reader.readAsDataURL(new Blob([data]))
  //     })

  //     /*
  //   The result looks like
  //   "data:application/octet-stream;base64,<your base64 data>",
  //   so we split off the beginning:
  //   */
  //     return base64url.substring(base64url.indexOf(",") + 1)
  //   }

  //   const log = async () => {
  //     const result = await base64_arraybuffer(compressed)
  //     console.log(result)
  //     console.log(result.length)
  //     console.log(result.length / JSON.stringify(viszs).length)
  //   }

  //   log()
  // }, [viszs])

  return (
    <div className="flex-1 flex flex-row">
      <Config />
      <ChartLayouts />
    </div>
  )
}
