import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

export default class AzureStorageClient {
  accountName = "";
  accountKey = "";
  connStr = "";
  containerName = "";
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;

  constructor() {
    this.accountKey = process.env.AZURE_STORAGE_KEY ?? "";
    this.accountName = process.env.AZURE_STORAGE_ACCOUNT ?? "";
    this.containerName = process.env.AZURE_STORAGE_CONTAINER ?? "";

    this.connStr = `DefaultEndpointsProtocol=https;AccountName=${this.accountName};AccountKey=${this.accountKey};EndpointSuffix=core.windows.net`;

    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.connStr
    );

    this.containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
  }

  async uploadImage(base64Data: string, mimeType: string): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );

    // Generate unique file name
    const fileExtension = mimeType.split("/")[1] || "png";
    const blobName = `${uuidv4()}.${fileExtension}`;

    // Convert base64 to Buffer
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("Invalid base64 string");
    }
    const buffer = Buffer.from(matches[2], "base64");

    // Get blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file
    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: {
        blobContentType: mimeType,
      },
    });

    // Return public URL
    //return blockBlobClient.url;
    return blobName;
  }

  async deleteImage(blobName: string): Promise<void> {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Delete the blob
    await blockBlobClient.deleteIfExists();
  }
}
