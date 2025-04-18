import React, { useState, useEffect } from 'react'

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [songName, setSongName] = useState("");
    const [mp4Url, setMp4Url] = useState("");
    const [mp3Url, setMp3Url] = useState("");
    const [audioElement, setAudioElement] = useState(false)
    const encodedQuery = encodeURIComponent(songName.trim());

    // useEffect(() => {
    //     fetch('https://api.example.com/songs') // Replace with your API endpoint
    //         .then(response => response.json())
    //         .then(data => setSongs(data))
    //         .catch(error => console.error('Error fetching songs:', error));
    // }, []);
    const getSongs = async () => {
        const response = await fetch(`https://saavn.dev/api/search/songs?query=${encodedQuery}`); // Replace with your API endpoint
        const data = await response.json();
        if(response.ok){
            setSongs(data);
            const URL = songs?.data?.results?.[0].downloadUrl?.[0]?.url;
            console.log(songs)
            console.log(URL);
            setMp4Url(URL);
        }
        
        

        // console.log(s);
        
      if(mp4Url){
        const encoded = encodeURIComponent(mp4Url);
        setMp3Url(`https://song-app-backend-3zg3.onrender.com/convert-mp3?url=${encoded}`);
        console.log("converted-mp3-url",mp3Url);
        
        setTimeout(() => {
            setAudioElement(true);
        }, 3000);
      }
        


        // const response2 = await fetch("http://localhost:5000/convert-mp3",{
        //     method:"post",
        //     body:JSON.stringify({mp4Url}),
        //     headers:{'Content-Type':'application/json'}
        // })

    };

    // console.log(songs.result[0].downloadloadUrl[0]);

    return (
        <div>
            <input type="text" placeholder='search...' className='search' onChange={(e) => setSongName(e.target.value)} />
            <button className='btn' onClick={getSongs}>Search</button>
            {/* <div className="song-list">
            {songs.result.map((song, index) => (
                song.downloadloadUrl.map
            ))} 
        </div> */}
            {
                audioElement ?
                    <>
                        <div>
                            <h2>Now Playing</h2>
                            <audio controls src={mp3Url}>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </>
                    : ""

            }


        </div>
    )
}

export default Home;