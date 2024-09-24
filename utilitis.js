function hideAndShowElement(hide,show){
    document.getElementById(show).classList.remove('hidden');
    document.getElementById(hide).classList.add('animate-slideOut','hidden');
    document.getElementById(show).classList.add('animate-slideIn');
}