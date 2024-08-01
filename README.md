This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## description of problem

This application is a section of a movie-browsing single page website. 
Make a page that allows a user to view a list of the top 10 most popular movies from each of the last 5 years. Your data source will be The Movie DB (https://developers.themoviedb.org/3). You can use this API key - aa0ea741dcbdabdf6fd9953b60e629cf

There should be a dropdown with the different years. Selecting the dropdown should refresh the list of movie thumbnails. There should also be a dropdown to change the sort order

Clicking on a movie thumbnail should refresh the top detail section with additional movie information. If the movie has videos, a video play button should appear. Clicking that button should play that video.
All year, movie, and video "pages" should have unique url paths.

In addition to the functional javascript, please pay attention to making any animations/transitions look smooth and the aesthetics beautiful. Bonus points for improving on the 'wireframe' stylistically and basic responsiveness.
