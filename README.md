This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

If more time were allocated to this project, the first priority would be setting up and adding unit tests to get 100% code coverage. Next would be making our API request through a a reverse-proxy server (like express) so that our API key isn't exposed to the browser.

## Set up dev environment

First, copy .env.development and insert your OpenWeather API key into .env.local:
```bash
cp .env.development .env.local
```

## Running

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
