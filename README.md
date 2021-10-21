## Assessment Notes

First of all, thank you for your patience and the opportunity to work on this assessment. It was a great learning experience that I enjoyed having. For me it was quite a challenge and I had a lot of blockers in the way.

I had never used TypeScript and GraphQL. Most of my blockers were TypeScript errors that I could'n solve and I had to figure out a walk around. GraphQL is so different than restAPI so it took me some time to understand it.

So my general solution for this project was to do one request on the first render to get the data from the last 30 min and save it to the store. Then use the response from the subscription requests to modify the last 30 min data by pushing the newest metric values and removing the oldest. This way we minimize the number of requests to the server and improve the app the performance.

I did try to implement the above solution but because of the TypeScript errors that I just't couldn't fix I had to do it in a not very efficient way. So I used the pollInterval to fetch data every 10 sec. That rerenders the whole chart at each request and is not desired behavior.

Having said that, I did learned a lot and will continue to work on getting better.

Thank you for you time. Hope to hear from you soon!

Ana

## Create React App Visualization

This assessment was bespoke handcrafted for Ana Laris.

Read more about this assessment [here](https://react.eogresources.com)

## Getting Started 
```sh
git clone https://github.com/anatulea/EOG-Assessment.git
cd EOG-Assessment 
yarn install
yarn start
```
