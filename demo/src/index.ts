import { createFileStorage } from '../../file-storage/src/fileStorage';

const storage = createFileStorage();

console.log('Demo of file storage');
storage
  .exists('C:\\GitHub\\storage-js\\demo\\src\\index.ts')
  .then((d) => console.log(d));
