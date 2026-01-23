var E=Object.defineProperty;var _=(l,t,n)=>t in l?E(l,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[t]=n;var g=(l,t,n)=>_(l,typeof t!="symbol"?t+"":t,n);function S(l){const t=document.createElement("div");t.className="win98-alert-overlay",t.style.cssText=`
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
	`;const n=document.createElement("div");n.className="win98-alert-dialog",n.style.cssText=`
		background: #C0C0C0;
		border: 2px outset #C0C0C0;
		border-color: #FFFFFF #808080 #808080 #FFFFFF;
		box-shadow: 2px 2px 0px 0px #000000;
		padding: 0;
		min-width: 300px;
		max-width: 400px;
		font-family: 'MS Sans Serif', Tahoma, Arial, sans-serif;
		z-index: 10001;
	`;const r=document.createElement("div");r.className="win98-alert-title",r.style.cssText=`
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
	`,r.textContent="⚠️ Warning";const i=document.createElement("div");i.className="win98-alert-content",i.style.cssText=`
		padding: 16px;
		background: #C0C0C0;
		display: flex;
		align-items: flex-start;
		gap: 12px;
	`;const c=document.createElement("div");c.style.cssText=`
		font-size: 32px;
		line-height: 1;
		flex-shrink: 0;
	`,c.textContent="⚠️";const d=document.createElement("div");d.style.cssText=`
		flex: 1;
		color: #000000;
		font-size: 11px;
		line-height: 1.5;
	`,d.textContent=l,i.appendChild(c),i.appendChild(d);const o=document.createElement("div");o.className="win98-alert-buttons",o.style.cssText=`
		padding: 8px 16px 16px;
		display: flex;
		justify-content: center;
		gap: 8px;
		background: #C0C0C0;
	`;const e=document.createElement("button");e.className="win98-alert-button",e.style.cssText=`
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
	`,e.textContent="OK",e.addEventListener("mouseenter",()=>{e.style.background="#D4D4D4"}),e.addEventListener("mouseleave",()=>{e.style.background="#C0C0C0"}),e.addEventListener("mousedown",()=>{e.style.border="2px inset #C0C0C0",e.style.borderColor="#808080 #FFFFFF #FFFFFF #808080"}),e.addEventListener("mouseup",()=>{e.style.border="2px outset #C0C0C0",e.style.borderColor="#FFFFFF #808080 #808080 #FFFFFF",t.remove()}),e.addEventListener("click",a=>{a.stopPropagation(),t.remove()}),o.appendChild(e),n.appendChild(r),n.appendChild(i),n.appendChild(o),t.appendChild(n),document.body.appendChild(t),e.focus();const s=a=>{(a.key==="Enter"||a.key==="Escape")&&(t.remove(),document.removeEventListener("keydown",s))};document.addEventListener("keydown",s)}function F(){const l=document.querySelector(".landing-2000s-window"),t=document.querySelector(".window-title-bar");if(!l||!t||l.classList.contains("popup-window"))return;let n=!1,r=0,i=0,c=0,d=0,o=0,e=0;const s=localStorage.getItem("windowPosition");if(s)try{const{x:h,y:x}=JSON.parse(s);o=h,e=x,y(o,e,l)}catch(h){console.error("Error parsing saved window position:",h)}const a=l.querySelector(".window-button.close");a&&a.addEventListener("click",()=>{S("Are you sure you want to close this window?")}),t.addEventListener("mousedown",u),document.addEventListener("mousemove",m),document.addEventListener("mouseup",p);function u(h){h.target instanceof HTMLElement&&h.target.closest(".window-button")||(c=h.clientX-o,d=h.clientY-e,(h.target===t||t.contains(h.target))&&(n=!0,t.style.cursor="move"))}function m(h){n&&(h.preventDefault(),r=h.clientX-c,i=h.clientY-d,o=r,e=i,y(o,e,l))}function p(){c=r,d=i,n=!1,t.style.cursor="default",(o!==0||e!==0)&&localStorage.setItem("windowPosition",JSON.stringify({x:o,y:e}))}function y(h,x,M){M.style.transform=`translate(${h}px, ${x}px)`}}const f=class f{constructor(){g(this,"windows",new Map);g(this,"zIndexCounter",1e3);g(this,"windowCounter",0);this.initShortcuts(),f.instance=this}static getInstance(){return f.instance}initShortcuts(){document.querySelectorAll(".shortcut-button").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-redirect-url");if(r){window.location.href=r;return}const i=n.getAttribute("data-window-id"),c=n.getAttribute("data-window-title")||"Nueva Ventana",d=n.getAttribute("data-window-icon")||"📄";i&&this.openWindow({id:i,title:c,icon:d,content:this.getWindowContent(i)})})})}getWindowContent(t){return{portfolio:`
				<div class="window-content">
					<div class="content-section">
						<h2>My Portfolio</h2>
						<p>My current work:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>Lucyd</strong> - Wordpress/Woocommerce Developer - Shopify Developer<br>
							<em>March 2023 - Present (United States)</em></p>
						</div>
						<p style="margin-top: 12px;"><strong>Links:</strong></p>
						<div style="margin: 10px 0;">
							<p><a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a></p>
						</div>
					</div>
				</div>
			`,contact:`
				<div class="window-content">
					<div class="content-section">
						<h2>Contact</h2>
						<p>You can contact me through:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>📧 Email:</strong> <a href="mailto:reandimo2@hotmail.com">reandimo2@hotmail.com</a></p>
							<p><strong>💼 LinkedIn:</strong> <a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">linkedin.com/in/reandimo</a></p>
							<p><strong>🐙 GitHub:</strong> <a href="https://github.com/reandimo" target="_blank" rel="noopener noreferrer">github.com/reandimo</a></p>
							<p><strong>🌐 Personal Website:</strong> <a href="https://reandimo.dev" target="_blank" rel="noopener noreferrer">reandimo.dev</a></p>
							<p><strong>👥 Nativo Team:</strong> <a href="https://nativo.team" target="_blank" rel="noopener noreferrer">nativo.team</a></p>
							<p><strong>📍 Location:</strong> Buenos Aires, Buenos Aires Province, Argentina</p>
						</div>
					</div>
				</div>
			`}[t]||'<div class="window-content"><p>Window content</p></div>'}openWindow(t){if(this.windows.has(t.id)){this.bringToFront(t.id);return}this.windowCounter++;const n=`${t.id}-${this.windowCounter}`,r=this.zIndexCounter++,i=document.createElement("div");i.className="landing-2000s-window popup-window",i.id=n,i.style.zIndex=r.toString(),i.style.position="fixed",i.style.left=`${100+this.windowCounter*30}px`,i.style.top=`${100+this.windowCounter*30}px`,i.innerHTML=`
			<div class="window-title-bar">
				<div class="title-bar-left">
					<div class="window-icon">${t.icon}</div>
					<div class="window-title-text">${t.title}</div>
				</div>
				<div class="title-bar-right">
					<button class="window-button minimize" aria-label="Minimize">_</button>
					<button class="window-button maximize" aria-label="Maximize">□</button>
					<button class="window-button close" aria-label="Close">×</button>
				</div>
			</div>
			<div class="window-menu-bar">
				<div class="menu-item">File</div>
				<div class="menu-item">Edit</div>
				<div class="menu-item">View</div>
				<div class="menu-item">Help</div>
			</div>
			${t.content}
		`;const c=document.querySelector(".landing-2000s-wrapper");c?c.appendChild(i):document.body.appendChild(i),this.windows.set(t.id,i),this.initWindowFunctionality(i,t.id),i.addEventListener("mousedown",()=>{this.bringToFront(t.id)})}initWindowFunctionality(t,n){const r=t.querySelector(".window-title-bar"),i=t.querySelector(".window-button.minimize"),c=t.querySelector(".window-button.maximize"),d=t.querySelector(".window-button.close");r&&this.initWindowDrag(t,r),i&&i.addEventListener("click",o=>{o.stopPropagation(),this.minimizeWindow(n)}),c&&c.addEventListener("click",o=>{o.stopPropagation(),this.toggleMaximize(t)}),d&&d.addEventListener("click",o=>{o.stopPropagation(),this.closeWindow(n)})}initWindowDrag(t,n){let r=!1,i=0,c=0,d=0,o=0,e=0,s=0;if(!t.style.left&&!t.style.top){const p=t.getBoundingClientRect();t.style.left=`${p.left}px`,t.style.top=`${p.top}px`}n.style.cursor="move";const a=p=>{if(p.target instanceof HTMLElement&&p.target.closest(".window-button")||t.classList.contains("maximized"))return;const y=t.getBoundingClientRect();e=y.left,s=y.top,d=p.clientX-e,o=p.clientY-s,(p.target===n||n.contains(p.target))&&(r=!0,n.style.cursor="move",p.preventDefault())},u=p=>{r&&(p.preventDefault(),i=p.clientX-d,c=p.clientY-o,e=i,s=c,t.style.left=`${e}px`,t.style.top=`${s}px`,t.style.transform="none")},m=()=>{r&&(d=i,o=c,r=!1,n.style.cursor="move")};n.addEventListener("mousedown",a),document.addEventListener("mousemove",u),document.addEventListener("mouseup",m)}minimizeWindow(t){const n=this.windows.get(t);n&&(n.style.display="none")}toggleMaximize(t){if(t.classList.contains("maximized")){t.classList.remove("maximized"),t.style.width="",t.style.height="";const n=t.getBoundingClientRect();t.dataset.restoreLeft?(t.style.left=t.dataset.restoreLeft,t.style.top=t.dataset.restoreTop,delete t.dataset.restoreLeft,delete t.dataset.restoreTop):(t.style.left=`${n.left}px`,t.style.top=`${n.top}px`)}else{const n=t.style.left||`${t.getBoundingClientRect().left}px`,r=t.style.top||`${t.getBoundingClientRect().top}px`;t.dataset.restoreLeft=n,t.dataset.restoreTop=r,t.classList.add("maximized"),t.style.width="calc(100% - 40px)",t.style.height="calc(100% - 40px)",t.style.left="20px",t.style.top="20px"}}closeWindow(t){const n=this.windows.get(t);n&&(n.remove(),this.windows.delete(t))}bringToFront(t){const n=this.windows.get(t);n&&(this.zIndexCounter++,n.style.zIndex=this.zIndexCounter.toString())}static initializeAll(){new f}};g(f,"instance",null);let w=f;class b{constructor(){g(this,"startButton",null);g(this,"startMenu",null);g(this,"isOpen",!1);this.init()}init(){if(this.startButton=document.getElementById("start-button"),this.startMenu=document.getElementById("start-menu"),!this.startButton||!this.startMenu)return;this.startButton.addEventListener("click",n=>{n.stopPropagation(),this.toggleMenu()}),document.addEventListener("click",n=>{var r,i;this.isOpen&&!((r=this.startMenu)!=null&&r.contains(n.target))&&!((i=this.startButton)!=null&&i.contains(n.target))&&this.closeMenu()}),this.startMenu.querySelectorAll(".start-menu-item").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation();const i=n.getAttribute("data-action");i&&(this.handleMenuAction(i),this.closeMenu())})}),this.initClock(),document.addEventListener("keydown",n=>{n.key==="Escape"&&this.isOpen&&this.closeMenu()})}toggleMenu(){this.isOpen?this.closeMenu():this.openMenu()}openMenu(){!this.startMenu||!this.startButton||(this.isOpen=!0,this.startMenu.classList.add("open"),this.startMenu.setAttribute("aria-hidden","false"),this.startButton.classList.add("active"),this.startButton.setAttribute("aria-expanded","true"))}closeMenu(){!this.startMenu||!this.startButton||(this.isOpen=!1,this.startMenu.classList.remove("open"),this.startMenu.setAttribute("aria-hidden","true"),this.startButton.classList.remove("active"),this.startButton.setAttribute("aria-expanded","false"))}handleMenuAction(t){switch(t){case"portfolio":this.openWindow("portfolio","Portfolio","📂");break;case"contact":this.openWindow("contact","Contact","✉️");break;case"blog":window.location.href="/blog/";break;case"github":window.open("https://github.com/reandimo","_blank","noopener,noreferrer");break;case"linkedin":window.open("https://www.linkedin.com/in/reandimo","_blank","noopener,noreferrer");break;case"email":window.location.href="mailto:reandimo2@hotmail.com";break;case"shutdown":S("Are you sure you want to close this session?");break}}openWindow(t,n,r){const i=document.querySelector(`.shortcut-button[data-window-id="${t}"]`);if(i){i.click();return}const c=w.getInstance();c&&c.openWindow({id:t,title:n,icon:r,content:this.getWindowContent(t)})}getWindowContent(t){return{portfolio:`
				<div class="window-content">
					<div class="content-section">
						<h2>My Portfolio</h2>
						<p>My current work:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>Lucyd</strong> - Wordpress/Woocommerce Developer - Shopify Developer<br>
							<em>March 2023 - Present (United States)</em></p>
						</div>
						<p style="margin-top: 12px;"><strong>Links:</strong></p>
						<div style="margin: 10px 0;">
							<p><a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a></p>
						</div>
					</div>
				</div>
			`,contact:`
				<div class="window-content">
					<div class="content-section">
						<h2>Contact</h2>
						<p>You can contact me through:</p>
						<div style="margin: 10px 0; line-height: 1.8;">
							<p><strong>📧 Email:</strong> <a href="mailto:reandimo2@hotmail.com">reandimo2@hotmail.com</a></p>
							<p><strong>💼 LinkedIn:</strong> <a href="https://www.linkedin.com/in/reandimo" target="_blank" rel="noopener noreferrer">linkedin.com/in/reandimo</a></p>
							<p><strong>🐙 GitHub:</strong> <a href="https://github.com/reandimo" target="_blank" rel="noopener noreferrer">github.com/reandimo</a></p>
							<p><strong>🌐 Personal Website:</strong> <a href="https://reandimo.dev" target="_blank" rel="noopener noreferrer">reandimo.dev</a></p>
							<p><strong>👥 Nativo Team:</strong> <a href="https://nativo.team" target="_blank" rel="noopener noreferrer">nativo.team</a></p>
							<p><strong>📍 Location:</strong> Buenos Aires, Buenos Aires Province, Argentina</p>
						</div>
					</div>
				</div>
			`}[t]||'<div class="window-content"><p>Window content</p></div>'}initClock(){const t=document.getElementById("taskbar-clock");if(!t)return;const n=()=>{const r=new Date,i=r.getHours().toString().padStart(2,"0"),c=r.getMinutes().toString().padStart(2,"0");t.textContent=`${i}:${c}`};n(),setInterval(n,6e4)}static initializeAll(){new b}}var T=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function A(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var k={exports:{}};(function(l,t){(function(n,r){var i=function(d){if(typeof d.document!="object")throw new Error("Cookies.js requires a `window` with a `document` object");var o=function(e,s,a){return arguments.length===1?o.get(e):o.set(e,s,a)};return o._document=d.document,o._cacheKeyPrefix="cookey.",o._maxExpireDate=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),o.defaults={path:"/",secure:!1},o.get=function(e){o._cachedDocumentCookie!==o._document.cookie&&o._renewCache();var s=o._cache[o._cacheKeyPrefix+e];return s===r?r:decodeURIComponent(s)},o.set=function(e,s,a){return a=o._getExtendedOptions(a),a.expires=o._getExpiresDate(s===r?-1:a.expires),o._document.cookie=o._generateCookieString(e,s,a),o},o.expire=function(e,s){return o.set(e,r,s)},o._getExtendedOptions=function(e){return{path:e&&e.path||o.defaults.path,domain:e&&e.domain||o.defaults.domain,expires:e&&e.expires||o.defaults.expires,secure:e&&e.secure!==r?e.secure:o.defaults.secure}},o._isValidDate=function(e){return Object.prototype.toString.call(e)==="[object Date]"&&!isNaN(e.getTime())},o._getExpiresDate=function(e,s){if(s=s||new Date,typeof e=="number"?e=e===1/0?o._maxExpireDate:new Date(s.getTime()+e*1e3):typeof e=="string"&&(e=new Date(e)),e&&!o._isValidDate(e))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return e},o._generateCookieString=function(e,s,a){e=e.replace(/[^#$&+\^`|]/g,encodeURIComponent),e=e.replace(/\(/g,"%28").replace(/\)/g,"%29"),s=(s+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent),a=a||{};var u=e+"="+s;return u+=a.path?";path="+a.path:"",u+=a.domain?";domain="+a.domain:"",u+=a.expires?";expires="+a.expires.toUTCString():"",u+=a.secure?";secure":"",u},o._getCacheFromString=function(e){for(var s={},a=e?e.split("; "):[],u=0;u<a.length;u++){var m=o._getKeyValuePairFromCookieString(a[u]);s[o._cacheKeyPrefix+m.key]===r&&(s[o._cacheKeyPrefix+m.key]=m.value)}return s},o._getKeyValuePairFromCookieString=function(e){var s=e.indexOf("=");s=s<0?e.length:s;var a=e.substr(0,s),u;try{u=decodeURIComponent(a)}catch(m){console&&typeof console.error=="function"&&console.error('Could not decode cookie with key "'+a+'"',m)}return{key:u,value:e.substr(s+1)}},o._renewCache=function(){o._cache=o._getCacheFromString(o._document.cookie),o._cachedDocumentCookie=o._document.cookie},o._areEnabled=function(){var e="cookies.js",s=o.set(e,1).get(e)==="1";return o.expire(e),s},o.enabled=o._areEnabled(),o},c=n&&typeof n.document=="object"?i(n):i;t=l.exports=c,t.Cookies=c})(typeof window>"u"?T:window)})(k,k.exports);var z=k.exports;const v=A(z);class D{constructor(){g(this,"audio",null);g(this,"soundUrl");g(this,"cookieName","win98_startup_sound_played");g(this,"isEnabled",!0);this.soundUrl=window.location.origin+"/wp-content/themes/personal-wp/public/misc/win95.mp3",this.initAudio(),this.createSoundToggleButton()}initAudio(){try{this.audio=new Audio(this.soundUrl),this.audio.volume=.5,this.audio.preload="auto"}catch(t){console.error("Error creating audio element:",t)}}createSoundToggleButton(){const t=document.createElement("button");t.className="sound-toggle-button",t.setAttribute("aria-label","Toggle startup sound"),t.innerHTML="🔊",v.get(this.cookieName)==="true"&&(this.isEnabled=!1,t.innerHTML="🔇",t.classList.add("disabled")),t.addEventListener("click",()=>{this.toggleSound(),t.innerHTML=this.isEnabled?"🔊":"🔇",t.classList.toggle("disabled",!this.isEnabled)}),document.body.appendChild(t)}toggleSound(){this.isEnabled=!this.isEnabled,this.isEnabled?(v.expire(this.cookieName),this.playSound()):v.set(this.cookieName,"true",{expires:31536e3})}playSound(){if(v.get(this.cookieName)==="true"&&!this.isEnabled||(this.audio||this.initAudio(),!this.audio))return;let n=!1;const r=()=>{!this.audio||n||this.audio.play().then(()=>{n=!0,v.set(this.cookieName,"true",{expires:31536e3}),this.isEnabled=!1;const i=document.querySelector(".sound-toggle-button");i&&(i.innerHTML="🔇",i.classList.add("disabled")),console.log("Windows 98 startup sound played")}).catch(i=>{console.log("Could not play sound:",i)})};if(r(),!n){const i=["click","keydown","mousedown","touchstart"],c=()=>{r(),i.forEach(d=>{document.removeEventListener(d,c)})};i.forEach(d=>{document.addEventListener(d,c,{once:!0,passive:!0})})}}}let C=null;function L(){C||(C=new D),C.playSound()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{F(),w.initializeAll(),b.initializeAll(),L()}):(F(),w.initializeAll(),b.initializeAll(),L());
