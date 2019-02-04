import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListLanguages = ({languages}) => 
  languages.map(l => <li key={l.iso639_1}>{l.name}</li>)

const ListCountries = ({selectedCountries, setSelectedCountry}) => (
  selectedCountries.map(c => {
    return <div key={c.alpha2Code}>{c.name}
      <button onClick={() => setSelectedCountry(c.name)}>show</button></div>
  })
)

const DisplayCountry = ({country}) => {
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

const DisplayWeather = ({weatherData}) => {
  if (weatherData.length === 0) {
    return <div></div>
  }
  
  const imageUrl = `https:${weatherData.current.condition.icon}`
  
  return (
    <div>
      <h3>Weather in {weatherData.location.name}</h3>
      <div><strong>temperature:</strong> {weatherData.current.temp_c} Celsius</div>
      <div><img src={imageUrl} alt='' /></div>
      <div><strong>wind:</strong> {weatherData.current.wind_kph} kph direction {weatherData.current.wind_dir}</div>
    </div>
  )
}

const ShowCountries = ({selectedCountries, setSelectedCountry, updateWeather}) => { 
  if (selectedCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (selectedCountries.length === 1) {
    updateWeather()
    return (
      <DisplayCountry country={selectedCountries[0]} />
    )
  }
  /*
  const currentCountries = selectedCountries.map(c => {
    return <div key={c.alpha2Code}>{c.name}
    <button onClick={() => setSelectedCountry(c.name)}>show</button></div>
  })
  */
  return (
    <ListCountries selectedCountries={selectedCountries}
                    setSelectedCountry={setSelectedCountry}
                    />

  )
}

const App = () => {
  const [weatherData, setWeatherData] = useState([])
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
  
  const updateWeather = () => {
    //what an waste of variables, but oh, this is only a tiny project to learn react
    const selectedCapital = selectedCountries[0].capital
    const baseUrl = 'https://api.apixu.com/v1/current.json?key='
    const apiKey = process.env.REACT_APP_APIXU_KEY
    //key is assigned in the .env file
    const endUrl = `&q=${selectedCapital}`
    const url = `${baseUrl}${apiKey}${endUrl}`
    useEffect(() => {
      axios
        .get(url)
        .then(res => {
          setWeatherData(res.data)
      })
    }, [])
    //console.log('lopussa', weatherData)
  }
  
  const handleCountryInput = (e) => setSelectedCountry(e.target.value)
  return (
    <div>
      <div>find countries <input value={selectedCountry}
                            onChange={handleCountryInput}
                      />
      </div>
      <ShowCountries selectedCountries={selectedCountries}
                      setSelectedCountry={setSelectedCountry}
                      updateWeather={updateWeather} />
      <DisplayWeather weatherData={weatherData} />
    </div>
  )
}

export default App;
