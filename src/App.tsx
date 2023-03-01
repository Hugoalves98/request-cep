import { useEffect, useState } from 'react'
import axios from 'axios'

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

  useEffect(() => {
    console.log(cep)
  axios.get<cepResposta>(`http://viacep.com.br/ws/${cep}/json/`).then(response => {
    setCepResposta(response.data)
    console.log(cepResposta)
  }).catch((error) => {console.log(error)});

  }, [cep])

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