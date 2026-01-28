# Overview
I have never built a react website before. This is to document the process of learning how to do that.
This is from the perspective of a general backend and embedded software engineer who has done some pure html and css in college.

## Structure
Build a mental model, App is the overbearing container that contains all the main app structure, reusable components like the sticky cursor, and state management. Each overlay visibility is controlled by App.
React is built of UI components, each a javascript function rendered conditionally. It works really well to conmpartmentalize structure, logic and functionality of subsections
of the website
I'm following a state-driven modal architecture. (What are some others?)
Reusable components consist of things like the overlay (modal), the navButtons, toggle switches, etc.

### components
Reusable layout / UI components for the entire app

### overlays
The "subpages" that are controlled by React's state manager
As far as these pages know, they are fully contained components, they don't need to know that they live within an overlay container.
They should dynamically resize based on the size of the content they contain, meaning when you click a post for example, you should get a scrollable document
sized window, that grew from the window showing the list of posts

Posts and photots both need scrollable content, I want it to be stylistically simple and intuitive

## App.jsx
This is a react-ism. It's the main overbearing component tracks the state, renders the main page

## Photos.jsx
There are three distinct photo modes:
- grid view: PhotoGrid.jsx - knows nothing about overlays, full screen, caption, etc
- detail view: PhotoDetail.jsx - this is where caption, metadata, and expanded photo will be seen, animated from the photo cell that was clicked on
- fullscreen view: PhotoLightbox.jsx - in the webdev world this kind of full screen gallery is called a lightbox, you should be able to minimize out of any photo back to its detail view
Each of these should be its own component, enabling animation between them
The main photos component handles state management and photo loading(just like App does for the whole page)
How does thumbnail loading and full res photo loading work? 



## some thoughts to be organized later
- read docs, its better than asking chatgpt to refine over and over, and its overly confident, glazing tone is annoying
- good design patterns
    - useState to track clicks, render client side etc
    - organize your code into directories, make it logical and maintainable

## TODOs
- posts in markdown and thumbnails, stored in a posts directory for now
- organize photos into "series" and toggle between showing all photos or showing only the series on the grid
- photos
    - caret navigation in detail view
    - logic for caption location based on window aspect ratio and photo aspect ratio 
        - (maybe image viewport should just be fixed square, carets on either side, if window is portrait then caption underneath, otherwise on side)
