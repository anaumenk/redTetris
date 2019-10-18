const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get/rooms', (req, res) => {
    const rooms = [
        {
            id: 1,
            name: "first room"
        },
        {
            id: 2,
            name: "second room"
        },
        {
            id: 3,
            name: "3"
        },
        {
            id: 4,
            name: "BEST Four room"
        },
        {
            id: 5,
            name: "5"
        },
        {
            id: 6,
            name: "last room"
        },
    ];
    res.send(rooms);
});

app.post('/api/post/room', (req, res) => {
    const newRoom = {
        id: 7,
        name: req.body.name
    };
    res.send(newRoom);
});

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'client/build')));
//
//     // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
