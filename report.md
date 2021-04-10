

# Webdev Final Project Report

Short Final is an aviation based game created by Tanner Muro and 
Trevor Stenson.  It is hosted at short-final.tmuro17.xyz and the code 
can be found at  https://github.com/tmuro17/webdev-final-project.git. 
At the time of writing, the application is hosted and deployed 
properly and is functioning as expected.  There was a 3 hour window of
time in which the external api was no longer available from the 
provider due to some sort of service outage. Trevor initially focused
on frontend work, his area of expertise, while Tanner initially 
focused on backend work.  However, as we got towards the end of the
assignment, we each started taking tickets based on what we had spent
the most time thinking about.  For example, Tanner worked on the
frontend listing components for statistics due to his existing 
familiarity with the backend components of the statistics.

## Main App Section

Short Final is designed to be a game for aviation enthusiasts and 
general aviation pilots to get better at identifying airports and 
learning their ICAO codes. ICAO codes are international airport 
identifiers that are used to globally identify airports uniquely and 
are created by the International Civil Aviation Organization. There 
are two primary functions of this application. The primary feature is 
the game where users are presented with a top down satellite view of 
airports without identifying information, and are tasked with choosing
the correct ICAO code associated with that airport. When starting a 
game, you can choose to either play the regional mode, or a game based
off of the current most difficult airports to guess in our database. 
The regional mode uses the users location and creates a game with a 
set of airports within a radius of 500km from the user. The set of 
airports used for the challenge mode is based off of the real time 
statistics of the twenty five most difficult airports for all users 
to guess. After playing any amount of games you’d like, you are able 
to view your statistics in your profile page which you can see in 
both a tabular format, as well as a map where you can see the 
airports you’ve guessed and your win/loss ratio. When viewing 
statistics and details for a specific airport, you are able to 
add comments to discuss with others, certain airfields.  
These discussions may be just users trying to figure out why it is 
so hard to distinguish, or perhaps sharing hints for how better to 
identify it from the air.  

## Requirements

Our application is hosted on our Linode VPS at 
short-final.tmuro17.xyz. For users and session management, 
we make use of Phoenix.Token for JWT tokens authenticating 
important and protected actions. For our database schema, 
the primary tables we use are as follows:

* Users: Stores the users basic info like name, email, and password 
  hash
* Airports: Represents information about an airport like name, icao, 
  and location
* Guesses: Represents a user’s guess regarding a specific airport and 
  the outcome
* Comments: These are simply comments tied to a user and an airport

In order to gather the information regarding airports given a user’s 
location, as well as finding out more information about an airport 
besides its name, we make use of the Amadeus Utilities Developer API. 
This is a 3rd party API that requires token authentication to make 
requests, which we store in an elixir Agent that manages all request 
authentication. This API is primarily used to gather all airports in 
a specific radius given a user’s location, and to gather detailed 
regarding airports to import them to our database. The entire game 
functionality uses phoenix channels for handling the workflow of 
sending guesses, receiving options, and handling the start and end 
of games. There is also a widget that floats in the bottom right of 
the application, and uses Phoenix channels to display live actions 
taken by other users. For example, if you are playing the game and 
another user is as well, you will be able to see what airport they 
were trying to guess and the outcome.see what other users are 
active and how they are doing.

For our application, we consider the ‘neat’/’complex’ functionality 
to be the usage of the user’s geolocation to generate a custom game 
for the region around them, and populate the game map with the proper 
styling and information to display the top-down view of the airport 
without any identifying information. We wanted to focus our effort 
primarily on this regional game mode, as it makes sense for people 
who want to test their knowledge about the area around them.  This 
is a type of gameplay that we have not seen offered in any way 
approaching the level that we have created.

## Challenges

During the creation of the application, we ran into a couple of 
major challenges.  Our largest challenge was also our most recent, 
which incidentally was resolved through no actions that we performed, 
besides perhaps reporting the problem to the support team.  As we 
were about to record our video for the project, the original 
game mode for our application entirely 
failed when the external api that we use started to respond with 503 
statuses to each request that we sent.  This was a major issue as we 
would have a very limited time to find another API that has all of 
the information that we required, as it was already a significant 
challenge for us to find the API that we are currently using.  
Thankfully, after only a few hours of downtime, the API endpoint 
was repaired and our application returned to its original 
functionality.  Had this not occurred, figuring out a path forward 
on such short notice would have been nearly impossible or of 
catastrophic difficulty.  Prior to this error, the main challenge 
that we had missed was during the initial deployment of the 
application onto our VPS.  While testing our code locally, the 
location api provided us with no issues, and then after the 
initial deployment, the entire game froze while 
trying to get location information. After some testing and 
monitoring in the developer console, we were able to determine 
that for the sake of security, the browsers that we use do not 
allow access to your location data unless the site that is making 
the request has a TLS certificate enabled.  With some back and 
forth through our deployment pipeline, and some fun with Certbot, 
we were able to enable TLS certificates for both our frontend and 
backend applications allowing them to communicate securely both 
between themselves, and to our end users.

As alluded to briefly earlier in the report, to make our lives 
easier during the development and productionalization process, 
we have a TeamCity CI/CD instance running on one of our VPS’s. 
During the beginning of the process, we went through the hassle 
of turning all of the steps for deployment into build commands 
and scripts that can be run consistently and automatically when 
new commits are pushed to master.  This upfront cost has saved 
us tons of time during the rest of the project, except when fixing 
minor problems, and has lowered our pushed to deployed time to 
about 5 minutes and 15 seconds, with no human interactions. As of 
the time of writing, our CI system has deployed 46 builds for us 
onto our server, allowing for easy iteration and testing on the 
final server. This lowered our barrier to testing and design 
changes, as we could always rollback and simply have the CI pipeline 
redeploy. It gave us a sense of confidence and freedom that would 
not have been possible otherwise, as the time cost of repeatedly 
manually deploying to the server when we wanted to test key changes, 
would have been prohibitive and used time that was required to work 
on other assignments or tasks that had to be accomplished.
