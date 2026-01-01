# Overview
I have never built a react website before. This is to document the process of learning how to do that.

## Structure
Build a mental model, App is the overbearing container that contains all the main app structure, reusable components like the sticky cursor, and state management. Each overlay visibility is controlled by App.
### components
Reusable layout / UI components for the entire app

### overlays
The "subpages" that are controlled by React's state manager
As far as these pages know, they are fully contained pages, they don't need to know that they live within an overlay container.