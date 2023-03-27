export function getId(_id){
    return document.getElementById(_id);
}
export function getClass(_class){ 
    return document.getElementsByClassName(_class);
}
export function getTag(_tag){ 
    return document.getElementsByTagName(_tag);
}
export function load(_load){ 
    return window.addEventListener("load", _load);
}
export function msmove(_msmove){ 
    return window.addEventListener("mousemove", _msmove);
}
export function resize(_resize){ 
    return window.addEventListener("resize", _resize);
}
export function scr(_scroll){
    return window.addEventListener("scroll", _scroll);
}
export function click(_click){
    return window.addEventListener("click", _click);
}
export function rand(_min, _max){
	return Math.floor( Math.random() * ( _max - _min + 1 ) + _min );
}
export function create(_el){
	return document.createElement(_el);
}
export function addClass(_el, _class){
	return _el.classList.add(_class);
}
export function addClassPlus(){
	let num = arguments.length;
	for(let i = 1; i < num; i++){
		arguments[0].classList.add(arguments[i]);
	}
}
export function remClass(_el, _class){
	return _el.classList.remove(_class);
}
export function cl_Int(_var){
	return clearInterval(_var);
}
export let el_c;
export function g(name){
	let n = name.toString();
	if(n.charAt(0) === "#"){
		el_c = getId(n.substring(1));
	}
	if(n.charAt(0) === "."){
		el_c = getClass(n.substring(1));
	}
	if(n.charAt(0) !== "." && n.charAt(0) !== "#"){
		el_c = getTag(n);
	}
	return el_c;
}

export function change_element(){
	
	for(let i = 2; i < arguments.length; i++){
		if(arguments[1] === "*"){
			for(let j = 0; j < arguments[0].length; j++){
				if(arguments[i][0] === "style"){
					for(let l = 1; l < arguments[i].length; l+=2){
						arguments[0][j].style[arguments[i][l]] = arguments[i][l+1];
					}
				}
				if(arguments[i][0] === "txt"){
					arguments[0][j].innerText = arguments[i][1];
				}
				if(arguments[i][0] === "add_txt"){
					arguments[0][j].innerText += arguments[i][1];
				}
				if(arguments[i][0] === "html"){
					arguments[0][j].innerHTML = arguments[i][1];
				}
				if(arguments[i][0] === "add_html"){
					arguments[0][j].innerHTML += arguments[i][1];
				}
				if(arguments[i][0] === "add_class"){
					arguments[0][j].classList.add(arguments[i][1]);
				}
				if(arguments[i][0] === "remove_class"){
					arguments[0][j].classList.remove(arguments[i][1]);
				}
				if(arguments[i][0] === "set_property"){
					for(let l = 1; l < arguments[i].length; l+=2){
						arguments[0][j].style.setProperty([arguments[i][l]], arguments[i][l+1]);
					}
				}
				if(arguments[i][0] === "dataset"){
					for(let l = 1; l < arguments[i].length; l+=2){
						arguments[0][j].dataset[arguments[i][l]] = arguments[i][l+1];
					}
				}
			}
		}
		if((arguments[1] !== "*" && arguments[1] !== null && arguments[1] !== "") && isNaN(arguments[1]) === false){
			if(arguments[i][0] === "style"){
				for(let l = 1; l < arguments[i].length; l+=2){
					arguments[0][arguments[1]].style[arguments[i][l]] = arguments[i][l+1];
				}
			}
			if(arguments[i][0] === "txt"){
				arguments[0][arguments[1]].innerText = arguments[i][1];
			}
			if(arguments[i][0] === "add_txt"){
				arguments[0][arguments[1]].innerText += arguments[i][1];
			}
			if(arguments[i][0] === "html"){
				arguments[0][arguments[1]].innerHTML = arguments[i][1];
			}
			if(arguments[i][0] === "add_html"){
				arguments[0][arguments[1]].innerHTML += arguments[i][1];
			}
			if(arguments[i][0] === "add_class"){
				arguments[0][arguments[1]].classList.add(arguments[i][1]);
			}
			if(arguments[i][0] === "remove_class"){
				arguments[0][arguments[1]].classList.remove(arguments[i][1]);
			}
			if(arguments[i][0] === "set_property"){
				for(let l = 1; l < arguments[i].length; l+=2){
					arguments[0][arguments[1]].style.setProperty([arguments[i][l]], arguments[i][l+1]);
				}
			}
			if(arguments[i][0] === "dataset"){
				for(let l = 1; l < arguments[i].length; l+=2){
					arguments[0][arguments[1]].dataset[arguments[i][l]] = arguments[i][l+1];
				}
			}
		}
		if(arguments[1] === ""){
			if(arguments[i][0] === "style"){
				for(let l = 1; l < arguments[i].length; l+=2){
					arguments[0].style[arguments[i][l]] = arguments[i][l+1];
				}
			}
			if(arguments[i][0] === "txt"){
				arguments[0].innerText = arguments[i][1];
			}
			if(arguments[i][0] === "add_txt"){
				arguments[0].innerText += arguments[i][1];
			}
			if(arguments[i][0] === "html"){
				arguments[0].innerHTML = arguments[i][1];
			}
			if(arguments[i][0] === "add_html"){
				arguments[0].innerHTML += arguments[i][1];
			}
			if(arguments[i][0] === "add_class"){
				arguments[0].classList.add(arguments[i][1]);
			}
			if(arguments[i][0] === "remove_class"){
				arguments[0].classList.remove(arguments[i][1]);
			}
			if(arguments[i][0] === "set_property"){
				for(let l = 1; l < arguments[i].length; l+=2){
					arguments[0].style.setProperty([arguments[i][l]], arguments[i][l+1]);
				}
			}
			if(arguments[i][0] === "dataset"){
				for(let l = 1; l < arguments[i].length; l+=2){
					arguments[0].dataset[arguments[i][l]] = arguments[i][l+1];
				}
			}
		}
	}
}
/*function new_element(type_of_element/tag, miejsce umieszczenia elementu, dodaj id, dodaj klasy z tablicy, css z tablicy)*/
export function new_element(type, destination, id, classes, css){
	let element_type = type;
	let element_destination = destination;
	let element_id = id;
	let element_classes = classes;
	let element_css = css;
	
	let el = document.createElement(element_type);
	element_destination.append(el);
	if(element_id === null || element_id === ""){
		
	}
	else {
		el.id = element_id;
	}
	
	for(let j = 0; j < element_classes.length; j++){
		el.classList.add(element_classes[j]);
	}
	for(let k = 0; k < element_css.length; k+=2){
		el.style[element_css[k]] = element_css[k+1];
	}
}

export function setProperty(){
	let num = arguments.length;
	for(let i = 1; i < num; i+=2){
		arguments[0].style.setProperty(arguments[i], arguments[i+1]);
	}	
}
