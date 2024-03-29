!function(e,x,h){function r(a,b){var c=Math.max(0,a[0]-b[0],b[0]-a[1]),d=Math.max(0,a[2]-b[1],b[1]-a[3]);return c+d}function s(a,b,c,d){for(var f=a.length,d=d?"offset":"position",c=c||0;f--;){var k=a[f].el?a[f].el:e(a[f]),i=k[d]();i.left+=parseInt(k.css("margin-left"),10);i.top+=parseInt(k.css("margin-top"),10);b[f]=[i.left-c,i.left+k.outerWidth()+c,i.top-c,i.top+k.outerHeight()+c]}}function l(a,b){var c=b.offset();return{left:a.left-c.left,top:a.top-c.top}}function t(a,b,c){for(var b=[b.left,b.top],
  c=c&&[c.left,c.top],d,f=a.length,e=[];f--;)d=a[f],e[f]=[f,r(d,b),c&&r(d,c)];return e=e.sort(function(a,b){return b[1]-a[1]||b[2]-a[2]||b[0]-a[0]})}function m(a){this.options=e.extend({},j,a);this.containers=[];this.scrollProxy=e.proxy(this.scroll,this);this.dragProxy=e.proxy(this.drag,this);this.dropProxy=e.proxy(this.drop,this);this.options.parentContainer||(this.placeholder=e(this.options.placeholder),a.isValidTarget||(this.options.isValidTarget=h))}function n(a,b){this.el=a;this.options=e.extend({},
  v,b);this.group=m.get(this.options);this.rootGroup=this.options.rootGroup=this.options.rootGroup||this.group;this.parentContainer=this.options.parentContainer;this.handle=this.rootGroup.options.handle||this.rootGroup.options.itemSelector;this.el.on(o.start,this.handle,e.proxy(this.dragInit,this));this.options.drop&&this.group.containers.push(this)}var o,v={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},j={afterMove:function(){},containerPath:"",containerSelector:"ol, ul",distance:0,handle:"",itemPath:"",
  itemSelector:"li",isValidTarget:function(){return!0},onCancel:function(){},onDrag:function(a,b){a.css(b)},onDragStart:function(a){a.css({height:a.height(),width:a.width()});a.addClass("dragged");e("body").addClass("dragging")},onDrop:function(a){a.removeClass("dragged").removeAttr("style");e("body").removeClass("dragging")},onMousedown:function(a,b){b.preventDefault()},placeholder:'<li class="placeholder"/>',pullPlaceholder:!0,serialize:function(a,b,c){a=e.extend({},a.data());if(c)return b;b[0]&&
  (a.children=b,delete a.subContainer);delete a.sortable;return a},tolerance:0},p={},u=0,w={left:0,top:0,bottom:0,right:0};o={start:"touchstart.sortable mousedown.sortable",drop:"touchend.sortable touchcancel.sortable mouseup.sortable",drag:"touchmove.sortable mousemove.sortable",scroll:"scroll.sortable"};m.get=function(a){p[a.group]||(a.group||(a.group=u++),p[a.group]=new m(a));return p[a.group]};m.prototype={dragInit:function(a,b){this.$document=e(b.el[0].ownerDocument);b.enabled()?(this.toggleListeners("on"),
  this.item=e(a.target).closest(this.options.itemSelector),this.itemContainer=b,this.setPointer(a),this.options.onMousedown(this.item,a,j.onMousedown)):this.toggleListeners("on",["drop"]);this.dragInitDone=!0},drag:function(a){if(!this.dragging){if(!this.distanceMet(a))return;this.options.onDragStart(this.item,this.itemContainer,j.onDragStart);this.item.before(this.placeholder);this.dragging=!0}this.setPointer(a);this.options.onDrag(this.item,l(this.pointer,this.item.offsetParent()),j.onDrag);var b=
  a.pageX,a=a.pageY,c=this.sameResultBox,d=this.options.tolerance;if(!c||c.top-d>a||c.bottom+d<a||c.left-d>b||c.right+d<b)this.searchValidTarget()||this.placeholder.detach()},drop:function(){this.toggleListeners("off");this.dragInitDone=!1;if(this.dragging){if(this.placeholder.closest("html")[0])this.placeholder.before(this.item).detach();else this.options.onCancel(this.item,this.itemContainer,j.onCancel);this.options.onDrop(this.item,this.getContainer(this.item),j.onDrop);this.clearDimensions();this.clearOffsetParent();
  this.lastAppendedItem=this.sameResultBox=h;this.dragging=!1}},searchValidTarget:function(a,b){a||(a=this.relativePointer||this.pointer,b=this.lastRelativePointer||this.lastPointer);for(var c=t(this.getContainerDimensions(),a,b),d=c.length;d--;){var f=c[d][0];if(!c[d][1]||this.options.pullPlaceholder)if(f=this.containers[f],!f.disabled){if(!this.$getOffsetParent())var e=f.getItemOffsetParent(),a=l(a,e),b=l(b,e);if(f.searchValidTarget(a,b))return!0}}this.sameResultBox&&(this.sameResultBox=h)},movePlaceholder:function(a,
  b,c,d){var f=this.lastAppendedItem;if(d||!(f&&f[0]===b[0]))b[c](this.placeholder),this.lastAppendedItem=b,this.sameResultBox=d,this.options.afterMove(this.placeholder,a)},getContainerDimensions:function(){this.containerDimensions||s(this.containers,this.containerDimensions=[],this.options.tolerance,!this.$getOffsetParent());return this.containerDimensions},getContainer:function(a){return a.closest(this.options.containerSelector).data("sortable")},$getOffsetParent:function(){if(this.offsetParent===
  h){var a=this.containers.length-1,b=this.containers[a].getItemOffsetParent();if(!this.options.parentContainer)for(;a--;)if(b[0]!=this.containers[a].getItemOffsetParent()[0]){b=!1;break}this.offsetParent=b}return this.offsetParent},setPointer:function(a){a={left:a.pageX,top:a.pageY};if(this.$getOffsetParent()){var b=l(a,this.$getOffsetParent());this.lastRelativePointer=this.relativePointer;this.relativePointer=b}this.lastPointer=this.pointer;this.pointer=a},distanceMet:function(a){return Math.max(Math.abs(this.pointer.left-
  a.pageX),Math.abs(this.pointer.top-a.pageY))>=this.options.distance},scroll:function(){this.clearDimensions();this.clearOffsetParent()},toggleListeners:function(a,b){var c=this,b=b||["drag","drop","scroll"];e.each(b,function(b,f){c.$document[a](o[f],c[f+"Proxy"])})},clearOffsetParent:function(){this.offsetParent=h},clearDimensions:function(){this.containerDimensions=h;for(var a=this.containers.length;a--;)this.containers[a].clearDimensions()}};n.prototype={dragInit:function(a){var b=this.rootGroup;
  !b.dragInitDone&&1===a.which&&this.options.drag&&!e(a.target).is(this.options.exclude)&&b.dragInit(a,this)},searchValidTarget:function(a,b){var c=t(this.getItemDimensions(),a,b),d=c.length,f=this.rootGroup,e=!f.options.isValidTarget||f.options.isValidTarget(f.item,this);if(!d&&e)return f.movePlaceholder(this,this.el,"append"),!0;for(;d--;)if(f=c[d][0],!c[d][1]&&this.hasChildGroup(f)){if(this.getContainerGroup(f).searchValidTarget(a,b))return!0}else if(e)return this.movePlaceholder(f,a),!0},movePlaceholder:function(a,
  b){var c=e(this.items[a]),d=this.itemDimensions[a],f="after",h=c.outerWidth(),i=c.outerHeight(),g=c.offset(),g={left:g.left,right:g.left+h,top:g.top,bottom:g.top+i};this.options.vertical?b.top<=(d[2]+d[3])/2?(f="before",g.bottom-=i/2):g.top+=i/2:b.left<=(d[0]+d[1])/2?(f="before",g.right-=h/2):g.left+=h/2;this.hasChildGroup(a)&&(g=w);this.rootGroup.movePlaceholder(this,c,f,g)},getItemDimensions:function(){this.itemDimensions||(this.items=this.$getChildren(this.el,"item").filter(":not(.placeholder, .dragged)").get(),
  s(this.items,this.itemDimensions=[],this.options.tolerance));return this.itemDimensions},getItemOffsetParent:function(){var a=this.el;return"relative"===a.css("position")||"absolute"===a.css("position")||"fixed"===a.css("position")?a:a.offsetParent()},hasChildGroup:function(a){return this.options.nested&&this.getContainerGroup(a)},getContainerGroup:function(a){var b=e.data(this.items[a],"subContainer");if(b===h){var c=this.$getChildren(this.items[a],"container"),b=!1;c[0]&&(b=e.extend({},this.options,
  {parentContainer:this,group:u++}),b=c.sortable(b).data("sortable").group);e.data(this.items[a],"subContainer",b)}return b},enabled:function(){return!this.disabled&&(!this.parentContainer||this.parentContainer.enabled())},$getChildren:function(a,b){var c=this.rootGroup.options,d=c[b+"Path"],c=c[b+"Selector"],a=e(a);d&&(a=a.find(d));return a.children(c)},_serialize:function(a,b){var c=this,d=this.$getChildren(a,b?"item":"container").not(this.options.exclude).map(function(){return c._serialize(e(this),
  !b)}).get();return this.rootGroup.options.serialize(a,d,b)},clearDimensions:function(){this.itemDimensions=h;if(this.items&&this.items[0])for(var a=this.items.length;a--;){var b=e.data(this.items[a],"subContainer");b&&b.clearDimensions()}}};var q={enable:function(){this.disabled=!1},disable:function(){this.disabled=!0},serialize:function(){return this._serialize(this.el,!0)}};e.extend(n.prototype,q);e.fn.sortable=function(a){var b=Array.prototype.slice.call(arguments,1);return this.map(function(){var c=
  e(this),d=c.data("sortable");if(d&&q[a])return q[a].apply(d,b)||this;!d&&(a===h||"object"===typeof a)&&c.data("sortable",new n(c,a));return this})}}(jQuery,window);

