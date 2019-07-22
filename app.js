const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('What a rainy day :(');
})

// Drill 1: Create a route handler function on the path /sum that accepts two query parameters named a and b and find the sum of the two values. Return a string in the format "The sum of a and b is c". Note that query parameters are always strings so some thought should be given to converting them to numbers.
app.get('/sum', (req, res) => {
    const query = req.query;
    const a = Number(query.a);
    const b = Number(query.b);
    const c = a + b;
    res.send(`The sum of ${a} and ${b} is ${c}.`);
})

// Drill 2: Create an endpoint /cipher. The handler function should accept a query parameter named text and one named shift. Encrypt the text using a simple shift cipher also known as a Caesar Cipher. It is a simple substitution cipher where each letter is shifted a certain number of places down the alphabet. So if the shift was 1 then A would be replaced by B, and B would be replaced by C and C would be replaced by D and so on until finally Z would be replaced by A. using this scheme encrypt the text with the given shift and return the result to the client. Hint - String.fromCharCode(65) is an uppercase A and 'A'.charCodeAt(0) is the number 65. 65 is the integer value of uppercase A in UTF-16. See the documentation for details.
app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    let charArray = text.split('').join(',');
    let charNumbers = charArray.map(i => {
        const charCode = i.charCodeAt(0);
        return (charCode + shift)
    })
    const newString = String.fromCharCode(charNumbers);

    res.send(`Input: ${text}, Cipher: ${newString}`);
})

app.get('/lotto', (req, res) => {
    const lottoArr = [1,2,3,4,5,6]
    // [
    //     Math.floor(Math.random() * 20) + 1,
    //     Math.floor(Math.random() * 20) + 1,
    //     Math.floor(Math.random() * 20) + 1,
    //     Math.floor(Math.random() * 20) + 1,
    //     Math.floor(Math.random() * 20) + 1,
    //     Math.floor(Math.random() * 20) + 1,
    // ]
    const ticketArr = req.query.ticket
    if (!ticketArr) {
        return responseText = `Play the lotto!`
    }  
    const winningTicket = []
    for (let i = 0; i < lottoArr.length; i++) {
        let num = lottoArr.find(function(e) {
            return e===ticketArr[i]
        })
        if (num) {
            winningTicket.push(num)
        }
    }
    if (winningTicket.length === 4) {
        let responseText = `Congratulations, you win a free ticket!`
    } else if (winningTicket.length === 5) {
        let responseText = `Congratulations! you win $100!`
    } else if (winningTicket.length === 6) {
        let responseText = `Wow! Unbelievable! You could have won the mega millions!`
    } else {
        let responseText = `Sorry, you lose.`
    }
    res.send(responseText);
})

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheeseburgers!');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      Body: ${req.body}
      Cookies: ${req.cookies}
      Fresh: ${req.fresh}
      Query: ${req.query}
    `;
    res.send(responseText);
});

app.get('/burgers/onion', (req, res) => {
    res.send('Onions are gross- try again!');
})

app.get('/pizza/sausage', (req, res) => {
    res.send('Good choice- coming right up!');
})

app.get('/pizza', (req, res) => {
    res.send('What kind of pizza do you want?');
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1.get values from the request
    const name = req.query.name;
    const race = req.query.race;

    //2.validate
    if(!name) {
        //3.name was not provided
        return res.status(400).send('Please provide a name')
    }

    if(!race) {
        //3.race was not provided
        return res.status(400).send('Please provide a race')
    }

    //4. and 5. both name and race are valid so do the processing
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`

    //6.send the response
    res.send(greeting);
})

app.listen(3000, () => {
    console.log('Express server is listening on port 3000!');
})