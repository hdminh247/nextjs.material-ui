import getConfig from "next/config";
import { S3Client, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function useS3BucketUpload({
  onUploadStart,
  onUploadReady,
  onError,
  pendingImage,
}: {
  onUploadStart: () => void;
  onUploadReady: () => void;
  onError: () => void;
  pendingImage: File;
}) {
  const { publicRuntimeConfig } = getConfig();
  const awsAccesskey = publicRuntimeConfig.AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = publicRuntimeConfig.AWS_SECRET_ACCESS_KEY;
  const awsBucket = publicRuntimeConfig.AWS_BUCKET;
  const awsRegion = publicRuntimeConfig.AWS_REGION;
  const awsPublicCDN = publicRuntimeConfig.NEXT_PUBLIC_CDN_HOST;

  // s3 client config
  const s3Config: S3ClientConfig = {
    credentials: {
      accessKeyId: awsAccesskey,
      secretAccessKey: awsSecretAccessKey,
    },
    region: awsRegion,
  };

  // Starting upload
  onUploadStart();
  const s3BucketUploadResults2 = await s3DirectUpload(pendingImage, s3Config, awsBucket, awsPublicCDN);

  if (s3BucketUploadResults2.status) {
    // The upload is done successfully
    onUploadReady();
    return { status: true, url: s3BucketUploadResults2.url };
  } else {
    // The upload failed
    onError();
    return { status: false, url: s3BucketUploadResults2.url };
  }
}

// Using direct upload
async function s3DirectUpload(image: File, s3Config: S3ClientConfig, awsBucket: string, awsPublicCDN: string) {
  // Init s3 client
  const s3Client = new S3Client(s3Config);

  // Create an object and upload
  const dateHash = new Date().valueOf();
  const params = {
    Bucket: awsBucket,
    Key: `images/${dateHash}/${image.name}`,
    Body: image,
    ACL: "public-read",
  };

  try {
    await s3Client.send(new PutObjectCommand(params));

    const uploadedImageUrl = `${awsPublicCDN}${params.Key}`;
    return { status: true, url: uploadedImageUrl };
  } catch (error) {
    // The upload failed
    return { status: false, url: error };
  }
}
