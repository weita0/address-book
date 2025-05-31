function main() {
  const buffer = new ArrayBuffer(8);
  console.log('字节？', buffer.byteLength);
}

main()

function ArrayBufferPage() {
  return <h1>array buffer</h1>;
}

export default ArrayBufferPage;
