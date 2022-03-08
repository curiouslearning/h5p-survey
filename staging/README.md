# H5P Staging Environment

A mock WordPress production environment for testing .h5p files. Production environment restrictions are enforced, such as version checking.
## Requirements

- Docker (Engine ^v.20.10.10)

Installation and Startup
=====

Setting Up the Container
----

In your terminal execute the following:

`cd staging`

`docker compose up -d`

WordPress Initial Setup
----

The WordPress environment is preconfigured with an admin account and the H5P  plugin installed. To sign in, navigate to [localhost:80/wp-login.php]() and sign in with username `dev` and password `readingisawesome`.

***NB***: on first startup, it may take some time to install WordPress before the site is active. Once you can successfully sign-in, navigate to the `Admin/Plugins` menu, scroll down to the H5P plugin, and click `Activate`

Uploading a new build
----

1. On the admin sidebar, scroll down to `H5P Content> Add New`

  a. on First Time Setup, you will be asked to opt-in to the H5P Library Terms and Conditions. Click "I Agree, Take Me To The Hub" to continue
2. in the H5P window, click the "Upload" radio Button
3. Click "Upload A File" and select the file from your Finder/File Explorer
4. Click "Use File"
5. Edit the content in the content fields if necessary, and click "Create" when you are finished.

***NB***: If you have previously uploaded a build of the same library, you _must_ increment the Major, Minor, or Patch number in `library.json` or WordPress will _not_ update your code!

Shutdown
====
From the Docker Desktop window, press the Stop or Remove buttons, or execute the following in your terminal

`cd oer-h5p-dev/staging`

`docker compose down`
