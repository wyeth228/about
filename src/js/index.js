import { LANGUAGES } from "./enums/languages.js";
import { projects } from "./data/projects.js";
import { textTranslations } from "./data/text_translations.js";

var app = {
	language: LANGUAGES.EN,
};

function initInfiniteSlider() {
	var allSlideElements = document.getElementsByClassName("skill");
	var slidesWrapper = document.getElementsByClassName("skills-wrapper")[0];
	
	var allSlideElementsLength = allSlideElements.length;
	
	for(var i = 0; i < allSlideElementsLength; ++i) {
		var slide = allSlideElements[i];

		var slideNodeClone = slide.cloneNode(true);

		slidesWrapper.appendChild(slideNodeClone);
	}
}

function initProjectPopup() {
	var rootElement = document.getElementsByClassName("project-popup")[0];
	var title = rootElement.querySelector(".project-popup__title");
	var information = rootElement.querySelector(".project-popup__information");	
	var link = rootElement.querySelector(".project-popup__link");	
	var image = rootElement.querySelector(".project-popup__image");
	
	if (!rootElement) {
		console.error("Cannot find a root element of project popup");
		
		return;
	}

	rootElement.addEventListener("click", function(event) {
		if (
			event.target.classList.contains("project-popup") 
			|| 
			event.target.classList.contains("project-popup__close-button")	
		) {	
			rootElement.classList.add("project-popup_hidden");
		}
	});
	
	return {
		closePopup: function() {
			rootElement.classList.add("project-popup_hidden");
		},
		activatePopup: function(projectIdx) {
			title.innerHTML = projects[projectIdx].title;
			information.innerHTML = projects[projectIdx].information[app.language];
			image.src = projects[projectIdx].imageSourcePath;
		
			if (!projects[projectIdx].link) {
				link.classList.add("project-popup__link_hidden");		
			} else {
				link.href = projects[projectIdx].link;
				link.classList.remove("project-popup__link_hidden");
			}
			
			rootElement.classList.remove("project-popup_hidden");
		}
	}
}

function initProjects(projectPopup) {
	var projectListParent = document.getElementsByClassName("project-list")[0];
	
	if (!projectPopup.closePopup || !projectListParent) {
		console.error("Projects initialization error");
		
		return;
	}
	
	for(var i = 0; i < projects.length; ++i) {
		var newImageElement = document.createElement("img");
		newImageElement.src = projects[i].imageSourcePath;
		newImageElement.classList.add("project__image");
		
		var newProjectElement = document.createElement("div");
		newProjectElement.classList.add("project");
		newProjectElement.dataset.projectIdx = i;

		newProjectElement.appendChild(newImageElement);	
		
		projectListParent.appendChild(newProjectElement);
		
		newProjectElement.addEventListener("click", function(event) {
			projectPopup.activatePopup(Number(event.target.dataset.projectIdx));
		});
	}
}

function initYear() {
	var date = new Date();
	document.getElementById("year").innerHTML = date.getFullYear();	
}

function initTranslations() {
	for(var elementClassName of Object.keys(textTranslations)) {
		var element = document.getElementsByClassName(elementClassName)[0];
		
		if (!element) {
			continue;
		}
	
		element.innerHTML = textTranslations[elementClassName][app.language];
	}
}

function initLanguage() {
	if (!navigator.language) {	
		app.language = LANGUGES.EN;
	
		return;
	}
	
	var navigatorLanguage = navigator.language.split("-")[0];
	
	if (navigatorLanguage === LANGUAGES.EN || navigatorLanguage === LANGUAGES.RU) {
		app.language = navigatorLanguage;
	} else {
		app.language = LANGUAGES.EN;
	}
}

function initApplication() {
	initLanguage();
	
	initYear();
	
	initInfiniteSlider();
	
	var projectPopup = initProjectPopup();
	
	initProjects(projectPopup);

	initTranslations();
}

document.addEventListener("DOMContentLoaded", initApplication);
