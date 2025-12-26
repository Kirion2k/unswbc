# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Live Instagram “News” feed (Netlify)

This site supports a live Instagram feed via Netlify Functions + Instagram Basic Display API.

### 1) Create an Instagram Basic Display app (Meta)

- Go to Meta for Developers and create an app.
- Add the **Instagram Basic Display** product.
- Add an **Instagram Test User** (or your account as a tester) and accept the invite in Instagram.

### 2) Configure redirect URI

In the Instagram Basic Display settings, set **Valid OAuth Redirect URIs** to:

- `https://<YOUR-SITE>.netlify.app/.netlify/functions/instagram-auth-callback`

If you use a custom domain, use that domain instead.

### 3) Set Netlify environment variables

In Netlify: **Site settings → Environment variables**, add:

- `INSTAGRAM_APP_ID` = your Meta app’s Instagram App ID
- `INSTAGRAM_APP_SECRET` = your Meta app secret
- `INSTAGRAM_REDIRECT_URI` = the exact redirect URI from step (2)
- `INSTAGRAM_ACCESS_TOKEN` = (leave empty for now; you’ll fill it in after step 4)

### 4) Generate the long-lived token (one-time)

After deploying, open:

- `https://<YOUR-SITE>.netlify.app/.netlify/functions/instagram-auth-start`

Log in to Instagram, approve, then you’ll be redirected to a JSON response containing `token`.

Copy that `token` value into Netlify env var:

- `INSTAGRAM_ACCESS_TOKEN` = `<token>`

Then redeploy.

### 5) Enable the feed on the frontend

Set a Netlify build env var for the React app:

- `REACT_APP_INSTAGRAM_FEED_URL` = `/.netlify/functions/instagram-feed`

Redeploy again.

### 6) Test

Open:

- `https://<YOUR-SITE>.netlify.app/.netlify/functions/instagram-feed`

You should see JSON `{ posts: [...] }`.
