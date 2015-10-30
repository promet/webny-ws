#! /usr/bin/env bash
echo "Disabling modules we do not need on dev or staging.";
$drush dis $(cat $env_path/mods_purge | tr '\n' ' ') -y
echo "Uninstalling modules we do not need on dev or staging.";
$drush pm-uninstall $(cat $env_path/mods_purge | tr '\n' ' ') -y
echo "Enabling css and js caching.";
$drush vset -y preprocess_css 1 &&
$drush vset -y preprocess_js 1
echo "Enabling all caching.";
$drush vset cache 1 &&
$drush vset block_cache 1 &&
$drush vset page_compression 1
