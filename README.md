# MyTV

Television station management.

## Setup

Copy the `.env` to `.env.local` and fill in the details.
For the `API_KEY`, generate a
[web-auth](https://github.com/ystv/web-auth)-style
access token and put it here.

Add the below line to your `/etc/hosts` file (`C:\Windows\System32\drivers\etc\hosts` on Windows):

```
127.0.0.1 ystv-development.localhost
```

## Available Scripts

In the project directory, you can run:

### `HTTPS=true yarn dev`

Runs the app in the development mode.

Open [https://ystv-development.localhost:3000](https://ystv-development.localhost:3000) to view it in the browser.

The page will reload if you make edits and you will also see any lint errors in
the console.

### `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the
best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Basic breakdown of how to edit this:

`src/index.tsx` to change theme

`src/components/App/PageRouter.tsx` to add pages or change page routing in react Router

`src/components/sidebar/items.ts` to change/add menu links/icons

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
