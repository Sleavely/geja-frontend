# GEJA frontend

## Installing

```shell
yarn
```

## Configuration

By default, the dev environment uses `.env`. For custom environments, use `.${ENVIRONMENT}.env`.

## Development

`npm start` runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm test` launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.<br>

### Deployment

`ENVIRONMENT=dev make deploy`
