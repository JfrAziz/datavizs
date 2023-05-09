import { NextResponse } from "next/server"
import sharp from "sharp"

export async function GET() {
  const ReactDOMServer = (await import("react-dom/server")).default

  const svg = Buffer.from(
    ReactDOMServer.renderToStaticMarkup(
      <svg height="100" width="100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill="red"
        />
        Sorry, your browser does not support inline SVG.
      </svg>
    )
  )
  const png = await sharp(svg).png().toBuffer()

  return new NextResponse(png, {
    status: 200,
    headers: { "Content-Type": "image/png" },
  })
}
