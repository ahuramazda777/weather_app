async function getData(url = '') {
    console.log('url', url)
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        return json
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

interface iDayCurrent {
    day: string,
    temperature: string;
    feelsLike: string
    sunrise: number
    sunset: number
    weather: {
        icon: string;
        description: string
    }
}

interface iDay {
    day: string,
    dayTemp: string;
    nightTemp: string;
    weather: {
        icon: string;
        description: string
    }
}

const getFullDate = (ts: number) => {
    let jsDate: Date = new Date(1000 * ts)
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    }
    return jsDate.toLocaleString('en-US', options)
}

const getFullTime = (ts: number) => {
    let jsDate: Date = new Date(1000 * ts)
    let options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }
    return jsDate.toLocaleString('en-US', options)
}

const getShortDate = (ts: number) => {
    let jsDate: Date = new Date(1000 * ts)
    let options = {
        weekday: "long"
    }
    return jsDate.toLocaleString('en-US', options)
}

class Weather {
    currWeather: iDayCurrent
    weekTemp: iDay[]
    city: string

    public constructor(city: string, data: any) {
        this.city = city
        this.currWeather = {
            day: getFullDate(data.current.dt),
            temperature: data.current.temp,
            feelsLike: data.current.feels_like,
            sunrise: data.current.sunrise,
            sunset: data.current.sunset,
            weather: {
                icon: data.current.weather[0].icon,
                description: data.current.weather[0].description
            }
        }

        let weekInfo = data.daily.slice(1)

        this.weekTemp = weekInfo.map((item: any) => {
            return {
                day: getShortDate(item.dt),
                dayTemp: item.temp.day,
                nightTemp: item.temp.night,
                weather: {
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                }
            }
        })

    }

    public getWeeks() {
        return this.weekTemp
    }

    public getCurrWeather() {
        return this.currWeather
    }

}

const url = `https://api.openweathermap.org/data/2.5/onecall?lat=55.7522&lon=37.6156&exclude=minutely,hourly,alerts&units=metric&appid=4f5ca7bdac6a2274671fce002ad16371`

getData(url).then(data => {

    const weather = new Weather('moscow', data)
    let week = weather.getWeeks()
    let curr = weather.getCurrWeather()

    let currDateDate = document.querySelector('.weather__info--date > p:nth-child(1)')
    let currDateDescription = document.querySelector('.weather__info--date > p:nth-child(2)')

    currDateDate!.textContent = curr.day;
    currDateDescription!.textContent = curr.weather.description

    let currDateInfoFeelsLike = document.querySelector('.weather__info--data > p:nth-child(1)')
    let currDateInfoSunrise = document.querySelector('.weather__info--data > p:nth-child(2)')
    let currDateInfoSunset = document.querySelector('.weather__info--data > p:nth-child(3)')

    currDateInfoFeelsLike!.textContent = `Feels like: ${Math.round(Number(curr.feelsLike))} \u2103`
    currDateInfoSunrise!.textContent = `Sunrise: ${getFullTime(curr.sunrise)}`
    currDateInfoSunset!.textContent = `Sunset: ${getFullTime(curr.sunset)}`


    let currDayIcon = document.querySelector('.weather__info-icon__temp > img')
    let currDayTemp = document.querySelector('.weather__info-icon__temp > p')

    currDayTemp!.textContent = `${Math.round(Number(curr.temperature))} \u2103`
    currDayIcon!.setAttribute('src', `https://openweathermap.org/img/wn/${curr.weather.icon}@2x.png`)

    week.map((day, id) => {
        let dayElement = document.querySelector(`.weather__temp > div:nth-child(${id + 1}) > p:nth-child(1) `)
        dayElement!.textContent = day.day
        let imgDay = document.querySelector(`.weather__temp > div:nth-child(${id + 1}) > img `)
        imgDay!.setAttribute('src', `https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`)


        let dayTemp = document.querySelector(`.weather__temp > div:nth-child(${id + 1}) > p:nth-child(3) `)
        let nightTemp = document.querySelector(`.weather__temp > div:nth-child(${id + 1}) > p:nth-child(4) `)
        dayTemp!.textContent = `${Math.round(Number(day.dayTemp))} \u2103`
        nightTemp!.textContent = `${Math.round(Number(day.nightTemp))} \u2103`
    })
})
