// Filters (Projects / Insights)
document.querySelectorAll('nav[aria-label^="Filter"]').forEach(function(nav){
  var chips=nav.querySelectorAll('a');
  var items=document.querySelectorAll('[data-cat]');
  chips.forEach(function(chip,i){
    chip.addEventListener('click',function(e){
      e.preventDefault();
      var key=chip.textContent.trim().toLowerCase().replace('&amp;','&');
      chips.forEach(function(c){c.removeAttribute('aria-current');c.style.background='#FFFFFF';c.style.color='#0B3A70';c.style.borderColor='#C9D6EA';});
      chip.setAttribute('aria-current','true');chip.style.background='#0B3A70';chip.style.color='#FFFFFF';chip.style.borderColor='#0B3A70';
      items.forEach(function(it){
        var cat=it.getAttribute('data-cat');
        if(i===0||cat.indexOf(key)!==-1){it.removeAttribute('data-hidden');}else{it.setAttribute('data-hidden','');}
      });
    });
  });
});
// Contact form -> opens email to info@corexion.uk
var f=document.getElementById('enquiry');
if(f){f.addEventListener('submit',function(e){
  e.preventDefault();
  var v=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
  var body='Name: '+v('name')+'\nCompany: '+v('company')+'\nEmail: '+v('email')+'\nPhone: '+v('phone')+'\nArea of interest: '+v('service')+'\nProject stage: '+v('stage')+'\nAsset type and location: '+v('asset')+'\n\n'+v('message');
  window.location.href='mailto:info@corexion.uk?subject='+encodeURIComponent('Project enquiry - '+(v('company')||v('name')))+'&body='+encodeURIComponent(body);
  if(!f.querySelector('.form-note')){var n=document.createElement('p');n.className='form-note';n.textContent='Your email app should open with the enquiry ready to send. If it does not, email us at info@corexion.uk.';f.appendChild(n);}
});}
// Copy link
document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
  if(navigator.clipboard){navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function(){b.textContent='Link copied';});}
});});
