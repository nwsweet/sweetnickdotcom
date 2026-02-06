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
- general ethos
    - simplistic with a bit of interactive fun, playfullness
    - "high quality basics" with some personality

## TODOs
- posts in markdown and thumbnails, stored in a posts directory for now
- organize photos into "series" and toggle between showing all photos or showing only the series on the grid
- photos
    - caret navigation in detail view
    - logic for caption location based on window aspect ratio and photo aspect ratio 
        - (maybe image viewport should just be fixed square, carets on either side, if window is portrait then caption underneath, otherwise on side)


I'll just start drafting out some of the thing I think I want to write about in this first post.

On this website I plan to write a bit about the things I'm interested in. Right now I have been interested in learning about
web decentralization, local first software, data ownership and privacy. All of those things are factored into the design of
the piece of software you're looking at right now.

I like learning and I like teaching. I grew up watching and still do watch videos on youtube all the time of people who
are building something, designing something, or modifying something. Whether it's a house or a car or a bike or a 
motorcycle or a computer, literally anything I find technically interesting. 

I am a software engineer and yes I have made websites or worked on parts of websites before. I've never really designed and implemented one from start to finish product like this before. I was the webmaster for the michigan mens rowing website. That was a fucking horrible website, a disorganized mess of html files I'd manually download with filezilla, copy or modify and then reupload with filezilla. I work on a web dashboard at work, I built an instagram clone, I've implemented REST apis, all that. I've built GUIs before too for automotive embedded porgramming tools in the factory. I'm not coming at this from zero by any means.

This is a bit more of a creative outlet for me though and an oppotrunity to try out some front end web design. And it gives me a place
to do some teaching.

I'll write this for someone who is technically literate, knows web. Maybe like an undergrad or hobbyist.

The front end is built in react. React is a javascript library or framework. It is a way to conditionally render what shows up on the UI fully within the browser (to an extent, as long as it isn't fetching new data).

When you post on instagram you're giving away all of your information and your data to an unknown entity. Allowing them to do whatever the hell they want with it. That means all of your browsing habits, your photos, messages, everything in the digital age. They can fully construct everything you are, you're whole identity from that. Start working to take that back, they already have what they have, start
now to not give them anything more.

This website is hosted completely within my home. It runs on a raspberry pi running ubuntu 24.04 server edition, with completely local storage on an SSD. The backend is running in Node.js and the database is MySQL all hosted as systemd services on the pi. Web traffic is routed through a cloudflare tunnel, that's just to protect my privacy and my network bandwidth.

Obviously anything I put out here is accessible and someone could document it. But they can't track the things I am looking at on this website. You just need one centralized resource (and realistically it could be any other node) to host a link to route to your neighbor's sites as the "hub". Explore more here, there could be the makings of a blockchain thing where you keep a ledger of your friends. 

I want to do this. I want to grow it. It can be a totally homegrown thing, fostering digital community in a new way. I don't really
care about it being financially feasible. I just want to get people thinking this way, and I feel like in some way this is me doing
my part.

Stylistically and user experience wise, I want it to be simple but interesting, "high quality basics". A bit of personality through the cursor and the animations, but pretty minimal otherwise. I value transparency and simplicity in the best products I use. They aren't over engineered, over complicated, their brilliance is in their simplicity and the feeling as a human that gives in appreciating the tool. When you can intuit what the machine is doing while you're using it, it is a much more engaging experience. It's why people like manual transmissions, hydraulic steering, naturally aspirated v8s. You have to create that synthetically a bit with a website, but you can at least make it behave predictably. 

