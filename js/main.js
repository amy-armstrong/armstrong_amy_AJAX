(() => {

    // Variables
  
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const loader = document.querySelector('#loader');
  
    // Functions  
    function loadInfoBoxes() {

     fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
      console.log(infoBoxes)
      
      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;
      
      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;
      
      selected.appendChild(titleElement);
      selected.appendChild(textElement);
      });
        })
      .catch(error =>{
          console.log("fetch failed:", error);
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Something's wrong. Please try refreshing.";
      
          const modelViewer = document.querySelector("#model");
          modelViewer.appendChild(errorMessage);
          })
        }
        loadInfoBoxes();
  
        function loadMaterialInfo() {
          //show loader
          loader.classList.toggle("hidden");

          fetch("https://swiftpixel.com/earbud/api/materials")
            .then(response => response.json())
            .then(materialInfo => {
              console.log(materialInfo);
        
              materialInfo.forEach(material => {
                const clone = materialTemplate.content.cloneNode(true);
        
                const materialHeading = clone.querySelector(".material-heading");
                materialHeading.textContent = material.heading;
        
                const materialDescription = clone.querySelector(".material-description");
                materialDescription.textContent = material.description;
        
                materialList.appendChild(clone);
              });

              //hide loader
              loader.classList.toggle("hidden");
            })
            .catch(error => {
              console.error(error);

              materialList.innerHTML = `<p>Something went wrong loading materials. Please try again later.</p>`;

              // hide loader if theree is an error
              loader.classList.add("hidden");
            });
        }
        
        loadMaterialInfo();
        
  
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    // Event Listeners
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  })();