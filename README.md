# Simple Regression

This sample runs a simple regression and displays a plot on the screen. It uses 
the mtcars dataset and allows the user to choose the Y and X variables for the 
regression.

## Quick Start

1. Clone the repository:

   ```
   $ git clone https://github.com/swells/simple-regression.git
   ```
2. Set the DeployR server endpoint location if not running at localhost in the 
`./assets/scripts/controllers/main.js` file. [See here](#configuration).

3. Copy the `simple-regression/` directory over to your webserver.

## Configuration

By default, the configuration assumes an instance of the DeployR server is 
running on **localhost**. If your instance of DeployR is running at some other 
IP address then please update the endpoint host property as appropriate.

In `./assets/scripts/controllers/main.js`:

```
deployr.configure({ host: 'http://OTHER_DEPLOYR_HOST:7300', cors: true })
```
