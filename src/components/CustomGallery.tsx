import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

// Generate image into 4 groups
const generateImageList = (list: Resource.TattooDetail[]) => {
  const imageGroups: any = {
    0: [],
    1: [],
    2: [],
    3: [],
  };

  if (!list) {
    return imageGroups;
  }

  // Only get tattoo has images
  const availableImages: any[] = list.filter((item) => item.image);

  availableImages.map((tattoo, index) => {
    if (tattoo.image) {
      if (index < 4) {
        imageGroups[index].push({
          id: tattoo.id,
          src: tattoo.image.image_url,
          alt: tattoo.image.name,
        });
      } else {
        if (index % 4 === 0) {
          imageGroups[0].push({
            id: tattoo.id,
            src: tattoo.image.image_url,
            alt: tattoo.image.name,
          });
        }

        if (index % 4 === 1) {
          imageGroups[1].push({
            id: tattoo.id,
            src: tattoo.image.image_url,
            alt: tattoo.image.name,
          });
        }

        if (index % 4 === 2) {
          imageGroups[2].push({
            id: tattoo.id,
            src: tattoo.image.image_url,
            alt: tattoo.image.name,
          });
        }

        if (index % 4 === 3) {
          imageGroups[3].push({
            id: tattoo.id,
            src: tattoo.image.image_url,
            alt: tattoo.image.name,
          });
        }
      }
    }
  });

  return imageGroups;
};

export default function CustomGallery({ tattoos, className }: Props) {
  const router = useRouter();

  const [images, setImages] = useState(generateImageList(tattoos));

  // On image click
  const onClickImage = (id: number) => {
    router.push(`/tattoos/${id}`);
  };

  useEffect(() => {
    setImages(generateImageList(tattoos));
  }, [tattoos]);

  return (
    <div className={clsx("row", className)}>
      <div className="column">
        {images[0].map((image: any, index: number) => {
          return (
            <img
              key={index}
              alt={image.alt}
              src={image.src}
              onClick={() => {
                onClickImage(image.id);
              }}
            />
          );
        })}
      </div>
      <div className="column">
        {images[1].map((image: any, index: number) => {
          return (
            <img
              key={index}
              alt={image.alt}
              src={image.src}
              onClick={() => {
                onClickImage(image.id);
              }}
            />
          );
        })}
      </div>
      <div className="column">
        {images[2].map((image: any, index: number) => {
          return (
            <img
              key={index}
              alt={image.alt}
              src={image.src}
              onClick={() => {
                onClickImage(image.id);
              }}
            />
          );
        })}
      </div>
      <div className="column">
        {images[3].map((image: any, index: number) => {
          return (
            <img
              key={index}
              alt={image.alt}
              src={image.src}
              onClick={() => {
                onClickImage(image.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  className?: string;
  tattoos: Resource.TattooDetail[];
}
