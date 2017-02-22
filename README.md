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
const needleswap = require('needle-swap');
needleswap({
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

_Needleswap will return itself so you can chain the cache clearing command if need be._

## Clearing the require cache

If you are calling needle-swap constantly between tests, you may need to reload routes via require. If you do this, your modules/files are cached for quicker loading. This can cause testing to go awry. If you encounter this, try clearing the cache using the following functions.

### clearCache([item])

```
needleswap.clearCache("my-module");
needleswap.clearCache(["fs", "async", "my-module"]);
needleswap.clearCache();
```

Since needleswap returns itself, you can easily do this post declaration of modules to inject.

```
needleswap({
	"fs": "some fake functions for fs"
}).clearCache();
```

Calling with an individual or an array of names will get resolved and cleared from the cache.

Calling with nothing passed with call clearEntireCache.

### clearEntireCache()
This will erase ALL cached values in the require, vastly slowly dowing your loading of modules but guaranteeing a fresh read of any module or file you require.


## Cleanup

After you're done, you can call .clear() to clear out all of needleswaps switchouts.

```
needleswap.clear()
```

###The pun in the name is terrible
Point taken.


### Ugh.
;-)
