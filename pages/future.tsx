import React, { useEffect, useState, FunctionComponent } from 'react';
import Link from 'next/link';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { NUM_DAYS } from '../constants/constants';
import styles from '../styles/Home.module.css';

interface DailyForecast {
    unix_timestamp: number;
    temp_max: number;
    temp_min: number;
    icon: string;
}

/**
 * Makes an API call to get a future weather forecast based on longitude and latitude.
 * 
 * @param {number} latitude 
 * @param {number} longitude
 * @returns {Promise<DailyForecast[]|false} Returns false if there was a problem the the API response.
 */
export async function getForecastByCoords(latitude: number, longitude: number): Promise<DailyForecast[]|false> {
    return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=imperial`
        )
        .then(res => res.json())
        .then(data => {
            let result: DailyForecast[] = [];
            for (let i = 0; i < NUM_DAYS; i++) {
                result.push({
                    unix_timestamp: data.daily[i].dt,
                    temp_max: data.daily[i].temp.max,
                    temp_min: data.daily[i].temp.min,
                    icon: data.daily[i].weather[0].icon
                })
            }
            return result;
        })
        .catch(error => {
            console.error(error);
            return false;
        })
}

const FutureForecastPage: FunctionComponent = () => {
    const [error, setError] = useState<string|false>(false);
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState<DailyForecast[]>([]);

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setLoading(false);
            setError("Sorry, there was a problem getting your browser's location data.")
            return;
        }

        geo.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const data: DailyForecast[]|false = await getForecastByCoords(latitude, longitude);

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
        return <Loading />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    const weatherCards = weatherData.map((data) => {
        return (
            <div key={data.unix_timestamp} className={styles.card}>
                <img
                    src={`http://openweathermap.org/img/wn/${data.icon}.png`}
                    data-testid="weather-icon"
                    alt="weather icon"
                    role="presentation"/>
                <ul data-testid="weather-data">
                    <li>Date: {new Date(data.unix_timestamp * 1000).toString()}</li>
                    <li>High: {data.temp_max} F</li>
                    <li>Low: {data.temp_min} F</li>
                </ul>
            </div>
        );
    })

    return( 
        <div>
            <h1>{NUM_DAYS}-day forecast:</h1>
            {weatherCards}
            <Link href="/"><p>Click here to go back</p></Link>
        </div>
    );
}

export default FutureForecastPage;
