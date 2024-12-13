import { cn } from "@/lib/utils";

interface InvestmentImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function InvestmentImage({ src, alt, className }: InvestmentImageProps) {
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-t-lg bg-gradient-to-br from-green-100 to-green-200", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-green-800 text-lg font-medium">{alt}</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
