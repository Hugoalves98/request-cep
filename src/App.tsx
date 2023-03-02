import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5nJjmfjaEEFLtaJpTOnRRiP8V8v6vuis",
  authDomain: "request-cep.firebaseapp.com",
  projectId: "request-cep",
  storageBucket: "request-cep.appspot.com",
  messagingSenderId: "203579381223",
  appId: "1:203579381223:web:95b6ec4808f41df6a99942"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

interface cepResposta {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

function App() {

  const[cep, setCep] = useState<string>()

  const[cepResposta, setCepResposta] = useState<cepResposta | null>()


  const consultaCep = () => {
    
    axios.get<cepResposta>(`http://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        setCepResposta(response.data)
      }).catch((erro) => {
        console.log(erro)
      });
  }

  useEffect(() => {
    console.log(cep, cepResposta)
   const timeoutId = setTimeout(() => {
   // if (cepResposta) { 
      consultaCep()
    //}
  }, 1000)
  return () => clearTimeout(timeoutId)
  }, [ consultaCep])

  return (
    <div >
      <div>
        <label style={{marginRight: "0.5rem"}}>Pesquise seu Cep:</label>
        <input 
          type="text" 
          placeholder="Informe um cep" 
          onChange={(e) => setCep(e.target.value)}
        />
      </div>
      <div >
        <pre>{JSON.stringify(cepResposta, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App 