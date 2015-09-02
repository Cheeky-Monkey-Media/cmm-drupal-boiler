<?php

/**
 * debug switch for debug mode
 */
function cmm_is_dev_mode () {
  if ( preg_match('/dev$/', $_SERVER['HTTP_HOST']) ) {
    return true;
  } else {
    return false;
  }
}


/**
 * Path to theme.
 */
function cmm_path_to_theme() {
  return drupal_get_path('theme', 'cmmdrupalboiler');
}


/**
 * Helper functions for Require JS include
 */
function cmm_rjs_rev() {
  return cmm_path_to_theme() ? time() : hashDirectory( drupal_realpath(cmm_path_to_theme() . '/js/src') );
}
function cmm_path_to_rjs_main() {
  return '/' . cmm_path_to_theme() . (cmm_is_dev_mode() ? '/js/src' : '/js/dist') . '/main.js?rev=' . cmm_rjs_rev();
}
function cmm_path_to_rjs() {
  return '/' . cmm_path_to_theme() . (cmm_is_dev_mode() ? '/js/src' : '/js/dist') . '/vendor/require.js?rev=' . cmm_rjs_rev();
}


/**
 * Generate an MD5 hash string from the contents of a directory.
 *
 * https://jonlabelle.com/snippets/raw/422/generate-md5-hash-for-directory.php
 * 
 * @param string $directory
 * @return boolean|string
 */
function hashDirectory($directory) {
  if (! is_dir($directory)) {
      return false;
  }

  $files = array();
  $dir = dir($directory);

  while (false !== ($file = $dir->read())) {
    if ($file != '.' and $file != '..') {
      if (is_dir($directory . '/' . $file)) {
        $files[] = hashDirectory($directory . '/' . $file);
      } else {
        $files[] = md5_file($directory . '/' . $file);
      }
    }
  }

  $dir->close();

  return md5(implode('', $files));
}
