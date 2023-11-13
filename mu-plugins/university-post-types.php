<!-- mu-plugins is a special directory where you can place plugins that 
you want to be automatically activated for all sites in a multisite network. 
Unlike regular plugins, you don't need to activate these plugins individually; 
they are automatically enabled. -->

<?php function university_post_types() {
    register_post_type('event', array(
        // Describe what kind of post type you want
        'public' => true,
        'labels' => array(
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event'
        ),
        'menu_icon' => 'dashicons-calendar'
    ));
}
// Create new Post Type
add_action('init', 'university_post_types');
?>