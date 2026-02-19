# AI Usage Log

### OpenAPI Contract
First of all, I used Gemini to upload the technical test information and asked it to generate an API specification contract using OpenAPI documentation. I had to modify the resulting contract to ensure it met the test requirements and to remove certain fields the AI had hallucinated.


### Testing
Using the integrated Antigravity Agent, I implemented the backend unit tests. For every completed feature, I instructed the agent to write unit tests (for the application layer) that achieved 95% coverage.


### UI design
Using Replit, I explained the functionality of the two views the application required and asked it to implement them in an Angular app. However, it built them using React instead, so I took screenshots of the two generated views and saved them for reference.

Finally, using the Antigravity Agent Manager in 'Planning' mode and referencing the two prototype images, I asked it to generate two components based on those designs to implement each of the views.