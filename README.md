This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To Start the app in development mode, run the development server:

```bash
yarn dev
```

For production build:

```bash
yarn build
```

and then generate static files by running this command

```bash
yarn export
```

by running this command you will get a static build ready to be deployed on server in ./build/web

### Note

If you get any error while building or stuck on loading put ```GENERATE_SOURCEMAP=false``` in your .env.production file

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). This endpoint can be edited in `pages/api/[file].{ts, js}`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Folder Structure

- assets
  - styles (stylesheets goes here)
- components
  - child components for the view will be listed
- configs
  - blockchain (idl files for rpc calls)
  - rest any config file specifically .json will be placed here
- constants
  - used to hold files related to hard coded variables
- contexts
  - all the contexts required for the app
- hoc
  - react higher order components
- hooks
  - all the custom hooks used in the app
- interface
  - typescript interfaces, types and Enums
- layouts
  - Whole app layout like navbar, footer etc.
- pages
  - Next.js app pages and apis
- patches
  - patches created from node patch-package
- public
  - all the public content like image and files will be here
- routes
  - app routes
- shared
  - shared components used in multiple components
- types
  - declare global types in .d.ts file
- utils
  - helper functions and api services
- views
  - front end pages
- .env and .env.production file needs to be in the root of the folder 
  - simply just copy paste the content of .env.example and set the values accordingly
