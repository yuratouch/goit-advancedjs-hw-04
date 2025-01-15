import{a as f,S as P,i as q}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const p={baseURL:"https://pixabay.com",imagesPerPage:15};f.defaults.baseURL=p.baseURL;async function y(e,t=1){const s={key:"47670925-140aa95f52ef27acd2496305c",q:e.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p.imagesPerPage,page:t};try{const l=await f.get("/api",{params:s}),{hits:r,totalHits:o}=(l==null?void 0:l.data)||{};return r?{images:r,isNext:15*t<o}:{}}catch(l){return console.error("Pixabay API fetch error: ",l instanceof Error?l.message:l),[]}}const m=e=>e.reduce((t,{webformatURL:s,largeImageURL:l,tags:r,likes:o,views:i,comments:b,downloads:L})=>t+`<li class="gallery-card">
              <a class="gallery-link" href="${l}">
                <img class="gallery-image" src="${s}" alt="${r}" loading="lazy" />
                <ul class="gallery-card-info">
                  <li>
                    <p>Likes</p>
                    <p>${o}</p>
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
            </li>`,"");let u,g;const h=new P("a.gallery-link",{captionDelay:250,overlayOpacity:.8}),a={form:document.querySelector(".js-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMore:document.querySelector(".js-load-more-btn"),lastPage:document.querySelector(".js-last-page-message")};a.form.addEventListener("submit",M);a.loadMore.addEventListener("click",S);async function M(e){e.preventDefault();const t=e.target.elements["user-query"].value.trim();if(t){n(a.loader),g=t;const{images:s,isNext:l}=await y(t);if(s!=null&&s.length)a.gallery.innerHTML=m(s),h.refresh(),l&&n(a.loadMore),c(a.loader),u=2,a.form.reset();else{d("Sorry, there are no images matching your search query. Please try again!"),c(a.loader);return}}else{d("Search query cannot be empty.");return}}async function S(){n(a.loader),c(a.loadMore);const{images:e,isNext:t}=await y(g,u);(e==null?void 0:e.length)===0?n(a.lastPage):e!=null&&e.length&&(a.gallery.insertAdjacentHTML("beforeend",m(e)),h.refresh(),n(t?a.loadMore:a.lastPage),w(),u++),c(a.loader)}function w(){const t=document.querySelector(".gallery-card").getBoundingClientRect().height+24;window.scrollBy({top:t*2,left:0,behavior:"smooth"})}function d(e){q.error({message:e,position:"topRight"})}function n(e){e.style.display="block"}function c(e){e.style.display="none"}
//# sourceMappingURL=index.js.map
