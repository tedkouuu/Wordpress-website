<?php 
// $args = NULL makes the argument optional
function pageBanner($args = NULL) {

    // If title was not provided
    if (!isset($args['title'])) {
      $args['title'] = get_the_title();
    }

    // If subtitle was not provided
    if (!isset($args['subtitle'])) {
      $args['subtitle'] = get_field('page_banner_subtitle');
    }

    // If an argument was not passed for the photo
    if (!isset($args['photo'])) {
      // If there a background image is already set
      if (get_field('page_banner_background_image') AND !is_archive() AND !is_home() ) {
        $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
      } else {
        // Fallback
        $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
      }
    }
    ?>

    <div class="page-banner">
  <!-- How to display the dynamic background image: -->
  <div class="page-banner__bg-image" style="background-image: url(<?php echo $args['photo']; ?>);"></div>
  <div class="page-banner__content container container--narrow">
    <h1 class="page-banner__title"><?php echo $args['title'] ?></h1>
    <div class="page-banner__intro">
      <!-- Using the dynamic field for subtitles -->
      <p><?php echo $args['subtitle']; ?></p>
    </div>
  </div>
</div>
<?php }

function university_files() {
    wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=map api key' , NULL, '1.0', true);    
    wp_enqueue_style('university_main_styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university_extra_styles', get_theme_file_uri('/build/index.css'));
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i, 400, 400i, 700, 700i');
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);   

}

add_action('wp_enqueue_scripts', 'university_files');

// Here I say what features should Wordpress support
function university_features(){
    add_theme_support('title-tag'); 
    add_theme_support('post-thumbnails');
    // 400px wide, 260px heigth, cropped
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    // I will use this image size for the background of every page
    add_image_size('pageBanner', 1500, 350, true);
}

add_action('after_setup_theme', 'university_features');


function university_adjust_queries($query){

    if (!is_admin() AND is_post_type_archive('campus') AND $query->is_main_query()) {
    $query->set('posts_per_page', -1);

    }

    if (!is_admin() AND is_post_type_archive('program') AND $query->is_main_query()) {
        $query->set('orderby', 'title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);

    }

    if (!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()) {
    $today = date('Ymd');
    $query->set('meta_key', 'event_date');
    $query->set('orderby', 'meta_value_num');
    $query->set('order', 'ASC');
    $query->set('meta_query', array(
        array(
        'key' => 'event_date',
        'compare' => '>=',
        'value' => $today,
        'type' => 'numeric  '
      )
        ));
   }
}
 
add_action('pre_get_posts', 'university_adjust_queries');


function universityMapKey($api) {
  $api['key'] = 'map api key';
  return $api;
}
// acf(Advanced Custom Fields)
add_filter('acf/fields/google_map/api', 'universityMapKey');
?> 


