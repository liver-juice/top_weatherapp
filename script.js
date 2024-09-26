let weatherApp = (function() {
    let city = 'beaumont tx';
    let apiKey = 'DLNE4QADMLDWQ9VRNE3ZP6U4R';

    // the variables that will hold references to changing weather data
    let weatherWeek = [];
    let today = weatherWeek[0];

    let getWeatherData = async () => {
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;

        try {
            // we get the data
            let response = await fetch(url);
            let responseJson = await response.json();

            // extract what we need from it
            let days = responseJson.days;
            weatherWeek = [days[0], days[1], days[2], days[3], days[4], days[5], days[6]];
            today = weatherWeek[0];

        } catch (error) {
            console.log(`erra! :${error}`);
        }
    }

    let updateCity = () => {
        let cityInput = document.querySelector('.cityinput').value;
        if(cityInput !== ''){
            city = cityInput;
            console.log(city)
        }else{
            console.log('enter a city first');
        }
        getWeatherData();
        console.log(today);
    }

    let refreshBtn = document.querySelector('.refreshbtn');
    refreshBtn.addEventListener('click', updateCity);


    getWeatherData()

})();