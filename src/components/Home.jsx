
import { useEffect, useState } from 'react';
import { getWeatherInfo } from '../libs/getWeatherInfo';
import Weather from './Weather';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../libs/dbConnect';
import { useNavigate } from 'react-router-dom';
const Home = () => {

    const navigate = useNavigate();
    const user = useSelector(state => state.authReducer.user)
    console.log(user);

    const [weather, setWeather] = useState({})


    const getWeather = async () => {
        await getWeatherInfo();
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const weather = await getWeatherInfo(position.coords.latitude, position.coords.longitude);
                setWeather(weather)
                console.log(weather);
            })
        }
    }, [])

    return (
        <div className='w-screen p-10'>
            <div className='w-full flex items-center justify-between'>
                <h1 className="text-4xl font-bold underline">
                    Hello {user.displayName} !
                </h1>
                <button
                    className='bg-red-500 text-white px-4 py-2 rounded-md'
                    onClick={() => { signOut(auth); navigate("/login") }}>SignOut</button>
            </div>
            <Weather data={weather} />
        </div>
    );
}

export default Home;