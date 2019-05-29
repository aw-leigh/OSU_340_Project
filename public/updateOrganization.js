function updateOrganization(id){
    $.ajax({
        url: '/organizations/' + id,
        type: 'PUT',
        data: $('#update-organization').serialize(),
        success: function(result){
            window.location.replace("../organizations/");
        }
    })
};