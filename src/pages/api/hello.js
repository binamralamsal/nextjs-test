// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  /*
   * res.status(code) - A function to set the status code. code must be a valid HTTP status code
   * res.json(body) - Sends a JSON response. body must be a serializable object
   * res.send(body) - Sends the HTTP response. body can be a string, an object or a Buffer
   * res.redirect([status,] path) - Redirects to a specified path or URL. status must be a valid HTTP status code. If not specified, status defaults to "307" "Temporary redirect".
   * res.revalidate(urlPath) - Revalidate a page on demand using getStaticProps. urlPath must be a string.
   *
   * We will use all these helpers in the future, so you don't have to worry about it.
   */
  res.status(200).json({ name: "John Doe" });
}
