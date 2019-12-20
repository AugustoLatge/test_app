const generateRGBstring = length => {
  const randomNumber0_255 = () => {
    return Math.floor(Math.random() * 256);
  };

  var RGBstring = [];

  var red = 0;
  var green = 0;
  var blue = 0;

  for (var i = 0; i < length; i++) {
    // Colors picked from this site:
    // http://ksrowell.com/blog-visualizing-data/2012/02/02/optimal-colors-for-graphs/

    switch (i) {
      case 0:
        red = 57;
        green = 106;
        blue = 177;
        break;
      case 1:
        red = 218;
        green = 124;
        blue = 48;
        break;
      case 2:
        red = 62;
        green = 150;
        blue = 81;
        break;
      case 3:
        red = 204;
        green = 37;
        blue = 41;
        break;
      case 4:
        red = 83;
        green = 81;
        blue = 84;
        break;
      case 5:
        red = 107;
        green = 76;
        blue = 154;
        break;
      case 6:
        red = 146;
        green = 36;
        blue = 40;
        break;
      case 7:
        red = 148;
        green = 139;
        blue = 61;
        break;
      default:
        var newColor = false;

        // Check for existing colors
        while (!newColor) {
          red = randomNumber0_255();
          green = randomNumber0_255();
          blue = randomNumber0_255();
          if (
            !RGBstring.find(color => {
              return color === "rgb(" + red + "," + green + "," + blue + ")";
            })
          ) {
            newColor = true;
          }
        }
    }

    RGBstring.push("rgb(" + red + "," + green + "," + blue + ")");
  }

  return RGBstring;
};

export default generateRGBstring;