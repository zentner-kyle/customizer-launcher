# Customizer Lanucher
This is launcher app for Customizer

# What it does
The Customizer https://github.com/fxos/customizer is not very discoverable right now, so to make it more visible, we build a launcher app for it. This will appear on the Homescreen as a “Customizer” app.

Want to hack? Read the [documentation](https://github.com/fxos/docs/wiki/Development-Setup).

# Special Build Instructions

1. Checkout ```fxos-customizer-launcher``` repo:

        git clone 'git@github.com:fxos/customizer-launcher.git'

2. If you haven't already, install Bower and Gulp (preferably globally):

        npm install -g bower gulp

3. Install the dependencies:

        npm install && bower install

4. Run Gulp to start the file watchers for the build system:

        gulp

5. Flash ```dist/app``` onto your device using Firefox's WebIDE.
