function filterByName() {
    //get search letters from box
    var name_filter = document.getElementById('filter-characters-text').value

    //if empty, remove filter by reloading characters page
    if (!name_filter)
    {
        window.location = '/characters'
    }
    else{
    //construct the URL and redirect to it    
    window.location = '/characters/filter/' + name_filter
    }
}