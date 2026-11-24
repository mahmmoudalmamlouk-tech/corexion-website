(function(){
  var MQ=820, built=false;
  var LINKS=[["Home","index.html"],["Who We Are","who-we-are.html"],["Services","services.html"],["Sectors","sectors.html"],["Projects","projects.html"],["Insights","insights.html"],["Contact","contact.html"]];
  function build(){
    if(built)return; built=true;
    var h=document.querySelector('#page header'); if(!h)return;
    var b=document.createElement('button'); b.className='mburger'; b.setAttribute('aria-label','Open menu'); b.innerHTML='<span></span><span></span><span></span>';
    h.appendChild(b);
    var m=document.createElement('div'); m.className='mmenu';
    var here=location.pathname.split('/').pop()||'index.html';
    var html=LINKS.map(function(l){var cur=(here===l[1])||(l[1]==='insights.html'&&here.indexOf('article-')===0);return '<a href="'+l[1]+'"'+(cur?' class="cur"':'')+'><span>'+l[0]+'</span><span>›</span></a>'}).join('');
    html+='<a class="cta" href="contact.html">Let\'s talk ›</a><div class="mmail">EMAIL US<b>info@corexion.uk</b></div>';
    m.innerHTML=html; document.body.appendChild(m);
    [].forEach.call(m.querySelectorAll('a'),function(a){a.addEventListener('click',function(e){e.stopImmediatePropagation();},true)});
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var o=m.classList.toggle('open');b.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';});
  }
  function apply(){
    var mob=window.innerWidth<=MQ; document.body.classList.toggle('m',mob);
    if(mob){build();setTimeout(function(){fitHero(false)},30);var p=document.getElementById('page'),w=document.getElementById('wrap');
      p.style.transform='none';p.style.width='100%';if(p.firstElementChild)p.firstElementChild.style.width='100%';w.style.height='auto';}
    else{var m=document.querySelector('.mmenu');if(m){m.classList.remove('open');document.body.style.overflow='';}}
  }

  var lastW=0;
  function fitHero(force){
    if(!document.body.classList.contains('m'))return;
    var img=document.querySelector('#page img[alt^="Big Ben"]'); if(!img)return;
    var hero=img.closest('section'), strip=document.querySelector('#page section[data-st]'), hdr=document.querySelector('#page header');
    if(!hero||!strip||!hdr)return;
    if(!force&&window.innerWidth===lastW)return; lastW=window.innerWidth;
    var y=window.scrollY; var hb=hdr.getBoundingClientRect().bottom+y;
    // use the SMALL viewport (browser toolbars shown) so the hero + strip always fit, and never resize while scrolling
    var pr=document.createElement('div'); pr.style.cssText='position:fixed;top:0;left:0;width:1px;height:100svh;visibility:hidden;pointer-events:none';
    document.body.appendChild(pr); var sv=pr.offsetHeight; pr.remove();
    var vh=Math.min(window.innerHeight, sv>0?sv:window.innerHeight);
    var avail=vh-hb-strip.offsetHeight;
    hero.style.setProperty('min-height',Math.max(280,Math.round(avail))+'px','important');
  }
  window.addEventListener('load',function(){setTimeout(function(){fitHero(true)},50)});
  window.addEventListener('orientationchange',function(){setTimeout(function(){fitHero(true)},300)});
  window.addEventListener('resize',function(){setTimeout(function(){fitHero(false)},60)});
  window.__mobile=apply;
  window.addEventListener('resize',function(){setTimeout(apply,0)});
  window.addEventListener('load',function(){setTimeout(apply,0)});
  apply();
})();
