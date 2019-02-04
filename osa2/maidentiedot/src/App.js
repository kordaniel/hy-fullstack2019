import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListLanguages = ({languages}) => (
  languages.map(l => <li key={l.iso639_1}>{l.name}</li>)
)
const Country = ({country}) => {
  console.log('country', country)
  return (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <ul><ListLanguages languages={country.languages} /></ul>
    <img src={country.flag} alt={country.alpha2Code} width="15%" height="15%" />
  </div>
  )
}
const ShowCountries = ({selectedCountries}) => {
  if (selectedCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (selectedCountries.length === 1) {
    console.log('moro')
    return (
      <Country country={selectedCountries[0]} />
    )
  }
  return (
    selectedCountries.map(c => <div key={c.alpha2Code}>{c.name}</div>)
  )
}

const App = () => {
  const [countriesData, setCountriesData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const selectedCountries = countriesData.filter(
        c => c.name.toLowerCase().startsWith(selectedCountry.toLowerCase()))
  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountriesData(res.data))
  }, [])
  const handleCountryInput = (e) => (setSelectedCountry(e.target.value))
  //const handleCountryInput = (e) => (null)
  //console.log('countries', countriesData)
  //console.log('selected: ', selectedCountry)
  console.log('selected countries', selectedCountries)
  return (
    <div>
      <div>find countries <input value={selectedCountry}
                            onChange={handleCountryInput}
                      />
      </div>
      <ShowCountries selectedCountries={selectedCountries} />
    </div>
  )
}

export default App;
