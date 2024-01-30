import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

const bucketName = process.env.S3_BUCKET_NAME;

function getUniqueFilename(file) {
  const randomId = uniqid();
  const ext = file.name.split('.').pop() || 'jpg';
  const newFileName = `${randomId}.${ext}`;
  return newFileName;
}

async function getFileChunks(file) {
  const chunks = [];
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }
  return chunks;
}

export async function POST(req) {
  // apparently no need to use external form parser libraries since Next already has the function
  const formData = await req.formData();

  if (!formData.has('file')) {
    console.log('No file was found');
    return false;
  }

  const files = formData.getAll('file');

  console.log(files?.length, files);

  // S3 Access
  const client = new S3Client({
    region: 'sa-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const uploadedLinks = [];
  for (const file of files) {
    const newFileName = getUniqueFilename(file);
    const chunks = await getFileChunks(file);

    const response = await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: Buffer.concat(chunks),
        ACL: 'public-read',
        ContentType: file.type,
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    const res = Response.json(response);
    
    if (res.ok) {
      uploadedLinks.push(link);
    } else {
      console.log('upload failed for:', file.name);
    }
  }

  return Response.json(uploadedLinks);
}

// prevent next to parse the request to JSON ?
export const config = {
  api: { bodyParser: false },
};