const dragElement = document.getElementById("drag")
const modalContent= document.getElementsByClassName("modal-content")[0]

var slideIndex = 1;




if (localStorage.getItem("photos")) {
  let images = JSON.parse(localStorage.getItem('photos'))
  createImages(images)
  generateModalContentImages(images)
} else {
  fetch("../photos.json").then(async (response) => {
      let images = await response.json()
      createImages(images)
      generateModalContentImages(images)
  })
}
function filterImages(){
  textFilter = document.getElementById("filter");
  const images = $(".drag img")

  for(let i = 0; i < 5 ;i++){
    if(images[i].alt.includes(textFilter.value) || images[i].title.includes(textFilter.value)){
      images[i].style.display = "inline"
    }
    else images[i].style.display = "none"
  }
}


$(document).ready(function()
{   
  
  var adjustment

  var group = $("div.drag").sortable({
      group: 'drag',
      itemSelector: 'img',
      containerSelector: 'div',
      vertical: false,
      placeholder: '<div class="placeholder" />',
      pullPlaceholder: false,

      // set item relative to cursor position
      onDragStart: function ($item, container, _super) {
          var offset = $item.offset(),
          pointer = container.rootGroup.pointer

          adjustment = {
            left: pointer.left - offset.left,
            top: pointer.top - offset.top
          }
          _super($item, container)
      },
      onDrop: function (item, container, _super) {
          $('#output').text(group.sortable("serialize").get().join("\n"))
          _super(item, container)
          shuffleImages()
      },
      onDrag: function ($item, position) {
      $item.css({
          width: 180,
          height: 180,
          left: position.left - adjustment.left,
          top: position.top - adjustment.top
      })
      },
      serialize: function (parent, children, isContainer) {
          return isContainer ? children.join() : parent[0].rel
      }
  })
  
});

