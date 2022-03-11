var powerUpButton = document.getElementById('buypowerups')
var skinButton = document.getElementById("buyskins")

var PowerUps = () =>{
    let powerUpSelector = document.getElementById('powerups')
    let value2 = powerUpSelector.value
    console.log(value2)
}

var buySkins = () => {
    let skinSelector = document.getElementById('skins')
    let value2 = skinSelector.value
    print(value2)
}

skinButton.addEventListener('click',buySkins)
powerUpButton.addEventListener('click',PowerUps)