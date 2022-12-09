import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/BreedPhotos.css'

function BreedPhotos (props) {
    const [dogs, setDogs] = useState(null)
    let { nameDog } = useParams ()

    function randomNumberInRange (min, max) {
        return Math.floor(Math.random() * (max-min +1)) + min
    }

    async function fetchDogList() {
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${nameDog}/images`)
            const dogNewData = await response.json()
            console.log(dogNewData)

            setDogs(dogNewData.message)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchDogList()
    }, [])

    //testing
    return (
        <div className="dog-container">
            <div className ="breed-header">
                <h1>{nameDog.charAt(0).toUpperCase() + nameDog.slice(1)}</h1>
            </div>
            {dogs ? 
                <div className="photo-box-breed">  
                    <img className='photo-individual' src={dogs[randomNumberInRange(0,dogs.length-1)]} alt=""/>
                    <img className='photo-individual' src={dogs[randomNumberInRange(0,dogs.length-1)]} alt=""/>
                    <img className='photo-individual' src={dogs[randomNumberInRange(0,dogs.length-1)]} alt=""/>
                </div> 
            : <p>Loading dog...</p>  }
            <button onClick={fetchDogList} id="more">More!</button>
        </div>
    )

}


export default BreedPhotos