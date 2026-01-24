var M=Object.defineProperty;var T=(d,t,e)=>t in d?M(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var m=(d,t,e)=>T(d,typeof t!="symbol"?t+"":t,e);function _(d){const t=L(),e="/public/misc/windows98-icons/png/",r=document.createElement("div");r.className="win98-alert-overlay",r.style.cssText=`
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
	`;const o=document.createElement("div");o.className="win98-alert-dialog",o.style.cssText=`
		background: #C0C0C0;
		border: 2px outset #C0C0C0;
		border-color: #FFFFFF #808080 #808080 #FFFFFF;
		box-shadow: 2px 2px 0px 0px #000000;
		padding: 0;
		min-width: 300px;
		max-width: 400px;
		font-family: 'MS Sans Serif', Tahoma, Arial, sans-serif;
		z-index: 10001;
	`;const c=document.createElement("div");c.className="win98-alert-title",c.style.cssText=`
		background: linear-gradient(to bottom, #000080 0%, #1084D0 100%);
		border-bottom: 2px solid #000000;
		padding: 2px 4px;
		height: 18px;
		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-weight: 700;
		font-size: 11px;
		text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
	`;const a=document.createElement("img");a.src=t+e+"application_hourglass-0.png",a.alt="",a.width=16,a.height=16,a.style.marginRight="4px",a.style.verticalAlign="middle";const n=document.createTextNode(" Warning");c.appendChild(a),c.appendChild(n);const i=document.createElement("div");i.className="win98-alert-content",i.style.cssText=`
		padding: 16px;
		background: #C0C0C0;
		display: flex;
		align-items: flex-start;
		gap: 12px;
	`;const s=document.createElement("img");s.src=t+e+"application_hourglass-0.png",s.alt="Warning",s.width=32,s.height=32,s.style.cssText=`
		flex-shrink: 0;
	`;const l=document.createElement("div");l.style.cssText=`
		flex: 1;
		color: #000000;
		font-size: 11px;
		line-height: 1.5;
	`,l.textContent=d,i.appendChild(s),i.appendChild(l);const p=document.createElement("div");p.className="win98-alert-buttons",p.style.cssText=`
		padding: 8px 16px 16px;
		display: flex;
		justify-content: center;
		gap: 8px;
		background: #C0C0C0;
	`;const u=document.createElement("button");u.className="win98-alert-button",u.style.cssText=`
		background: #C0C0C0;
		border: 2px outset #C0C0C0;
		border-color: #FFFFFF #808080 #808080 #FFFFFF;
		color: #000000;
		font-family: 'MS Sans Serif', Tahoma;
		font-weight: 400;
		font-size: 11px;
		padding: 4px 20px;
		cursor: pointer;
		min-width: 75px;
		user-select: none;
	`,u.textContent="OK",u.addEventListener("mouseenter",()=>{u.style.background="#D4D4D4"}),u.addEventListener("mouseleave",()=>{u.style.background="#C0C0C0"}),u.addEventListener("mousedown",()=>{u.style.border="2px inset #C0C0C0",u.style.borderColor="#808080 #FFFFFF #FFFFFF #808080"}),u.addEventListener("mouseup",()=>{u.style.border="2px outset #C0C0C0",u.style.borderColor="#FFFFFF #808080 #808080 #FFFFFF",r.remove()}),u.addEventListener("click",f=>{f.stopPropagation(),r.remove()}),p.appendChild(u),o.appendChild(c),o.appendChild(i),o.appendChild(p),r.appendChild(o),document.body.appendChild(r),u.focus();const h=f=>{(f.key==="Enter"||f.key==="Escape")&&(r.remove(),document.removeEventListener("keydown",h))};document.addEventListener("keydown",h)}function S(){const d=document.querySelector(".landing-2000s-window"),t=(d==null?void 0:d.querySelector(".title-bar"))||document.querySelector(".window-title-bar");if(!d||!t||d.classList.contains("popup-window"))return;let e=!1,r=0,o=0,c=0,a=0,n=0,i=0;const s=localStorage.getItem("windowPosition");if(s)try{const{x:g,y:x}=JSON.parse(s);n=g,i=x,f(n,i,d)}catch(g){console.error("Error parsing saved window position:",g)}const l=d.querySelector(".window-close")||d.querySelector(".window-button.close");l&&l.addEventListener("click",()=>{_("Are you sure you want to close this window?")}),t.addEventListener("mousedown",p),document.addEventListener("mousemove",u),document.addEventListener("mouseup",h);function p(g){g.target instanceof HTMLElement&&(g.target.closest(".title-bar-controls")||g.target.closest(".window-button"))||(c=g.clientX-n,a=g.clientY-i,(g.target===t||t.contains(g.target))&&(e=!0,t.style.cursor="move"))}function u(g){e&&(g.preventDefault(),r=g.clientX-c,o=g.clientY-a,n=r,i=o,f(n,i,d))}function h(){c=r,a=o,e=!1,t.style.cursor="default",(n!==0||i!==0)&&localStorage.setItem("windowPosition",JSON.stringify({x:n,y:i}))}function f(g,x,D){D.style.transform=`translate(${g}px, ${x}px)`}}function I(d){return{portfolio:`
			<div class="window-body">
				<div class="content-section">
					<h2>My Portfolio</h2>
					<p>My current work:</p>
					<div style="margin: 10px 0; line-height: 1.8;">
						<p><strong>Lucyd</strong> - Wordpress/Woocommerce Developer - Shopify Developer<br>
						<em>March 2023 - Present (United States)</em></p>
					</div>
					<p style="margin-top: 12px;"><strong>Links:</strong></p>
					<div style="margin: 10px 0;">
						<p><a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer"><img src="" data-icon="network-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> LinkedIn</a></p>
					</div>
				</div>
			</div>
		`,contact:`
			<div class="window-body">
				<div class="content-section">
					<h2>Contact</h2>
					<p>You can contact me through:</p>
					<div style="margin: 10px 0; line-height: 1.8;">
						<p><strong><img src="" data-icon="mailbox_world-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> Email:</strong> <a href="mailto:reandimo23@gmail.com">reandimo23@gmail.com</a></p>
						<p><strong><img src="" data-icon="network-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> LinkedIn:</strong> <a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">linkedin.com/in/reandimo</a></p>
						<p><strong><img src="" data-icon="web_file-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> GitHub:</strong> <a href="https://github.com/reandimo" target="_blank" rel="noopener noreferrer">github.com/reandimo</a></p>
						<p><strong><img src="" data-icon="web_file-0.png" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;"> Nativo Team:</strong> <a href="https://nativo.team" target="_blank" rel="noopener noreferrer">nativo.team</a></p>
					</div>
				</div>
			</div>
		`,"gif-search":`
			<div class="window-body">
				<div class="content-section">
					<h2>GIF Search</h2>
					<div style="margin: 12px 0;">
						<label for="gif-search-input-WINDOW_ID_PLACEHOLDER" style="display: block; margin-bottom: 4px;">Search for a GIF:</label>
						<div style="display: flex; gap: 4px; margin-bottom: 12px;">
							<input type="text" id="gif-search-input-WINDOW_ID_PLACEHOLDER" placeholder="Enter search term..." style="flex: 1; padding: 4px;" />
							<button id="gif-search-button-WINDOW_ID_PLACEHOLDER">Search</button>
						</div>
						<div id="gif-loading-WINDOW_ID_PLACEHOLDER" style="display: none; margin: 12px 0;">
							<div style="display: flex; align-items: center; gap: 8px;">
								<img src="" data-icon="application_hourglass-0.png" alt="" width="16" height="16" style="vertical-align: middle;">
								<span>Searching...</span>
							</div>
						</div>
						<div id="gif-results-WINDOW_ID_PLACEHOLDER" style="margin-top: 12px;"></div>
					</div>
				</div>
			</div>
		`}[d]||'<div class="window-body"><p>Window content</p></div>'}const y=class y{constructor(){m(this,"windows",new Map);m(this,"zIndexCounter",1e3);m(this,"windowCounter",0);this.initShortcuts(),y.instance=this}static getInstance(){return y.instance}initShortcuts(){document.querySelectorAll(".shortcut-button").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-redirect-url");if(r){window.location.href=r;return}const o=e.getAttribute("data-window-id"),c=e.getAttribute("data-window-title")||"Nueva Ventana",a=e.getAttribute("data-window-icon")||"📄";o&&this.openWindow({id:o,title:c,icon:a,content:this.getWindowContent(o)})})})}getWindowContent(t){return I(t)}openWindow(t){if(this.windows.has(t.id)){this.bringToFront(t.id);return}this.windowCounter++;const e=`${t.id}-${this.windowCounter}`,r=this.zIndexCounter++,o=document.createElement("div");o.className="window landing-2000s-window popup-window",o.id=e,o.style.zIndex=r.toString(),o.style.position="fixed",o.style.left=`${100+this.windowCounter*30}px`,o.style.top=`${100+this.windowCounter*30}px`;const c=t.icon.includes(".png")||t.icon.includes(".jpg")||t.icon.includes(".svg")||t.icon.startsWith("http")||t.icon.startsWith("/");let a;c?t.icon.startsWith("http")||t.icon.startsWith("/")?a=`<img src="${t.icon}" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;">`:a=`<img src="" data-icon="${t.icon}" alt="" width="16" height="16" style="vertical-align: middle; margin-right: 4px;">`:a=t.icon;let n=t.content;n=n.replace(/WINDOW_ID_PLACEHOLDER/g,e),o.innerHTML=`
			<div class="title-bar">
				<div class="title-bar-text">
					${a}
					${t.title}
				</div>
				<div class="title-bar-controls">
					<button aria-label="Minimize" class="window-minimize">
						<span class="window-control-icon" aria-hidden="true">_</span>
					</button>
					<button aria-label="Maximize" class="window-maximize">
						<span class="window-control-icon" aria-hidden="true">□</span>
					</button>
					<button aria-label="Close" class="window-close">
						<span class="window-control-icon" aria-hidden="true">×</span>
					</button>
				</div>
			</div>
			<div class="window-menu-bar">
				<div class="menu-item">File</div>
				<div class="menu-item">Edit</div>
				<div class="menu-item">View</div>
				<div class="menu-item">Help</div>
			</div>
			${n}
		`;const i=document.querySelector(".landing-2000s-wrapper");i?i.appendChild(o):document.body.appendChild(o),this.windows.set(t.id,o),this.initWindowFunctionality(o,t.id),t.id==="gif-search"&&this.initGifSearch(o),k(),o.addEventListener("mousedown",()=>{this.bringToFront(t.id)})}initWindowFunctionality(t,e){const r=t.querySelector(".title-bar"),o=t.querySelector(".window-minimize"),c=t.querySelector(".window-maximize"),a=t.querySelector(".window-close");r&&this.initWindowDrag(t,r),o&&o.addEventListener("click",n=>{n.stopPropagation(),this.minimizeWindow(e)}),c&&c.addEventListener("click",n=>{n.stopPropagation(),this.toggleMaximize(t)}),a&&a.addEventListener("click",n=>{n.stopPropagation(),this.closeWindow(e)})}initWindowDrag(t,e){let r=!1,o=0,c=0,a=0,n=0,i=0,s=0;if(!t.style.left&&!t.style.top){const h=t.getBoundingClientRect();t.style.left=`${h.left}px`,t.style.top=`${h.top}px`}e.style.cursor="move";const l=h=>{if(h.target instanceof HTMLElement&&(h.target.closest(".title-bar-controls")||h.target.closest(".window-button"))||t.classList.contains("maximized"))return;const f=t.getBoundingClientRect();i=f.left,s=f.top,a=h.clientX-i,n=h.clientY-s,(h.target===e||e.contains(h.target))&&(r=!0,e.style.cursor="move",h.preventDefault())},p=h=>{r&&(h.preventDefault(),o=h.clientX-a,c=h.clientY-n,i=o,s=c,t.style.left=`${i}px`,t.style.top=`${s}px`,t.style.transform="none")},u=()=>{r&&(a=o,n=c,r=!1,e.style.cursor="move")};e.addEventListener("mousedown",l),document.addEventListener("mousemove",p),document.addEventListener("mouseup",u)}minimizeWindow(t){const e=this.windows.get(t);e&&(e.style.display="none")}toggleMaximize(t){if(t.classList.contains("maximized")){t.classList.remove("maximized"),t.style.width="",t.style.height="";const e=t.getBoundingClientRect();t.dataset.restoreLeft?(t.style.left=t.dataset.restoreLeft,t.style.top=t.dataset.restoreTop,delete t.dataset.restoreLeft,delete t.dataset.restoreTop):(t.style.left=`${e.left}px`,t.style.top=`${e.top}px`)}else{const e=t.style.left||`${t.getBoundingClientRect().left}px`,r=t.style.top||`${t.getBoundingClientRect().top}px`;t.dataset.restoreLeft=e,t.dataset.restoreTop=r,t.classList.add("maximized"),t.style.width="calc(100% - 40px)",t.style.height="calc(100% - 40px)",t.style.left="20px",t.style.top="20px"}}closeWindow(t){const e=this.windows.get(t);e&&(e.remove(),this.windows.delete(t))}bringToFront(t){const e=this.windows.get(t);e&&(this.zIndexCounter++,e.style.zIndex=this.zIndexCounter.toString())}initGifSearch(t){const e=t.id||"gif-search-1",r=t.querySelector(`#gif-search-input-${e}`),o=t.querySelector(`#gif-search-button-${e}`),c=t.querySelector(`#gif-loading-${e}`),a=t.querySelector(`#gif-results-${e}`);if(!r||!o||!c||!a)return;const n=c.querySelector("img[data-icon]");if(n){const s=L(),l=n.getAttribute("data-icon");l&&(n.src=s+"/public/misc/windows98-icons/png/"+l)}const i=async()=>{const s=r.value.trim();if(!s){a.innerHTML='<p style="color: #000000; margin: 8px 0;">Please enter a search term.</p>';return}c.style.display="block",a.innerHTML="",o.disabled=!0;try{const l=await fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${encodeURIComponent(s)}&limit=1&rating=g`);if(!l.ok)throw new Error("Failed to fetch GIF");const p=await l.json();if(c.style.display="none",o.disabled=!1,p.data&&p.data.length>0){const u=p.data[0],h=u.images.original.url;a.innerHTML=`
						<div style="margin: 12px 0;">
							<img src="${h}" alt="${u.title||s}" style="max-width: 100%; height: auto; border: 2px inset #C0C0C0; border-color: #808080 #FFFFFF #FFFFFF #808080;" />
							<p style="margin-top: 8px; color: #000000; font-size: 11px;">${u.title||s}</p>
						</div>
					`}else a.innerHTML='<p style="color: #000000; margin: 8px 0;">No GIFs found. Try a different search term.</p>'}catch(l){c.style.display="none",o.disabled=!1,a.innerHTML='<p style="color: #000000; margin: 8px 0;">Error searching for GIFs. Please try again.</p>',console.error("Error searching GIFs:",l)}};o.addEventListener("click",()=>{i()}),r.addEventListener("keypress",s=>{s.key==="Enter"&&i()})}static initializeAll(){new y}};m(y,"instance",null);let w=y;class v{constructor(){m(this,"startButton",null);m(this,"startMenu",null);m(this,"isOpen",!1);this.init()}init(){if(this.startButton=document.getElementById("start-button"),this.startMenu=document.getElementById("start-menu"),!this.startButton||!this.startMenu)return;this.startButton.addEventListener("click",e=>{e.stopPropagation(),this.toggleMenu()}),document.addEventListener("click",e=>{var r,o;this.isOpen&&!((r=this.startMenu)!=null&&r.contains(e.target))&&!((o=this.startButton)!=null&&o.contains(e.target))&&this.closeMenu()}),this.startMenu.querySelectorAll(".start-menu-item").forEach(e=>{e.addEventListener("click",r=>{r.stopPropagation();const o=e.getAttribute("data-action");o&&(this.handleMenuAction(o),this.closeMenu())})}),this.initClock(),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isOpen&&this.closeMenu()})}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}openMenu(){!this.startMenu||!this.startButton||(this.isOpen=!0,this.startMenu.classList.add("open"),this.startMenu.setAttribute("aria-hidden","false"),this.startButton.classList.add("active"),this.startButton.setAttribute("aria-expanded","true"))}closeMenu(){!this.startMenu||!this.startButton||(this.isOpen=!1,this.startMenu.classList.remove("open"),this.startMenu.setAttribute("aria-hidden","true"),this.startButton.classList.remove("active"),this.startButton.setAttribute("aria-expanded","false"))}handleMenuAction(t){switch(t){case"portfolio":this.openWindow("portfolio","Portfolio","briefcase-0.png");break;case"contact":this.openWindow("contact","Contact","address_book-0.png");break;case"blog":window.location.href="/blog/";break;case"github":window.open("https://github.com/reandimo","_blank","noopener,noreferrer");break;case"linkedin":window.open("https://www.linkedin.com/in/reandimo","_blank","noopener,noreferrer");break;case"email":window.location.href="mailto:reandimo23@gmail.com";break;case"shutdown":_("Are you sure you want to close this session?");break}}openWindow(t,e,r){const o=document.querySelector(`.shortcut-button[data-window-id="${t}"]`);if(o){o.click();return}const c=w.getInstance();c&&c.openWindow({id:t,title:e,icon:r,content:this.getWindowContent(t)})}getWindowContent(t){return I(t)}initClock(){const t=document.getElementById("taskbar-clock");if(!t)return;const e=()=>{const r=new Date,o=r.getHours().toString().padStart(2,"0"),c=r.getMinutes().toString().padStart(2,"0");t.textContent=`${o}:${c}`};e(),setInterval(e,6e4)}static initializeAll(){new v}}function L(){const d=Array.from(document.styleSheets);for(const t of d)try{if(t.href&&t.href.includes("wp-content/themes/")){const e=t.href.match(/(.*\/wp-content\/themes\/[^/]+)/);if(e)return e[1]}}catch{continue}return window.location.origin+"/wp-content/themes/personal-wp"}function k(){const d=L(),t="/public/misc/windows98-icons/png/";document.querySelectorAll("img[data-icon]").forEach(c=>{const a=c.getAttribute("data-icon");a&&(c.src=d+t+a)}),document.querySelectorAll("[data-window-icon]").forEach(c=>{const a=c.getAttribute("data-window-icon");a&&!a.startsWith("http")&&!a.startsWith("/")&&c.setAttribute("data-window-icon",d+t+a)}),new MutationObserver(c=>{c.forEach(a=>{a.addedNodes.forEach(n=>{n instanceof HTMLElement&&n.querySelectorAll("img[data-icon]").forEach(s=>{const l=s.getAttribute("data-icon");l&&(s.src=d+t+l)})})})}).observe(document.body,{childList:!0,subtree:!0})}var A=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function W(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var F={exports:{}};(function(d,t){(function(e,r){var o=function(a){if(typeof a.document!="object")throw new Error("Cookies.js requires a `window` with a `document` object");var n=function(i,s,l){return arguments.length===1?n.get(i):n.set(i,s,l)};return n._document=a.document,n._cacheKeyPrefix="cookey.",n._maxExpireDate=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),n.defaults={path:"/",secure:!1},n.get=function(i){n._cachedDocumentCookie!==n._document.cookie&&n._renewCache();var s=n._cache[n._cacheKeyPrefix+i];return s===r?r:decodeURIComponent(s)},n.set=function(i,s,l){return l=n._getExtendedOptions(l),l.expires=n._getExpiresDate(s===r?-1:l.expires),n._document.cookie=n._generateCookieString(i,s,l),n},n.expire=function(i,s){return n.set(i,r,s)},n._getExtendedOptions=function(i){return{path:i&&i.path||n.defaults.path,domain:i&&i.domain||n.defaults.domain,expires:i&&i.expires||n.defaults.expires,secure:i&&i.secure!==r?i.secure:n.defaults.secure}},n._isValidDate=function(i){return Object.prototype.toString.call(i)==="[object Date]"&&!isNaN(i.getTime())},n._getExpiresDate=function(i,s){if(s=s||new Date,typeof i=="number"?i=i===1/0?n._maxExpireDate:new Date(s.getTime()+i*1e3):typeof i=="string"&&(i=new Date(i)),i&&!n._isValidDate(i))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return i},n._generateCookieString=function(i,s,l){i=i.replace(/[^#$&+\^`|]/g,encodeURIComponent),i=i.replace(/\(/g,"%28").replace(/\)/g,"%29"),s=(s+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent),l=l||{};var p=i+"="+s;return p+=l.path?";path="+l.path:"",p+=l.domain?";domain="+l.domain:"",p+=l.expires?";expires="+l.expires.toUTCString():"",p+=l.secure?";secure":"",p},n._getCacheFromString=function(i){for(var s={},l=i?i.split("; "):[],p=0;p<l.length;p++){var u=n._getKeyValuePairFromCookieString(l[p]);s[n._cacheKeyPrefix+u.key]===r&&(s[n._cacheKeyPrefix+u.key]=u.value)}return s},n._getKeyValuePairFromCookieString=function(i){var s=i.indexOf("=");s=s<0?i.length:s;var l=i.substr(0,s),p;try{p=decodeURIComponent(l)}catch(u){console&&typeof console.error=="function"&&console.error('Could not decode cookie with key "'+l+'"',u)}return{key:p,value:i.substr(s+1)}},n._renewCache=function(){n._cache=n._getCacheFromString(n._document.cookie),n._cachedDocumentCookie=n._document.cookie},n._areEnabled=function(){var i="cookies.js",s=n.set(i,1).get(i)==="1";return n.expire(i),s},n.enabled=n._areEnabled(),n},c=e&&typeof e.document=="object"?o(e):o;t=d.exports=c,t.Cookies=c})(typeof window>"u"?A:window)})(F,F.exports);var z=F.exports;const b=W(z);class O{constructor(){m(this,"audio",null);m(this,"soundUrl");m(this,"cookieName","win98_startup_sound_played");m(this,"isEnabled",!0);this.soundUrl=window.location.origin+"/wp-content/themes/personal-wp/public/misc/win95.mp3",this.initAudio(),this.createSoundToggleButton()}initAudio(){try{this.audio=new Audio(this.soundUrl),this.audio.volume=.5,this.audio.preload="auto"}catch(t){console.error("Error creating audio element:",t)}}createSoundToggleButton(){const t=document.createElement("button");t.className="sound-toggle-button",t.setAttribute("aria-label","Toggle startup sound"),t.innerHTML="🔊",b.get(this.cookieName)==="true"&&(this.isEnabled=!1,t.innerHTML="🔇",t.classList.add("disabled")),t.addEventListener("click",()=>{this.toggleSound(),t.innerHTML=this.isEnabled?"🔊":"🔇",t.classList.toggle("disabled",!this.isEnabled)}),document.body.appendChild(t)}toggleSound(){this.isEnabled=!this.isEnabled,this.isEnabled?(b.expire(this.cookieName),this.playSound()):b.set(this.cookieName,"true",{expires:31536e3})}playSound(){if(b.get(this.cookieName)==="true"&&!this.isEnabled||(this.audio||this.initAudio(),!this.audio))return;let e=!1;const r=()=>{!this.audio||e||this.audio.play().then(()=>{e=!0,b.set(this.cookieName,"true",{expires:31536e3}),this.isEnabled=!1;const o=document.querySelector(".sound-toggle-button");o&&(o.innerHTML="🔇",o.classList.add("disabled")),console.log("Windows 98 startup sound played")}).catch(o=>{console.log("Could not play sound:",o)})};if(r(),!e){const o=["click","keydown","mousedown","touchstart"],c=()=>{r(),o.forEach(a=>{document.removeEventListener(a,c)})};o.forEach(a=>{document.addEventListener(a,c,{once:!0,passive:!0})})}}}let C=null;function E(){C||(C=new O),C.playSound()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{k(),S(),w.initializeAll(),v.initializeAll(),E()}):(k(),S(),w.initializeAll(),v.initializeAll(),E());
