window.onload = function(){
    //http call to Get product list
    var imgList = document.getElementById('img-list');
    var url = 'http://localhost:4040/orders/orderList';
    var productList;
    // onload XMLHttpRequest Promise call to get the hero images
    function getProductDetails (method, url) {
        return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();        
          xhr.open(method, url);
          xhr.setRequestHeader( 'Content-Type', 'application/json' );
          xhr.setRequestHeader( 'Allow-file-access-from-files', true);                                            
          xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              resolve(xhr.response);
            } else {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            }
          };
          xhr.onerror = function () {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          };
          xhr.send(true);
        });
      }        
      getProductDetails('GET', url)
      .then(function (response) {
        productList = JSON.parse(response).groups;        
        productList.forEach(ele =>{
          createList(ele);          
        })
      })
      .catch(function (err) {
        console.error('Augh, there was an error!', err);
      });
      // end of http call

      //  create li elements dynamically to show images
    function createList(listData){
      let parentList = document.getElementById('img-list');
      let liEle = document.createElement('li');
      let anchorEle = document.createElement('a');
      let imgEle = document.createElement('img');
      let descEle = document.createElement('h2');
      descEle.innerHTML = listData.name;
      let priceEle = document.createElement('p');
      priceEle.innerHTML = `Price: $ ${listData.priceRange.selling.high}`;
      imgEle.src = listData.hero.href;
      anchorEle.appendChild(imgEle);
      anchorEle.id = listData.id;      
      liEle.appendChild(anchorEle);
      liEle.appendChild(descEle);
      liEle.appendChild(priceEle);
      parentList.appendChild(liEle);
      
    }
    // end of function createList
    

    //function to show overlay on click of image
      var listElement = document.getElementById('img-list');      
      var modalOverlay = document.getElementById('thumbnail-overlay');
      var slideShowContainer = document.getElementById('slideshow-container');
      var prevReferenceEle = document.getElementsByClassName('prev').item(0);
      var nextReferenceEle = document.getElementsByTagName('br').item(0);
      
      listElement.addEventListener('click', (e) => {
        remvoeElements();
        
        let targetElementId = e.target.parentNode.id;              
        let dotsElement = document.createElement('div');
        let slideContainer = document.createElement('div');
        slideContainer.id = 'slide-container';
        dotsElement.style.textAlign = 'center';
        dotsElement.id = "dot-line";

        productList.forEach(ele => {          
          if(ele.id === e.target.parentNode.id){

            let listOfImages = ele.images;

            listOfImages.forEach((p,i) =>{

              let divEle = document.createElement('div');
              divEle.className = 'mySlides fade';              
              let imgEle = document.createElement('img');  
              imgEle.src = p.href;              
              imgEle.style.width = '100%';
              let spanEle = document.createElement('span');
              spanEle.className = 'dot';
              let sliderParam = i+1;
              spanEle.setAttribute('onclick',`currentSlide(${sliderParam})`);              
              dotsElement.appendChild(spanEle);  
              nextReferenceEle.insertAdjacentElement('afterend',dotsElement);            
              divEle.appendChild(imgEle);
              slideContainer.appendChild(divEle);

            });
            
            slideShowContainer.insertBefore(slideContainer,prevReferenceEle);
            modalOverlay.classList.remove('hide')
            modalOverlay.classList.add('show');
          }
        });
        showSlides(1);
      //   var slideBack = document.getElementsByClassName('prev').item(0);
      // slideBack.onclick = plusSlides("-1");
      
      // var slideNext = document.getElementsByClassName('next').item(0);
      // slideNext.onclick = plusSlides("1"); 

      }, false);
      

      // var slideBack = document.getElementsByClassName('prev').item(0);
      // slideBack.onclick = plusSlides("-1");
      
      // var slideNext = document.getElementsByClassName('next').item(0);
      // slideNext.onclick = plusSlides("1");      

      document.body.addEventListener('click',function(e){        
        if(e.target.id === 'thumbnail-overlay'){
          modalOverlay.classList.remove('show')
            modalOverlay.classList.add('hide');
        }
      }, false);

      var slideIndex = 1;
      // showSlides(slideIndex);

      function plusSlides(n) {
        showSlides(slideIndex += n);
      }

      function currentSlide(n) {
        showSlides(slideIndex = n);
      }
      function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if(slides.length)slides[slideIndex-1].style.display = "block";  
        if(dots.length)dots[slideIndex-1].className += " active";
      }

      function remvoeElements(){
        let removeDupEle = document.getElementById('dot-line');
        if(removeDupEle) removeDupEle.parentNode.removeChild(removeDupEle);
        var removeSlideContainer = document.getElementById('slide-container');  
        if(removeSlideContainer) removeSlideContainer.parentNode.removeChild(removeSlideContainer);
      }      
    
}