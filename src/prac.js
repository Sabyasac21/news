const url = 'https://newsapi.org/v2/everything?q=business&page=1&pageSize=10';
const apiKey = 'bca8ff9cba22478ab3e3a87652dde644';

fetch(url, {
    method: 'GET',
    headers: {
        'x-api-key': apiKey
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => console.log(data.articles))
.catch(error => console.error('There was a problem with the fetch operation:', error));
