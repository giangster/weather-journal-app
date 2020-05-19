/* Global Variables */
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=b71e8130bc8070d330730c4de1445414&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(zip, apiKey)
    .then(function (data) {
      // Add data
      postData("/add", {
        date: newDate,
        temperature: data.main.temp,
        userResponse: feelings,
      });
    })
    .then(function () {
      updateUI();
    });
}

const getWeather = async (zip, apiKey) => {
  const res = await fetch(`${weatherAPI}${zip}${apiKey}`);
  console.log(`${weatherAPI}${zip}${apiKey}`);
  try {
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log("aaaaaaaa");
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const response = await fetch("/weather");

  try {
    const projectData = await response.json();
    document.getElementById("date").innerHTML = projectData.date;
    document.getElementById("temp").innerHTML = projectData.temperature;
    document.getElementById("content").innerHTML = projectData.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};
