import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CurrentWeatherData {
    name: string;
    main: string;
    description: string;
    icon: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
}

/**
 * Makes an API call to get current weather data based on longitude and latitude.
 * 
 * @param {number} latitude 
 * @param {number} longitude
 * @returns {Promise<CurrentWeatherData|false} Returns false if there was a problem the the API response.
 */
export async function getCurrentWeatherByCoords(latitude: number, longitude: number): Promise<CurrentWeatherData|false> {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=imperial`
        )
        .then(res => res.json())
        .then(data => {
            return {
                name: data.name,
                main: data.weather[0].main,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                humidity: data.main.humidity
            }
                    
        })
        .catch(error => {
            console.error(error);
            return false;
        })
}

const CurrentWeatherPage: React.FC = () => {
    const [error, setError] = useState<string|false>(false);
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState<CurrentWeatherData>({
        name: '',
        main: '',
        description: '',
        icon: '',
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        humidity: 0,
    });

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setLoading(false);
            setError("Sorry, there was a problem getting your browser's location data.")
            return;
        }

        geo.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const data: CurrentWeatherData|false = await getCurrentWeatherByCoords(latitude, longitude);

            if(!data) {
                setLoading(false);
                setError("Sorry, there was a problem fetching weather data for your location.");
                return;
            }

            setLoading(false);
            setWeatherData(data);
        });
    }, []);

    if (loading) {
        return( 
            <div>
                <h1>Current weather:</h1>
                <p data-testid="loading-message">Loading...</p>
                <br />
                <Link href="/"><p>Click here to go back</p></Link>
            </div>
        );
    }

    if (error) {
        return( 
            <div>
                <h1>Current weather:</h1>
                <p data-testid="error-message">{error}</p>
                <br />
                <Link href="/"><p>Click here to go back</p></Link>
            </div>
        );
    }

    return( 
        <div>
            <h1>Current weather:</h1>
            <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
                data-testid="weather-icon"
                alt="weather icon"
                role="presentation"/>
            <ul data-testid="weather-data">
                <li>Name: {weatherData.name}</li>
                <li>Main: {weatherData.main}</li>
                <li>Description: {weatherData.description}</li>
                <li>Temperature: {weatherData.temp} F</li>
                <li>Feels Like: {weatherData.feels_like} F</li>
                <li>High: {weatherData.temp_max} F</li>
                <li>Low: {weatherData.temp_min} F</li>
            </ul>
            <br />
            <Link href="/"><p>Click here to go back</p></Link>
        </div>
    );
}

export default CurrentWeatherPage;
