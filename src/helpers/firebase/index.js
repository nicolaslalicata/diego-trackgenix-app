import { initializeApp } from 'firebase/app';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAgEsEV44MOGytR0jGpPP6cGFHtA71PT7U',
  authDomain: 'my-first-project-c4eb2.firebaseapp.com',
  projectId: 'my-first-project-c4eb2',
  storageBucket: 'my-first-project-c4eb2.appspot.com',
  messagingSenderId: '268652657299',
  appId: '1:268652657299:web:2ca92fbdadc6416bb96b66',
  measurementId: 'G-YMH2EQN833'
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
