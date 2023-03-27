import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { environment } from 'src/environments/environment';

// Firebase Storage
const app = initializeApp(environment.firebase);
export const storage = getStorage(app);
