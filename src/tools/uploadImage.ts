import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { storage } from '../../firebase';

export function uploadImage(event: Event, path: any) {
  const target = event.target as HTMLInputElement;
  const files = target.files as FileList;
  const image = files[0];

  if (target == null) return;

  const imageRef = ref(
    storage,
    `albumImages/${image.name + new Date().getTime().toString()}`
  );

  uploadBytes(imageRef, image).then((snaphshot) => {
    getDownloadURL(snaphshot.ref).then((url) => {
      path.next(url);
    });
  });
}
