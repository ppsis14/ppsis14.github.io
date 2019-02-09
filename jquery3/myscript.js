$(document).ready(function() {
    $('#adv-search-box').hide();

    $('#search-btn').click(function() {
        search_data($('#input-text').val());
    });

    $('#adv-search-btn').click(function () {
        advance_search_data(selectedBrand, selectedType, selectedGear);
    });

    $('#nm-option2').click(function () {
        $('#normal-search-box').hide();
        clearInputNormal();
        $('#adv-search-box').show();
    });

    $('#adv-option1').click(function () {
        $('#normal-search-box').show();
        $('#adv-search-box').hide();
        clearInputAdvance();
    });
    // for get value from select option
    $("#inputBrand").change(function(){
        selectedBrand = $(this).children("option:selected").text();
    });

    $("#inputType").change(function(){
        selectedType = $(this).children("option:selected").text();
    });

    $("#inputGear").change(function(){
        selectedGear = $(this).children("option:selected").text();
    });

     // set value for non item was not selected
     var selectedBrand = 'empty';
     var selectedType = 'empty';
     var selectedGear = 'empty';

     // for clear input
     function clearInputNormal(){
         $("#input-text").val('');
     }
 
     function clearInputAdvance(){
         $("#inputBrand").val('Choose...');
         $("#inputType").val('Choose...');
         $("#inputGear").val('Choose...');
     }
 
     function advance_search_data(brand, type, gear){
         if (brand == 'empty' && type == 'empty' && gear == 'empty'){
             alert("all field is empty!")
         }
         else {
             $("#table-body tr").each(function(){
                 var hitCntBrand = 0;
                 var hitCntType = 0;
                 var hitCntGear = 0;
                 var indexBrand = $(this).text().toLowerCase().indexOf(brand.toLowerCase());
                 var indexType = $(this).text().toLowerCase().indexOf(type.toLowerCase());
                 var indexGear = $(this).text().toLowerCase().indexOf(gear.toLowerCase());
                 $(this).each(function(){
                     if (indexBrand >= 0 && indexType >= 0 && indexGear >= 0){
                         hitCntBrand++;
                         hitCntType++;
                         hitCntGear++;
                     }
                     else if (indexBrand >= 0 && indexType >= 0){
                         hitCntBrand++;
                         hitCntType++;
                     }
                     else if (indexBrand >= 0 && indexGear >= 0){
                         hitCntBrand++;
                         hitCntGear++;
                     }
                     else if (indexType >= 0 && indexGear >= 0){
                         hitCntType++;
                         hitCntGear++;
                     }
                     else if (indexBrand >= 0){
                         hitCntBrand++;
                     }
                     else if (indexType >= 0){
                         hitCntType++;
                     }
                     else if (indexGear >= 0){
                         hitCntGear++;
                     }
                 });
                 // alert("hitBrand:" + hitCntBrand + "hitType:" + hitCntType + "hitGear:" + hitCntGear);
         
                 if (hitCntBrand == 1 && hitCntType == 1 && hitCntGear == 1){
                     $(this).show();
                 }
                 else if (hitCntBrand == 1 && hitCntType == 1 && hitCntGear == 0){
                     $(this).show();
                 }
                 else if (hitCntBrand == 1 && hitCntType == 0 && hitCntGear == 1){
                     $(this).show();
                 }
                 else if (hitCntBrand == 0 && hitCntType == 1 && hitCntGear == 1){
                     $(this).show();
                 }
                 else if (hitCntBrand == 1 && hitCntType == 0 && hitCntGear == 0){
                     $(this).show();
                 }
                 else if (hitCntBrand == 0 && hitCntType == 1 && hitCntGear == 0){
                     $(this).show();
                 }
                 else if (hitCntBrand == 0 && hitCntType == 0 && hitCntGear == 1){
                     $(this).show();
                 }
                //  else {
                //      $(this).hide();
                //  }
             });
         }
     }
 

    function search_data(value){
        $("#table-body tr").each(function(){
            var hit = 'false';
            $(this).each(function(){
                if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
                    hit = 'true';
                }
            });
            if (hit == 'true'){
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }

    

    $.ajax({
        url: "data.json",
        dataType: "json"
    }).done(function(response) {
        console.log(response);
        response.forEach(element => {
            $("#table-body").append(
                "<tr>"+
                "<td>"+element.brand+"</td>"+
                "<td>"+element.model+"</td>"+
                "<td>"+element.price+"</td>"+
                "<td>"+element.engine+"</td>"+
                "<td>"+element.type+"</td>"+
                "<td>"+element.gear+"</td>"
                +"</tr>"
            );
        });
    });
});