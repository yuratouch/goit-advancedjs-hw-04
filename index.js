import{a as f,S as M,i as P}from"./assets/vendor-B6jJ9_I0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const y={baseURL:"https://pixabay.com/api",imagesPerPage:15};f.defaults.baseURL=y.baseURL;async function p(e,o=1){const s={key:"47670925-140aa95f52ef27acd2496305c",q:e.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y.imagesPerPage,page:o};try{const l=await f.get("/",{params:s}),{hits:r,totalHits:a}=(l==null?void 0:l.data)||{};return r?{images:r,isNext:15*o<a}:{}}catch(l){return console.error("Pixabay API fetch error: ",l instanceof Error?l.message:l),[]}}const m=e=>e.reduce((o,{webformatURL:s,largeImageURL:l,tags:r,likes:a,views:i,comments:b,downloads:L})=>o+`<li class="gallery-card">
              <a class="gallery-link" href="${l}">
                <img class="gallery-image" src="${s}" alt="${r}" loading="lazy" />
                <ul class="gallery-card-info">
                  <li>
                    <p>Likes</p>
                    <p>${a}</p>
                  </li>
                  <li>
                    <p>Views</p>
                    <p>${i}</p>
                  </li>
                  <li>
                    <p>Comments</p>
                    <p>${b}</p>
                  </li>
                  <li>
                    <p>Downloads</p>
                    <p>${L}</p>
                  </li>
                </ul>
              </a>
            </li>`,"");let u,g;const h=new M("a.gallery-link",{captionDelay:250,overlayOpacity:.8}),t={form:document.querySelector(".js-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMore:document.querySelector(".js-load-more-btn"),lastPage:document.querySelector(".js-last-page-message")};t.form.addEventListener("submit",q);t.loadMore.addEventListener("click",S);async function q(e){e.preventDefault();const o=e.target.elements["user-query"].value.trim();if(o){t.gallery.innerHTML="",c(t.loadMore),n(t.loader),g=o;const{images:s,isNext:l}=await p(o);if(s!=null&&s.length)t.gallery.innerHTML=m(s),h.refresh(),l&&n(t.loadMore),c(t.loader),u=2,t.form.reset();else{d("Sorry, there are no images matching your search query. Please try again!"),c(t.loader),t.form.reset();return}}else{d("Search query cannot be empty.");return}}async function S(){n(t.loader),c(t.loadMore);const{images:e,isNext:o}=await p(g,u);(e==null?void 0:e.length)===0?n(t.lastPage):e!=null&&e.length&&(t.gallery.insertAdjacentHTML("beforeend",m(e)),h.refresh(),n(o?t.loadMore:t.lastPage),w(),u++),c(t.loader)}function w(){const o=document.querySelector(".gallery-card").getBoundingClientRect().height+24;window.scrollBy({top:o*2,left:0,behavior:"smooth"})}function d(e){P.error({message:e,position:"topRight"})}function n(e){e.style.display="block"}function c(e){e.style.display="none"}
//# sourceMappingURL=index.js.map
