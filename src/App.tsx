/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import "./App.css";
import { Map } from "@googlemaps/react-wrapper";

import utmObj from "utm-latlng";

const zoneLetters: string[] = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
];

const utm = new utmObj("WGS 84");

function App() {
  const [coord, setCoord] = useState<{
    zoneNum: number;
    zoneLetter: string;
    easting: number;
    northing: number;
  }>();

  const [singleField, setSingleField] = useState<boolean>();
  const [coordString, setCoordString] = useState<string>();

  return (
    <div>
      <input
        type="checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSingleField(e.target.checked);
        }}
      />

      {!singleField ? (
        <>
          <input
            type="text"
            maxLength={2}
            onChange={(e) => {
              //@ts-ignore
              setCoord((prev) => ({ ...prev, zoneNum: e.target.value }));
            }}
          />
          <select
            defaultValue={coord?.zoneLetter}
            onChange={(e) => {
              //@ts-ignore
              setCoord((prev) => ({ ...prev, zoneLetter: e.target.value }));
            }}
          >
            {zoneLetters.map((zone: string) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>

          <input
            type="text"
            maxLength={7}
            defaultValue={coord?.easting}
            onChange={(e) => {
              //@ts-ignore
              setCoord((prev) => ({ ...prev, easting: e.target.value }));
            }}
          />
          <input
            type="text"
            maxLength={7}
            defaultValue={coord?.northing}
            onChange={(e) => {
              //@ts-ignore
              setCoord((prev) => ({ ...prev, northing: e.target.value }));
            }}
          />
          <br />

          <code>
            {coord?.zoneNum} {coord?.zoneLetter} - {coord?.easting}{" "}
            {coord?.northing}
          </code>
        </>
      ) : (
        <>
          <input
            type="text"
            defaultValue={coordString}
            onChange={(e) => setCoordString(e.target.value)}
          />
          <button
            onClick={() =>
              console.log(
                coordString
                  ?.split(/(\s+)/)
                  .filter((str: string) => str !== " ")[0]
                  .match(/[a-zA-Z]+|[0-9]+/g)
              )
            }
          >
            Test
          </button>
        </>
        // str.split(/(\s+)/);
      )}
      <br />
      {JSON.stringify(
        utm.convertUtmToLatLng(
          coord?.easting,
          coord?.northing,
          coord?.zoneNum,
          coord?.zoneLetter
        ).lat
      )}
      {" // "}
      {JSON.stringify(
        utm.convertUtmToLatLng(
          coord?.easting,
          coord?.northing,
          coord?.zoneNum,
          coord?.zoneLetter
        ).lng
      )}

      {/* <Map></Map> */}
    </div>
  );
}

export default App;

//utm.fromLatLon(latitude, longitude[, zoneNum])
// utm.convertUtmToLatLng(easting, northing, zoneNum, zoneLetter);33T 377050 4777243
