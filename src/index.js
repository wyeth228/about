"use strict";

var projects = [
	{
		title: "Weather Knower",
		information: "Simple weather web application realized using React and some weather api service",
		imageSourcePath: "./src/assets/images/projects/weather_knower.png",
		link: "https://wyeth228.github.io/weather-knower/"
	},
	{
		title: "Broken",
		information: "An art",
		imageSourcePath: "./src/assets/images/projects/broken.png",
		link: ""
	},
	{
		title: "G4560",
		information: "Pixel art animation of cpu working",
		imageSourcePath: "./src/assets/images/projects/g4560.gif",
		link: ""
	},
	{
		title: "Gym room",
		information: "Simple gym room with some trainers",
		imageSourcePath: "./src/assets/images/projects/gym.png",
		link: ""
	},
	{
		title: "Ping pong room",
		information: "Room for ping pong game",
		imageSourcePath: "./src/assets/images/projects/ping_pong.png",
		link: ""
	},
	{
		title: "World 3",
		information: "An art",
		imageSourcePath: "./src/assets/images/projects/world_3.png",
		link: ""
	},
];

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
			information.innerHTML = projects[projectIdx].information;
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

document.addEventListener("DOMContentLoaded", function() {
	var date = new Date();
	document.getElementById("year").innerHTML = date.getFullYear();
		
	initInfiniteSlider();
	
	var projectPopup = initProjectPopup();
	
	initProjects(projectPopup);
});
