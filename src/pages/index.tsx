import Image from "next/image";
import { Inter, Lato } from "next/font/google";

import React, { ChangeEvent, useState } from "react";
import axios from "axios";
const inter = Lato({ subsets: ["latin"], weight: "400" });

export default function Home() {
  /* const [photo, setTerm] = useState(""); */
  const [fileUrl, setFileUrl] = useState<string>();
  const [file, setFile] = useState();
  const fileAdded = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const uploadImage = () => {
    // __AUTO_GENERATED_PRINTF_START__
    console.log("Home#uploadImage 1"); // __AUTO_GENERATED_PRINTF_END__
    /* const formData = new FormData(); */
    if (!fileUrl) {
      return;
    }
    // __AUTO_GENERATED_PRINTF_START__
    console.log("Home#uploadImage 2"); // __AUTO_GENERATED_PRINTF_END__

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
        "https://documentstore.tusqasi.repl.co/api/upload",
        formData,
        config
      )
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-purple-200 h-screen">
        <section className="w-2/3 bg-red-100 flex flex-col items-center h-2/3">
          <div className={" text-4xl " + inter.className}>Image resizer</div>
          <div>
            <input type="file" onChange={fileAdded} />
            <button type="submit" onClick={uploadImage}>
              Upload
            </button>
          </div>
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
        </section>
      </div>
    </>
  );
}
