import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
    const [city, setCity] = useState('Paris'); // État pour stocker le nom de la ville
    const [weatherData, setWeatherData] = useState(null); // État pour les données météorologiques
    const [loading, setLoading] = useState(true); // État pour indiquer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    useEffect(() => {
        fetchWeather(); // Appel à fetchWeather au montage initial du composant
    }, []); // Tableau de dépendances vide pour s'assurer que cela s'exécute une seule fois au montage

    const fetchWeather = async () => {
        const currentDate = new Date(); // Obtenez la date actuelle
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format ISO YYYY-MM-DD

        const options = {
            method: 'GET',
            url: '',
            params: {
                q: city, // Utilisation de la variable d'état 'city' ici
                days: '7', // Nombre de jours pour les prévisions
                lang: 'fr', // Langue des prévisions (français)
                dt: formattedDate // Utilisation de la date actuelle formatée ici
            },
            headers: {
                'x-rapidapi-key': 'fa500d464bmsh26948d6ba88745dp1f9fe9jsn3e0210da845c',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setWeatherData(response.data); // Mettre à jour les données météorologiques
            setLoading(false); // Mettre 'loading' à false une fois les données chargées
        } catch (error) {
            setError(error.message); // Gérer les erreurs et les afficher
            setLoading(false); // Mettre 'loading' à false en cas d'erreur
        }
    };

    const InputChange = (event) => {
        setCity(event.target.value); // Mettre à jour l'état 'city' lorsque l'utilisateur modifie l'entrée
    };

    const Submit = () => {
        setLoading(true); // Indiquer le chargement en cours pour signaler une nouvelle requête de données
        fetchWeather(); // Appeler fetchWeather pour obtenir les données météorologiques de la nouvelle ville
    };

    if (loading) return <p>Chargement...</p>; // Afficher un message de chargement si les données sont en cours de récupération
    if (error) return <p>Erreur : {error}</p>; // Afficher un message d'erreur en cas d'erreur de récupération des données

    return (
        <div className="backgound-meteo">
            <h1>Prévisions météorologiques</h1> {/* Afficher le nom de la ville actuelle */}
            <input
                type="text"
                value={city}
                onChange={InputChange}
                placeholder="Entrez le nom de la ville"
            />
            <button  class="cloud-button" onClick={Submit}><span className="button-text">Obtenir la météo</span></button>
            {weatherData && weatherData.forecast && weatherData.forecast.forecastday.map(day => (
                <div key={day.date}>
                    <h2>Ville : {weatherData.location.name}</h2>
                    <h2>Région : {weatherData.location.region}</h2>
                    <h2>Pays : {weatherData.location.country}</h2>
                    <h3>Date du jour : {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                    <p>Température maximale : {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</p>
                    <p>Température minimale : {day.day.mintemp_c}°C / {day.day.mintemp_f}°F</p>
                    <p>Condition : {day.day.condition.text}</p>
                    <p>Humidité : {day.day.avghumidity} %</p>
                    <p>Vent  : {day.day.maxwind_kph} km/h</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherComponent;



