document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    const citiesByCountry = {
        'US': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
        'CA': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
        'GB': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool'],
        'AU': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
        // Agrega más países y ciudades según sea necesario
    };

    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        citySelect.innerHTML = '<option value="">Select a city</option>';

        if (selectedCountry) {
            const cities = citiesByCountry[selectedCountry];
            cities.forEach(function(city) {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    document.getElementById('weather-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const country = countrySelect.value;
        const city = citySelect.value;
        
        const apiKey = '2f13c269fe7aecea84c604ccc6701da5';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const temperature = Math.round(data.main.temp);
                    const humidity = data.main.humidity;
                    const visibility = data.visibility;
                    const uvIndex = data.uvi;
                    const dateTime = new Date(data.dt * 1000); // Convertir tiempo UNIX a milisegundos y crear un objeto de fecha

                    // Formatear la fecha y hora en formato legible
                    const formattedDateTime = dateTime.toLocaleString();

                    // Mostrar los datos en la interfaz de usuario
                    document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`;
                    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
                    document.getElementById('visibility').textContent = `Visibility: ${visibility} meters`;
                    document.getElementById('uvIndex').textContent = `UV Index: ${uvIndex}`;
                    document.getElementById('dateTime').textContent = `Date and Time: ${formattedDateTime}`;
                } else {
                    document.getElementById('temperature').textContent = 'City not found';
                }
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                document.getElementById('temperature').textContent = 'Error fetching the weather data';
            });
    });
});
