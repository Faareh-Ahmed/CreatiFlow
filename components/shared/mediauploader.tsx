"use client";

import { toast } from "sonner"
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary"
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ImageState } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";



type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: Dispatch<SetStateAction<ImageState>>;
  publicId: string;
  image: ImageState;
  type: string;
};

const MediaUploader = ({ onValueChange, setImage, image, publicId, type }: MediaUploaderProps) => {
  // Initialize Cloudinary widget
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  const onUploadSuccessHandler = (results: CloudinaryUploadWidgetResults) => {
    if (results.info && typeof results.info !== 'string') {
      const { public_id, width, height, secure_url } = results.info;
      if (public_id && width && height && secure_url) {
        setImage({ publicId: public_id, width, height, secureURL: secure_url });
        onValueChange(public_id);
        toast("Upload successful! 1 credit has been deducted from your account.");
      }
    }
  };

  const onUploadErrorHandler = () => {
    toast("Something went wrong while uploading. Please try again.");
  };

  return (
    <CldUploadWidget
      uploadPreset="creatiflow"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">
            Original
          </h3>

          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ): (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image 
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
                <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader