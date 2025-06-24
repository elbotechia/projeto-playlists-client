import React, { useState } from 'react'
import axios from 'axios'
import { BASE_API } from '../../CONSTANTS/CONSTANTS' // Ensure this path is correct

const countries = [
  { code: "AF", name: "Afeganistão" },
  { code: "ZA", name: "África do Sul" },
  { code: "AL", name: "Albânia" },
  { code: "DE", name: "Alemanha" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguila" },
  { code: "AG", name: "Antígua e Barbuda" },
  { code: "SA", name: "Arábia Saudita" },
  { code: "DZ", name: "Argélia" },
  { code: "AR", name: "Argentina" },
  { code: "AM", "name": "Armênia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Austrália" },
  { code: "AT", name: "Áustria" },
  { code: "AZ", name: "Azerbaijão" },
  { code: "BS", name: "Bahamas" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BH", name: "Bahrein" },
  { code: "BE", name: "Bélgica" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BY", name: "Bielorrússia" },
  { code: "BO", name: "Bolívia" },
  { code: "BA", name: "Bósnia e Herzegovina" },
  { code: "BW", name: "Botsuana" },
  { code: "BR", name: "Brasil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgária" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "BT", name: "Butão" },
  { code: "CV", name: "Cabo Verde" },
  { code: "CM", name: "Camarões" },
  { code: "KH", name: "Camboja" },
  { code: "CA", name: "Canadá" },
  { code: "QA", name: "Catar" },
  { code: "KZ", name: "Cazaquistão" },
  { code: "TD", name: "Chade" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CY", name: "Chipre" },
  { code: "SG", name: "Cingapura" },
  { code: "CO", name: "Colômbia" },
  { code: "KM", name: "Comores" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (Rep. Dem.)" },
  { code: "KR", name: "Coreia do Sul" },
  { code: "KP", name: "Coreia do Norte" },
  { code: "CI", name: "Costa do Marfim" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croácia" },
  { code: "CU", name: "Cuba" },
  { code: "DK", name: "Dinamarca" },
  { code: "DJ", name: "Djibuti" },
  { code: "DM", name: "Dominica" },
  { code: "EG", name: "Egito" },
  { code: "SV", name: "El Salvador" },
  { code: "AE", name: "Emirados Árabes Unidos" },
  { code: "EC", name: "Equador" },
  { code: "ER", name: "Eritreia" },
  { code: "SK", name: "Eslováquia" },
  { code: "SI", name: "Eslovênia" },
  { code: "ES", name: "Espanha" },
  { code: "US", name: "Estados Unidos" },
  { code: "EE", name: "Estônia" },
  { code: "ET", name: "Etiópia" },
  { code: "FJ", name: "Fiji" },
  { code: "PH", name: "Filipinas" },
  { code: "FI", name: "Finlândia" },
  { code: "FR", name: "França" },
  { code: "GA", name: "Gabão" },
  { code: "GM", name: "Gâmbia" },
  { code: "GH", name: "Gana" },
  { code: "GE", name: "Geórgia" },
  { code: "GI", name: "Gibraltar" },
  { code: "GD", name: "Granada" },
  { code: "GR", name: "Grécia" },
  { code: "GL", name: "Groenlândia" },
  { code: "GP", name: "Guadalupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GY", name: "Guiana" },
  { code: "GF", name: "Guiana Francesa" },
  { code: "GN", name: "Guiné" },
  { code: "GQ", name: "Guiné Equatorial" },
  { code: "GW", name: "Guiné-Bissau" },
  { code: "HT", name: "Haiti" },
  { code: "NL", name: "Holanda" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungria" },
  { code: "YE", name: "Iêmen" },
  { code: "IN", name: "Índia" },
  { code: "ID", name: "Indonésia" },
  { code: "IR", name: "Irã" },
  { code: "IQ", name: "Iraque" },
  { code: "IE", name: "Irlanda" },
  { code: "IS", name: "Islândia" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Itália" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japão" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordânia" },
  { code: "KW", name: "Kuwait" },
  { code: "LA", name: "Laos" },
  { code: "LS", name: "Lesoto" },
  { code: "LV", name: "Letônia" },
  { code: "LB", name: "Líbano" },
  { code: "LR", name: "Libéria" },
  { code: "LY", name: "Líbia" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lituânia" },
  { code: "LU", name: "Luxemburgo" },
  { code: "MO", name: "Macau" },
  { code: "MK", name: "Macedônia do Norte" },
  { code: "MG", name: "Madagascar" },
  { code: "MY", name: "Malásia" },
  { code: "MW", name: "Malawi" },
  { code: "MV", name: "Maldivas" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MA", name: "Marrocos" },
  { code: "MQ", name: "Martinica" },
  { code: "MU", name: "Maurício" },
  { code: "MR", name: "Mauritânia" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "México" },
  { code: "MM", name: "Mianmar" },
  { code: "FM", name: "Micronésia" },
  { code: "MZ", name: "Moçambique" },
  { code: "MD", name: "Moldávia" },
  { code: "MC", name: "Mônaco" },
  { code: "MN", name: "Mongólia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "NA", name: "Namíbia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NI", name: "Nicarágua" },
  { code: "NE", name: "Níger" },
  { code: "NG", name: "Nigéria" },
  { code: "NU", name: "Niue" },
  { code: "NO", name: "Noruega" },
  { code: "NC", name: "Nova Caledônia" },
  { code: "NZ", name: "Nova Zelândia" },
  { code: "OM", name: "Omã" },
  { code: "PW", name: "Palau" },
  { code: "PA", name: "Panamá" },
  { code: "PG", name: "Papua-Nova Guiné" },
  { code: "PK", name: "Paquistão" },
  { code: "PY", name: "Paraguai" },
  { code: "PE", name: "Peru" },
  { code: "PF", name: "Polinésia Francesa" },
  { code: "PL", name: "Polônia" },
  { code: "PR", name: "Porto Rico" },
  { code: "PT", name: "Portugal" },
  { code: "KE", name: "Quênia" },
  { code: "KG", name: "Quirguistão" },
  { code: "GB", name: "Reino Unido" },
  { code: "CF", name: "República Centro-Africana" },
  { code: "CZ", name: "República Tcheca" },
  { code: "DO", name: "República Dominicana" },
  { code: "RO", name: "Romênia" },
  { code: "RW", name: "Ruanda" },
  { code: "RU", name: "Rússia" },
  { code: "EH", name: "Saara Ocidental" },
  { code: "WS", name: "Samoa" },
  { code: "AS", name: "Samoa Americana" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "KN", name: "Saint Kitts e Nevis" },
  { code: "LC", name: "Santa Lúcia" },
  { code: "SM", name: "San Marino" },
  { code: "PM", name: "Saint Pierre e Miquelon" },
  { code: "VC", name: "São Vicente e Granadinas" },
  { code: "SH", name: "Santa Helena" },
  { code: "ST", name: "São Tomé e Príncipe" },
  { code: "SN", name: "Senegal" },
  { code: "SL", name: "Serra Leoa" },
  { code: "RS", name: "Sérvia" },
  { code: "SC", name: "Seychelles" },
  { code: "SY", name: "Síria" },
  { code: "SO", name: "Somália" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SZ", name: "Suazilândia" },
  { code: "SD", name: "Sudão" },
  { code: "SS", name: "Sudão do Sul" },
  { code: "SE", name: "Suécia" },
  { code: "CH", name: "Suíça" },
  { code: "SR", name: "Suriname" },
  { code: "TH", name: "Tailândia" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajiquistão" },
  { code: "TZ", name: "Tanzânia" },
  { code: "IO", name: "Território Britânico do Oceano Índico" },
  { code: "PS", name: "Territórios Palestinos" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad e Tobago" },
  { code: "TN", name: "Tunísia" },
  { code: "TM", name: "Turcomenistão" },
  { code: "TR", name: "Turquia" },
  { code: "TV", name: "Tuvalu" },
  { code: "UA", name: "Ucrânia" },
  { code: "UG", name: "Uganda" },
  { code: "UY", name: "Uruguai" },
  { code: "UZ", name: "Uzbequistão" },
  { code: "VU", name: "Vanuatu" },
  { code: "VA", name: "Vaticano" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnã" },
  { code: "WF", name: "Wallis e Futuna" },
  { code: "ZM", name: "Zâmbia" },
  { code: "ZW", name: "Zimbábue" }
]

function getFlagEmoji(countryCode) {
  return [...countryCode.toUpperCase()]
    .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
    .join('');
}

export default function ManagerForm() {
  const [step, setStep] = useState(1)
  const [mediaId, setMediaId] = useState(null)

  const [dataForm, setDataForm] = useState({
    name: "",
    artistName: "",
    artistNickname: "",
    artistNationality: "",
    album: "",
    cover: "",
    durationStart: 0,
    durationEnd: 0,
    mediaId: null,
  })

  const handleOnInputChange = (e) => {
    const { name, value } = e.target
    setDataForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadSuccess = (id) => {
    setMediaId(id)
    setDataForm((prev) => ({
      ...prev,
      mediaId: id
    }))
    setStep(2)
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name: dataForm.name,
      album: dataForm.album,
      artist: {
        name: dataForm.artistName,
        nickname: dataForm.artistNickname,
        nationality: dataForm.artistNationality,
      },
      cover: dataForm.cover,
      duration: {
        start: Number(dataForm.durationStart) || 0,
        end: Number(dataForm.durationEnd) || 0,
      },
      mediaId: dataForm.mediaId,
    }

    try {
      await axios.post(`${BASE_API}/tracks`, payload)
      alert('Track cadastrada com sucesso!')
      // Optionally reset form or navigate
    } catch (err) {
      console.error("Erro ao cadastrar track:", err);
      alert('Erro ao cadastrar track');
    }
  }

  return (
    <div>
      <form className="manager-form" onSubmit={handleOnSubmit}>
        {step === 1 && <AddUpload onUploadSuccess={handleUploadSuccess} />}
        {step === 2 && (
          <AddTracks
            dataForm={dataForm}
            onInputChange={handleOnInputChange}
            countries={countries}
            getFlagEmoji={getFlagEmoji}
          />
        )}
        {step === 2 && (
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Salvar Track
          </button>
        )}
      </form>
    </div>
  )
}

function AddUpload({ onUploadSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('inputFile', file)
      const res = await fetch(`${BASE_API}/storage`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao fazer upload');
      }
      const data = await res.json()
      onUploadSuccess(data.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <label htmlFor="inputFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Adicione o Arquivo MP3:
        <input type="file" id="inputFile" name="inputFile" onChange={handleFileChange} disabled={loading} />
      </label>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

function AddTracks({ dataForm, onInputChange, countries, getFlagEmoji }) {
  const { name, album, artistName, artistNickname, artistNationality, durationEnd, cover } = dataForm;

  return (
    <div>
      <p>ID do arquivo carregado: {dataForm.mediaId}</p> {/* Use dataForm.mediaId directly */}
      <div className="fieldset">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Nome da Música:
          <input
            onChange={onInputChange}
            value={name}
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="fieldset">
        <label htmlFor="album" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Nome do Álbum:
          <input
            onChange={onInputChange}
            value={album}
            type="text"
            id="album"
            name="album"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="fieldset">
        <label htmlFor="artistName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Nome Completo do Artista:
          <input
            onChange={onInputChange}
            value={artistName}
            type="text"
            id="artistName"
            name="artistName"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label htmlFor="artistNickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Nickname do Artista:
          <input
            onChange={onInputChange}
            value={artistNickname}
            type="text"
            id="artistNickname"
            name="artistNickname"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="fieldset">
        <label htmlFor="artistNationality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          País:
          <select
            id="artistNationality"
            name="artistNationality"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            onChange={onInputChange}
            value={artistNationality}
          >
            <option value="">Selecione um país</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {getFlagEmoji(country.code)} {country.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="fieldset">
        <label htmlFor="durationEnd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Insira o tempo de duração da música (em segundos):
          <input
            onChange={onInputChange}
            value={durationEnd}
            type="number"
            id="durationEnd"
            name="durationEnd"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="fieldset">
        <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Insira a URL da capa do álbum:
          <input
            onChange={onInputChange}
            value={cover}
            type="text"
            id="cover"
            name="cover"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
    </div>
  )
}