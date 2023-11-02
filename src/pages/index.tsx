import Image from "next/image";
import { Inter, Lato } from "next/font/google";

import React, { ChangeEvent, useState } from "react";
import axios from "axios";
const lato = Lato({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  /* const [photo, setTerm] = useState(""); */
  const [fileUrl, setFileUrl] = useState<string>();
  const [file, setFile] = useState();
  const [scaledFile, setScaledFile] = useState();
  const [scaledUrl, setScaledUrl] = useState<string>();
  const [scale, setScale] = useState<number>(50);
  const fileAdded = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const uploadImage = () => {
    if (!fileUrl) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        /* "https://documentstore.tusqasi.repl.co/api/upload", */
        `http://localhost:8000/scale?scale=${scale}`,
        formData,
        config
      )

      .then((data) => {
        const byteCharacters = atob(data.data.image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        let image = new Blob([byteArray], { type: data.data.type });
		setScaledUrl( URL.createObjectURL(image));
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-purple-200 h-screen">
        <section className="w-2/3 bg-red-100 flex flex-col items-center h-2/3">
          <div className={" text-4xl font-black " + inter.className}>
            Image resizer
          </div>
          <div className="flex flex-col">
            <div className="flex p-3    ">
              <input type="file" onChange={fileAdded} />
            </div>

            <div className="flex p-1    justify-center">
              <button
                type="submit"
                onClick={uploadImage}
                className="bg-green-300 p-4 font-black"
              >
                Upload
              </button>
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Scale"
                className="w-40 p-3      "
                onChange={(e) => {
                  setScale(Number.parseFloat(e.target.value));
                  console.log("scale", scale);
                }}
              />
            </div>
          </div>

          <div>
            <div>
              {fileUrl != null ? (
                <div>
                  <div>Original Image</div>
                  <Image
                    alt="Preview image"
                    src={fileUrl}
                    width={400}
                    height={200}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              {scaledUrl != null ? (
                <div>
                  <div>Scaled Image</div>
                  <Image
                    alt="Scaled  image"
                    src={scaledUrl}
                    width={400}
                    height={200}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
