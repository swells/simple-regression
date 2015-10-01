# Simple Regression

This sample runs a simple regression and displays a plot on the screen. It uses 
the mtcars dataset and allows the user to choose the Y and X variables for the 
regression.

```R
# in case the ReadCSV.R script was not run, define the default dataset here 
if (!exists('datasets')) {
    require(datasets)
    dataset <-  mtcars
    attach(dataset)
}
#get input data and labels - default data from readCSV.R is the cars dataset, 
#so here, use two variables from cars
require(deployrUtils)
deployrInput('{"name":"input_y","default":"mpg","render":"character","label":"Specify Y"}')
deployrInput('{"name":"input_x","default":"cyl","render":"character","label":"Specify X"}')
y<-get(paste(input_y))
ylabel<-paste(input_y)
x<-get(paste(input_x))
xlabel<-paste(input_x)

#run Regression
lreg<-lm(y~x)

#create title with the equation
title<-paste(ylabel, "=", paste(lreg$coeff[1]), "+", paste(lreg$coeff[2]), "*", xlabel)

#plot the points and the regression line
#notice that we don't have to write this plot to a file, a plot file will automatically
#be generated for us if none is specified.
plot(x,y, main=title, col.main="#ff6633", xlab=xlabel, ylab=ylabel, pch=19, col="#0099cc", bg="transparent")
abline(lreg, col="#ff6633")
```

## Quick Start

1. Clone the repository:

   ```
   $ git clone https://github.com/swells/simple-regression.git
   ```
2. Set the DeployR server endpoint location if not running at localhost in the 
`./assets/scripts/controllers/main.js` file. 
[See here](#configuration).

3. Copy the `simple-regression/` directory over to your webserver.

## Configuration

By default, the configuration assumes an instance of the DeployR server is 
running on **localhost**. If your instance of DeployR is running at some other 
IP address then please update the endpoint host property as appropriate.

In `./assets/scripts/controllers/main.js`:

```
deployr.configure({ host: 'http://OTHER_DEPLOYR_HOST:7300', cors: true })
```
