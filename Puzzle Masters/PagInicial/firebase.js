
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyB8dHzf93Ib92Nb5wi2EzFCSD6aHUU0oE0",
  authDomain: "puzzle-masters-807ca.firebaseapp.com",
  projectId: "puzzle-masters-807ca",
  storageBucket: "puzzle-masters-807ca.firebasestorage.app",
  messagingSenderId: "432882654650",
  appId: "1:432882654650:web:0712f26ab8432c386dd183",
  measurementId: "G-H2N2KG05Q9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function buscarUsuario(nome) {
  const usuariosRef = collection(db, "usuarios");
  const q = query(usuariosRef, where("nome", "==", nome));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
}

export async function criarUsuario(nome, senha) {
  const usuariosRef = collection(db, "usuarios");
  await addDoc(usuariosRef, { nome, senha, pontuacao: 0 });
}

export async function salvarPontuacao(nome, novaPontuacao) {
  const usuariosRef = collection(db, "usuarios");
  const q = query(usuariosRef, where("nome", "==", nome));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return false;

  const docRef = doc(db, "usuarios", snapshot.docs[0].id);

  await updateDoc(docRef, {
    pontuacao: novaPontuacao
  });

  return true;
}
