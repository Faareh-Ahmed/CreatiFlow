"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";

type TransformationTypeKey = keyof typeof transformationTypes;

export const MyEditsGrid = ({ images }: { images: IImage[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter mb-12">
      <Link href="/features" className="group relative flex flex-col items-center justify-center min-h-[340px] border-2 border-dashed border-outline-variant rounded-xl hover:border-primary hover:bg-primary-container/[0.02] transition-all">
        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-[32px]">add</span>
        </div>
        <span className="font-headline-lg text-[20px] text-on-surface mb-1">Start a New Edit</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Upload or choose a template</p>
      </Link>

      {images?.map((image: IImage) => (
        <div key={image._id as string} className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(26,35,126,0.05)] hover:shadow-[0px_8px_30px_rgba(26,35,126,0.1)] transition-all flex flex-col">
          <div className="relative aspect-video overflow-hidden bg-surface-container-highest h-[200px]">
            <CldImage
              src={image.publicId}
              alt={image.title}
              width={image.width}
              height={image.height}
              {...image.config}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Link href={`/transformations/${image._id}`} className="p-2 bg-white rounded-full text-primary hover:bg-primary-fixed active:scale-90 transition-all flex items-center justify-center">
                <span className="material-symbols-outlined">visibility</span>
              </Link>
            </div>
          </div>
          <div className="p-stack-lg space-y-2 bg-white flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h3 className="font-headline-lg text-[18px] text-on-surface truncate pr-2">{image.title}</h3>
              <span className="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">more_vert</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed uppercase">
                {transformationTypes[image.transformationType as TransformationTypeKey].title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
