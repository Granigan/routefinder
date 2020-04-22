# Edsger Routefinder 
An entry to [Solidabis Code Challenge](https://koodihaaste.solidabis.com/).

### [Test routefinder at Heroku](https://edsger-routefinder.herokuapp.com/).

## Technology
- The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [Material-UI](https://material-ui.com/) provided some rudimentary styling.

## Design Philosophy
- Focus on providing only the necessary functionality to the user. By cutting away any excess (e.g. typing the station), usability improves and risk of misunderstanding the functionality is reduced.
- Take advantage of the limited scope to improve usability. Downside is reduced scaleability.

## Algorithm
[Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) is used to find the shortest route between selected stations.

## Concerns
- Lack of colorblind mode potentially makes lines (esp. red and green) indistinguishable
- Crude appearance
- Not designed to scale: Should the number of stations grow, it is no longer feasible to have a button for each one.

## Development
Clone the repository with

```git clone git@github.com:Granigan/routefinder.git```

Run in localhost:3000 with

```npm start```
