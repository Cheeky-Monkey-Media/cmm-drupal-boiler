<?php

include ('theme-functions.php');

/**
 * Implements template_preprocess_html().
 */
function cmmdrupalboiler_preprocess_html(&$variables) {
}

/**
 * Implements template_preprocess_page.
 *
 * Add convenience variables and template suggestions.
 */
function cmmdrupalboiler_preprocess_page(&$variables) {
  // Add page--node_type.tpl.php suggestions.
  if (!empty($variables['node'])) {
    $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->type;
  }

  $variables['logo_img'] = '';
  if (!empty($variables['logo'])) {
    $variables['logo_img'] = theme('image', array(
      'path' => $variables['logo'],
      'alt' => strip_tags($variables['site_name']) . ' ' . t('logo'),
      'title' => strip_tags($variables['site_name']) . ' ' . t('Home'),
      'attributes' => array(
        'class' => array('logo'),
      ),
    ));
  }

  $variables['linked_logo'] = '';
  if (!empty($variables['logo_img'])) {
    $variables['linked_logo'] = l($variables['logo_img'], '<front>', array(
      'attributes' => array(
        'rel' => 'home',
        'title' => strip_tags($variables['site_name']) . ' ' . t('Home'),
      ),
      'html' => TRUE,
    ));
  }

  $variables['linked_site_name'] = '';
  if (!empty($variables['site_name'])) {
    $variables['linked_site_name'] = l($variables['site_name'], '<front>', array(
      'attributes' => array(
        'rel' => 'home',
        'title' => strip_tags($variables['site_name']) . ' ' . t('Home'),
      ),
      'html' => TRUE,
    ));
  }

  // Top bar.
  if ($variables['top_bar'] = theme_get_setting('zurb_foundation_top_bar_enable')) {
    $top_bar_classes = array();

    if (theme_get_setting('zurb_foundation_top_bar_grid')) {
      $top_bar_classes[] = 'contain-to-grid';
    }

    if (theme_get_setting('zurb_foundation_top_bar_sticky')) {
      $top_bar_classes[] = 'sticky';
    }

    if ($variables['top_bar'] == 2) {
      $top_bar_classes[] = 'show-for-small';
    }

    $variables['top_bar_classes'] = implode(' ', $top_bar_classes);
    $variables['top_bar_menu_text'] = check_plain(theme_get_setting('zurb_foundation_top_bar_menu_text'));

    $top_bar_options = array();

    if (!theme_get_setting('zurb_foundation_top_bar_custom_back_text')) {
      $top_bar_options[] = 'custom_back_text:false';
    }

    if ($back_text = check_plain(theme_get_setting('zurb_foundation_top_bar_back_text'))) {
      if ($back_text !== 'Back') {
        $top_bar_options[] = "back_text:'{$back_text}'";
      }
    }

    if (!theme_get_setting('zurb_foundation_top_bar_is_hover')) {
      $top_bar_options[] = 'is_hover:false';
    }

    if (!theme_get_setting('zurb_foundation_top_bar_scrolltop')) {
      $top_bar_options[] = 'scrolltop:false';
    }

    if (theme_get_setting('zurb_foundation_top_bar_mobile_show_parent_link')) {
      $top_bar_options[] = 'mobile_show_parent_link:true';
    }

    $variables['top_bar_options'] = ' data-options="' . implode('; ', $top_bar_options) . '"';
  }

  // Alternative header.
  // This is what will show up if the top bar is disabled or enabled only for
  // mobile.
  if ($variables['alt_header'] = ($variables['top_bar'] != 1)) {
    // Hide alt header on mobile if using top bar in mobile.
    $variables['alt_header_classes'] = $variables['top_bar'] == 2 ? ' hide-for-small' : '';
  }

  // Menus for alternative header.
  $variables['alt_main_menu'] = '';

  if (!empty($variables['main_menu'])) {
    $variables['alt_main_menu'] = theme('links__system_main_menu', array(
      'links' => $variables['main_menu'],
      'attributes' => array(
        'id' => 'main-menu-links',
        'class' => array('links', 'inline-list', 'clearfix'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  $variables['alt_secondary_menu'] = '';

  if (!empty($variables['secondary_menu'])) {
    $variables['alt_secondary_menu'] = theme('links__system_secondary_menu', array(
      'links' => $variables['secondary_menu'],
      'attributes' => array(
        'id' => 'secondary-menu-links',
        'class' => array('links', 'clearfix'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  // Top bar menus.
  $variables['top_bar_main_menu'] = '';
  if (!empty($variables['main_menu'])) {
    $variables['top_bar_main_menu'] = theme('links__topbar_main_menu', array(
      'links' => $variables['main_menu'],
      'attributes' => array(
        'id' => 'main-menu',
        'class' => array('main-nav'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  $variables['top_bar_secondary_menu'] = '';
  if (!empty($variables['secondary_menu'])) {
    $variables['top_bar_secondary_menu'] = theme('links__topbar_secondary_menu', array(
      'links' => $variables['secondary_menu'],
      'attributes' => array(
        'id' => 'secondary-menu',
        'class' => array('secondary', 'link-list'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  // Messages in modal.
  $variables['zurb_foundation_messages_modal'] = theme_get_setting('zurb_foundation_messages_modal');

  // Convenience variables.
  if (!empty($variables['page']['sidebar_first'])) {
    $left = $variables['page']['sidebar_first'];
  }

  if (!empty($variables['page']['sidebar_second'])) {
    $right = $variables['page']['sidebar_second'];
  }

  // Dynamic sidebars.
  if (!empty($left) && !empty($right)) {
    // $variables['main_grid'] = 'medium-6 medium-push-3';
    // $variables['sidebar_first_grid'] = 'medium-3 medium-pull-6';
    $variables['main_grid'] = 'medium-6';
    $variables['sidebar_first_grid'] = 'medium-3';
    $variables['sidebar_sec_grid'] = 'medium-3';
  }
  elseif (empty($left) && !empty($right)) {
    $variables['main_grid'] = 'medium-9';
    $variables['sidebar_first_grid'] = '';
    $variables['sidebar_sec_grid'] = 'medium-3';
  }
  elseif (!empty($left) && empty($right)) {
    // $variables['main_grid'] = 'medium-9 medium-push-3';
    // $variables['sidebar_first_grid'] = 'medium-3 medium-pull-9';
    $variables['main_grid'] = 'medium-8 large-9';
    $variables['sidebar_first_grid'] = 'medium-4 large-3';
    $variables['sidebar_sec_grid'] = '';
  }
  else {
    $variables['main_grid'] = '';
    $variables['sidebar_first_grid'] = '';
    $variables['sidebar_sec_grid'] = '';
  }

  // Ensure modal reveal behavior if modal messages are enabled.
  if (theme_get_setting('zurb_foundation_messages_modal')) {
    drupal_add_js(drupal_get_path('theme', 'zurb_foundation') . '/js/behavior/reveal.js');
  }
}

/**
 * Implements template_preprocess_node.
 */
function cmmdrupalboiler_preprocess_node(&$variables) {
}

/**
 * Implements hook_form_alter.
 */
function cmmdrupalboiler_form_alter(&$form, &$form_state, $form_id) {
  // Unset vertical tabs from field groups on any edit/add node forms and the
  // user view/edit/etc pages. The array the determines what fields go into what
  // groups is just returned empty. If this is too all encompassing, just filter
  // down to only apply to the node add form and the user profile form.
  $form['#group_children'] = array();

  // While we are at it, lets unset the system vertical tabs on the BADCamp theme.
  // We don't need no stinking tabs'es!
  $form['additional_settings']['#type'] = 'container';
}

// Add classes to blocks form their titles
function cmmdrupalboiler_preprocess_block(&$vars) {
  $vars['classes_array'][] = drupal_html_class($vars['block']->subject);
}