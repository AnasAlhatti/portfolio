import { imageVariants } from '../assets/generated/imageVariants';

function screenshotSources(screenshot) {
  return imageVariants[screenshot.src] ?? screenshot;
}

export default function Screenshot({ screenshot, alt, sizes = '(max-width: 768px) 92vw, 50vw', eager = false, className = '' }) {
  const optimized = screenshotSources(screenshot);
  return <img className={className} src={optimized.thumbnail ?? screenshot.src}
    srcSet={optimized.srcSet} sizes={sizes} alt={alt}
    width={optimized.width ?? 1600} height={optimized.height ?? 1000}
    loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />;
}
