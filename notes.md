# Overview
I have never built a react website before. This is to document the process of learning how to do that.

## Structure
Build a mental model, App is the overbearing container that contains all the main app structure, reusable components like the sticky cursor, and state management. Each overlay visibility is controlled by App.
This is a state-driven modal architecture
### components
Reusable layout / UI components for the entire app

### overlays
The "subpages" that are controlled by React's state manager
As far as these pages know, they are fully contained components, they don't need to know that they live within an overlay container.
They should dynamically resize based on the size of the content they contain, meaning when you click a post for example, you should get a scrollable document
sized window, that grew from the window showing the list of posts

## App.jsx

## some thoughts to be organized later
- ability to compartmentalize logic into respective components is good
- read docs, its better than asking chatgpt to refine over and over, and its overly confident, glazing tone is annoying
- good design patterns
    - useState to track clicks, render client side etc

## TODOs
- consistent, simplistic styling across overlays (including scrolling)
- photo thumbnail loading
- posts in markdown and thumbnails, stored in a posts directory for now
- organize photos into "series" and toggle between showing all photos or showing only the series on the grid
- expanded photo view
