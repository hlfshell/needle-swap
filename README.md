#needle-swap
needle-swap is a dead simple unopinionated method to perform dependency injection into loaded files for testing.

## Install
```
npm install --save-dev needle-swap
```

## Example usage
Let's say that I need to replace the *fs* module in a test I am about to run in mocha (this is testing framework agnostic, btw).

In your target test file, you use fs as such:

*superImportant.js:*
```
const fs = require('fs');

var mySuperImportantFunction = (chosenFile)=>{
	return fs.readFileSync(chosenFile);
} 

module.exports = mySuperImportantFunction
```

then, in your test file, you can make use needle-swap to override *fs* so it returns your test data, and not access a remote file.

```
require('needle-swap')({
	"fs": {
		readFileSync: (filename)=>{
			if(filename == "test") return "Test data";
			else return "No good!"
		}
	}
});

it("should read the file by the path sent", ()=>{
	mySuperImportantFunction = require('./superImportant.js');

	expect(mySuperImportantFunction("test")).to.be.equal("Test data");
});
```



###The pun in the name is terrible
Point taken.


### Ugh.
;-)