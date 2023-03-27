addEventListener('load', () => {
	const welcomeScreen = document.querySelector('main');

	const Startbtn = document.querySelector('#Startbtn');
	
	Startbtn.onclick = function (){
    welcomeScreen.style.display = 'none'
	Game.init();
}
});
