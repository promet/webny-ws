WebNY Holistic Testing Workshop
===============================

requirements
------------
* [virtualBox](https://www.virtualbox.org/wiki/Downloads) >= 1.3
* [vagrant](http://downloads.vagrantup.com/) >= 1.2.0 (1.4.x recommended)

Building
---
* You need to edit your machine's local host file Add the entry 10.33.36.11 webny.dev
* After cloning this repository, download this file to the top level of the project directory "webny-ws" : https://s3-us-west-2.amazonaws.com/webny/files.tar.gz
* Run `vagrant up` to build the environment.
* ssh in with `vagrant ssh`
* Make sure the web server and mysql server are running:
* * `sudo service mysql restart`
* * `sudo service apache2 restart`
* Navigate to `/var/www/sites/webny.dev`.
* Execute this command to unpack the downloaded tarball:  `tar -xvzf files.tar.gz`
* Go to the drupal root directory:  `cd /var/www/sites/webny.dev/www`
* Run the command `drush cc all`
* Party!

Items to Note
-------------
* The mysql root password on this VM is `pass`
* The vagrant user has full sudo rights
* The database name, database username and database password are:  default / default / default

Use
---

The build script `drush-build.sh` takes an environment argument which can be
one of the following:

* local
* dev
* prod

additional environments can be added by simply adding a directory for it with
a build.sh in it.

The build script is executed from the drupal root directory (/var/www/sites/webny.dev/www) as follows:  `../build/drush-build.sh local` (for a local vm build)

Global
------
For all environments, the build script will:

* enable and purge all modules within the build root (`mods_enable` and `mods_purge`) on every build for every environment.
* Revert all features (`drush fra`), run update hooks (`drush updb`), and clear caches.

Local
-----
This script is intended to create a local installation with a copy of the database and files. Use `mods_enable` in the environment directory to enable only modules needed for local development.

If using this repository as template for slaughtering an existing site, be sure to replace the following lines of the local build script:

    echo "Installing database.";
    $drush si -y --account-pass='drupaladm1n'

with these lines in order import the existing database snapshot:

    echo "Dropping current database";
    $drush sql-drop -y
    echo "Re-installing webny.dev database";
    $drush sqlc < $env_path/ref_db/webnyDB.sql # replace database file name accordingly.
    
Additionally, while slaughtering a site, it can be useful to regenerate the mods_enabled list:

    drush pm-list --pipe --status=enabled --type=module | sort > build/mods_enabled

Dev
-----
This script is intended to run on a development or staging environment. Use `mods_purge` in the environment directory to disable modules not needed on development or staging.

Prod
-----
This script is intended to run on a production environment. Use `mods_purge` in the environment directory to disable modules not needed on development or staging.
