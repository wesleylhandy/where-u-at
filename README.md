# where-u-at - A React, Redux, Mongo, Express, Node Application for connecting with other twitter users in public

Wanna meetup with Twitter friends in public to grab :coffee:, do some coding :computer:, or just chow down :fork_and_knife:?

This app allows users to search for local coffee bars that have free wifi and offer a happy hour from the Yelp Fusion API. When a user clicks on the going button, they are redirected to log-in via Twitter and add their name to the going list.

The list resets every day, so you can do something cool and different every night.

## Technologies Used

* YELP FUSION API
* GOOGLE MAPS API - users can navigate to the address upon click
* TWITTER LOGIN - via `react-twitter-auth` npm package
* MongoDB
* Node.js
* React.js
* Redux - state management and persistence

## Future Development

1. Allow users to see if any of their shared twitter followers (that is followers who also follow back) have set themselves to going to a location.
2. Allow users to add a particular location to their favorites, or alternative, remove from favorites
3. Allow users to rate Yelp Businesses on the App directly
4. Add other Social Logins - Facebook, Google
5. Allow users to change category of location search - coffee, dinner, drinks, etc.

## Challenges and Lessons Learned

1. This project forced me to learn redux for state management. React handles state well so long as the user doesn't navigate away from the page. Since Twitter Login requires a redirect, I needed to be able to persist state for when the user returned to the application. A combination of Redux and LocalStorage accomplishes this effect.
2. Passport.js and the `passport-twitter` Strategy gave me fits using together with React, particularly in the dev environment. I could not for the life of me get the passport authorization process to complete. I could see that passport would get both the oauth token and token secret, but since the process requires user interaction, and using `create-react-app` requires two separate servers, I could not debug the CORS errors I was receiving. However, after searching for weeks for a solution on my own, I came across a helpful article by Ivan Vasiljevic - [How to do Twitter authentication with React and RESTful API](https://medium.com/@robince885/how-to-do-twitter-authentication-with-react-and-restful-api-e525f30c62bb). This solved the problems I was experiencing completely.

### PRIVACY AND TERMS

This app does not share any information related to a user other than what is publicly accessible via their regular twitter accounts. Should a user decide to use this application, when they choose to add their name to a list of people going to a certain place of business, they are consenting to give away data related to their current location. However, no information what-so-ever is shared with any third parties.