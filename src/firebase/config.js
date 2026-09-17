import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDnW-nyTiYRfl2UQZAIRvOLKODt2EiF1OM",
  authDomain: "wedding-iera-izz.firebaseapp.com",
  projectId: "wedding-iera-izz",
  storageBucket: "wedding-iera-izz.firebasestorage.app",
  messagingSenderId: "296500441909",
  appId: "1:296500441909:web:446a775ece0b4af9c8d27c"
};

const app = initializeApp(firebaseConfig)

export default app