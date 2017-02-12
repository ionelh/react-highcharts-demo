# Temperature history chart
Experimenting with react-highcharts, reselect and the www.ncdc.noaa.gov APIs to show a chart of temperature history.

## Run

If you haven't already, install NodeJS and npm - https://nodejs.org/
Then gulp:
```sh
$ npm i -g gulp
```

Then clone the repo, cd to `github-api`, install the packages and start the server.
```sh
git clone https://github.com/ionelh/temperature-history-chart
cd temperature-history-chart
npm install
npm start
```
Now fire up your browser and go to `http://localhost:5000/`. The generated js bundle will be served by webpack-dev-server from memory, which allows hot module replacement.

## Other commands

Run the unit tests:
```sh
npm test
```
Run and watch the unit tests:
```sh
npm run test-watch
```
Generate unit tests coverage:
```sh
npm run test-coverage
```
Then open `coverage/index.html` in your browser to see the detailed coverage for each file.

Run eslint (edit .eslintrc to define your own linting; you'll these errors and warnings in the command line and the browser console as well):
```sh
npm run eslint
```
Build:
```sh
npm run build
```
This will run webpack to generate the bundle mentioned earlier, transpiled from ES2015 to ES5 using Babel. It's a very basic build mechanism, you'll need to extend it to suite your own needs if needed. Checkout the `build` folder created after running this command.
