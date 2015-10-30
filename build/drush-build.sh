#!/usr/bin/env bash

if [ -z "$1" ];
then
  echo "You must supply an environment argument. See README for details.";
  exit 1
fi

env=$1
shift

build_path=$(dirname "$0")
env_path="$build_path/$env"

# Pass all arguments to drush
while [ $# -gt 0 ]; do
  drush_flags="$drush_flags $1"
  shift
done
drush="drush $drush_flags"

if [ -e "$env_path/build.sh" ]
then
  echo "Running $env build"
  source "$env_path/build.sh"
fi
echo "Disabling all modules we do not need on any environment.";
$drush dis $(cat $build_path/mods_purge | tr '\n' ' ') -y
echo "Uninstalling modules we do not need on any environment.";
$drush pm-uninstall $(cat $build_path/mods_purge | tr '\n' ' ') -y
echo "Enabling modules we need on every environment.";
$drush en $(cat $build_path/mods_enabled | tr '\n' ' ') -y
echo "Clearing caches.";
$drush cc all -y
echo "Reverting all features.";
$drush fra -y
echo "Running any updates.";
$drush updb -y
echo "Setting the theme default.";
$drush scr $build_path/scripts/default_set_theme.php
echo "Clearing caches one last time.";
$drush cc all -y
