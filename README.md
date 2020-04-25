# Edsger Routefinder 
An entry to [Solidabis Code Challenge](https://koodihaaste.solidabis.com/).

### [Routefinder is available at Heroku](https://edsger-routefinder.herokuapp.com/).

## Technology
- The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [Material-UI](https://material-ui.com/) provided some rudimentary styling.
- Development was done on Visual Studio Code, on MacOS.

## Design Philosophy
- Focus on providing only the necessary functionality to the user. By cutting away any excess (e.g. typing the station), goal is to improve usability and reduce the risk of misunderstanding the functionality.
- Take advantage of the limited scope to improve usability. Downside is reduced scaleability.

## Algorithm
[Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) is used to find the shortest route between selected stations.

## To Do 23.04.2020
- [ ] Align route visualisation
- [x] Make mobile friendly
- [ ] Add reversal button to swap origin and destination

## Concerns
- Does implementation match the spec. In particular, do bus lines go both ways (spec doesn't mention they would, nor do the graphics indicate this, but if they don't, a host of destinations cannot be reached at all. Thus, an assumption was made that bus lines go both ways.)
- Lack of colorblind mode potentially makes lines (esp. red and green) indistinguishable
- Crude appearance
- Not designed to scale: Should the number of stations grow, it is no longer feasible to have a button for each one.
- Code architecture is not designed for scaling up. Should the project expand, file and folder system needs to be more structured.

## Development
Clone the repository with

```git clone git@github.com:Granigan/routefinder.git```

Run in localhost:3000 with

```npm start```
