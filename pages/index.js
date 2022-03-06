import React, { useState } from "react";
import axios from "axios";
import { getDir } from "../lib/main";

export default function Home({ allDir }) {
  const [data, setData] = useState(allDir);
  const [input, setInput] = useState("");
  const fetchTest = async () => {
    const data = await axios.post(`http://localhost:3000/api/write_file`, {
      name: input,
      fileType: "tsx",
      prefix: "View",
    });
    setData(data.data.dir);
    setInput("");
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <div style={{ display: "flex", padding: "2vh" }}>
        <input
          value={input}
          onChange={inputHandler}
          style={{ marginRight: "2vh" }}
        />
        <button onClick={fetchTest}>create</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: "2vh" }}>
        <h2>list files</h2>
        <code>
          *the generated files are stored in <b>{"<root_project>"}/generated</b>
        </code>
        <ol>
          {data.map((item) => (
            <li>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  const allDir = getDir();
  return {
    props: {
      allDir,
    },
  };
};
