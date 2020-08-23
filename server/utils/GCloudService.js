import { Storage } from "@google-cloud/storage";
import { resolve } from "path";

export class GCloudServices {
  constructor() {
    this.storage = new Storage({
      projectId: "lexa-api",
      keyFilename: resolve(__dirname, "..", "config", "lexa-api.json"),
    });
    this.createStorage = this.createStorage.bind(this);
    this.deleteBucket = this.deleteBucket.bind(this);
    this.listBuckets = this.listBuckets.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.storageBucketAssigner = this.storageBucketAssigner.bind(this);
  }

  // Storage service

  async createStorage(bucketName) {
    try {
      const [bucket] = await this.storage.createBucket(bucketName, {
        location: "ASIA",
        storageClass: "STANDARD",
      });
      console.log(`Bucket ${bucket.name} created.`);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async listBuckets() {
    const [buckets] = await this.storage.getBuckets();
    const bucketsList = [];
    buckets.forEach((bucket) => {
      bucketsList.push(bucket.name);
    });

    return bucketsList;
  }

  async deleteBucket() {
    try {
      await this.storage.bucket(bucketName).delete();
      console.log(`Bucket ${bucketName} deleted.`);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  storageBucketAssigner(bucketName) {
    return this.storage.bucket(bucketName);
  }

  uploadImage(file, storageBucket) {
    return new Promise((resolve, reject) => {
      //   fields needed from file we uploaded.
      const { originalname, buffer } = file;

      // converting the file into blob/binary large object.
      const blob = storageBucket.file(originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
      blobStream
        .on("finish", () => {
          const publicUrl = `https://storage.cloud.google.com/${storageBucket.name}/${blob.name}`;
          resolve(publicUrl);
        })
        .on("error", () => {
          reject(`Unable to upload image, something went wrong`);
        })
        .end(buffer);
    });
  }
}
