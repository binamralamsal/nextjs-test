import Image from "next/image";
import placeImage from "@/assets/image.jpg";

export default function Home(props) {
  return (
    <>
      {/* You can then gain access to this secret message using props because that's what you passed through _app.js */}
      <p>{props.message}</p>
      <div>Page Content</div>

      {/*<img src="/image.jpg" alt="Image of a place" width={500} height={720} />*/}

      {/*
       * alt, width and height property is required by default in Image tag.
       * Open devtools, go to network tab, choose Img as filter and disable cache.
       * If you reload the page now, then you can compare the size of upper image
       * with this lower image. While testing, upper one is of 1.8 MB and lower one is of
       * 94.7 KB which is significantly smaller. Next.js converts your image format to
       * webp format which is smaller than jpg format. Next.js also resizes your image
       * according to the width and height you provided, that's why it complains when
       * you don't provide it. By default, it will also degrade quality a bit but you can
       * customize that as you want.
       *
       * If you turn on avif format from next.config.js then the image size becomes
       * 78.2 KB which is smaller than webp format.
       */}
      <Image src="/image.jpg" alt="Image of a place" width={500} height={720} />
      {/*
       * As we are using static import here, we can omit width and height. But,
       * it's always recommended to include width and height so that Next.js can
       * resize the image. If the image is being messy, style using CSS.
       */}
      {/* <Image src={placeImage} alt="Image of a place" /> */}

      {/*
       * priority props prioritizes the image loading which can be useful to prevent
       * lazy loading of images, and also add few priority options. Use it only for
       * image with the highest visible area on your page or Largest Contentful Paint.
       * Next.js will also tell you if it finds one.
       */}
      {/* <Image */}
      {/*  src="/image.jpg"*/}
      {/*  alt="Image of a place"*/}
      {/*  width={500}*/}
      {/*  height={720}*/}
      {/*  priority={true}*/}
      {/* /> */}

      {/*
       * fill requires boolean, it is one of the confusing part of Next.js Image component.
       * fill is used to make fill the parent container. You don't need to provide
       * width and height if you use fill but if you use width, height and fill
       * at the same time then next.js will complain about it. If you use fill={true}
       * then you will realize that your image becomes basically fullscreen and covers the page.
       * Well it's the confusing part of it. Using fill={true} basically makes position of the image
       * absolute and top, left, right and bottom to 0. So, you need to add position:absolute on
       * your wrapper div. You also have to add width and height to parent div, otherwise you
       * won't see your image.
       */}
      {/* <div style={{ width: 500, height: 720, position: "relative" }}> */}
      {/*  <Image src="/image.jpg" alt="Image of a place" fill /> */}
      {/* </div> */}

      {/*
       * placeholder="blur" is used to show blurred image while actual image
       * is loading. Unfortunately, Next.js doesn't generate blurred image itself
       * when you aren't using static import (aka not providing link and importing
       * using javascript), that's why you will have to create your own blurred-image
       * and provide via blurDataURL prop.
       */}
      {/* <Image */}
      {/*  src="/image.jpeg" */}
      {/*  alt="Image of a place" */}
      {/*  width={500} */}
      {/*  height={720} */}
      {/*  placeholder="blur" */}
      {/*  blurDataURL="/image-blurred.webp" */}
      {/* /> */}

      {/*
       * As, we are using static import here we can remove blurDataURL.
       * Next.js will automatically generate blurred image for us.
       */}
      {/* <Image */}
      {/*  src={placeImage} */}
      {/*  alt="Image of a place" */}
      {/*  width={500} */}
      {/*  height={720} */}
      {/*  placeholder="blur" */}
      {/* /> */}

      {/*
       * You can provide quality={ number ranging from 1 to 100 } to change quality.
       * By default its value is set to 75.
       */}
      {/* <Image */}
      {/*  src="/image.jpg" */}
      {/*  alt="Image of a place" */}
      {/*  width={500} */}
      {/*  height={720} */}
      {/*  quality={25} */}
      {/* /> */}

      {/*
       * Next.js doesn't allow you to use external images by default. To enable this,
       * you have to manually add the domain of this website in domains of next.config.js
       */}
      {/* <Image */}
      {/*  src="https://images.unsplash.com/photo-1680925697894-106c453c6e9c" */}
      {/*  width={500} */}
      {/*  height={720} */}
      {/*  alt="Unsplash Image" */}
      {/* /> */}
    </>
  );
}
