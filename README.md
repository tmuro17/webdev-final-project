# Short Final

Short Final is a game for aviation enthusiasts who are just looking 
to have some fun, as well as GA pilots who want to get more familiar 
with their regional airports. This is a game for users to test how 
well theyc an identify airports from the air and match them with 
their ICAO code.

Video demo: https://www.youtube.com/watch?v=sBYhECTf8hA

### Attributions

The functionality of providing the socket to different components 
was used from the following blog post:

https://medium.com/software-fast-radius/wiring-up-phoenix-channels-with-react-hooks-921aac29f0ff

We didn't want to use a global socket.js file and wanteds abetter 
to provide the socket to
specific components in the application, but not all.

This code can be found in:

- frontend/src/utils/useChannel.js
- frontend/src/utils/PhoenixSocketContext.js