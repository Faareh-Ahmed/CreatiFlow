import { auth } from '@clerk/nextjs/server';
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/header";
import TransformedImage from "@/components/shared/transformedimage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { SearchParamProps } from '@/lib/types';
import { DeleteConfirmation } from "@/components/shared/deleteconfirmation";

const ImageDetails = async (props: SearchParamProps) => {
  const params = await props.params;
  const { id } = params;
  const { userId } = await auth();

  const image = await getImageById(id);

  return (
    <div className="max-w-container-max-width mx-auto px-margin-desktop">
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid px-4">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-8 px-4 flex flex-col sm:flex-row gap-4 justify-end">
            <Button asChild type="button" className="w-full sm:w-auto min-w-[200px] px-6 py-4 h-auto rounded-xl font-bold text-white shadow-md transition-all active:scale-95 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-[1.02]">
              <Link href={`/transformations/${image._id}/update`}>
                <span className="material-symbols-outlined text-[20px] mr-2">edit</span>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </div>
  );
};

export default ImageDetails;