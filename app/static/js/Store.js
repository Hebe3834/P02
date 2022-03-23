var powerSelect = document.getElementById("powerups");
var powerForm = document.getElementById("selectPower");
var skinSelect = document.getElementById("skins");
var skinForm = document.getElementById("selectSkin");

if(powerSelect.innerHTML.trim()==""){
    powerForm.innerHTML = "<select class='form-select form-select-lg' id='powerups' name='powerups' style='font-size:15px'><option style='font-size:15px'>you have bought everything how does it feel being rich</option></select>";
    document.getElementById("powerCarousel").remove();
}

if(skinSelect.innerHTML.trim()==""){
    skinForm.innerHTML = "<select class='form-select form-select-lg' id='powerups' name='powerups' style='font-size:15px'><option style='font-size:15px'>you have bought everything how does it feel being rich</option></select>";
    document.getElementById("skinCarousel").remove();
}

//  console.log(powerSelect.innerHTML.trim()=="");