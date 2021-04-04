import { useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";

import ModelsContext from "./ModelsContext";

export default function useWrapperScroll() {
  const { wrapperRef } = useContext(ModelsContext);
  
  const scrollY = useMotionValue(0)
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const element = wrapperRef.current

    if (element) {
      const updateScrollView = () => {
          const { scrollTop, scrollHeight, offsetHeight } = element

          const fullScroll = scrollHeight- offsetHeight

          scrollY.set(scrollTop) //number
          scrollYProgress.set(scrollTop / fullScroll) //0 - 1(%)
      }

      element.addEventListener('scroll', updateScrollView);

      return () => element.removeEventListener('scroll', updateScrollView);
    }
  }, []);

  return { scrollY, scrollYProgress };
}