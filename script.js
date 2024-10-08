let weatherApp = (function() {
    let city = 'birmingham';
    let apiKey = 'DLNE4QADMLDWQ9VRNE3ZP6U4R';
    let weatherWeek;


    let getWeatherData = async () => {
        // calls api, returns a week of weather data
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;

        try {
            // we get the data
            let response = await fetch(url);
            let responseJson = await response.json();

            // extract what we need from it
            let days = responseJson.days;
            weatherWeek = [days[0], days[1], days[2], days[3], days[4], days[5], days[6]];
            return weatherWeek;


        } catch (error) {
            console.log(`erra! :${error}`);
        }
    }

    let updateCity = () => {
        // updates the city value. thats it
        let cityInput = document.querySelector('.cityinput').value;
        city = cityInput;
    }

    let drawToday = () => {
        let today = weatherWeek[0];
        console.log(today);
        
        // reference todays div elements

        let citydiv = document.querySelector('.citydiv');
        let cityindicator = document.querySelector('.cityindicator');
        let datediv = document.querySelector('.datediv');
        let imgdiv = document.querySelector('.imgdiv');
        let tempdiv = document.querySelector('.tempdiv');
        let statediv = document.querySelector('.statediv');

        // fill it in mf
        citydiv.textContent = city;
        cityindicator.textContent = city;
        datediv.textContent = today.datetime;
        let icon = document.createElement('img');
        icon.src = `icons/${today.icon}.png`;
        imgdiv.textContent = '';
        imgdiv.appendChild(icon);
        tempdiv.textContent = `${today.temp}°F`;
        statediv.textContent = today.description;

    }

    let drawWeek = () => {
        let weekdiv = document.querySelector('.weekdiv');
        weekdiv.textContent = "";
        weatherWeek.forEach(day => {
            // for each day, create an appropriate daydiv
            let daydiv = document.createElement('div');
            daydiv.classList.add('daydiv');

            let icondiv = document.createElement('div');
            icondiv.classList.add('weekicon');
            let datediv = document.createElement('div');
            datediv.classList.add('weekdate');
            let lowdiv = document.createElement('div');
            lowdiv.classList.add('weeklow');
            let highdiv = document.createElement('div');
            highdiv.classList.add('weekhigh');

            daydiv.appendChild(icondiv);
            daydiv.appendChild(datediv);
            daydiv.appendChild(lowdiv);
            daydiv.appendChild(highdiv);
            
            // slot the day objects data into the daydiv
            let icon = document.createElement('img');
            icon.src = `icons/${day.icon}.png`;
            icondiv.textContent = '';
            icondiv.appendChild(icon);


            datediv.textContent = day.datetime;
            lowdiv.textContent = `Low: ${day.tempmin}°F`;
            highdiv.textContent = `High: ${day.tempmax}°F`;

            // append the daydiv inside of the weekdiv onscreen.
            weekdiv.appendChild(daydiv);
        });
    }
    
    let drawData = () => {
        drawToday();
        drawWeek();
    }


    let refreshBtn = document.querySelector('.refreshbtn');
    refreshBtn.addEventListener('click', async () => {
        let cityInput = document.querySelector('.cityinput').value;
        if(cityInput !== ''){
            updateCity();
        }
        await getWeatherData();
        drawData();
    });

    (async () => {
    await getWeatherData();
    drawData();
    })();



})();