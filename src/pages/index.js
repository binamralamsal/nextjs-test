export default function Home(props) {
  return (
    <>
      {/* You can then gain access to this secret message using props because that's what you passed through _app.js */}
      <p>{props.message}</p>
      <div>Page Content</div>
    </>
  );
}
