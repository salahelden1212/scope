app.options('/submit', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // أو النطاقات المحددة
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
});