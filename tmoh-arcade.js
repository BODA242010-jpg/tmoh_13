/* TMOH Game Hub — self-contained reward UI overlay for tmoh_5.
   Does not modify the app's data schema, other pages, cloud auth or test questions.
   GameDistribution iframe requires an approved publisher relationship; when not approved
   this module offers links to official playable game pages, not unauthorized embeds. */
(() => {
  'use strict';
  if (typeof VIEWS === 'undefined' || typeof PAGES === 'undefined') return;
  const H = [
    {id:'football3d',title:'Football 3D',ar:'أبطال الملاعب',type:'football',label:'كرة القدم',tag:'3D FOOTBALL',icon:'⚽',short:'تحديات في ملاعب ثلاثية الأبعاد، لاعب وحارس ومراحل مهنية.',gd:'540d36010bb94e288a660456efaebff9',slug:'football-3d',hint:'اسحب لتسدد ونافس في تحديات مختلفة',tier:0},
    {id:'champions',title:'3D Soccer Champions',ar:'دوري الأبطال',type:'football',label:'كرة القدم',tag:'SOCCER ARENA',icon:'🏆',short:'تحكم في اللاعبين وراوغ وسدد في مباراة كاملة.',gd:'a14422bfdbf246648318620d01defd08',slug:'3d-soccer-champions',hint:'تحكم في اللاعبين ونافس على الفوز',tier:2},
    {id:'maxspeed',title:'Max Speed',ar:'أساطير السرعة',type:'racing',label:'السيارات',tag:'RACING 3D',icon:'🏎️',short:'سرعات وتحديات سيارات فعلية بمستويات وتفاصيل متنوعة.',gd:'48f3d14ced3646b781e256ca7f9bfa30',slug:'max-speed',hint:'تحكم في السيارة وحقق زمنًا أفضل',tier:0},
    {id:'basketball',title:'Basketball Stars',ar:'نجوم السلة',type:'sports',label:'كرة السلة',tag:'BASKETBALL',icon:'🏀',short:'مباراة كرة سلة تنافسية بأسلوب شخصيات وحركات متقدمة.',gd:'69d78d071f704fa183d75b4114ae40ec',slug:'basketball-stars',hint:'العب بمفردك أو مع صديق حسب إمكانيات اللعبة',tier:1},
    {id:'obby',title:'Obby Draw to Escape',ar:'مغامرة الأبطال',type:'adventure',label:'المغامرات',tag:'ADVENTURE',icon:'🧗',short:'عوالم ومراحل ومهمات، مع الرسم لحل مواقف داخل المغامرة.',gd:'d38ea6bc2dfb434da419992997a6c7f3',slug:'obby-draw-to-escape',hint:'استكشف واتجاوز تحديات المراحل',tier:1},
    {id:'color',title:'Color Numbers',ar:'استوديو الألوان',type:'art',label:'الرسم والفن',tag:'ART STUDIO',icon:'🎨',short:'لوحات حقيقية للتلوين حسب الأرقام مع مجموعة رسومات.',gd:'a0381c736086497eb261d84db2c9ba65',slug:'color-numbers',hint:'اختار لوحة وابدأ تلوين الأرقام',tier:0},
    {id:'memory',title:'Memory Match – Puzzle',ar:'عالم الذاكرة',type:'puzzle',label:'الألغاز والذاكرة',tag:'BRAIN POWER',icon:'🧠',short:'مراحل مطابقة وتنشيط الذاكرة داخل لعبة أصلية.',gd:'854fd8048c814acaa86b0faffe364290',slug:'memory-match-puzzle',hint:'احفظ الصور واكتشف الأزواج',tier:0},
    {id:'magic',title:'Magic Tiles 3',ar:'نجم الموسيقى',type:'music',label:'الموسيقى',tag:'MUSIC RHYTHM',icon:'🎹',short:'مقطوعات وتحديات إيقاعية تفاعلية ومراحل موسيقية.',gd:'58deefb8f63943dcbc5093070b9b5777',slug:'magic-tiles-3',hint:'اضغط في التوقيت المناسب مع الإيقاع',tier:0},
    {id:'escape',title:'Isometric Escape',ar:'لغز الغرفة',type:'puzzle',label:'الألغاز والذاكرة',tag:'MYSTERY',icon:'🧩',short:'استكشف المشاهد وحل الألغاز باستخدام التفكير والملاحظة.',gd:'ce9aeef008334cdba8f440585bf23e16',slug:'isometric-escape',hint:'ابحث عن العناصر واكتشف طريق الخروج',tier:1},
    {id:'one',title:'One Line',ar:'المفكر المبدع',type:'puzzle',label:'التفكير المنطقي',tag:'LOGIC LAB',icon:'💡',short:'مراحل تفكير ومنطق بتوصيل الأشكال بخط واحد.',gd:'453dd9648ab34e1fa3541f09305ba7ef',slug:'one-line',hint:'ارسم خطًا واحدًا يحقق المطلوب',tier:0},
    {id:'words',title:'Words Search',ar:'مغامرة الكلمات',type:'reading',label:'القراءة واللغات',tag:'WORD QUEST',icon:'📚',short:'فتش عن الكلمات في لوحة ممتعة، ونافس الزمن داخل اللعبة.',gd:'4c57af24127f425ca9cdc5cfdba39a10',slug:'words-search',hint:'ابحث عن الكلمات المخفية في الشبكة',tier:0},
    {id:'craft',title:'Infinite Craft',ar:'مختبر الاكتشاف',type:'science',label:'العلوم والاستكشاف',tag:'DISCOVERY LAB',icon:'🔬',short:'اكتشف تركيبات جديدة بالعناصر في لعبة تجريب واكتشاف.',gd:'4d455d6cdff443b5855ee472dff23f8c',slug:'infinite-craft',hint:'جرّب دمج العناصر لاكتشاف نتائج مختلفة',tier:1}
  ];
  const cats=[['all','كل الألعاب','✦'],['football','كرة القدم','⚽'],['racing','السيارات','🏎️'],['sports','السلة','🏀'],['adventure','المغامرات','🕹️'],['art','الفن','🎨'],['puzzle','الألغاز','🧠'],['music','الموسيقى','🎵'],['reading','القراءة','📚'],['science','العلوم','🔬']];
  const safe=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const lookup=id=>H.find(g=>g.id===id);
  const student=()=>typeof d!=='undefined'?d:null;
  const now=()=>Date.now();
  const studyMs=()=>{const p=student();return (Array.isArray(p?.sessions)?p.sessions:[]).reduce((v,s)=>v+Math.max(0,Number(s?.ms)||0),0)};
  const hobbyKey=()=>{const p=student();const s=String(p?.hobby||'').trim();if(/كورة|كره|كرة|football|soccer|قدم/i.test(s))return 'football';if(/سباق|سيار|race|car/i.test(s))return 'racing';if(/سلة|basket/i.test(s))return 'sports';if(/رسم|تلوين|تصميم|فنون|تصوير|كاميرا|photo|art|draw/i.test(s))return 'art';if(/موسيقى|غنا|music|rhythm|إيقاع/i.test(s))return 'music';if(/مغامرة|ألعاب|قـفز|game|adventure/i.test(s))return 'adventure';if(/قراءة|كتب|كتابة|لغات|reading|book|word/i.test(s))return 'reading';if(/علوم|علم|science|experiment/i.test(s))return 'science';if(/برمج|ذكاء|لغز|منطق|puzzle|code/i.test(s))return 'puzzle';return 'all'};
  const XP_TIERS=[0,25,65];
  const points=()=>{try{return typeof xp==='function'?Math.max(0,Number(xp())||0):0}catch{return 0}};
  const allowed=()=>Boolean(window.TMOH_GD_PUBLISHER_APPROVED===true);
  let currentCat='recommended';
  function state(){
    const p=student();if(!p)return null;
    let s=p.tmohGameHub;
    if(!s||typeof s!=='object'||Array.isArray(s))s=p.tmohGameHub={v:1,baseMs:studyMs(),spent:0,fav:[],history:[],active:null};
    if(!Array.isArray(s.fav))s.fav=[];
    if(!Array.isArray(s.history))s.history=[];
    if(!Number.isFinite(s.baseMs))s.baseMs=studyMs();
    if(!Number.isFinite(s.spent))s.spent=0;
    return s;
  }
  function persist(){if(typeof save==='function')save()}
  function tickets(s){return Math.max(0,1+Math.floor(Math.max(0,studyMs()-s.baseMs)/1500000)-s.spent)};
  function earned(s){return 1+Math.floor(Math.max(0,studyMs()-s.baseMs)/1500000)};
  const landingURL=g=>'https://gamedistribution.com/games/'+g.slug+'/';
  const gameURL=g=>{
    const ref=location.origin+location.pathname+'#/rewards';
    return 'https://html5.gamedistribution.com/'+g.gd+'/?gd_sdk_referrer_url='+encodeURIComponent(ref);
  };
  function isUnlocked(g){return points()>=XP_TIERS[g.tier]}
  function remaining(s){return s?.active?Math.max(0,s.active.endsAt-now()):0}
  function expire(s){if(s?.active&&remaining(s)<=0){s.active=null;persist()}}
  function timeFmt(ms){const v=Math.ceil(Math.max(0,ms)/1000);return String(Math.floor(v/60)).padStart(2,'0')+':'+String(v%60).padStart(2,'0')}
  const medal=icon=>`<span class="tgp-medal" aria-hidden="true">${icon}</span>`;
  function tile(g,s){
    const locked=!isUnlocked(g),fav=s.fav.includes(g.id),played=s.history.some(x=>x.id===g.id);
    return `<article class="tgp-game" data-tgp-game="${g.id}">
      <div class="tgp-cover tgp-${g.type}"><div class="tgp-planet a"></div><div class="tgp-planet b"></div><span class="tgp-cover-type">${g.tag}</span><span class="tgp-main-icon" aria-hidden="true">${g.icon}</span><div class="tgp-cover-strip">${g.type==='football'?'◈ ◈ ◈':'✦ ✦ ✦'}</div><span class="tgp-cover-foot">TMOH / GAME ARENA</span></div>
      <div class="tgp-info"><div class="tgp-titlebar"><div><span class="tgp-category">${safe(g.label)}</span><h3>${safe(g.ar)}</h3></div><button type="button" class="tgp-fav ${fav?'is-active':''}" data-tgp-fav="${g.id}" aria-label="${fav?'إزالة المفضلة':'إضافة للمفضلة'}" title="المفضلة">${fav?'♥':'♡'}</button></div>
        <p>${safe(g.short)}</p><div class="tgp-game-bottom"><span class="tgp-micro">${played?'✓ جرّبتها':'✧ لعبة كاملة'} · ${safe(g.title)}</span><button type="button" class="tgp-cta" data-tgp-open="${g.id}" ${locked?'disabled':''}>${locked?'🔒 '+XP_TIERS[g.tier]+' نقطة':'العب الآن ←'}</button></div></div></article>`;
  }
  function filtered(){const match=hobbyKey();return currentCat==='recommended'?(match==='all'?H:H.filter(g=>g.type===match).concat(H.filter(g=>g.type!==match))):currentCat==='all'?H:H.filter(g=>g.type===currentCat)}
  function gallery(s){
    const score=points(),avail=tickets(s),hobby=hobbyKey(),hrs=(studyMs()/36e5).toFixed(1),nxt=Math.max(0,1500000-((studyMs()-s.baseMs)%1500000));
    return `<div class="tgp" dir="rtl"><div class="tgp-topline"><span class="tgp-logo-dot">✦</span><span>TMОH • REWARD EXPERIENCE</span><span class="tgp-topline-right">🎮 عالم الألعاب</span></div>
      <section class="tgp-hero"><div class="tgp-hero-copy"><span class="tgp-kicker">✨ إنجازك يفتح عالمًا جديدًا</span><h1>ذاكرت بجد؟<br><em>المكافأة تستاهلك.</em></h1><p>منصة ألعاب حقيقية مختارة حسب هواياتك — كافئ مجهودك واستمتع باستراحة قصيرة، وارجع لهدفك أقوى.</p><div class="tgp-hero-actions"><button type="button" data-tgp-filter="recommended" class="tgp-main-btn">استكشف ألعابك <span>↖</span></button><button type="button" data-go="focus" class="tgp-outline-btn">ارجع للمذاكرة</button></div></div>
      <div class="tgp-stage" aria-hidden="true"><span class="tgp-stage-glow"></span><span class="tgp-stage-ring ring1"></span><span class="tgp-stage-ring ring2"></span><span class="tgp-stage-pad"></span><span class="tgp-stage-icon">🎮</span><span class="tgp-stage-spark s1">✦</span><span class="tgp-stage-spark s2">✧</span><span class="tgp-stage-spark s3">★</span></div></section>
      <div class="tgp-stats"><div class="tgp-stat"><span>🎟️</span><div><strong>${avail}</strong><small>تذاكر لعب متاحة</small></div></div><div class="tgp-stat"><span>⚡</span><div><strong>${Math.floor(score)}</strong><small>نقاط إنجازك</small></div></div><div class="tgp-stat"><span>⏱</span><div><strong>${hrs}</strong><small>ساعات مذاكرتك</small></div></div><div class="tgp-stat"><span>🏆</span><div><strong>${s.history.length}</strong><small>جولات بدأت</small></div></div></div>
      <div class="tgp-progress"><div><b>⏱️ ازاي تفتح لعبة تانية؟</b><span>كل 25 دقيقة مذاكرة محفوظة = تذكرة لعب جديدة (5 دقائق). ${avail?'عندك تذكرة جاهزة!':'فاضل '+Math.ceil(nxt/60000)+' دقيقة للمكافأة الجاية.'}</span></div><div class="tgp-progress-track"><span style="width:${Math.min(100,Math.max(0,((1500000-nxt)/1500000)*100))}%"></span></div></div>
      <div class="tgp-section-head"><div><span class="tgp-eyebrow">YOUR PLAYGROUND / 01</span><h2>اكتشف <em>عالم الألعاب</em></h2><p>${hobby==='all'?'أفضل ألعاب من كل الأنواع، اختار اللي بتحبه.':'رشحنا لك ألعاب مناسبة لهوايتك أولًا، وتقدر تستكشف باقي الألعاب.'}</p></div><span class="tgp-count">${H.length} ألعاب أصلية</span></div>
      <div class="tgp-tabs" role="group" aria-label="تصنيف الألعاب"><button type="button" data-tgp-filter="recommended" class="${currentCat==='recommended'?'active':''}">⭐ مناسب لهوايتي</button>${cats.map(c=>`<button type="button" class="${currentCat===c[0]?'active':''}" data-tgp-filter="${c[0]}">${c[2]} ${c[1]}</button>`).join('')}</div>
      <div class="tgp-grid">${filtered().map(g=>tile(g,s)).join('')}</div>
      <div class="tgp-footer-note"><span>🛡️</span><div><b>مكافأة ذكية مش تضييع وقت</b><p>اللعب محدود بوقت داخل طموح. الألعاب الخارجية تعتمد على الإنترنت وسياسة ناشر الألعاب؛ سجلات ألعابك القديمة محفوظة، وأسئلة الدروس في قسم المذاكرة فقط.</p></div></div></div>`;
  }
  function player(s){
    const g=lookup(s.active?.id);if(!g)return gallery(s);
    const embed=allowed();const url=gameURL(g),official=landingURL(g);
    return `<div class="tgp" dir="rtl"><div class="tgp-topline"><span class="tgp-logo-dot">✦</span><span>TMОH • REWARD EXPERIENCE</span><span class="tgp-topline-right">${safe(g.ar)}</span></div>
       <section class="tgp-playing"><div class="tgp-playtop"><div><span class="tgp-kicker">🎮 الجولة بدأت · ${safe(g.label)}</span><h1>${safe(g.ar)} <small>${safe(g.title)}</small></h1></div><div class="tgp-stopwatch">⏳ <strong id="tgpTime">${timeFmt(remaining(s))}</strong></div></div>
       <div class="tgp-playnotice">${embed?'اللعبة بتشتغل من مزود الألعاب الرسمي — لو ما ظهرتش افتحها من رابط المصدر.':'للتجربة قبل تفعيل ترخيص النشر: شغّل اللعبة من مصدرها الرسمي في تبويب جديد. بعد تفعيل حساب الناشر ستعمل داخل إطار طموح.'}</div>
       <div class="tgp-playbox">${embed?`<iframe id="tgpFrame" src="${safe(url)}" title="${safe(g.title)}" allow="autoplay; fullscreen; gamepad" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`:`<div class="tgp-playfallback tgp-${g.type}"><div class="tgp-playicon">${g.icon}</div><h2>${safe(g.title)}</h2><p>اللعبة الأصلية متاحة الآن من موقع المطور. تشغيلها داخل طموح يتطلب تفعيل اتفاقية GameDistribution كناشر.</p><a class="tgp-main-btn" href="${official}" target="_blank" rel="noopener noreferrer">🎮 العب على الموقع الرسمي ↗</a></div>`}</div>
       <div class="tgp-playfooter"><div>🎯 ${safe(g.hint)}<br><small>تنبيه: لا يمكن لطموح قراءة نتيجة اللعبة الخارجية إلا إذا وفر الناشر واجهة رسمية لذلك.</small></div><div><a class="tgp-outline-btn" href="${official}" target="_blank" rel="noopener noreferrer">فتح المصدر ↗</a><button type="button" class="tgp-main-btn" data-tgp-done>إنهاء المكافأة</button></div></div></section></div>`;
  }
  const show=()=>{const p=student();if(!p)return '<div class="tgp">سجّل دخولك لتظهر المكافآت.</div>';const s=state();expire(s);return s.active?player(s):gallery(s)};
  function refresh(){if(typeof render==='function'&&typeof page!=='undefined'&&page==='rewards')render('rewards')}
  function started(g){const s=state();if(!s||!isUnlocked(g))return;if(s.active)return;if(!tickets(s)){if(typeof msg==='function')msg('ذاكر 25 دقيقة واحفظ جلسة المذاكرة عشان تفتح مكافأة جديدة 💜');return}
    s.spent++;s.active={id:g.id,startedAt:now(),endsAt:now()+300000};s.history.unshift({id:g.id,at:new Date().toISOString(),type:'launched'});s.history=s.history.slice(0,100);persist();refresh();
  }
  function click(ev){const b=ev.target.closest('[data-tgp-filter],[data-tgp-fav],[data-tgp-open],[data-tgp-done]');if(!b||typeof page==='undefined'||page!=='rewards'||!student())return;ev.preventDefault();ev.stopPropagation();const s=state();
    if(b.dataset.tgpFilter){currentCat=b.dataset.tgpFilter;refresh();return}
    if(b.dataset.tgpFav){const id=b.dataset.tgpFav;if(!lookup(id))return;s.fav=s.fav.includes(id)?s.fav.filter(x=>x!==id):s.fav.concat(id);persist();refresh();return}
    if(b.dataset.tgpOpen){const g=lookup(b.dataset.tgpOpen);if(g)started(g);return}
    if(b.hasAttribute('data-tgp-done')){s.active=null;persist();refresh()}
  }
  const root=document.getElementById('content');if(root)root.addEventListener('click',click);
  let tick=null;
  tick=setInterval(()=>{if(typeof page!=='undefined'&&page==='rewards'&&student()){
    const s=state();if(s.active){const el=document.getElementById('tgpTime');if(remaining(s)<=0){expire(s);refresh()}else if(el)el.textContent=timeFmt(remaining(s));}
  }},850);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&typeof page!=='undefined'&&page==='rewards'){const s=state();if(s?.active&&remaining(s)<=0){expire(s);refresh()}}});
  VIEWS.rewards=show;
  const item=PAGES.find(p=>p[0]==='rewards');if(item)item[1]='🎮 عالم المكافآت';
  window.TMOH_GAME_HUB=Object.freeze({version:'1.0',catalog:H.map(g=>({id:g.id,title:g.title,category:g.label,official:landingURL(g)})),status:()=>student()?{tickets:tickets(state()),playing:!!state().active,publisherApproved:allowed(),sessionCount:state().history.length}:null,getGameURL:gameURL});
})();
