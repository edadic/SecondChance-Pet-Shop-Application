var animalService = {
reload_animals_datatable: function() {
    RestClient.get("get_animals.php", function(data){
        console.log("Animals data loaded", data);
    })
}
};


