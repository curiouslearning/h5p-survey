# Drupal H5P Dev Server
As a development server we run a Drupal 7 server (Drupal 8 does not support H5P Development mode yet) that we setup using docker.

## Prerequisites
* [Docker](https://www.docker.com/get-started)

## Good to have
* [h5p-cli](https://h5p.org/h5p-cli-guide) to manage and install extra h5p packages needed

## Install
To install and run the server run the following command from inside `dev/`
* `docker compose up -d`

To shutdown the dev server just run `docker compose down` from the same folder.

After installing and starting the server open `http://localhost:7007` and setup your Drupal installation. Use the following for setting up the database:
* Database type: `postgres`
* Database name: `postgres`
* Database username: `postgres`
* Database password: `devserver`
* Database host (under Advanced Options): `postgres`

After finishing the Drupal installation is finished go to `http://localhost:8090/#overlay=admin/modules/install` and install the H5P module. One H5P module from april 2021 is available at .
* Install module via url: https://ftp.drupal.org/files/projects/h5p-7.x-1.49.tar.gz
* After installation click `Enable newly added modules`
* Scroll to the "Other" modules and enable H5P and H5P Editor.
* Click `Add content` at the top left of the screen and then select `Interactive Content` and make sure the H5P Hub is installed properly.
* Try creating some H5P content by installing a content type and adding some content, if everything works fine proceed to the **Development** section.

Consult the [official H5P Guide](https://h5p.org/documentation/setup/drupal7) on how to install H5P module for Drupal is there are any doubts about how to do it.

## Development
Normally when adding new H5P content types the content type has to be uploaded (with an updated major, minor or patch version) via the H5P Hub. This is very time-consuming when developing though so to simplify the development process we want to enable H5P development mode (only available on Drupal 7 server). To do this press `Configuration` at the top and then click `H5P` located under the `System` bar. In here check the two checkboxes for `Enable H5P development mode` and `Enable library development directory (For programmers only)` this will allow us to live update the H5P libraries installed via our development folder (`repos/`).

Finally we need to **overwrite the default development folder with our repos/ folder**. To do this we need to open the CLI for our server via Docker. On Docker Desktop simply click the running instance of the server to expand it then click the CLI icon.

![screenshot from Drupal showing how to open the CLI](readme-imgs/drupal-cli.PNG)

When you have opened the CLI run the following commands:
* `cd /var/www/html/sites/default/files/h5p`
* `mv development old-dev`
* `ln -s /mnt/h5pdev/ development`

Now if you run `ls -a` you should see a new `development/` and one called `old-dev`. That is it! Your Drupal server is now ready to be used for H5P development. To get started with developing a H5P package first [read the development guide](https://h5p.org/developers) on the H5P website. Then start looking at the README in [../packages/README.md](../packages/Demo/README.md).
