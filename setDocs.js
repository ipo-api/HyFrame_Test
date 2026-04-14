const fs = require('fs');
fs.readFile('./documentation.json', function (err, data) {
  let documentation = data.toString();
  documentation = JSON.parse(documentation);
  const components = documentation.components;
  components.forEach(element => {
    // delete element.propertiesClass;
    // delete element.methodsClass;
    element.propertiesClass = [];
    element.methodsClass = [];
  })
  var str = JSON.stringify(documentation);
  fs.writeFile('./documentation.json', str, function (err) {
    if (err) {
      console.error(err);
    }
    console.log("----------set docs success------------");
  })
})
