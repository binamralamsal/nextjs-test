import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/*
 * App component is used by Next.js for page initialization.
 * You can create custom layout inside _app.js.
 * You can also keep a state which remains when navigating between pages.
 * You can inject additional data into pages.
 */

/*
 * Here, Component refers to any page file. For now, we only have index.js
 * Next.js internally passes the page file as "Component" prop to this App component
 * pageProps is the props that are passed through getStaticProps or getServerSideProps
 * // TODO: We will discuss that in the future...
 */

/*
 * Variable Fonts vs Static Traditional Fonts
 *
 * Variable fonts are new type of fonts which require only one font
 * file for all the weights and styles. It is a single font file compared to
 * traditional fonts which require multiple font files for different weights and styles.
 * That's why Variable fonts are much lighter than traditional fonts. You can think
 * variable fonts as more like vector graphics than raster graphics (but not exactly).
 * Variable fonts are highly customizable compared to fix sets of styles for
 * traditional fonts. Because of this dynamic nature, you can produce infinite number
 * of styles through variable fonts. You can also customize or update or even animate
 * the texts real time using CSS. Since, variable fonts consist of single font file,
 * you don't have to send multiple HTTP requests just to load different font styles.
 * In traditional fonts, you would have to send multiple HTTP requests to load different
 * font styles like bold, italic, and other weights and so on. You can check Network tab
 * and disable cache to see this yourself and you can analyze how Variable and Static fonts
 * are different.
 *
 * If you download font family from fonts.google.com then you will realize that you will
 * get single file for variable fonts and multiple files for static fonts.
 */

/*
 * next/font includes built-in automatic self-hosting for any font file. This means you can
 * optimally load web fonts with zero layout shift. This helps to use Google fonts easily
 * in Next.js. Using this won't send any requests to Google and downloads the font files
 * automatically during build time which means you are going to get faster load time.
 */
import { Inter, Merriweather, Roboto } from "next/font/google";

/*
 * Roboto is a type of static font, that's why you need to specify all the weights
 * and styles.
 */
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  /*
   * Google fonts are splitted into different subsets which helps to specify specific
   * subsets to decrease font file size.
   */
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "900"],
});

/*
 * Inter is a type of variable font, that's why you don't need to specify all the weights
 */
