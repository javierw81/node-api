import { app } from './app'
// make server listen on some port
((port = process.env.APP_PORT || 3000) => {
    app.listen(port, async () => console.log(`> Listening on port ${port}`));
})();