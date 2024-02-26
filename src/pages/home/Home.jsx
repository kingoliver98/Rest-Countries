import React, { useEffect, useState } from "react";
import SearchSection from "../../components/searchSection/SearchSection";
import Countries from "../../components/countries/Countries";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredContries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries = await res.json();
      setIsLoading(false);
      setData(countries);
    };

    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  const handleSearch = (userInput) => {
    const searchData = data.filter((country) =>
      country.name.common
        .toLowerCase()
        .startsWith(userInput.toLowerCase().trim())
    );
    console.log(searchData);
    setFilteredCountries(searchData);
  };

  const handleRegion = (choosenRegion) => {
    const searchedRegion = data.filter(
      (country) => country.region === choosenRegion
    );
    setFilteredCountries(searchedRegion);
  };
  return (
    <div>
      <SearchSection
        handleSearch={handleSearch}
        isLoading={isLoading}
        handleRegion={handleRegion}
      />
      
      <Countries
        countries={filteredContries.length > 0 ? filteredContries : data}
        isLoading={isLoading}
      />
      {/* {data ? <Countries countries={data} /> : null}
      {isLoading ? <p> Loading...</p> : null} */}
    </div>
  );
};

export default Home;
