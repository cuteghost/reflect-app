const express = require('express');
const app = express();
const port = 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reflect Input</title>
        </head>
        <body>
            <h1>Enter some text</h1>
            <form action="/reflect" method="POST">
                <input type="text" name="userInput" placeholder="Type something..." required>
                <button type="submit">Submit</button>
            </form>
            <div id="response"></div>
            <script>
                document.querySelector('form').addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const inputData = new FormData(event.target);
                    const response = await fetch('/reflect', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(inputData)
                    });
                    const resultText = await response.text();
                    document.getElementById('response').innerHTML = resultText; // Set as HTML to allow scripts to run
                });
            </script>
        </body>
        </html>
    `);
});

app.post('/reflect', (req, res) => {
    const userInput = req.body.userInput;
    res.send(userInput);
});

app.listen(port, () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
