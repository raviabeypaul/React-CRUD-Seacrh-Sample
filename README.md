# Getting Started with Reservation App

This project was written with React (Typescript) with Redux Toolkit for management of store and uses the FakeAPI for demonstration purposes

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\

Open [http://ec2-3-82-108-46.compute-1.amazonaws.com:3000/](http://ec2-3-82-108-46.compute-1.amazonaws.com:3000/) to view it in the browser.

Open in Mobile Phone with IP Address at port 3000

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Implementation`

This has implemented Master Page with Default Data Set.

Functionalities Available in Master Page are

1. Search Link

2. Create 

3. Edit

4. View Reservation

Navigation can be achieved by Clicking in Search Button in landing page [http://ec2-3-82-108-46.compute-1.amazonaws.com:3000/] 
### `Page Routes`

Available Page Routes are

http://ec2-3-82-108-46.compute-1.amazonaws.com:3000/ - `Home Page - Master Page`

http://ec2-3-82-108-46.compute-1.amazonaws.com:3000/search - `Search Page`

Your app is ready to be deployed!

### `Folder Structure`

Folder structure are as Follows

src - `home to all source code`

src/components - `Common Components`

src/hooks - `Common Hooks`

src/pages - `Pages as a whole combination of several components`

src/pages/[components] - `Components ans styling specific to that page is present`

src/service - `Service that connects to Db / External Source`

src/store - `This contains Reducers, Slices, Actions`

src/utils - `This contains common util functions`

src/data - `Default data json to be loaded`

src/dtos - `Dtos that are used accross the application`

src/styles - `Styling across the application`

tests - `Playwright test cases`

Your app is ready to be deployed!

