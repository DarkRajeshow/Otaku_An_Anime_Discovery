import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Choice from './components/Choice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import OverviewPage from './components/OverviewPage';
import Search from './components/Search';
export const Contexts = createContext();


function App() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState([]);
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [AnimeId, setAnimeId] = useState("7442");
  const [currentAnimeOverview, setCurrentAnimeOverview] = useState("Attack on titan")
  const [videoId, setvideoId] = useState("LHtdKWJdif4");
  const [reviews, setReviews] = useState("");
  const [searchedAnimeList, setSearchedAnimeList] = useState([]);
  const [shortDescription, setShortDescription] = useState("Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations. After witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Based on Hajime Isayama's award-winning manga, Shingeki no Kyojin follows Eren, along with his adopted sister Mikasa Ackerman and his childhood friend Armin Arlert, as they join the brutal war against the titans and race to discover a way of defeating them before the last walls are breached. (Source: MAL Rewrite)");

  const [noResult, setNoResult] = useState(false);
  const [internetError, setInternetError] = useState(false);
  const [currentRating, setCurrentRating] = useState(84.92);
  const [searchedAnimeName, setSearchedAnimeName] = useState("");
  const [isItSearchPage, setIsItSearchPage] = useState(false);


  let handleStart = () => {
    setGenres([])
    setRating([])
    setStatus("")
    setYear("")
    navigate("/Otaku_An_Anime_Discovery/step1");
  }

  let NavigateHome = () => {
    setGenres([])
    setRating([])
    setStatus("")
    setYear("")
    navigate("/Otaku_An_Anime_Discovery");
  }

  let NavigateSearchPage = () => {
    setGenres([])
    setRating([])
    setStatus("")
    setYear("")
    navigate("/Otaku_An_Anime_Discovery/search");
  }

  const searchAnime = async () => {
    console.log(searchedAnimeName);
    if (searchedAnimeName == "") {
      try {
        setLoading(true);
        setInternetError(false);
        setNoResult(false);
        const searchedAnime = await fetch(`https://kitsu.io/api/edge/anime?sort=-averageRating,-popularityRank&page[limit]=20&fields[anime]=titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,showType`);
        const paredsearchedAnime = await searchedAnime.json();
        setLoading(false);
        if (paredsearchedAnime.data.length === 0) {
          setNoResult(true);
          setSearchedAnimeList([])
          return;
        }
        setSearchedAnimeList(paredsearchedAnime.data)
      }
      catch {
        setLoading(false);
        setInternetError(true)
      }
      // https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=20
    }
    else {
      try {
        setLoading(true);
        setInternetError(false);
        setNoResult(false);
        const searchedAnime = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchedAnimeName === "" ? "Attack on Titan" : searchedAnimeName}&page[limit]=20&fields[anime]=titles,description,posterImage,averageRating,episodeCount,status,youtubeVideoId,showType`);
        const paredsearchedAnime = await searchedAnime.json();
        setLoading(false);
        if (paredsearchedAnime.data.length === 0) {
          setNoResult(true);
          setSearchedAnimeList([])
          return;
        }
        setSearchedAnimeList(paredsearchedAnime.data)
      }
      catch {
        setLoading(false);
        setInternetError(true)
      }
      console.log(searchedAnimeList);
    }

  }


  //to check percentage match of search with result
  const calculateMatchPercentage = (searchInput, result) => {

    if (searchInput == "" || !isItSearchPage) {
      return "Check it out"
    }
    const searchTerms = searchInput.toLowerCase().split(' ');
    const resultTerms = result.toLowerCase().split(' ');

    let totalTerms = searchTerms.length;
    let matchedTerms = 0;

    searchTerms.forEach((term) => {
      if (resultTerms.includes(term)) {
        matchedTerms++;
      }
    });

    let matchPercentage = (matchedTerms / totalTerms) * 100;
    matchPercentage = Math.round(matchPercentage);

    return matchPercentage + "% Match";
  };


  return (
    <Contexts.Provider value={{ genres, setGenres, status, setStatus, rating, setRating, year, setYear, handleStart, NavigateHome, loading, setLoading, AnimeId, setAnimeId, videoId, setvideoId, shortDescription, setShortDescription, reviews, setReviews, noResult, setNoResult, internetError, setInternetError, currentRating, setCurrentRating, NavigateSearchPage, searchedAnimeList, setSearchedAnimeList, searchedAnimeName, setSearchedAnimeName, searchAnime, calculateMatchPercentage, setIsItSearchPage, currentAnimeOverview, setCurrentAnimeOverview }}>
      <NavBar />
      <Routes>
        <Route path='/Otaku_An_Anime_Discovery' element={<><Home /></>} />
        <Route path='/Otaku_An_Anime_Discovery/step1' element={<><Step1 /></>} />
        <Route path='/Otaku_An_Anime_Discovery/step2' element={<><Step2 /></>} />
        <Route path='/Otaku_An_Anime_Discovery/step3' element={<><Step3 /></>} />
        <Route path='/Otaku_An_Anime_Discovery/step4' element={<><Step4 /></>} />
        <Route path='/Otaku_An_Anime_Discovery/choice' element={<><Choice /><Footer /></>} />
        <Route path='/Otaku_An_Anime_Discovery/overview' element={<><OverviewPage /></>} />
        <Route path='/Otaku_An_Anime_Discovery/search' element={<><Search /></>} />
      </Routes>
    </Contexts.Provider>
  );
}

let RouterApp = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default RouterApp;


// step 1 : genres
// step 2 : rating
// step 3 : status
// step 4 : season year 
// choice : 