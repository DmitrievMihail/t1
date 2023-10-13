// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
        "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

postData(
    "https://speller.yandex.net/services/spellservice.json/checkText",
    {
        text: "масква сталица расии",
        lang: "ru",
        options: 6,
    }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
});

