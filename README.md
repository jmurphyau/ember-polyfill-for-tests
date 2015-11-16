# ember-polyfill-for-tests

The purpose of this addon is to place Babel's browser polyfill at the top of your vendor.js file for use during testing.

PhantomJS often hangs or fails for unexpected reasons and it's a real pain to try and troubleshoot whats going on. When you find out its because something like `.bind` is being used you may go down the route of upgrading PhantomJS to version 2 - which is even more of a pain.
