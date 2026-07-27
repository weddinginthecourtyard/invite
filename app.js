const $=id=>document.getElementById(id),
home=$('home'),overlay=$('overlay'),seal=$('seal'),closeMenu=$('x'),
form=$('form'),thanks=$('thanks'),thanksX=$('thanksX'),formCanvas=$('formCanvas');

function closeOverlay(){overlay.hidden=true}
function resetForm(){
 form.reset();
 [...form.elements].forEach(el=>{el.disabled=false;el.style.visibility=''});
 thanks.hidden=true
}
seal.addEventListener('click',()=>{overlay.hidden=false});
closeMenu.addEventListener('click',closeOverlay);
overlay.addEventListener('click',e=>{if(e.target===overlay)closeOverlay()});

document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{
 closeOverlay();
 home.hidden=true;
 const v=$(b.dataset.open);
 v.hidden=false;
 if(b.dataset.open==='rsvp'){resetForm();fitForm()}
}));

document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{
 b.closest('.view').hidden=true;
 home.hidden=false;
 closeOverlay();
 resetForm()
}));

function fitForm(){
 const vw=innerWidth,vh=innerHeight;
 const scale=Math.max(vw/864,vh/1536);
 const w=864*scale,h=1536*scale;
 formCanvas.style.left=((vw-w)/2)+'px';
 formCanvas.style.top=((vh-h)/2)+'px';
 formCanvas.style.transform=`scale(${scale})`
}
addEventListener('resize',fitForm);
addEventListener('orientationchange',()=>setTimeout(fitForm,120));

form.addEventListener('submit',async e=>{
 e.preventDefault();
 const send=form.querySelector('.send');
 send.disabled=true;
 try{
  const r=await fetch(form.action,{
   method:'POST',body:new FormData(form),headers:{Accept:'application/json'}
  });
  if(!r.ok)throw new Error();
  thanks.hidden=false
 }catch{
  alert('Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyiniz.');
  send.disabled=false
 }
});

function closeThanks(){
 thanks.hidden=true;
 form.reset();
 form.querySelector('.send').disabled=false
}
thanksX.addEventListener('click',closeThanks);
thanks.addEventListener('click',e=>{if(e.target===thanks)closeThanks()});
