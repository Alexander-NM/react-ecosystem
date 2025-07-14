import { useState, useEffect } from "react"

export default function Main() {
    
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [memeArray, setMemeArray] = useState([])
    useEffect(() => {
        console.log("fetch");
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(resData => setMemeArray(resData.data.memes))
    }, [])

    function handleChange(e) {
        const { value, name } = e.currentTarget
        setMeme(prevMeme => {
            return {...prevMeme,
                    [name]: value
            }
        })
    }

    function handleClick() {
        const randomMeme = memeArray[Math.floor(Math.random() * memeArray.length)]
        console.log(meme);
        setMeme({
            ...meme,
            imageUrl: randomMeme.url
        })
        
    }
    
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleClick}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}