const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  console.log(roboto.className); // This includes className for font
  console.log(roboto.style); // { fontFamily: "__Roboto_xxxxx" }

  return (
    // Then you can use font.className to easily apply fonts to specific container.
    <main className={inter.className}>
      <Navbar />
      <Component {...pageProps} />

      <div className={roboto.className}>
        <h2>I am different</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eius
          error eveniet expedita fuga neque sint ut vitae! Amet aspernatur
          assumenda culpa eum, fuga hic iste laudantium placeat provident
          quaerat ut voluptatibus voluptatum. Alias aperiam deserunt fugit
          laudantium, saepe sit tenetur voluptate. Aliquam consequuntur debitis
          eveniet hic incidunt ipsum necessitatibus officiis, quidem tenetur! A
          accusamus consectetur dolor enim inventore modi, natus nulla quo
          ratione repudiandae. Alias beatae dolorem nam nihil omnis, placeat
          repellat sed? Aliquid eum excepturi facere minus placeat rem rerum
          sapiente? Ad atque commodi corporis dignissimos dolores doloribus eos,
          laborum maxime nisi nulla, possimus provident, quae quibusdam ratione
          suscipit vel velit. Cumque, porro, similique? Alias, commodi
          consequatur corporis eaque fuga iste sint. A, adipisci aspernatur aut
          blanditiis cumque dignissimos doloremque eligendi error illum iste
          iusto minus neque nisi, numquam obcaecati, possimus quia quis
          recusandae sapiente veritatis. Accusamus aspernatur atque earum harum
          illum impedit iste officiis! Ducimus explicabo impedit ipsam laborum
          mollitia nihil quasi qui soluta tempora temporibus! Ab, aspernatur
          debitis deleniti eius eligendi et eum, fugiat harum hic illo ipsum
          minima nostrum praesentium quas quasi repudiandae sit suscipit ut, vel
          voluptate. Corporis deserunt dicta dolorem laborum molestiae omnis qui
          ratione rem unde vitae. Excepturi expedita perferendis qui quo?
        </p>
      </div>

      <div className={roboto.className}>
        <h2>I am different</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eius
          error eveniet expedita fuga neque sint ut vitae! Amet aspernatur
          assumenda culpa eum, fuga hic iste laudantium placeat provident
          quaerat ut voluptatibus voluptatum. Alias aperiam deserunt fugit
          laudantium, saepe sit tenetur voluptate. Aliquam consequuntur debitis
          eveniet hic incidunt ipsum necessitatibus officiis, quidem tenetur! A
          accusamus consectetur dolor enim inventore modi, natus nulla quo
          ratione repudiandae. Alias beatae dolorem nam nihil omnis, placeat
          repellat sed? Aliquid eum excepturi facere minus placeat rem rerum
          sapiente? Ad atque commodi corporis dignissimos dolores doloribus eos,
          laborum maxime nisi nulla, possimus provident, quae quibusdam ratione
          suscipit vel velit. Cumque, porro, similique? Alias, commodi
          consequatur corporis eaque fuga iste sint. A, adipisci aspernatur aut
          blanditiis cumque dignissimos doloremque eligendi error illum iste
          iusto minus neque nisi, numquam obcaecati, possimus quia quis
          recusandae sapiente veritatis. Accusamus aspernatur atque earum harum
          illum impedit iste officiis! Ducimus explicabo impedit ipsam laborum
          mollitia nihil quasi qui soluta tempora temporibus! Ab, aspernatur
          debitis deleniti eius eligendi et eum, fugiat harum hic illo ipsum
          minima nostrum praesentium quas quasi repudiandae sit suscipit ut, vel
          voluptate. Corporis deserunt dicta dolorem laborum molestiae omnis qui
          ratione rem unde vitae. Excepturi expedita perferendis qui quo?
        </p>
      </div>

      {/* When you are using CSS in JS then you can use font.style.fontFamily */}
      <div style={{ fontFamily: merriWeather.style.fontFamily }}>
        <h2>I am being applied using CSS</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eius
          error eveniet expedita fuga neque sint ut vitae! Amet aspernatur
          assumenda culpa eum, fuga hic iste laudantium placeat provident
          quaerat ut voluptatibus voluptatum. Alias aperiam deserunt fugit
          laudantium, saepe sit tenetur voluptate. Aliquam consequuntur debitis
          eveniet hic incidunt ipsum necessitatibus officiis, quidem tenetur! A
          accusamus consectetur dolor enim inventore modi, natus nulla quo
          ratione repudiandae. Alias beatae dolorem nam nihil omnis, placeat
          repellat sed? Aliquid eum excepturi facere minus placeat rem rerum
          sapiente? Ad atque commodi corporis dignissimos dolores doloribus eos,
          laborum maxime nisi nulla, possimus provident, quae quibusdam ratione
          suscipit vel velit. Cumque, porro, similique? Alias, commodi
          consequatur corporis eaque fuga iste sint. A, adipisci aspernatur aut
          blanditiis cumque dignissimos doloremque eligendi error illum iste
          iusto minus neque nisi, numquam obcaecati, possimus quia quis
          recusandae sapiente veritatis. Accusamus aspernatur atque earum harum
          illum impedit iste officiis! Ducimus explicabo impedit ipsam laborum
          mollitia nihil quasi qui soluta tempora temporibus! Ab, aspernatur
          debitis deleniti eius eligendi et eum, fugiat harum hic illo ipsum
          minima nostrum praesentium quas quasi repudiandae sit suscipit ut, vel
          voluptate. Corporis deserunt dicta dolorem laborum molestiae omnis qui
          ratione rem unde vitae. Excepturi expedita perferendis qui quo?
        </p>
      </div>
      <Footer />
    </main>
  );
}
