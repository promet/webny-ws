#! /usr/bin/env bash
echo "Installing database.";
$drush si -y --account-pass='drupaladm1n'
echo "Enabling modules needed for local development.";
$drush en $(cat $env_path/mods_enabled | tr '\n' ' ') -y -v
echo "Clearing caches.";
$drush cc all -y
echo "Disabling css and js caching.";
$drush vset -y preprocess_css 0
$drush vset -y preprocess_js 0
