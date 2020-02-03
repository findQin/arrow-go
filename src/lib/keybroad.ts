const Keybroad: any = {}

Keybroad.left = false;
Keybroad.right = false;
Keybroad.top = false;
Keybroad.bottom = false;
Keybroad.isDown = true;
Keybroad.isUp = false;

Keybroad.directionMap = {
    37: 'left',
    38: 'top',
    39: 'right',
    40: 'bottom'
}

Keybroad.downHandler = (event: KeyboardEvent) => {
   if(typeof Keybroad[Keybroad.directionMap[event.keyCode]] === 'boolean') {
        Keybroad[Keybroad.directionMap[event.keyCode]] = true;
        Keybroad.isDown = true;
        Keybroad.isUp = false;
    }
    event.preventDefault();
};


Keybroad.upHandler = (event: KeyboardEvent) => {
    if(typeof Keybroad[Keybroad.directionMap[event.keyCode]] === 'boolean') {
        Keybroad[Keybroad.directionMap[event.keyCode]] = false;
        Keybroad.isDown = true;
        Keybroad.isUp = false;
    }
    
    event.preventDefault();
};

window.addEventListener(
    "keydown", Keybroad.downHandler.bind(Keybroad), false
);

window.addEventListener(
    "keyup", Keybroad.upHandler.bind(Keybroad), false
);

export default Keybroad