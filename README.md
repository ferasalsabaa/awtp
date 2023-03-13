
# Interactive Display Ads for HbbTV

This project aims to enable the easy insertion of interactive display ads into the HbbTV platform, allowing users to interact directly with the ads. By providing a simple and user-friendly interface for advertisers, the project aims to improve the engagement and effectiveness of ads on HbbTV-enabled devices. Through this project, advertisers have the ability to create and serve interactive ads that are more engaging and targeted to viewers, ultimately improving the user experience and increasing revenue for content providers. 


## Components

This project consists of 3 different components.

- Display Ad Editor
    - With the editor, users can create individual advertisements. The user has the possibility to create templates of advertisements and then use these templates to generate instances of the templates, which will be played out in the HbbTV App later.
- Web server
    - On the one hand, the web server is used to store the above-mentioned templates so that users can use their templates later on again.On the other hand, this web server also stores the instances of the ads and plays them out as a VAST response to the HbbTV app.
- HbbTV App
    - The HbbTV app requests advertisements from the web server at periodic intervals. If the server responds with an advertisement, the advertisement is displayed in the HbbTV app for a specific time. The user of the HbbTV app has the option of interacting with these advertisements. In our case, as soon as the user presses the red button on the remote control, a promo code is displayed on the banner that the user can use in the advertiser's store to get a discount on an order. 
## Installation

Setting up the Display-Ad Editor

```bash
  Install Node.js [see here](https://nodejs.org/en/download/)
```
    
Setting up the web server

```bash
    Install Python [see here](https://www.python.org/downloads/)
    After installing python, open your Terminal and run the following commands:
    - pip install Flask
    - pip install flask-cors
```

Setting up the HbbTV App

```bash
    Install the HybridTvViewer Plugin \for your browser [see here](https://github.com/karl-rousseau/HybridTvViewer)
```