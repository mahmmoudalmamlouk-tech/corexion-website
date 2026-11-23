(function(){
  var first=document.querySelector('#page [style*="flex: 0 0 560px"]'); if(!first)return;
  var track=first.parentElement, sec=track.closest('section');
  var dotsBox=track.nextElementSibling; var dots=dotsBox?[].slice.call(dotsBox.children):[];
  var cards=[].slice.call(track.children);
  track.style.overflowX='auto'; track.style.scrollSnapType='x mandatory'; track.style.scrollBehavior='smooth';
  track.style.scrollbarWidth='none'; track.style.paddingRight='64px'; track.classList.add('cx-track');
  var st=document.createElement('style'); st.textContent='.cx-track::-webkit-scrollbar{display:none}.cx-track>div{scroll-snap-align:start}.cx-dot{cursor:pointer;transition:width .25s,background .25s}';
  document.head.appendChild(st);
  dots.forEach(function(d,i){d.classList.add('cx-dot');d.setAttribute('role','button');d.setAttribute('aria-label','Show project '+(i+1));
    d.addEventListener('click',function(){go(i);restart();});});
  function step(){return cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:cards[0].offsetWidth}
  function idx(){var max=track.scrollWidth-track.clientWidth;if(track.scrollLeft>=max-4)return npos()-1;return Math.round(track.scrollLeft/step())}
  function npos(){var max=track.scrollWidth-track.clientWidth;return Math.max(1,Math.ceil(max/step()-0.05)+1)}
  function paint(){var k=idx(),n=npos();if(k>=n)k=n-1;dots.forEach(function(d,i){d.style.display=i<n?'':'none';d.style.width=(i===k?'28px':'8px');d.style.background=(i===k?'#0B3A70':'rgba(11,58,112,0.18)')})}
  function go(i){track.scrollTo({left:Math.min(i*step(),track.scrollWidth-track.clientWidth)})}
  track.addEventListener('scroll',function(){window.requestAnimationFrame(paint)});
  var timer=null,paused=false;
  function next(){if(paused)return;var max=track.scrollWidth-track.clientWidth;if(track.scrollLeft>=max-4)go(0);else go(idx()+1)}
  function restart(){clearInterval(timer);timer=setInterval(next,5000)}
  sec.addEventListener('mouseenter',function(){paused=true});sec.addEventListener('mouseleave',function(){paused=false});
  track.addEventListener('touchstart',function(){paused=true;restart()},{passive:true});
  track.addEventListener('touchend',function(){setTimeout(function(){paused=false},4000)},{passive:true});
  // drag with the mouse on desktop
  var down=false,sx=0,sl=0,moved=false;
  track.addEventListener('mousedown',function(e){down=true;moved=false;sx=e.pageX;sl=track.scrollLeft;track.style.scrollSnapType='none';track.style.scrollBehavior='auto';track.style.cursor='grabbing';e.preventDefault()});
  window.addEventListener('mousemove',function(e){if(!down)return;var dx=e.pageX-sx;if(Math.abs(dx)>4)moved=true;track.scrollLeft=sl-dx});
  window.addEventListener('mouseup',function(){if(!down)return;down=false;track.style.cursor='';track.style.scrollBehavior='smooth';var k=idx();track.style.scrollSnapType='x mandatory';go(k)});
  track.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation()}},true);
  track.style.cursor='grab';
  window.addEventListener('resize',paint);paint();restart();
})();
