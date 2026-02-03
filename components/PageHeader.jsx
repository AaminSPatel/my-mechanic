'use client';

import Image from 'next/image';

export default function PageHeader({
  title,
  description,
  image = '/placeholder.svg?height=400&width=1200',
  height = 300,
}) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src={image || "/pik2.avif"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-background/90 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
