import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  aspectRatio?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, fallback, aspectRatio, ...props }, ref) => {
    const [imgSrc, setImgSrc] = React.useState<string | undefined>(src);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
      setImgSrc(src);
      setIsLoading(true);
      setError(false);
    }, [src]);

    const handleError = () => {
      setError(true);
      setIsLoading(false);
      if (fallback) {
        setImgSrc(fallback);
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    const aspectRatioClass = aspectRatio
      ? `aspect-${aspectRatio}`
      : "aspect-auto";

    return (
      <div
        className={cn(
          "relative overflow-hidden",
          aspectRatioClass,
          className
        )}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
        {error && !fallback && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">Failed to load image</span>
          </div>
        )}
        <img
          ref={ref}
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            "h-full w-full object-cover transition-opacity",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image };