import "./h5.css";

String.prototype.padStart = function (len: number, char: string | undefined = '') {
  let str = this;
  while (str.length < len) {
    str = char + str;
  }
  return String(str);
};

async function H5() {
  return (
    <div
      className="hairline hairline-top hairline-bottom hairline-left hairline-right"
      style={{ padding: 20, background: "yellow" }}
    >
      这段内容的底部有一条“视觉 1px”的细边框。
    </div>
  );
  // return (
  //   <div
  //     style={{
  //       width: "100%",
  //       display: "flex",
  //       flexDirection: "row",
  //       padding: "20px",
  //       flexWrap: "wrap",
  //       // gap: "20px",
  //     }}
  //     className="box-wrapper"
  //   >
  //     {Array.from({ length: 10 }).map((_, index) => (
  //       <>
  //         <div className="box-border" />
  //         <div
  //           key={index}
  //           className="box"
  //           style={{
  //             background: "#aa2244",
  //             borderRadius: 8,
  //           }}
  //         ></div>
  //         {/* <div className="box-border" /> */}
  //       </>
  //     ))}
  //   </div>
  // );
}

export default H5;
