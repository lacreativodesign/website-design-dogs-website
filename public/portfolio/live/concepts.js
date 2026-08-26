(function () {
  "use strict";

  const concepts = {
    roofing: {
      id: "roofing",
      brand: "Forge & Field Roofing",
      short: "Forge & Field",
      title: "Roofing shaped by craft. Built around your home.",
      kicker: "Residential roofing · thoughtful from ridge to runoff",
      intro: "A roof is more than a protective layer. It is proportion, material, drainage, ventilation, and the quiet confidence that the work underneath was considered.",
      services: [["Standing-seam metal", "Clean lines, measured detailing, and a finish selected for the architecture."], ["Architectural shingles", "Layered texture with a practical plan for ventilation, flashing, and water control."], ["Roof renewal", "A clear assessment of the roof system, followed by a scope you can understand."]],
      nav: [["services", "Expertise"], ["approach", "Approach"], ["materials", "Materials"], ["contact", "Request a visit"]]
    },
    cleaning: {
      id: "cleaning",
      brand: "Sunday House Co.",
      short: "Sunday House",
      title: "Come home to your favorite kind of clean.",
      kicker: "Considered home care, made delightfully simple",
      intro: "A calm, reliable cleaning rhythm for homes that are fully lived in. Choose the level of care, set the cadence, and leave the details to us.",
      services: [["The weekly reset", "A recurring clean that keeps busy rooms feeling light, orderly, and ready for the week."], ["The deep refresh", "Extra attention for buildup, edges, fixtures, and the places everyday routines miss."], ["The move-day clean", "A careful clean for an empty home, whether you are arriving or handing over the keys."]],
      nav: [["plans", "Plans"], ["standard", "Our standard"], ["rhythm", "How it works"], ["contact", "Plan my clean"]]
    },
    landscaping: {
      id: "landscaping",
      brand: "Wildline Gardens",
      short: "Wildline",
      title: "Landscapes that belong exactly where they grow.",
      kicker: "Design · planting · seasonal stewardship",
      intro: "We shape outdoor rooms with a lighter hand—working with native character, natural movement, and the way you want to live outside.",
      services: [["Garden design", "A complete plan for structure, planting, circulation, and year-round character."], ["Outdoor living", "Terraces, paths, gathering zones, and lighting composed as one experience."], ["Garden stewardship", "Seasonal attention that helps a considered landscape mature with grace."]],
      nav: [["work", "Field notes"], ["services", "Services"], ["method", "Method"], ["contact", "Start a garden"]]
    },
    "real-estate": {
      id: "real-estate",
      brand: "Aster Row Realty",
      short: "Aster Row",
      title: "A more personal way to find your place.",
      kicker: "Homes, neighborhoods, and guidance with point of view",
      intro: "The right home is a feeling before it is a floor plan. We begin with how you want to live, then bring clarity to every decision that follows.",
      services: [["Find a home", "A focused search shaped by your routines, priorities, and sense of place."], ["Prepare to sell", "Positioning, presentation, and a launch plan calibrated to your home."], ["Make a move", "A coordinated path for the details between one front door and the next."]],
      nav: [["journal", "Residences"], ["approach", "Our approach"], ["guide", "Neighborhood guide"], ["contact", "Begin a conversation"]]
    },
    restaurant: {
      id: "restaurant",
      brand: "Casa Brasa",
      short: "Casa Brasa",
      title: "Wood fire. Bright plates. A table worth lingering over.",
      kicker: "Open-fire cooking with a generous point of view",
      intro: "Vegetables blistered at the edge, citrus cut through smoke, and supper moves at the pace of good conversation. Come hungry; leave a little later than planned.",
      services: [["From the hearth", "Seasonal plates that let smoke, char, and bright accompaniments do the talking."], ["For the table", "Generous dishes designed to pass, share, and order one more of."], ["Something cold", "Citrus-forward drinks, thoughtful bottles, and zero-proof pours with real character."]],
      nav: [["menu", "Menu"], ["story", "The fire"], ["gather", "Gather here"], ["contact", "Find a table"]]
    },
    "law-firm": {
      id: "law-firm",
      brand: "Arden & Cole",
      short: "A&C",
      title: "Clear counsel for consequential decisions.",
      kicker: "Business, transactions, and disputes",
      intro: "Complex matters call for disciplined thinking and plain language. We help leadership teams understand the terrain, weigh the options, and move with intention.",
      services: [["Business counsel", "Practical guidance for agreements, governance, risk, and the decisions that shape a company."], ["Strategic transactions", "Focused support through diligence, negotiation, documentation, and closing."], ["Commercial disputes", "A measured approach to conflict, from early assessment through resolution."]],
      nav: [["practice", "Practice"], ["principles", "Principles"], ["perspectives", "Perspectives"], ["contact", "Start a conversation"]]
    },
    consulting: {
      id: "consulting",
      brand: "Northstar Works",
      short: "NW/",
      title: "Turn the next important move into an operating plan.",
      kicker: "Strategy for teams in motion",
      intro: "We help leadership teams connect ambition to action—clarifying the choice, aligning the people, and building the operating rhythm that carries the work forward.",
      services: [["Strategic direction", "Frame the real decision, pressure-test the options, and choose a coherent path."], ["Operating design", "Translate priorities into roles, rituals, decisions, and measurable work."], ["Transformation support", "Keep momentum through implementation with focused leadership and working sessions."]],
      nav: [["work", "What we solve"], ["method", "Method"], ["studio", "Working sessions"], ["contact", "Bring us the brief"]]
    },
    dental: {
      id: "dental",
      brand: "Kindred Dental Studio",
      short: "Kindred",
      title: "Dentistry designed around feeling at ease.",
      kicker: "Modern care · unhurried conversations · thoughtful comfort",
      intro: "We make room for questions, explain what we see, and shape each visit around a clear plan. Because feeling informed is part of feeling cared for.",
      services: [["Everyday care", "Exams, hygiene visits, and a prevention plan designed for your real routine."], ["Restorative care", "Thoughtful solutions to restore comfort, function, and a natural appearance."], ["Smile care", "Conservative cosmetic options discussed with clarity and without pressure."]],
      nav: [["care", "Care"], ["visit", "Your visit"], ["comfort", "Comfort"], ["contact", "Request a visit"]]
    },
    fitness: {
      id: "fitness",
      brand: "Hinterland Training Club",
      short: "Hinterland",
      title: "Train for the life outside the gym.",
      kicker: "Strength · conditioning · coaching",
      intro: "Useful strength. Durable capacity. Coaching that meets you where you are and keeps the work honest. No theater—just a smart plan and a room built to move.",
      services: [["Strength floor", "Progressive sessions built around the foundational patterns that carry into life."], ["Engine room", "Conditioning with a purpose: pace, power, recovery, and repeatable effort."], ["Open training", "Space to follow your own program with a thoughtful room and a focused atmosphere."]],
      nav: [["train", "Training"], ["week", "The week"], ["coaching", "Coaching"], ["contact", "Try a session"]]
    },
    ecommerce: {
      id: "ecommerce",
      brand: "Orris Supply",
      short: "Orris",
      title: "Useful objects for a slower, better home.",
      kicker: "Small-batch tableware, textiles, and tools",
      intro: "We collect pieces with honest materials, tactile finishes, and a purpose that earns their place. Made to be handled, shared, marked, and kept.",
      services: [["Set the table", "Stoneware, linen, wood, and glass for everyday meals and unhurried gatherings."], ["Make the room", "Textural objects that bring warmth, utility, and a little character to the shelf."], ["Give well", "Considered bundles for hosts, new homes, and the people who are difficult to shop for."]],
      nav: [["shop", "Shop"], ["makers", "Makers"], ["journal", "Journal"], ["contact", "Your basket"]]
    },
    "home-services": {
      id: "home-services",
      brand: "Juniper Home Crew",
      short: "Juniper",
      title: "The capable crew for your home’s running list.",
      kicker: "Repairs · installs · everyday improvements",
      intro: "One clear place for the small fixes, finishing touches, and practical projects that make a home work better.",
      services: [["Fix & repair", "Doors, drywall, trim, hardware, fixtures, and the everyday issues ready to be crossed off."], ["Mount & install", "Shelving, art, window treatments, storage, and details installed with care."], ["Refresh a room", "A focused set of improvements that makes one space feel finished and functional."]],
      nav: [["services", "Services"], ["rooms", "By room"], ["process", "How it works"], ["contact", "Build my list"]]
    },
    salon: {
      id: "salon",
      brand: "Miro House",
      short: "Miro",
      title: "Good hair changes the whole composition.",
      kicker: "Cut · color · ritual",
      intro: "A modern salon for expressive shape, dimensional color, and the kind of appointment that gives you a little time back.",
      services: [["Cut", "Shape, movement, and a finish designed around your texture and everyday rhythm."], ["Color", "Dimensional color, thoughtful placement, and a plan for how it grows out."], ["Ritual", "Scalp care, gloss, repair, and finishing services that make the details feel complete."]],
      nav: [["menu", "Services"], ["artists", "Approach"], ["ritual", "The ritual"], ["contact", "Book a chair"]]
    }
  };

  const safeId = new URLSearchParams(window.location.search).get("concept") || "roofing";
  const concept = concepts[safeId] || concepts.roofing;
  const root = document.getElementById("main");

  function asset(c, kind) {
    return "/portfolio/live/assets/" + c.id + "-" + kind + ".webp";
  }

  function image(c, kind, alt, className) {
    return "<img class='" + (className || "") + "' src='" + asset(c, kind) + "' alt='" + alt + "' loading='" + (kind === "hero" ? "eager" : "lazy") + "' decoding='async'>";
  }

  function mark(c) {
    const marks = {
      roofing: "<path d='M7 35 24 10l17 25M14 35l10-15 10 15'/><path d='M4 39h40'/>",
      cleaning: "<path d='M24 7c7 9 12 14 12 22a12 12 0 0 1-24 0c0-8 5-13 12-22Z'/><path d='M18 30c2 3 6 4 10 1'/>",
      landscaping: "<path d='M25 42V19M25 28C13 28 8 20 9 9c11 0 16 7 16 19Zm0-3c11 0 16-7 15-17-10 0-15 7-15 17Z'/>",
      "real-estate": "<path d='M7 40 24 8l17 32M14 28h20M18 40V28m12 12V28'/>",
      restaurant: "<circle cx='24' cy='24' r='17'/><path d='M17 13v22M13 13v9c0 4 8 4 8 0v-9M31 13v22c-7-4-7-14 0-18'/>",
      "law-firm": "<path d='M8 39h32M12 34h24M16 34V17m8 17V17m8 17V17M10 16 24 8l14 8Z'/>",
      consulting: "<path d='M7 37 20 24 27 31 41 10M29 10h12v12'/>",
      dental: "<path d='M24 41c-5 0-5-11-8-16-5-10 0-17 8-13 8-4 13 3 8 13-3 5-3 16-8 16Z'/><path d='M21 16c2 1 4 1 6 0'/>",
      fitness: "<path d='M7 18h7v12H7m34-12h-7v12h7M14 14h5v20h-5m20-20h-5v20h5M19 21h10v6H19'/>",
      ecommerce: "<path d='M10 17h28v23H10Z'/><path d='M17 17a7 7 0 0 1 14 0M17 26h14'/>",
      "home-services": "<path d='m8 25 16-14 16 14v15H8Z'/><path d='M18 40V29h12v11M12 17V9h7'/>",
      salon: "<path d='M9 12c10 4 20 18 30 24M39 12C29 16 19 30 9 36'/><circle cx='13' cy='11' r='4'/><circle cx='13' cy='37' r='4'/>"
    };
    return "<span class='brand-mark' aria-hidden='true'><svg viewBox='0 0 48 48' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>" + marks[c.id] + "</svg></span>";
  }

  function logo(c) {
    return "<a class='concept-logo' href='#top' aria-label='" + c.brand + " home'>" + mark(c) + "<span>" + c.short + "</span></a>";
  }

  function header(c, modifier) {
    return "<header class='concept-header " + (modifier || "") + "' id='top'><div class='header-inner'>" + logo(c) + "<button class='menu-toggle' type='button' aria-expanded='false' aria-label='Open menu'><span></span><span></span></button><nav aria-label='Primary'><ul>" + c.nav.map(function (item) { return "<li><a href='#" + item[0] + "'>" + item[1] + "</a></li>"; }).join("") + "</ul></nav></div></header>";
  }

  function serviceCards(c, className) {
    return "<div class='" + (className || "service-cards") + "'>" + c.services.map(function (item, index) {
      return "<article><span>0" + (index + 1) + "</span><h3>" + item[0] + "</h3><p>" + item[1] + "</p></article>";
    }).join("") + "</div>";
  }

  function button(label, href, secondary) {
    return "<a class='concept-button" + (secondary ? " concept-button--secondary" : "") + "' href='" + href + "'>" + label + "<span aria-hidden='true'>↗</span></a>";
  }

  function disclosure(c) {
    return "<div class='concept-disclosure'><span>Website Design Dogs</span><span>" + c.brand + " is an original portfolio concept.</span><a href='#top'>Back to top ↑</a></div>";
  }

  function details(items) {
    return "<div class='concept-faq'>" + items.map(function (item, index) {
      return "<details" + (index === 0 ? " open" : "") + "><summary>" + item[0] + "<span>+</span></summary><p>" + item[1] + "</p></details>";
    }).join("") + "</div>";
  }

  function roof(c) {
    return header(c, "concept-header--solid") +
      "<section class='rf-hero'><div class='rf-hero__copy'><p class='eyebrow'>" + c.kicker + "</p><h1>Roofing shaped by <em>craft.</em><br>Built around your home.</h1><p>" + c.intro + "</p><div class='button-row'>" + button("Request a roof visit", "#contact") + button("Explore the work", "#approach", true) + "</div></div><div class='rf-hero__visual'>" + image(c, "hero", "Stone home with a considered metal roof at dusk") + "<div class='rf-spec'><b>THE ROOF, CONSIDERED</b><span>01 / 04</span></div></div></section>" +
      "<div class='rf-band'><span>Material intelligence</span><span>Clear scopes</span><span>Careful installation</span><span>Thoughtful handoff</span></div>" +
      "<section class='rf-services section-pad' id='services'><div class='section-intro'><p class='eyebrow'>01 · EXPERTISE</p><h2>One roof system.<br>Every detail working together.</h2></div>" + serviceCards(c, "rf-service-grid") + "</section>" +
      "<section class='rf-story' id='approach'><div class='rf-story__image'>" + image(c, "detail", "Close view of roof flashing and crafted material junctions") + "<span>Detail study / flashing & water control</span></div><div class='rf-story__copy'><p class='eyebrow'>02 · THE APPROACH</p><h2>Look past the surface.</h2><p>Good roofing begins before the first material arrives. We study slope, drainage, penetrations, ventilation, surrounding trees, and the character of the home—then turn what we find into a straightforward plan.</p><ol><li><b>Read the roof</b><span>Walk the conditions and document what matters.</span></li><li><b>Shape the scope</b><span>Prioritize the system, not a list of disconnected fixes.</span></li><li><b>Build with care</b><span>Coordinate protection, installation, and a clean finish.</span></li></ol></div></section>" +
      "<section class='rf-materials section-pad' id='materials'><div class='rf-materials__copy'><p class='eyebrow'>03 · MATERIALS</p><h2>A quieter palette.<br>A stronger point of view.</h2><p>Color, seam rhythm, shingle profile, and edge details should support the architecture instead of fighting it.</p></div><div class='rf-materials__visual'>" + image(c, "lifestyle", "Architectural metal roof against a glowing sky") + "<div class='rf-swatches'><span style='--swatch:#252b2d'>Iron</span><span style='--swatch:#74503d'>Copper</span><span style='--swatch:#9b978c'>Stone</span></div></div></section>" +
      "<section class='rf-scope section-pad'><p class='eyebrow'>04 · A CLEAR SCOPE</p><div class='rf-scope__grid'><h2>Know what the project includes—and why.</h2><div><p>Your project plan should connect every recommendation to an observed condition. That means fewer vague allowances and a more useful conversation before work begins.</p><ul><li>Site observations and roof-system priorities</li><li>Material direction and edge-detail decisions</li><li>Protection, access, and daily cleanup plan</li><li>Walkthrough and care guidance at handoff</li></ul></div></div></section>" +
      "<section class='rf-faq section-pad'><div><p class='eyebrow'>05 · QUESTIONS</p><h2>Before we step onto the roof.</h2></div>" + details([["Can you help compare material directions?", "Yes. The conversation begins with the architecture, climate, maintenance expectations, and the visual character you want."], ["What happens during the first visit?", "We review access and visible conditions, listen to what you have noticed, and outline what should be assessed in the project scope."], ["Can the work be phased?", "When conditions allow, the scope can identify what is urgent, what belongs together, and what may reasonably follow later."]]) + "</section>" +
      "<section class='rf-cta' id='contact'><div><p class='eyebrow'>YOUR HOME / YOUR ROOF</p><h2>Let’s give the whole system a closer look.</h2></div>" + button("Request a roof visit", "#top") + "</section>" + disclosure(c);
  }

  function clean(c) {
    return header(c, "concept-header--airy") +
      "<section class='cl-hero'><div class='cl-hero__halo'></div><div class='cl-hero__copy'><p class='eyebrow'>" + c.kicker + "</p><h1>Come home to your favorite kind of <em>clean.</em></h1><p>" + c.intro + "</p>" + button("Plan my clean", "#contact") + "</div><div class='cl-hero__arch'>" + image(c, "hero", "Light-filled, carefully cleaned living room") + "<span class='cl-sticker'>Fresh start<br>inside</span></div></section>" +
      "<section class='cl-plans section-pad' id='plans'><div class='cl-heading'><span>01</span><div><p class='eyebrow'>CHOOSE YOUR RHYTHM</p><h2>Care that fits the way your week actually works.</h2></div></div>" + serviceCards(c, "cl-card-row") + "</section>" +
      "<section class='cl-note' id='standard'><div class='cl-note__copy'><p class='eyebrow'>THE SUNDAY HOUSE STANDARD</p><h2>Clean is a feeling,<br>not just a checklist.</h2><p>We notice the visual noise: the fingerprints catching light, the dust at the baseboard, the room that feels unfinished when the cushions are left askew. A consistent method handles the fundamentals; human attention makes the result feel complete.</p><div class='cl-checks'><span>Room-by-room rhythm</span><span>Thoughtful product use</span><span>Respect for your space</span><span>Clear visit notes</span></div></div><div class='cl-note__image'>" + image(c, "detail", "Careful hands finishing a bright kitchen") + "</div></section>" +
      "<section class='cl-rooms section-pad'><div class='cl-rooms__title'><p class='eyebrow'>02 · ROOM NOTES</p><h2>A little more ease,<br>from front door to duvet.</h2></div><div class='cl-room-map'><article><b>KITCHEN</b><p>Surfaces, fixtures, fronts, and a final reset that makes the room feel ready.</p></article><article><b>LIVING</b><p>Dusting, floors, soft furnishings, and the small straightening details you notice.</p></article><article><b>BATH</b><p>Fixtures, mirrors, surfaces, and careful attention to buildup and touchpoints.</p></article><article><b>BEDROOM</b><p>Clear surfaces, calm floors, and a finish that makes the room feel settled.</p></article></div></section>" +
      "<section class='cl-rhythm section-pad' id='rhythm'><div class='cl-rhythm__image'>" + image(c, "lifestyle", "Serene bedroom prepared with crisp linens") + "</div><div class='cl-rhythm__copy'><p class='eyebrow'>03 · HOW IT WORKS</p><h2>Your clean, in three easy beats.</h2><ol><li><span>01</span><div><b>Tell us about home</b><p>Share the rooms, routines, pets, priorities, and timing that shape the clean.</p></div></li><li><span>02</span><div><b>Choose the cadence</b><p>Select a one-time reset or a recurring rhythm that keeps things feeling easy.</p></div></li><li><span>03</span><div><b>Come back to calm</b><p>Receive a simple visit note and walk into a home that feels put back together.</p></div></li></ol></div></section>" +
      "<section class='cl-faq section-pad'><div><p class='eyebrow'>04 · GOOD TO KNOW</p><h2>The details<br>before the door opens.</h2></div>" + details([["Can I set priorities for each visit?", "Absolutely. Tell us which rooms or details matter most so the visit can follow a clear order of attention."], ["Do I need to be home?", "The concept supports either arrangement. Access preferences would be confirmed before the first visit."], ["What should I do before a clean?", "A quick pickup helps the time go toward cleaning, but your plan should make expectations easy to understand."]]) + "</section>" +
      "<section class='cl-cta' id='contact'><span class='cl-cta__flower'>✦</span><p class='eyebrow'>A LIGHTER HOME STARTS HERE</p><h2>Tell us what would make home feel easier.</h2>" + button("Plan my clean", "#top") + "</section>" + disclosure(c);
  }

  function landscape(c) {
    return header(c, "concept-header--overlay") +
      "<section class='ls-hero'>" + image(c, "hero", "Native garden and modern home at golden hour") + "<div class='ls-hero__shade'></div><div class='ls-hero__copy'><p>" + c.kicker + "</p><h1>Landscapes that belong exactly <em>where they grow.</em></h1><div><p>" + c.intro + "</p>" + button("Walk the garden", "#work") + "</div></div><span class='ls-hero__index'>WILDLINES / 01</span></section>" +
      "<div class='ls-marquee'><span>ROOTED IN PLACE</span><i>✦</i><span>PLANTED FOR CHANGE</span><i>✦</i><span>MADE TO BE LIVED IN</span></div>" +
      "<section class='ls-manifesto section-pad'><p class='eyebrow'>A LIVING POINT OF VIEW</p><h2>Not a backdrop.<br>A landscape with a life of its own.</h2><div><p>Good gardens change every week. They soften architecture, hold rain, welcome movement, and reveal a different detail each time you pass through.</p><p>Our work starts with the existing character of a place, then builds a clear structure for plants, paths, gathering, and the seasons ahead.</p></div></section>" +
      "<section class='ls-work' id='work'><div class='ls-work__lead'>" + image(c, "detail", "Native grasses and stone garden edge") + "<span>FIELD NOTE 01 / Texture at the path</span></div><div class='ls-work__copy'><p class='eyebrow'>RECENT STUDY</p><h2>Soft meadow.<br>Strong edge.</h2><p>A garden can feel loose without feeling accidental. Repeated grasses create movement while a quiet stone line gives the whole composition a place to land.</p><a href='#services'>Read the planting idea →</a></div><div class='ls-work__second'>" + image(c, "lifestyle", "Garden terrace illuminated at blue hour") + "<span>FIELD NOTE 02 / The evening room</span></div></section>" +
      "<section class='ls-services section-pad' id='services'><div class='section-intro'><p class='eyebrow'>01 · WHAT WE SHAPE</p><h2>From first line<br>to fourth season.</h2></div>" + serviceCards(c, "ls-service-stack") + "</section>" +
      "<section class='ls-method section-pad' id='method'><div class='ls-method__wheel'><span>OBSERVE</span><span>COMPOSE</span><span>PLANT</span><span>TEND</span><b>W</b></div><div><p class='eyebrow'>02 · THE METHOD</p><h2>Begin with what is already speaking.</h2><p>Light, grade, soil, mature trees, borrowed views, and the daily routes through a property all offer clues. The plan becomes stronger when it listens first.</p><ol><li>Site walk & priorities</li><li>Concept & material language</li><li>Planting and build documents</li><li>Seasonal stewardship plan</li></ol></div></section>" +
      "<section class='ls-season section-pad'><p class='eyebrow'>03 · FOUR SEASONS, ONE COMPOSITION</p><div class='ls-season__grid'><article><span>SPRING</span><p>Fresh structure, early color, and emerging layers.</p></article><article><span>SUMMER</span><p>Generous growth, shade, texture, and outdoor rooms in use.</p></article><article><span>FALL</span><p>Seed heads, warmer tones, and a changing silhouette.</p></article><article><span>WINTER</span><p>Strong bones, useful evergreens, bark, and quiet contrast.</p></article></div></section>" +
      "<section class='ls-cta' id='contact'><div><p class='eyebrow'>BRING US THE PLACE</p><h2>Let’s find the garden already waiting there.</h2></div>" + button("Start a garden", "#top") + "</section>" + disclosure(c);
  }

  function estate(c) {
    return header(c, "concept-header--editorial") +
      "<section class='re-cover'><div class='re-cover__issue'>ASTER ROW / PROPERTY EDIT 01</div><div class='re-cover__image'>" + image(c, "hero", "Architectural coastal residence at dusk") + "</div><div class='re-cover__title'><p>" + c.kicker + "</p><h1>A more personal way to find <em>your place.</em></h1></div><div class='re-cover__note'><p>" + c.intro + "</p>" + button("Share what you are looking for", "#contact") + "</div></section>" +
      "<section class='re-editor section-pad'><p class='eyebrow'>FROM THE EDITOR</p><div><h2>Begin with the life.<br>The listing comes later.</h2><p>A useful search is not just beds, baths, and boundaries. It is the morning light, the distance to the places you return to, how friends gather, and what you want the next chapter to make possible.</p></div></section>" +
      "<section class='re-journal section-pad' id='journal'><div class='re-journal__head'><p>01 / RESIDENCE JOURNAL</p><h2>Three ways to read a home.</h2></div><div class='re-journal__grid'><article class='re-card re-card--wide'>" + image(c, "lifestyle", "Ocean-facing terrace and coastal horizon") + "<span>THE HORIZON</span><h3>When the view becomes part of the room.</h3></article><article class='re-card'>" + image(c, "detail", "Warm modern interior with ocean view") + "<span>THE INTERIOR</span><h3>Material warmth, composed for everyday living.</h3></article><article class='re-card re-card--text'><span>THE ROUTINE</span><blockquote>“Start with the hour of day you most want to enjoy at home.”</blockquote><a href='#guide'>Open the field guide →</a></article></div></section>" +
      "<section class='re-approach' id='approach'><div class='re-approach__number'>02</div><div class='re-approach__copy'><p class='eyebrow'>OUR APPROACH</p><h2>Guidance with taste.<br>Decisions with context.</h2><p>We bring a point of view without making the process about ours. The role is to surface what matters, filter distraction, and make each tradeoff easier to see.</p></div>" + serviceCards(c, "re-services") + "</section>" +
      "<section class='re-guide section-pad' id='guide'><div class='re-guide__label'>THE NEIGHBORHOOD FIELD GUIDE</div><div class='re-guide__grid'><article><b>01</b><h3>Walk it twice</h3><p>Visit at different hours and notice pace, sound, light, and how the street is used.</p></article><article><b>02</b><h3>Map the week</h3><p>Plot the places that shape your routine—not only the places that look good on a map.</p></article><article><b>03</b><h3>Read the edges</h3><p>Look past the front elevation to privacy, approach, adjacent spaces, and long views.</p></article><article><b>04</b><h3>Leave room</h3><p>The strongest fit supports who you are now and leaves space for what may change.</p></article></div></section>" +
      "<section class='re-conversation section-pad'><div><p class='eyebrow'>QUESTIONS, ANSWERED</p><h2>A clear conversation before the search begins.</h2></div>" + details([["What does the first conversation cover?", "Your timing, priorities, decision style, and the qualities that would make a place feel right."], ["How do you narrow a broad search?", "By turning general preferences into a short set of lived priorities, then using each viewing to refine the brief."], ["Can you help prepare a home for market?", "The concept includes positioning and presentation guidance, coordinated around the home and the intended audience."]]) + "</section>" +
      "<section class='re-cta' id='contact'><span>ASTER ROW / PRIVATE CONVERSATION</span><h2>Where would you like life to go next?</h2>" + button("Begin the conversation", "#top") + "</section>" + disclosure(c);
  }

  function restaurant(c) {
    return header(c, "concept-header--brasa") +
      "<section class='rs-hero'><div class='rs-hero__type'><p>" + c.kicker + "</p><h1>COME FOR<br>THE <span>FIRE.</span><br>STAY FOR<br>THE TABLE.</h1><div>" + button("Find a table", "#contact") + "<a href='#menu'>See the menu ↓</a></div></div><div class='rs-hero__image'>" + image(c, "hero", "Lively open-fire restaurant dining room") + "<span>TONIGHT / FROM THE HEARTH</span></div></section>" +
      "<section class='rs-intro section-pad'><span>BUEN FUEGO</span><h2>" + c.intro + "</h2><div class='rs-intro__seal'>BRASA<br>BRASA</div></section>" +
      "<section class='rs-menu section-pad' id='menu'><div class='rs-menu__head'><p class='eyebrow'>EAT WITH YOUR HANDS / SHARE EVERYTHING</p><h2>From tonight’s board.</h2></div><div class='rs-menu__columns'><div><h3>SMALL + BRIGHT</h3><dl><div><dt>Citrus & chicories</dt><dd>toasted seed · chile · herbs</dd></div><div><dt>Ember carrots</dt><dd>cultured cream · lime · pepita</dd></div><div><dt>Charred flatbread</dt><dd>smoked butter · sea salt</dd></div></dl></div><div><h3>OVER THE FIRE</h3><dl><div><dt>Wood-roasted squash</dt><dd>mole · sesame · bitter greens</dd></div><div><dt>Coal-kissed steak</dt><dd>spring onion · roasted pepper</dd></div><div><dt>Whole market fish</dt><dd>citrus leaf · herb salad</dd></div></dl></div><div><h3>LAST BITE</h3><dl><div><dt>Burnt honey custard</dt><dd>orange · flaky salt</dd></div><div><dt>Chocolate & chile</dt><dd>olive oil · cacao nib</dd></div></dl></div></div><p class='rs-menu__note'>A concept menu shaped by the season; availability and preparation would change with the kitchen.</p></section>" +
      "<section class='rs-fire' id='story'><div class='rs-fire__image'>" + image(c, "lifestyle", "Chef tending ingredients over an open flame") + "</div><div class='rs-fire__copy'><span>01 / LIVE FIRE</span><h2>Heat is an ingredient.</h2><p>Flame brings sweetness forward, smoke adds length, and a quick edge of char can make something bright taste even brighter. The cooking is elemental; the combinations are anything but expected.</p><div class='rs-fire__words'><b>SMOKE</b><b>ACID</b><b>CRUNCH</b><b>HEAT</b></div></div></section>" +
      "<section class='rs-plate section-pad'><div><p class='eyebrow'>02 · BUILT TO SHARE</p><h2>Pass the plate.<br>Order another.</h2><p>Our favorite meals gather in the middle: a few small things, one large thing, cold drinks, warm bread, and absolutely no reason to rush.</p></div>" + image(c, "detail", "Fire-roasted vegetables and steak plated for sharing") + "</section>" +
      "<section class='rs-gather section-pad' id='gather'><p class='eyebrow'>BRING THE WHOLE TABLE</p><div class='rs-gather__grid'><h2>For birthdays, team suppers, reunions, and Tuesdays that deserve more.</h2><div><p>Choose a shared menu built around the fire, with flexible beverage pairings and a room that does not feel like an event space.</p>" + button("Plan a gathering", "#contact", true) + "</div></div></section>" +
      "<section class='rs-cta' id='contact'><div><span>CASA BRASA</span><h2>Tonight tastes better together.</h2></div>" + button("Find a table", "#top") + "</section>" + disclosure(c);
  }

  function law(c) {
    return "<div class='lw-layout'><aside class='lw-rail'>" + logo(c) + "<span>ARDEN & COLE<br>COUNSEL</span><a href='#contact'>Inquire ↗</a></aside><div class='lw-page'>" + header(c, "concept-header--law") +
      "<section class='lw-hero'><p class='eyebrow'>" + c.kicker + "</p><div class='lw-hero__grid'><h1>Clear counsel for <em>consequential</em> decisions.</h1><div><p>" + c.intro + "</p>" + button("Start a conversation", "#contact") + "</div></div><div class='lw-rule'><span>Judgment</span><span>Clarity</span><span>Resolve</span></div></section>" +
      "<section class='lw-practice section-pad' id='practice'><div class='lw-section-no'>01</div><div class='lw-practice__head'><p class='eyebrow'>PRACTICE</p><h2>Legal thinking that stays close to the business question.</h2></div>" + serviceCards(c, "lw-practice__list") + "</section>" +
      "<section class='lw-image-break'><div>" + image(c, "hero", "Refined boardroom overlooking an American city") + "</div><p>We work best where the stakes are real, the facts are layered, and a clear view changes the quality of the next move.</p></section>" +
      "<section class='lw-principles section-pad' id='principles'><div><p class='eyebrow'>02 · PRINCIPLES</p><h2>Precision without theater.</h2></div><div class='lw-principles__grid'><article><span>A</span><h3>Name the actual issue.</h3><p>Separate the legal question from the noise around it, then show how it connects to the decision at hand.</p></article><article><span>B</span><h3>Make the tradeoffs legible.</h3><p>Explain risk in proportion, identify what is controllable, and give leaders a useful basis for choice.</p></article><article><span>C</span><h3>Keep the path practical.</h3><p>Advice earns its value when it can be understood, carried into the room, and acted on.</p></article></div></section>" +
      "<section class='lw-library'><div class='lw-library__note'><span>THE READING ROOM / WORKING CONTEXT</span><p>Deep preparation creates a quieter meeting: the relevant record close at hand, the open questions named, and the decision kept in view.</p></div><div>" + image(c, "lifestyle", "Quiet legal library and consultation corridor") + "</div></section>" +
      "<section class='lw-process'><div class='lw-process__copy'><p class='eyebrow'>03 · HOW MATTERS MOVE</p><h2>A disciplined path from first facts to next action.</h2><ol><li><span>01</span><b>Frame</b><p>Define the issue, the decision, the parties, and the practical stakes.</p></li><li><span>02</span><b>Assess</b><p>Build the relevant record and distinguish material risk from background noise.</p></li><li><span>03</span><b>Advise</b><p>Present the options, consequences, and recommended course in plain language.</p></li><li><span>04</span><b>Advance</b><p>Move into negotiation, documentation, resolution, or the next decision gate.</p></li></ol></div><div class='lw-process__image'>" + image(c, "detail", "Hands reviewing a carefully prepared legal document") + "</div></section>" +
      "<section class='lw-perspectives section-pad' id='perspectives'><p class='eyebrow'>04 · PERSPECTIVES</p><div class='lw-perspectives__grid'><article><span>BUSINESS COUNSEL</span><h3>When a “standard” term deserves a second look.</h3><a href='#contact'>Read the perspective →</a></article><article><span>TRANSACTIONS</span><h3>Designing diligence around the actual deal thesis.</h3><a href='#contact'>Read the perspective →</a></article><article><span>DISPUTES</span><h3>The value of an early, decision-ready case view.</h3><a href='#contact'>Read the perspective →</a></article></div></section>" +
      "<section class='lw-cta' id='contact'><p>ARDEN & COLE / PRIVATE INQUIRIES</p><h2>Bring us the decision in front of you.</h2>" + button("Start a conversation", "#top") + "</section>" + disclosure(c) + "</div></div>";
  }

  function consult(c) {
    return header(c, "concept-header--swiss") +
      "<section class='cs-hero'><div class='cs-hero__flag'>STRATEGY<br>TO<br>MOTION</div><div class='cs-hero__copy'><p>" + c.kicker + "</p><h1>TURN THE NEXT <span>IMPORTANT MOVE</span> INTO AN OPERATING PLAN.</h1><div><p>" + c.intro + "</p>" + button("Bring us the brief", "#contact") + "</div></div><div class='cs-hero__index'>NW / 2026<br>WORKING EDITION 01</div></section>" +
      "<section class='cs-problems section-pad' id='work'><div class='cs-grid-label'>01<br>WHAT WE SOLVE</div><div class='cs-problems__copy'><h2>Good strategy should change Monday morning.</h2><p>When priorities compete, decision rights blur, or an important change keeps circling the slide deck, we turn the problem into a working system.</p></div><div class='cs-problem-list'><article><b>01</b><span>Too many priorities</span><p>Choose the few moves that reinforce one another.</p></article><article><b>02</b><span>Strategy stuck in slides</span><p>Translate direction into owners, forums, and work.</p></article><article><b>03</b><span>Change losing energy</span><p>Create short feedback loops and visible decisions.</p></article></div></section>" +
      "<section class='cs-image-grid'><div>" + image(c, "hero", "Strategy team working around a studio table") + "</div><div class='cs-image-grid__note'><span>WORKING SESSION / 01</span><p>Put the question on the wall. Make the differences visible. Leave with the decision, not a prettier deck.</p></div></section>" +
      "<section class='cs-services section-pad'><div class='cs-grid-label'>02<br>ENGAGEMENTS</div>" + serviceCards(c, "cs-service-grid") + "</section>" +
      "<section class='cs-method section-pad' id='method'><div class='cs-method__title'><p class='eyebrow'>03 · THE METHOD</p><h2>DECIDE.<br>DESIGN.<br>DELIVER.</h2></div><div class='cs-method__steps'><article><span>DECIDE</span><h3>Make the choice explicit.</h3><p>Define the question, expose assumptions, compare real alternatives, and establish what will not be pursued.</p></article><article><span>DESIGN</span><h3>Build the operating shape.</h3><p>Connect the choice to teams, roles, measures, meeting rhythms, and near-term work.</p></article><article><span>DELIVER</span><h3>Learn in motion.</h3><p>Launch the rhythm, review evidence, resolve friction, and strengthen the system as it meets reality.</p></article></div></section>" +
      "<section class='cs-studio' id='studio'><div class='cs-studio__image'>" + image(c, "detail", "Hands arranging bold strategic frameworks and notes") + "</div><div class='cs-studio__copy'><span>THE WORKING STUDIO</span><h2>A room built for the hard middle.</h2><p>Working sessions are designed around a decision or deliverable—not presentation time. The right people, a visible problem, focused tools, and enough structure to get somewhere useful.</p><ul><li>Decision framing</li><li>Leadership alignment</li><li>Operating model design</li><li>Portfolio prioritization</li></ul></div></section>" +
      "<section class='cs-signal'><div class='cs-signal__copy'><span>04 / MAKE THE SYSTEM VISIBLE</span><h2>SEE THE WORK.<br>SEE THE FRICTION.<br>CHANGE THE RHYTHM.</h2></div><div>" + image(c, "lifestyle", "Strategy operations wall with analytical screens and visible work") + "</div></section>" +
      "<section class='cs-output section-pad'><div class='cs-grid-label'>04<br>WHAT LEAVES THE ROOM</div><div class='cs-output__grid'><h2>Not recommendations.<br>Operating material.</h2><ul><li><span>01</span>One-page strategic choice</li><li><span>02</span>Decision and ownership map</li><li><span>03</span>Ninety-day action architecture</li><li><span>04</span>Leadership operating rhythm</li><li><span>05</span>Learning and review questions</li></ul></div></section>" +
      "<section class='cs-cta' id='contact'><div><span>THE QUESTION IS THE START</span><h2>Bring us the move that cannot stay vague.</h2></div>" + button("Send the brief", "#top") + "</section>" + disclosure(c);
  }

  function dental(c) {
    return header(c, "concept-header--soft") +
      "<section class='dn-hero'><div class='dn-hero__copy'><p class='eyebrow'>" + c.kicker + "</p><h1>Dentistry designed around <em>feeling at ease.</em></h1><p>" + c.intro + "</p><div class='button-row'>" + button("Request a visit", "#contact") + button("Meet the experience", "#visit", true) + "</div></div><div class='dn-hero__visual'>" + image(c, "hero", "Calm, light-filled modern dental studio") + "<div class='dn-orbit dn-orbit--one'>ASK<br>ANYTHING</div><div class='dn-orbit dn-orbit--two'>TAKE<br>YOUR TIME</div></div></section>" +
      "<section class='dn-care section-pad' id='care'><div class='dn-care__head'><span>01</span><div><p class='eyebrow'>CARE, CLEARLY EXPLAINED</p><h2>A thoughtful plan for where you are now.</h2></div></div>" + serviceCards(c, "dn-care__bubbles") + "</section>" +
      "<section class='dn-visit' id='visit'><div class='dn-visit__panel'><p class='eyebrow'>02 · YOUR FIRST VISIT</p><h2>More conversation.<br>Less guessing.</h2><p>A good first visit creates a shared understanding. We listen to what brought you in, review what we see together, and outline the options in language that makes sense.</p><ol><li><b>Settle in</b><span>Tell us what helps you feel comfortable and what you want from the visit.</span></li><li><b>Look together</b><span>Review images and observations with time for every question.</span></li><li><b>Choose the plan</b><span>Understand the sequence, alternatives, and next step before deciding.</span></li></ol></div><div class='dn-visit__image'>" + image(c, "lifestyle", "Peaceful patient lounge with soft curved furnishings") + "</div></section>" +
      "<section class='dn-comfort section-pad' id='comfort'><div class='dn-comfort__visual'>" + image(c, "detail", "Carefully arranged modern dental instruments") + "<span>PREPARED WITH CARE</span></div><div class='dn-comfort__copy'><p class='eyebrow'>03 · COMFORT IS CLINICAL</p><h2>The environment matters.</h2><p>Clear expectations, gentle pacing, and small choices can change how a visit feels. The experience is designed to reduce uncertainty before treatment begins.</p><div class='dn-pills'><span>Explain before doing</span><span>Pause when needed</span><span>Comfort preferences noted</span><span>After-care made simple</span></div></div></section>" +
      "<section class='dn-note section-pad'><div class='dn-note__symbol'>K</div><blockquote>“You should leave knowing what we saw, what it means, and what your options are.”</blockquote><p>THE KINDRED CARE PRINCIPLE</p></section>" +
      "<section class='dn-faq section-pad'><div><p class='eyebrow'>04 · BEFORE YOUR VISIT</p><h2>A few answers for a calmer arrival.</h2></div>" + details([["Can I share dental anxiety before the appointment?", "Yes. The experience should invite you to share preferences early so the team can explain pacing and comfort options."], ["Will I understand the care plan before treatment?", "That is the aim: observations, options, sequence, and next steps presented clearly enough to make an informed choice."], ["Can care be planned in stages?", "When clinically appropriate, a plan can show priorities and sequencing so the full picture feels manageable."]]) + "</section>" +
      "<section class='dn-cta' id='contact'><span>YOU ARE WELCOME HERE</span><h2>Let’s make the next visit feel different.</h2>" + button("Request a visit", "#top") + "</section>" + disclosure(c);
  }

  function fitness(c) {
    return header(c, "concept-header--kinetic") +
      "<section class='ft-hero'><div class='ft-hero__type'><p>" + c.kicker + "</p><h1>TRAIN FOR<br>THE LIFE<br><em>OUTSIDE</em><br>THE GYM.</h1><div><p>" + c.intro + "</p>" + button("Try a session", "#contact") + "</div></div><div class='ft-hero__slash'>" + image(c, "hero", "Athlete training in a dramatic strength studio") + "<b>MOVE<br>WITH<br>INTENT</b></div></section>" +
      "<div class='ft-tape'><span>STRONGER IS USEFUL</span><span>CAPACITY COUNTS</span><span>SHOW UP READY</span><span>KEEP THE WORK HONEST</span></div>" +
      "<section class='ft-train section-pad' id='train'><div class='ft-section-title'><span>01</span><h2>Pick the room.<br>Bring the effort.</h2></div>" + serviceCards(c, "ft-training-grid") + "</section>" +
      "<section class='ft-week' id='week'><div class='ft-week__image'>" + image(c, "detail", "Close view of chalked hands and a loaded barbell") + "<span>THE WORK / WEEK BY WEEK</span></div><div class='ft-week__board'><p class='eyebrow'>02 · A TRAINING RHYTHM</p><h2>Stress. Recover.<br>Build again.</h2><div class='ft-days'><article><b>A</b><span>HEAVY</span><p>Foundational strength and long rest.</p></article><article><b>B</b><span>FAST</span><p>Power, pace, and short repeatable work.</p></article><article><b>C</b><span>LONG</span><p>Capacity, carries, and steady effort.</p></article><article><b>D</b><span>OPEN</span><p>Skills, accessories, and your own program.</p></article></div></div></section>" +
      "<section class='ft-coaching section-pad' id='coaching'><div><p class='eyebrow'>03 · COACHING</p><h2>A plan should meet the person doing it.</h2><p>Training can be demanding without being careless. We adjust the path while preserving the purpose—so each session stays challenging, understandable, and repeatable.</p></div><div class='ft-coaching__rules'><article><span>01</span><h3>Earn the next load.</h3><p>Progress follows position, control, and readiness—not ego.</p></article><article><span>02</span><h3>Know today’s intent.</h3><p>Every block should have one clear reason for being there.</p></article><article><span>03</span><h3>Leave something for life.</h3><p>The work should build your week, not consume it.</p></article></div></section>" +
      "<section class='ft-room section-pad'><div class='ft-room__copy'><span>THE ROOM</span><h2>No mirrors.<br>No posturing.<br>Plenty of work.</h2><p>A focused floor, durable tools, clear stations, and enough space to move with purpose.</p></div>" + image(c, "lifestyle", "Minimal black and red training room") + "</section>" +
      "<section class='ft-faq section-pad'><h2>BEFORE<br>SESSION ONE.</h2>" + details([["Do I need training experience?", "No. The first session establishes a sensible starting point and introduces the movement language used in the room."], ["Is this only group training?", "The concept supports coached group sessions, focused individual work, and open training for a written plan."], ["What should I bring?", "Comfortable training clothes, water, and a willingness to learn the session before trying to win it."]]) + "</section>" +
      "<section class='ft-cta' id='contact'><span>START WHERE YOU ARE</span><h2>THE NEXT REP<br>IS THE WHOLE IDEA.</h2>" + button("Try a session", "#top") + "</section>" + disclosure(c);
  }

  function commerce(c) {
    return header(c, "concept-header--shop") +
      "<section class='ec-hero'><div class='ec-hero__image'>" + image(c, "hero", "Handcrafted ceramics and linens arranged as a warm still life") + "<span>THE GATHERING EDIT / No. 01</span></div><div class='ec-hero__copy'><p class='eyebrow'>" + c.kicker + "</p><h1>Useful objects for a <em>slower, better home.</em></h1><p>" + c.intro + "</p>" + button("Shop the edit", "#shop") + "</div></section>" +
      "<section class='ec-categories section-pad' id='shop'><div class='ec-heading'><p class='eyebrow'>01 · SHOP BY USE</p><h2>Made for the moments that happen every day.</h2></div><div class='ec-category-grid'><article><div>" + image(c, "detail", "Hand-thrown ceramic vessel on a wooden table") + "</div><span>01</span><h3>Pour & serve</h3><a href='#collection'>Shop tableware →</a></article><article><div>" + image(c, "lifestyle", "Layered table set with tactile ceramics and linen") + "</div><span>02</span><h3>Gather & share</h3><a href='#collection'>Shop the table →</a></article><article class='ec-category-grid__text'><span>03</span><h3>Give something useful.</h3><p>Small sets with good materials, quiet color, and no guesswork required.</p><a href='#contact'>Open the gift edit →</a></article></div></section>" +
      "<section class='ec-maker' id='makers'><div class='ec-maker__copy'><p class='eyebrow'>FROM THE MAKER’S HAND</p><h2>Small variations.<br>Plenty of character.</h2><p>We choose objects where the evidence of making is part of the beauty: a softened edge, a visible grain, glaze that pools a little differently each time.</p><ul><li>Natural and tactile materials</li><li>Processes worth understanding</li><li>Forms made to be used often</li></ul></div><div class='ec-maker__stamp'><span>ORRIS</span><b>OBJECTS WITH PURPOSE</b><small>FIELD SUPPLY / HOME</small></div></section>" +
      "<section class='ec-collection section-pad' id='collection'><div class='ec-collection__head'><p>02 / THE EVERYDAY TABLE</p><h2>A collection in clay, oat, smoke, and wood.</h2></div><div class='ec-products'><article>" + image(c, "detail", "Textured stoneware bowl") + "<div><h3>River bowl</h3><span>speckled clay</span></div></article><article>" + image(c, "hero", "Ceramic pitcher and linen table objects", "ec-products__crop") + "<div><h3>Long-pour pitcher</h3><span>iron wash</span></div></article><article>" + image(c, "lifestyle", "Quietly layered dining table") + "<div><h3>Gathering linen</h3><span>washed flax</span></div></article></div></section>" +
      "<section class='ec-journal section-pad' id='journal'><div class='ec-journal__issue'>FIELD NOTES / 07</div><div><p class='eyebrow'>CARE & KEEPING</p><h2>Let the good things show their age.</h2><p>Linen softens. Wood deepens. Glaze carries the quiet evidence of meals shared and shelves rearranged. Care should preserve usefulness without erasing life.</p><a href='#contact'>Read the material notes →</a></div></section>" +
      "<section class='ec-service section-pad'><p class='eyebrow'>THE ORRIS WAY</p>" + serviceCards(c, "ec-service-row") + "</section>" +
      "<section class='ec-cta' id='contact'><div><span>A GOOD TABLE STARTS WITH ONE USEFUL THING</span><h2>Bring home an object worth keeping.</h2></div>" + button("Shop the edit", "#top") + "</section>" + disclosure(c);
  }

  function homeServices(c) {
    return header(c, "concept-header--friendly") +
      "<section class='hs-hero'><div class='hs-hero__copy'><div class='hs-chip'>THE HOME LIST, HANDLED</div><h1>The capable crew for your home’s <em>running list.</em></h1><p>" + c.intro + "</p><div class='button-row'>" + button("Build my project list", "#contact") + button("Browse services", "#services", true) + "</div><div class='hs-proof'><span>Clear arrival windows</span><span>Upfront scope review</span><span>Respectful cleanup</span></div></div><div class='hs-hero__visual'>" + image(c, "hero", "Skilled home-service professional installing a shelf") + "<div class='hs-card'><b>WHAT’S ON YOUR LIST?</b><ul><li>Hang two shelves</li><li>Adjust the pantry door</li><li>Install entry hooks</li></ul><a href='#contact'>+ Add your projects</a></div></div></section>" +
      "<section class='hs-services section-pad' id='services'><div class='hs-heading'><p class='eyebrow'>01 · SERVICES</p><h2>Small repairs.<br>Smart upgrades.<br>One organized visit.</h2></div>" + serviceCards(c, "hs-service-grid") + "</section>" +
      "<section class='hs-rooms section-pad' id='rooms'><div class='hs-rooms__map'><div class='hs-room hs-room--kitchen'><b>KITCHEN</b><span>hardware · shelving · caulk</span></div><div class='hs-room hs-room--entry'><b>ENTRY</b><span>hooks · trim · doors</span></div><div class='hs-room hs-room--living'><b>LIVING</b><span>mounting · patching · finish</span></div><div class='hs-room hs-room--utility'><b>UTILITY</b><span>storage · organization · installs</span></div></div><div class='hs-rooms__copy'><p class='eyebrow'>02 · BY ROOM</p><h2>Start with the place that keeps bothering you.</h2><p>Bundle a few practical projects in the same part of the home or build a list across rooms. A clear preview helps the crew arrive with the right plan.</p>" + button("Build a room list", "#contact", true) + "</div></section>" +
      "<section class='hs-detail'><div class='hs-detail__copy'><span>DETAIL / 03</span><h2>The finish is part of the fix.</h2><p>Straight lines, clean edges, protected surfaces, organized tools, and a room left ready to use. The last ten percent is often what makes a project feel complete.</p><div class='hs-detail__tools'>MEASURE · PREP · INSTALL · RESET</div></div><div>" + image(c, "detail", "Home-service tools arranged neatly on a protected surface") + "</div></section>" +
      "<section class='hs-process section-pad' id='process'><div class='hs-process__head'><p class='eyebrow'>03 · HOW IT WORKS</p><h2>From “we should fix that” to done.</h2></div><ol><li><span>1</span><div><b>Send the list</b><p>Share the projects, room photos, and any materials already on hand.</p></div></li><li><span>2</span><div><b>Confirm the scope</b><p>Review what belongs in one visit and what needs a different plan.</p></div></li><li><span>3</span><div><b>Welcome the crew</b><p>Walk the list, protect the work area, and get the projects moving.</p></div></li><li><span>4</span><div><b>Check it together</b><p>Review the finish and leave each space ready to use.</p></div></li></ol></section>" +
      "<section class='hs-finish section-pad'><div>" + image(c, "lifestyle", "Finished mudroom with built-in storage and warm details") + "</div><div><p class='eyebrow'>04 · A ROOM THAT WORKS HARDER</p><h2>The best upgrade might be the one you notice every day.</h2><p>A shelf where the bags always land. Hooks at the right height. A door that finally closes cleanly. Practical improvements make daily routines feel lighter.</p></div></section>" +
      "<section class='hs-faq section-pad'><h2>Handy answers.</h2>" + details([["What should go on my project list?", "Small repairs, installs, mounting, patching, trim, hardware, storage, and practical room improvements are a useful starting point."], ["Can several small projects share one visit?", "That is the idea. Photos and a detailed list help group work into a realistic, well-prepared visit."], ["Should I purchase materials first?", "Share what you have in mind before buying. The scope can clarify measurements, compatible materials, and what should be ready on site."]]) + "</section>" +
      "<section class='hs-cta' id='contact'><div class='hs-cta__icon'>✓</div><div><span>READY WHEN YOUR LIST IS</span><h2>What can we help you finish?</h2></div>" + button("Build my project list", "#top") + "</section>" + disclosure(c);
  }

  function salon(c) {
    return header(c, "concept-header--miro") +
      "<section class='sl-hero'><div class='sl-hero__word'>MIRO</div><div class='sl-hero__image'>" + image(c, "hero", "Editorial modern salon with sculptural pink interiors") + "</div><div class='sl-hero__copy'><p>" + c.kicker + "</p><h1>Good hair changes the whole <em>composition.</em></h1>" + button("Book a chair", "#contact") + "</div><span class='sl-hero__side'>SHAPE / TONE / TEXTURE / MOVEMENT</span></section>" +
      "<section class='sl-intro section-pad'><div class='sl-intro__symbol'>M</div><div><p class='eyebrow'>THE HOUSE POINT OF VIEW</p><h2>" + c.intro + "</h2></div><p>Bring references. Bring questions. Bring the amount of effort you actually want to spend at home. The best result belongs to your life after you leave the chair.</p></section>" +
      "<section class='sl-menu section-pad' id='menu'><div class='sl-menu__head'><p>01 / THE MENU</p><h2>Choose a starting point.</h2></div><div class='sl-menu__list'><article><span>01</span><h3>Shape</h3><p>Consultation, cleanse, cut, and finish—with room to talk texture, routine, and how it grows.</p><a href='#contact'>Book a cut ↗</a></article><article><span>02</span><h3>Dimension</h3><p>Placement-led color for brightness, depth, contrast, or a softer transition through the lengths.</p><a href='#contact'>Book color ↗</a></article><article><span>03</span><h3>Shift</h3><p>A larger change with the consultation time to align references, maintenance, and the path there.</p><a href='#contact'>Plan a change ↗</a></article><article><span>04</span><h3>Polish</h3><p>Gloss, repair, scalp care, or an event finish when the detail needs its own appointment.</p><a href='#contact'>Book a ritual ↗</a></article></div></section>" +
      "<section class='sl-approach' id='artists'><div class='sl-approach__image'>" + image(c, "detail", "Stylist shaping a precise modern haircut") + "</div><div class='sl-approach__copy'><span>02 / THE CONSULTATION</span><h2>Reference the feeling, not only the photo.</h2><p>We look at the details behind the image: density, texture, current color, daily routine, desired contrast, and how often you want to return. That turns inspiration into a direction made for you.</p><div class='sl-approach__tags'><b>AIR-DRY</b><b>HIGH CONTRAST</b><b>SOFT GROW-OUT</b><b>STRONG SHAPE</b></div></div></section>" +
      "<section class='sl-ritual section-pad' id='ritual'><div><p class='eyebrow'>03 · THE RITUAL</p><h2>An appointment with better pacing.</h2></div><ol><li><b>ARRIVE</b><p>Settle in, put the references on the table, and name what is not working.</p></li><li><b>COMPOSE</b><p>Agree on shape, tone, maintenance, and the details that will carry the look.</p></li><li><b>MAKE</b><p>Work with focus, explain what matters, and adjust as the composition develops.</p></li><li><b>LEAVE READY</b><p>Understand the finish, home routine, and the right timing for what comes next.</p></li></ol></section>" +
      "<section class='sl-still'><div class='sl-still__copy'><span>THE MIRO SHELF</span><h2>Care for the<br>work between visits.</h2><p>A smaller, clearer edit of products chosen around texture, tone, and the finish you actually wear.</p>" + button("Build my ritual", "#contact", true) + "</div><div>" + image(c, "lifestyle", "Sculptural plum-toned hair-care still life") + "</div></section>" +
      "<section class='sl-faq section-pad'><p class='eyebrow'>04 · BEFORE THE CHAIR</p>" + details([["Which service should I choose?", "Choose the closest starting point and share the outcome you want. The appointment path can be adjusted after a consultation."], ["Can I bring reference images?", "Please do. A useful consultation also discusses what you like about each image and how you want the result to behave day to day."], ["How should I arrive for color?", "The final pre-visit guidance would be confirmed for the chosen service, current hair, and planned technique."]]) + "</section>" +
      "<section class='sl-cta' id='contact'><span>YOUR CHAIR IS THE START</span><h2>Let’s change the composition.</h2>" + button("Book a chair", "#top") + "</section>" + disclosure(c);
  }

  const renderers = {
    roofing: roof,
    cleaning: clean,
    landscaping: landscape,
    "real-estate": estate,
    restaurant: restaurant,
    "law-firm": law,
    consulting: consult,
    dental: dental,
    fitness: fitness,
    ecommerce: commerce,
    "home-services": homeServices,
    salon: salon
  };

  root.className = "concept concept--" + concept.id;
  root.innerHTML = renderers[concept.id](concept);
  document.title = concept.brand + " — Website Design Concept";

  const menuToggle = root.querySelector(".menu-toggle");
  const nav = root.querySelector(".concept-header nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  if (window.parent !== window) {
    document.addEventListener("keydown", function (event) {
      if (["Escape", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        window.parent.postMessage({ type: "wdd-concept-key", key: event.key }, window.location.origin);
      }
    });
  }
})();
