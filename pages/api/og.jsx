/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from "@vercel/og";

const getStapelRegular = fetch(
  new URL("../../assets/stapel_regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: "experimental-edge",
};

export default async function (req) {
  const stapelRegular = await getStapelRegular;
  const { searchParams } = req.nextUrl;

  const expectedPrice = searchParams.get("expectedPrice");
  const iata = searchParams.get("iata");

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c73fe",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div tw="flex flex-col">
          <p tw="text-6xl text-white" style={{ fontFamily: "Stapel" }}>
            Aviasales
          </p>
          <div tw="flex">
            <p tw="text-2xl text-white">
              {iata} от {expectedPrice} рублей
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Stapel",
          data: stapelRegular,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
