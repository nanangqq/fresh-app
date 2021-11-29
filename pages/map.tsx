/** @jsx h */
import { h, Suspense, useData } from '../deps.ts'
import { HandlerContext } from 'https://raw.githubusercontent.com/lucacasonato/fresh/main/server.ts'
import { getDatabase, Todo } from '../utils/database.ts'
import 'https://deno.land/x/dotenv/load.ts'

function initMap(L: any) {
  const maxZoom = 21
  const initOption = {
    center: [37.507729407, 127.06166642], // 서울
    zoom: 13,
    zoomControl: false,
    maxZoom,
    preferCanvas: true,
    attributionControl: false,
  }
  const map = L.map('map', initOption)

  const naver = L.tileLayer(
    'https://map.pstatic.net/nrb/styles/basic/1637228832/{z}/{x}/{y}{r}.png?mt=bg.ol.ts.lp',
    { maxZoom }
  )

  naver.addTo(map)
}

export default function Map() {
  console.log(initMap.toString())
  const nid = Deno.env.get('NAVER_ID')

  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossOrigin=""
        ></script>
        <script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?clientId=${nid}`}
        ></script>
      </head>
      <body>
        <div id="map" style={{ height: '100vh', width: '100%' }}></div>
      </body>
      <script defer>({initMap.toString()})(L)</script>
    </html>
  )
}
