import { useState, useEffect } from "react";

export function useImageRender(ref: any) {
  const [loaded, setLoaded] = useState(false);
  const onImageLoaded = () => setLoaded(true);

  useEffect(() => {
    const imgElCurrent = ref.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onImageLoaded);
      return () => imgElCurrent.removeEventListener("load", onImageLoaded);
    }
  }, [ref]);

  return loaded;
}