function generateModalContentImages(images){
  images.photos.forEach(image => {
      createModalContentImage(image)
  })
  showSlides(slideIndex);
  console.log(images)
}

function createModalContentImage(image){
  let slideElement = document.createElement("div")
  slideElement.classList.add("mySlides")
  let img = document.createElement("img")
  img.alt = image.description
  img.src = image.src
  img.title = image.title
  img.style.width ="100%"
  slideElement.appendChild(img)
  modalContent.appendChild(slideElement)
}

function createImages(images){
  images.photos.forEach((image,index) => {
      createImage(image,index + 1)
  })
  images = images.photos
  createImageListeners()
}

function shuffleImages(){
  const images = $(".drag img")
  const mySlides = [...$(".mySlides")]
  mySlides.forEach((item,index) =>{
      item.removeChild(item.childNodes[0])
      let clone = images[index].cloneNode(true);
      clone.style.width = "100%"
      clone.classList.remove("obrazok")
      item.appendChild(clone)
  })
}

function createImage(image,index){
  let img = document.createElement("img")
  img.alt = image.description
  img.src = image.src
  img.title = image.title
  img.rel = index
  img.classList.add("obrazok")
  dragElement.appendChild(img)
}

function createImageListeners(){
  let isDrag = false
  const imageElements = $("img") 
  for(let image of imageElements){
      image.addEventListener('mousedown', () => isDrag = false);
      image.addEventListener('mousemove', () => isDrag = true);
      image.addEventListener('mouseup', (event) => {
          if (!isDrag) {
              for (let i = 0; i < event.target.parentElement.children.length; i++) {
                  console.log(event.target.parentElement.children[i])
                  if (event.target.parentElement.children[i] === event.target) {
                      openModal()
                      currentSlide(i + 1)
                  }
              }
          }
      })
  }
}

  
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}




function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let title = document.getElementById("title-image")
  let description = document.getElementById("descripton-image")
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  description.innerHTML = slides[slideIndex - 1].children[0].alt
  title.innerHTML = slides[slideIndex - 1].children[0].title
  title.style.color = 'white'
  description.style.color = 'white'
}

window.onbeforeunload = function () {
  let images = {
      photos: [],
  };

  const photos = [...document.getElementsByClassName("obrazok")];

  photos.forEach(photo => {
      object = {
          src: String,
          title: String,
          description: String,
      }

      object.src = photo.getAttribute('src');
      object.title = photo.getAttribute('title');
      object.description = photo.getAttribute('alt');

      images.photos.push(object);
  })

  localStorage.setItem('photos', JSON.stringify(images));
}
let timer;
function playPresentation(){
  if (timer) {
     clearInterval( timer );
     timer=null;
  }
  else {
     timer = setInterval("showSlides(slideIndex += 1)",1000);
  }
}
function filterImages(){
  textFilter = document.getElementById("filter");
  const images = $(".drag img")

  for(let i = 0; i < 5 ;i++){
    if(images[i].alt.includes(textFilter.value) || images[i].title.includes(textFilter.value)){
      images[i].style.display = "inline"
    }
    else images[i].style.display = "none"
  }
}
