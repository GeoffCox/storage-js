import { createFileStorage } from '../../file-storage/src';

console.log('Demo of file storage');

const run = async () => {
  const storage = createFileStorage();

  console.log('Checking if hello.txt file exists');
  console.log(
    await storage.exists('C:\\GitHub\\storage-js\\demo\\temp\\hello.txt')
  );

  console.log('Creating hello.txt file');
  await storage.save(
    'C:\\GitHub\\storage-js\\demo\\temp\\hello.txt',
    'Hello World'
  );

  console.log('Checking if hello.txt file exists');
  console.log(
    await storage.exists('C:\\GitHub\\storage-js\\demo\\temp\\hello.txt')
  );

  console.log('Loading hello.txt file');
  console.log(
    await storage.load('C:\\GitHub\\storage-js\\demo\\temp\\hello.txt')
  );

  console.log('Deleting hello.txt file');
  await storage.delete('C:\\GitHub\\storage-js\\demo\\temp\\hello.txt');

  console.log('Checking if hello.txt file exists');
  console.log(
    await storage.exists('C:\\GitHub\\storage-js\\demo\\temp\\hello.txt')
  );
};

run().then(() => console.log('DONE'));
