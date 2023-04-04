import { getStorage, ref, listAll } from 'firebase/storage';

export function clearStorage(service: any) {
  const storage = getStorage();
  const listRef = ref(storage, 'albumImages');
  const firstTerm = '%';
  const lastTerm = '?';

  const array1: string[] = [];
  const array2: string[] = [];

  service.albums.forEach((album: any) => {
    let storeImagePath = '';
    const firstItem = album.imageURL.indexOf(firstTerm);
    const lastItem = album.imageURL.indexOf(lastTerm);

    if (firstItem !== -1) {
      storeImagePath =
        'albumImages/' +
        album.imageURL.slice(firstItem + 3, lastItem);
    }
    array1.push(storeImagePath);
  });

  listAll(listRef).then((res) => {
    res.items.forEach((item) => {
      array2.push(item.fullPath);
    });
  });

  setTimeout(() => {
    array2.forEach((item) => {
      const inter = array1.includes(item);

      if (!inter) {
        service.deleteAlbumImage(item);
        console.log('Album Deleted');
      }
    });
  }, 2000);
}
