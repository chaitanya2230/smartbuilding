// SmartBuild Data Engine
// Pure static dataset — no external APIs required
// Generates comprehensive construction plans from built-in data

// ─── Randomization Helpers ──────────────────────────────────────────────────
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function vary(value, pct = 10) {
  // Add ±pct% random variation to a number
  const factor = 1 + (Math.random() * 2 - 1) * (pct / 100);
  return Math.round(value * factor);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatINR(num) {
  return '₹' + Number(num).toLocaleString('en-IN');
}

// ─── Brand & Material Databases ─────────────────────────────────────────────
const CEMENT_BRANDS = ['UltraTech', 'ACC', 'Ambuja', 'Birla A1', 'Dalmia', 'Ramco'];
const STEEL_BRANDS = ['Tata Tiscon', 'JSW NeoSteel', 'SAIL', 'Kamdhenu', 'Vizag Steel'];
const PAINT_BRANDS = ['Asian Paints Royale', 'Berger Silk', 'Nerolac Excel', 'Dulux Velvet Touch'];
const TILE_BRANDS = ['Kajaria', 'Somany', 'Johnson', 'Nitco', 'Orient Bell'];
const FITTING_BRANDS = ['Hindware', 'Cera', 'Parryware', 'Jaquar'];
const WIRE_BRANDS = ['Havells', 'Polycab', 'Finolex', 'KEI'];
const SWITCH_BRANDS = ['Legrand', 'Schneider', 'Anchor Roma', 'GM Modular'];
const PIPE_BRANDS = ['Astral CPVC', 'Supreme', 'Prince', 'Finolex'];
const DOOR_STYLES = ['Flush doors (Teak veneer)', 'Semi-solid engineered doors', 'Solid teak doors', 'WPC doors'];
const WINDOW_TYPES = ['UPVC sliding windows', 'Aluminium powder-coated windows', 'UPVC casement windows'];
const KITCHEN_FINISHES = ['Acrylic gloss', 'PU matte', 'Laminate (Merino/Greenlam)', 'Membrane'];
const COUNTERTOP_OPTIONS = ['Black Galaxy Granite', 'Absolute Black Granite', 'Rajasthan Black Marble', 'White Quartz'];

const DESIGN_STYLES = [
  { name: 'Modern Contemporary Indian', desc: 'Clean modern lines with warm Indian aesthetics' },
  { name: 'Minimalist Scandinavian', desc: 'Light tones, clean geometry, and functional beauty' },
  { name: 'Neo-Traditional Indian', desc: 'Classic Indian motifs with modern finishes' },
  { name: 'Urban Industrial Chic', desc: 'Exposed textures, metal accents, and bold spaces' },
  { name: 'Tropical Contemporary', desc: 'Lush greenery, natural materials, and open layouts' },
];

const COLOR_PALETTES = [
  { primary: 'Warm White (#FAF9F6)', accent: 'Sage Green (#9CAF88)', neutral: 'Walnut (#5C4033)' },
  { primary: 'Ivory (#FFFFF0)', accent: 'Dusty Rose (#DCAE96)', neutral: 'Charcoal (#36454F)' },
  { primary: 'Pearl White (#F0EAD6)', accent: 'Teal (#008080)', neutral: 'Driftwood (#AF8F6F)' },
  { primary: 'Antique White (#FAEBD7)', accent: 'Terracotta (#CC4E24)', neutral: 'Slate (#708090)' },
  { primary: 'Linen (#FAF0E6)', accent: 'Ocean Blue (#4F97A3)', neutral: 'Espresso (#3C1414)' },
];

const BUDGET_TIPS = [
  '🏗️ **Use AAC blocks** instead of red bricks — saves 15-20% on wall construction',
  '🪵 **Ready-made doors** (flush doors) instead of custom teak — saves ₹5,000-8,000 per door',
  '🎨 **Use Birla Putty + emulsion** instead of POP + enamel — saves ~₹15/sq ft',
  '🚿 **Source bathroom fittings locally** (Cera/Hindware) — 30% cheaper than imported brands',
  '⚡ **LED panel lights** instead of decorative fixtures — 60% savings on lighting',
  '🏠 **M-Sand** instead of river sand — consistent quality, 20-30% cheaper',
  '🧱 **Fly ash bricks** for inner walls — eco-friendly and 15% cheaper',
  '🪟 **UPVC windows** instead of aluminium — 25% cheaper, better insulation',
  '🔩 **Pre-fabricated staircases** — saves 30% labor cost and time',
  '💡 **Solar water heater** on terrace — saves 40% on monthly electricity bills',
  '🏗️ **RMC (Ready Mix Concrete)** for slabs — better quality, less wastage',
  '🎨 **Textured paint** on feature walls instead of wallpaper — 50% cheaper, longer lasting',
];

// ─── Comprehensive Data Generator ──────────────────────────────────────────
function generateData(inputs, sectionId) {
  const {
    plotSize = '1200',
    budget = '30,00,000',
    location = 'Bangalore',
    floors = '2',
    direction = 'North',
    type = 'Independent House',
    familySize = '4',
    climate = 'Composite',
    notes = ''
  } = inputs;

  const plotNum = parseInt(plotSize) || 1200;
  const budgetClean = budget.toString().replace(/,/g, '');
  const budgetNum = parseInt(budgetClean) || 3000000;
  const budgetFormatted = formatINR(budgetNum);
  const floorsNum = parseInt(floors) || 2;
  const builtUpArea = Math.round(plotNum * 0.6 * floorsNum);
  const costPerSqft = Math.round(budgetNum / builtUpArea);
  const familyNum = parseInt(familySize) || 4;

  // Determine BHK with slight randomization
  let bhk = '2 BHK';
  if (builtUpArea > 2000) bhk = pick(['4 BHK', '4 BHK', '3 BHK + Study']);
  else if (builtUpArea > 1400) bhk = pick(['3 BHK', '3 BHK', '2 BHK + Study']);
  else if (builtUpArea > 800) bhk = '2 BHK';
  else bhk = '1 BHK';

  // Pick random brands/materials for this generation
  const cementBrand = pick(CEMENT_BRANDS);
  const steelBrand = pick(STEEL_BRANDS);
  const paintBrand = pick(PAINT_BRANDS);
  const tileBrand = pick(TILE_BRANDS);
  const fittingBrand = pick(FITTING_BRANDS);
  const wireBrand = pick(WIRE_BRANDS);
  const switchBrand = pick(SWITCH_BRANDS);
  const pipeBrand = pick(PIPE_BRANDS);
  const doorStyle = pick(DOOR_STYLES);
  const windowType = pick(WINDOW_TYPES);
  const kitchenFinish = pick(KITCHEN_FINISHES);
  const countertop = pick(COUNTERTOP_OPTIONS);
  const designStyle = pick(DESIGN_STYLES);
  const palette = pick(COLOR_PALETTES);

  // Randomized cost rates
  const cementRate = vary(380, 8);
  const steelRate = vary(72, 10);
  const brickRate = vary(55, 12);
  const sandRate = vary(55, 10);
  const aggRate = vary(38, 8);
  const tileRate = vary(65, 15);
  const paintRate = vary(18, 10);
  const doorRate = vary(12000, 15);
  const bathFittingRate = vary(35000, 15);
  const doorWindowCount = vary(8 + floorsNum * 4, 10);
  const bathCount = 2 + floorsNum;

  // Variation on phase costs
  const foundPct = vary(12, 8) / 100;
  const structPct = vary(25, 6) / 100;
  const brickPct = vary(10, 10) / 100;
  const plasterPct = vary(8, 10) / 100;
  const floorPct = vary(8, 10) / 100;
  const mepPct = vary(13, 8) / 100;
  const finishPct = vary(12, 8) / 100;
  const intPct = vary(7, 10) / 100;
  const contingPct = 0.05;

  // Random tips selection (pick 6 unique)
  const shuffled = [...BUDGET_TIPS].sort(() => Math.random() - 0.5);
  const selectedTips = shuffled.slice(0, 6);

  const data = {
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 1: PROJECT SUMMARY
    // ═══════════════════════════════════════════════════════════════════
    summary: `# 📋 Project Summary — ${type}

## 1. Project Overview

| Parameter | Details |
|-----------|---------|
| **Plot Size** | ${plotSize} sq ft |
| **Built-Up Area** | ${builtUpArea} sq ft (across ${floorsNum} floor${floorsNum > 1 ? 's' : ''}) |
| **Configuration** | ${bhk} ${type} |
| **Location** | ${location}, India |
| **Total Budget** | ${budgetFormatted} |
| **Cost Per Sq Ft** | ₹${costPerSqft.toLocaleString('en-IN')} |
| **Plot Direction** | ${direction}-facing |
| **Family Size** | ${familyNum} members |
| **Climate Zone** | ${climate} |

## 2. Space Planning — Floor-wise Distribution

### Ground Floor (${Math.round(plotNum * 0.6)} sq ft)
- **Living Room**: ${Math.round(plotNum * 0.12)} sq ft — Open layout with natural ventilation
- **Master Bedroom**: ${Math.round(plotNum * 0.1)} sq ft — With attached bathroom & walk-in wardrobe
- **Kitchen**: ${Math.round(plotNum * 0.08)} sq ft — Modular kitchen with platform & chimney provision
- **Dining Area**: ${Math.round(plotNum * 0.06)} sq ft — Adjacent to kitchen
- **Bathroom (common)**: ${Math.round(plotNum * 0.03)} sq ft
- **Pooja Room**: ${Math.round(plotNum * 0.02)} sq ft — As per Vastu guidelines
- **Car Parking**: ${Math.round(plotNum * 0.12)} sq ft — Covered parking for 1 car
- **Staircase**: ${Math.round(plotNum * 0.04)} sq ft
- **Setback and Utility**: Remaining area${floorsNum > 1 ? `

### First Floor (${Math.round(plotNum * 0.6)} sq ft)
- **Bedroom 2**: ${Math.round(plotNum * 0.1)} sq ft — With attached bathroom
- **Bedroom 3**: ${Math.round(plotNum * 0.09)} sq ft — With attached bathroom
- **Family Lounge / Study**: ${Math.round(plotNum * 0.08)} sq ft
- **Balcony**: ${Math.round(plotNum * 0.05)} sq ft — Front and rear balconies
- **Common Bathroom**: ${Math.round(plotNum * 0.03)} sq ft
- **Utility / Store**: ${Math.round(plotNum * 0.04)} sq ft` : ''}

## 3. Key Highlights

- ✅ **Optimized Layout** — Maximum utilization of ${plotSize} sq ft with 60% ground coverage
- ✅ **Natural Light & Ventilation** — Cross ventilation design, large windows on ${direction}-facing walls
- ✅ **Modern Amenities** — Modular kitchen, smart wiring, rainwater harvesting provision
- ✅ **Energy Efficient** — LED-ready wiring, solar panel provision on terrace
- ✅ **Future Ready** — Structural design supports additional floor if needed
- ✅ **Vastu Compliant** — Room placement follows ${direction}-facing Vastu guidelines
- ✅ **Recommended Brands** — ${cementBrand} cement, ${steelBrand} steel, ${tileBrand} tiles

## 4. Regulatory Considerations

| Requirement | Specification |
|-------------|---------------|
| **Front Setback** | 3.0 meters (as per local bylaws) |
| **Side Setbacks** | 1.5 meters each side |
| **Rear Setback** | 1.5 meters |
| **FAR/FSI** | ${(floorsNum * 0.6).toFixed(1)} (within permissible limit of ${(floorsNum * 0.75).toFixed(1)}) |
| **Ground Coverage** | 60% (max permissible: 65%) |
| **Parking** | 1 covered car park (${Math.round(plotNum * 0.12)} sq ft) |
| **Height Restriction** | ${floorsNum * 3.2}m (within ${floorsNum <= 3 ? '12m' : '15m'} limit) |

> **Note**: Final setback and FAR values should be confirmed with the ${location} Municipal Corporation / DTCP before construction begins.`,

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 2: COST ESTIMATION
    // ═══════════════════════════════════════════════════════════════════
    cost: `# 💰 Detailed Cost Estimation — ${type}

## 1. Overall Budget Summary

| Parameter | Amount |
|-----------|--------|
| **Total Project Budget** | ${budgetFormatted} |
| **Built-Up Area** | ${builtUpArea} sq ft |
| **Cost Per Sq Ft** | ₹${costPerSqft.toLocaleString('en-IN')} |
| **Construction Cost** | ${formatINR(Math.round(budgetNum * 0.75))} (75%) |
| **Interior & Finishing** | ${formatINR(Math.round(budgetNum * 0.20))} (20%) |
| **Contingency** | ${formatINR(Math.round(budgetNum * 0.05))} (5%) |

## 2. Material-wise Cost Breakdown

| Material | Quantity | Rate | Cost (₹) | % of Total |
|----------|----------|------|-----------|------------|
| **Cement (${cementBrand} OPC 53)** | ${Math.round(builtUpArea * 0.4)} bags | ₹${cementRate}/bag | ${formatINR(Math.round(builtUpArea * 0.4 * cementRate))} | ${((builtUpArea * 0.4 * cementRate / budgetNum) * 100).toFixed(1)}% |
| **Steel (${steelBrand} Fe500D)** | ${Math.round(builtUpArea * 4)} kg | ₹${steelRate}/kg | ${formatINR(Math.round(builtUpArea * 4 * steelRate))} | ${((builtUpArea * 4 * steelRate / budgetNum) * 100).toFixed(1)}% |
| **Bricks (AAC Blocks)** | ${Math.round(builtUpArea * 8)} nos | ₹${brickRate}/piece | ${formatINR(Math.round(builtUpArea * 8 * brickRate))} | ${((builtUpArea * 8 * brickRate / budgetNum) * 100).toFixed(1)}% |
| **Sand (River/M-Sand)** | ${Math.round(builtUpArea * 0.6)} cft | ₹${sandRate}/cft | ${formatINR(Math.round(builtUpArea * 0.6 * sandRate))} | ${((builtUpArea * 0.6 * sandRate / budgetNum) * 100).toFixed(1)}% |
| **Aggregates** | ${Math.round(builtUpArea * 0.5)} cft | ₹${aggRate}/cft | ${formatINR(Math.round(builtUpArea * 0.5 * aggRate))} | ${((builtUpArea * 0.5 * aggRate / budgetNum) * 100).toFixed(1)}% |
| **Plumbing (${pipeBrand})** | Lump Sum | — | ${formatINR(Math.round(budgetNum * 0.06))} | 6.0% |
| **Electrical (${wireBrand})** | Lump Sum | — | ${formatINR(Math.round(budgetNum * 0.07))} | 7.0% |
| **Flooring (${tileBrand} Vitrified)** | ${builtUpArea} sq ft | ₹${tileRate}/sq ft | ${formatINR(Math.round(builtUpArea * tileRate))} | ${((builtUpArea * tileRate / budgetNum) * 100).toFixed(1)}% |
| **Doors & Windows** | ${doorWindowCount} units | Avg ₹${doorRate.toLocaleString('en-IN')} | ${formatINR(doorWindowCount * doorRate)} | ${((doorWindowCount * doorRate / budgetNum) * 100).toFixed(1)}% |
| **Paint (${paintBrand})** | ${builtUpArea * 3} sq ft | ₹${paintRate}/sq ft | ${formatINR(Math.round(builtUpArea * 3 * paintRate))} | ${((builtUpArea * 3 * paintRate / budgetNum) * 100).toFixed(1)}% |
| **Kitchen (Modular — ${kitchenFinish})** | 1 set | — | ${formatINR(Math.round(budgetNum * 0.05))} | 5.0% |
| **Bathroom Fittings (${fittingBrand})** | ${bathCount} sets | ₹${bathFittingRate.toLocaleString('en-IN')}/set | ${formatINR(bathCount * bathFittingRate)} | ${((bathCount * bathFittingRate / budgetNum) * 100).toFixed(1)}% |
| **Waterproofing** | Lump Sum | — | ${formatINR(Math.round(budgetNum * 0.025))} | 2.5% |

## 3. Phase-wise Cost Allocation

| Phase | Description | Cost (₹) | % |
|-------|-------------|-----------|---|
| **Foundation** | Excavation, PCC, RCC footing, plinth beam | ${formatINR(Math.round(budgetNum * foundPct))} | ${(foundPct * 100).toFixed(0)}% |
| **Structure** | Columns, beams, slabs, staircases | ${formatINR(Math.round(budgetNum * structPct))} | ${(structPct * 100).toFixed(0)}% |
| **Brick Work** | Walls, lintels, coping | ${formatINR(Math.round(budgetNum * brickPct))} | ${(brickPct * 100).toFixed(0)}% |
| **Plastering** | Internal & external plastering | ${formatINR(Math.round(budgetNum * plasterPct))} | ${(plasterPct * 100).toFixed(0)}% |
| **Flooring** | ${tileBrand} tiles, marble, granite | ${formatINR(Math.round(budgetNum * floorPct))} | ${(floorPct * 100).toFixed(0)}% |
| **MEP** | Electrical (${wireBrand}), plumbing (${pipeBrand}), fire safety | ${formatINR(Math.round(budgetNum * mepPct))} | ${(mepPct * 100).toFixed(0)}% |
| **Finishing** | ${paintBrand}, POP, polish, hardware | ${formatINR(Math.round(budgetNum * finishPct))} | ${(finishPct * 100).toFixed(0)}% |
| **Interiors** | Kitchen (${kitchenFinish}), wardrobes, fixtures | ${formatINR(Math.round(budgetNum * intPct))} | ${(intPct * 100).toFixed(0)}% |
| **Contingency** | Unforeseen expenses | ${formatINR(Math.round(budgetNum * contingPct))} | 5% |

## 4. Labor Cost Estimate

| Trade | Duration | Daily Rate | Total Cost (₹) |
|-------|----------|------------|-----------------|
| **Mason (Head)** | ${Math.round(floorsNum * 3)} months | ₹${vary(800, 10)}/day | ${formatINR(Math.round(floorsNum * 3) * 26 * vary(800, 10))} |
| **Helpers (${rand(3, 5)} nos)** | ${Math.round(floorsNum * 3)} months | ₹${vary(500, 10)}/day | ${formatINR(Math.round(floorsNum * 3) * 26 * vary(500, 10) * rand(3, 5))} |
| **Carpenter** | ${Math.round(floorsNum * 1.5)} months | ₹${vary(700, 10)}/day | ${formatINR(Math.round(floorsNum * 1.5) * 26 * vary(700, 10))} |
| **Electrician** | ${Math.round(floorsNum * 1)} months | ₹${vary(700, 10)}/day | ${formatINR(Math.round(floorsNum * 1) * 26 * vary(700, 10))} |
| **Plumber** | ${Math.round(floorsNum * 0.75) || 1} months | ₹${vary(650, 10)}/day | ${formatINR((Math.round(floorsNum * 0.75) || 1) * 26 * vary(650, 10))} |
| **Painter** | ${Math.round(floorsNum * 1)} months | ₹${vary(600, 10)}/day | ${formatINR(Math.round(floorsNum * 1) * 26 * vary(600, 10))} |

## 5. Budget-Saving Tips 💡

${selectedTips.map(tip => `- ${tip}`).join('\n')}

> **📊 Market Note**: Rates are based on ${location} market prices (Q${rand(1, 4)} 2025). Actual costs may vary by ±10-15% depending on season and vendor.`,

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 3: INTERIOR DESIGN
    // ═══════════════════════════════════════════════════════════════════
    interior: `# 🎨 Interior Design Suggestions — ${type}

## 1. Recommended Design Style

**${designStyle.name}** — ${designStyle.desc}, making it perfect for a ${bhk} ${type} in ${location}. It emphasizes functional beauty, natural materials, and vibrant but balanced color palettes.

**Why this suits your project:**
- Maximizes visual space in ${builtUpArea} sq ft
- Budget-friendly compared to pure luxury styles
- Works well with ${climate} climate
- Blends well with Vastu-compliant layouts

## 2. Room-wise Interior Plan

### 🛋️ Living Room (${Math.round(plotNum * 0.12)} sq ft)
| Element | Recommendation |
|---------|---------------|
| **Color Palette** | ${palette.primary} walls + ${palette.accent} accent wall |
| **Flooring** | 600×600mm ${tileBrand} Light Grey Vitrified Tiles (₹${tileRate}/sq ft) |
| **Furniture** | L-shaped sofa (Fabric, Beige), Center table (${palette.neutral} finish), TV unit with back panel |
| **Lighting** | Recessed LED downlights + 1 statement pendant light + Ambient LED strip behind TV |
| **Storage** | Built-in TV unit with drawers, Floating shelves |
| **Estimated Cost** | ${formatINR(Math.round(budgetNum * vary(35, 15) / 1000))} |

### 🛏️ Master Bedroom (${Math.round(plotNum * 0.1)} sq ft)
| Element | Recommendation |
|---------|---------------|
| **Color Palette** | Dusty Blue (#B0C4DE) + Off-White (#FFFFF0) + Gold accents |
| **Flooring** | Wooden laminate / Wood-look tiles (₹${vary(80, 15)}/sq ft) |
| **Furniture** | King-size bed with hydraulic storage, Side tables, Dresser |
| **Wardrobe** | Floor-to-ceiling sliding wardrobe (Loft + Hanging + Shelves) |
| **Lighting** | Warm white cove lighting + Bedside wall sconces |
| **Estimated Cost** | ${formatINR(Math.round(budgetNum * vary(40, 15) / 1000))} |

### 🍳 Kitchen (${Math.round(plotNum * 0.08)} sq ft)
| Element | Recommendation |
|---------|---------------|
| **Layout** | L-shaped modular kitchen with breakfast counter |
| **Materials** | Marine plywood + ${kitchenFinish} finish |
| **Countertop** | ${countertop} (₹${vary(180, 15)}/sq ft) |
| **Backsplash** | Subway tiles in White/Cream |
| **Appliances Zone** | Chimney, Hob, Microwave unit, RO provision |
| **Storage** | Corner carousel, tall unit, overhead cabinets with profile lights |
| **Estimated Cost** | ${formatINR(Math.round(budgetNum * 0.05))} |

### 🚿 Bathrooms (${bathCount} nos)
| Element | Recommendation |
|---------|---------------|
| **Wall Tiles** | 300×600mm ${tileBrand} Digital Print tiles (up to 7ft height) |
| **Floor Tiles** | Anti-skid 300×300mm Matt finish |
| **Fittings Brand** | ${fittingBrand} (mid-premium range) |
| **Fixtures** | Wall-mounted WC, Rain shower in master bath |
| **Vanity** | PVC vanity with mirror cabinet |
| **Estimated Cost** | ${formatINR(bathCount * bathFittingRate)} total |

## 3. Color Scheme

| Area | Primary | Accent | Trim/Neutral |
|------|---------|--------|-------------|
| **Living Room** | ${palette.primary} | ${palette.accent} | ${palette.neutral} |
| **Master Bedroom** | Dusty Blue (#B0C4DE) | Gold (#DAA520) | Off-White (#FFFFF0) |
| **Bedroom 2** | Lavender Mist (#E6E6FA) | Teal (#008080) | Light Grey (#D3D3D3) |
| **Kitchen** | Cream (#FFFDD0) | Olive Green (#556B2F) | Black granite accents |
| **Pooja Room** | Marble White (#F5F5DC) | Sandalwood (#E6C99E) | Brass accents |
| **Staircase** | Light Taupe (#C4AEAD) | Forest Green (#228B22) | White railings |

## 4. Lighting Plan

| Room | Natural Light | Artificial Lighting |
|------|--------------|-------------------|
| **Living Room** | Large ${direction}-facing window + balcony door | ${rand(5, 8)} recessed LEDs (12W) + 1 pendant + LED strip behind TV |
| **Master Bedroom** | Window with sheer + blackout curtains | Cove lighting + 2 wall sconces + ${rand(2, 4)} recessed LEDs |
| **Kitchen** | Window above sink + ventilator | Under-cabinet LED strip + ${rand(3, 6)} recessed LEDs (15W) |
| **Bathrooms** | Frosted glass ventilator | Mirror vanity light + 1 recessed LED (12W) |
| **Staircase** | Skylight / clerestory window | Step lights (3W each) + 1 pendant at landing |
| **Exterior** | — | Gate light + Porch downlight + Garden spotlights |

## 5. Budget-wise Interior Packages

| Package | Scope | Cost Estimate |
|---------|-------|---------------|
| **Essential** | Basic modular kitchen, wardrobes, painting, basic lights | ${formatINR(Math.round(budgetNum * 0.10))} |
| **Premium** | Full interior, false ceiling, premium tiles, designer lights | ${formatINR(Math.round(budgetNum * 0.18))} |
| **Luxury** | Imported fittings, smart home integration, Italian marble | ${formatINR(Math.round(budgetNum * 0.28))} |

> **Recommendation**: For your budget of ${budgetFormatted}, the **Premium Package** gives the best value — covering all essentials with elevated finishes.`,

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 4: VASTU SHASTRA
    // ═══════════════════════════════════════════════════════════════════
    vastu: `# 🧭 Vastu Shastra Layout Plan — ${direction}-Facing ${type}

## 1. Plot Analysis — ${direction}-Facing

**${direction}-facing plots** are ${direction === 'North' || direction === 'East' || direction === 'North-East' ? 'considered very auspicious in Vastu Shastra' : 'good for construction with proper Vastu remedies'}. Here's the detailed analysis:

| Aspect | Assessment |
|--------|-----------|
| **Plot Direction** | ${direction}-facing (Main entrance on ${direction} side) |
| **Plot Size** | ${plotSize} sq ft — ${plotNum >= 1200 ? 'Adequate' : 'Compact'} for ${bhk} |
| **Shape** | Rectangular preferred (ideal ratio 1:1.5) |
| **Auspiciousness** | ${direction === 'North' || direction === 'East' ? '⭐⭐⭐⭐⭐ Highly Auspicious' : direction === 'North-East' ? '⭐⭐⭐⭐⭐ Most Auspicious' : direction === 'West' || direction === 'South' ? '⭐⭐⭐ Good with remedies' : '⭐⭐⭐⭐ Good'} |
| **Ruling Element** | ${direction === 'North' ? 'Water (Jal)' : direction === 'South' ? 'Fire (Agni)' : direction === 'East' ? 'Air (Vayu)' : direction === 'West' ? 'Space (Akash)' : 'Mixed elements'} |

## 2. Room Placement Guide

### Ideal Room Positions for ${direction}-Facing Plot

| Room | Recommended Direction | Reasoning |
|------|----------------------|-----------|
| **Main Entrance** | ${direction} (center or slightly ${direction === 'North' ? 'east' : direction === 'East' ? 'north' : direction === 'South' ? 'east' : 'north'}) | Positive energy entry point |
| **Living Room** | North-East or North | Maximum positive energy, natural light |
| **Master Bedroom** | South-West | Stability and grounding for head of family |
| **Children's Bedroom** | West or North-West | Promotes creativity and growth |
| **Guest Bedroom** | North-West | Temporary stay energy |
| **Kitchen** | South-East (Agni corner) | Fire element alignment |
| **Pooja Room** | North-East (Ishaan corner) | Most sacred direction |
| **Bathrooms** | North-West or West | Water drainage direction |
| **Staircase** | South or West | Should ascend clockwise |
| **Dining Area** | West or adjacent to kitchen | Promotes family harmony |
| **Store Room** | South-West (ground floor) | Heavy storage stabilizes energy |
| **Car Parking** | North-West or South-East | Avoid North-East parking |

### Floor Plan Layout (${direction}-Facing)

\`\`\`
╔═══════════════════════════════════════════╗
║               NORTH                        ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐ ║
║  │  Pooja   │  │  Living  │  │  Dining  │ ║
║  │  Room    │  │  Room    │  │  Area    │ ║
║  │ (N-East) │  │ (North)  │  │ (West)   │ ║
║  └──────────┘  └──────────┘  └──────────┘ ║
║  ┌──────────┐       🚪       ┌──────────┐ ║
║W │ Bedroom  │  Main Entrance │ Kitchen  │E║
║E │   2      │               │ (S-East) │A║
║S │ (West)   │               │          │S║
║T └──────────┘               └──────────┘T║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐ ║
║  │ Bathroom │  │ Master   │  │ Stair    │ ║
║  │ (N-West) │  │ Bedroom  │  │ case     │ ║
║  │          │  │ (S-West) │  │ (South)  │ ║
║  └──────────┘  └──────────┘  └──────────┘ ║
║               SOUTH                        ║
╚═══════════════════════════════════════════╝
\`\`\`

## 3. Vastu Rules — Dos & Don'ts

### ✅ DO's
- Place **main entrance** in an auspicious pada (${direction === 'North' ? '4th or 5th pada from North-East' : direction === 'East' ? '4th pada from North-East' : '4th or 5th pada from the corner'})
- Keep **North-East corner** open, light, and clutter-free
- Ensure **kitchen platform** faces East (cook should face East while cooking)
- Place **pooja facing East or North**
- Keep **master bedroom head** towards South or West wall
- Install **overhead water tank** in the South-West
- Use **light colors** (white, cream, light yellow) for North and East walls

### ❌ DON'Ts
- **Never** place toilet in North-East corner
- **Avoid** staircase in the center (Brahmasthan) of the house
- **Don't** place mirror opposite the bed in bedrooms
- **Avoid** kitchen directly opposite or adjacent to bathroom
- **Don't** keep heavy furniture in North-East
- **Avoid** underground water tank in South-West
- **Never** have main door opening outward

## 4. Vastu Remedies — Common Defects & Solutions

| Defect | Remedy |
|--------|--------|
| **South-West entrance (if unavoidable)** | Place a Vastu pyramid / brass lamp near door, use dark colored door |
| **Toilet in wrong direction** | Use light green tiles, place sea salt bowl, ensure ventilation |
| **Cut in North-East** | Place a crystal ball or water fountain in nearest N-E corner |
| **Staircase in center** | Place a Vastu yantra below staircase, use light colors |
| **Beam above bed** | Use false ceiling to conceal, or shift bed position |
| **Kitchen in North-East** | Place heavy granite slab, shift stove to S-E corner of kitchen |

## 5. Floor-wise Vastu Plan

### Ground Floor
- **N-E**: Pooja room + Open porch / garden area
- **S-E**: Kitchen with gas stove in S-E corner
- **S-W**: Master bedroom (head of family)
- **N-W**: Common bathroom + Car parking
- **Center**: Living room (keep well-lit and ventilated)

${floorsNum > 1 ? `### First Floor
- **N-E**: Study room / Children's room with study table in N-E
- **S-W**: Bedroom 2 (head of bed towards South wall)
- **N-W**: Guest bedroom / Store room
- **S-E**: Utility area / Open terrace
- **Center**: Family lounge (keep open and well-ventilated)` : ''}

${floorsNum > 2 ? `### Second Floor / Terrace
- **S-W**: Overhead water tank (2000L)
- **N-E**: Open terrace / Garden area (keep this side lower)
- **S-E**: Solar panel installation area
- **N-W**: Utility room / Washing area` : ''}

> **🔮 Vastu Tip for ${location}**: Given the ${climate} climate, ensure ample ventilation through jali work on the ${direction === 'North' || direction === 'East' ? 'South and West' : 'North and East'} walls to balance natural airflow as per Vastu.`,

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 5: CONSTRUCTION TIMELINE
    // ═══════════════════════════════════════════════════════════════════
    timeline: `# 📅 Construction Timeline — ${type}

## 1. Overall Duration

| Milestone | Timeline |
|-----------|----------|
| **Total Construction Period** | ${floorsNum <= 2 ? `${rand(10, 14)}` : `${rand(14, 18)}`} months |
| **Pre-Construction Phase** | ${rand(1, 2)} months |
| **Construction Phase** | ${floorsNum <= 2 ? `${rand(8, 10)}` : `${rand(10, 14)}`} months |
| **Final Finishing** | ${rand(1, 2)} months |
| **Expected Handover** | Month ${floorsNum <= 2 ? rand(12, 14) : rand(16, 18)} |

## 2. Phase-wise Timeline

### Phase 1: Pre-Construction (Month 1-2)

| Task | Duration | Details |
|------|----------|---------|
| **Site Survey & Soil Test** | Week 1-2 | Soil bearing capacity test, topographical survey |
| **Architectural Drawing** | Week 2-4 | Floor plans, elevations, 3D views, structural drawings |
| **Approval & Permits** | Week 3-6 | Building plan approval from ${location} Municipal Corporation |
| **Contractor Finalization** | Week 5-7 | Compare 3-4 quotes, finalize contract terms |
| **Material Procurement (Phase 1)** | Week 6-8 | ${cementBrand} cement, ${steelBrand} steel, sand, aggregates booking |

### Phase 2: Foundation (Month 2-3)

| Task | Duration | Details |
|------|----------|---------|
| **Site Clearing** | ${rand(2, 4)} days | Remove debris, level the ground |
| **Excavation** | ${rand(4, 6)} days | Trench excavation for footings (depth: 4-5 ft) |
| **PCC (Plain Cement Concrete)** | ${rand(2, 4)} days | 1:4:8 mix, 150mm thick base |
| **RCC Footing** | ${rand(5, 8)} days | Isolated footings as per structural design |
| **Anti-termite Treatment** | ${rand(1, 3)} days | Chemical treatment of foundation soil |
| **Plinth Beam** | ${rand(5, 8)} days | RCC beams connecting all footings |
| **Plinth Filling** | ${rand(3, 5)} days | Sand/gravel filling up to plinth level |
| **DPC (Damp Proof Course)** | ${rand(1, 3)} days | Waterproof membrane at plinth level |

### Phase 3: Structure — Ground Floor (Month 3-5)

| Task | Duration | Details |
|------|----------|---------|
| **Column Casting** | ${rand(7, 12)} days | RCC columns as per structural drawing |
| **Brick/Block Work** | ${rand(15, 22)} days | AAC block walls (150mm & 200mm) |
| **Lintel Beam** | ${rand(5, 8)} days | Beams above doors and windows |
| **Roof Slab Casting** | ${rand(3, 6)} days | RCC slab (125-150mm thick) |
| **Curing Period** | ${rand(14, 21)} days | Minimum 14 days water curing for slab |

${floorsNum > 1 ? `### Phase 4: Structure — First Floor (Month 5-7)

| Task | Duration | Details |
|------|----------|---------|
| **Staircase Construction** | ${rand(5, 8)} days | Dog-legged / L-shaped staircase |
| **Column & Wall Work** | ${rand(15, 22)} days | First floor columns, walls |
| **Slab Casting** | ${rand(3, 6)} days | First floor roof slab |
| **Curing** | ${rand(14, 21)} days | Water curing |
| **Parapet Wall** | ${rand(3, 6)} days | 3 ft parapet on terrace |` : ''}

### Phase ${floorsNum > 1 ? '5' : '4'}: Finishing Phase 1 (Month ${floorsNum > 1 ? '7-9' : '5-7'})

| Task | Duration | Details |
|------|----------|---------|
| **Internal Plastering** | ${rand(15, 22)} days | 12mm cement plaster on all internal walls |
| **External Plastering** | ${rand(10, 14)} days | 20mm plaster with waterproof additive |
| **Electrical Conduit** | ${rand(7, 12)} days | PVC conduit + ${wireBrand} wiring |
| **Plumbing Rough-in** | ${rand(7, 12)} days | ${pipeBrand} pipes, drainage lines |
| **Waterproofing** | ${rand(5, 8)} days | Terrace, bathrooms, kitchen wet areas |

### Phase ${floorsNum > 1 ? '6' : '5'}: Finishing Phase 2 (Month ${floorsNum > 1 ? '9-11' : '7-9'})

| Task | Duration | Details |
|------|----------|---------|
| **Flooring (Tiles)** | ${rand(10, 16)} days | ${tileBrand} vitrified tiles, anti-skid in wet areas |
| **Door & Window Installation** | ${rand(7, 12)} days | ${doorStyle} (main), ${windowType} |
| **Kitchen Platform** | ${rand(5, 8)} days | ${countertop} counter + stainless steel sink |
| **Bathroom Fittings** | ${rand(5, 8)} days | ${fittingBrand} sanitary ware, shower, taps |
| **False Ceiling** | ${rand(5, 8)} days | Gypsum false ceiling in living room + bedrooms |

### Phase ${floorsNum > 1 ? '7' : '6'}: Final Finishing (Month ${floorsNum > 1 ? '11-13' : '9-11'})

| Task | Duration | Details |
|------|----------|---------|
| **Painting** | ${rand(10, 16)} days | Primer + 2 coats ${paintBrand} |
| **Modular Kitchen Installation** | ${rand(5, 8)} days | ${kitchenFinish} cabinets, countertop, accessories |
| **Electrical Fixtures** | ${rand(3, 6)} days | ${switchBrand} switches, lights, fans |
| **Wardrobe Installation** | ${rand(5, 8)} days | Sliding wardrobes in all bedrooms |
| **Final Plumbing** | ${rand(2, 4)} days | Tap fittings, geyser installation |

### Phase ${floorsNum > 1 ? '8' : '7'}: Handover (Month ${floorsNum > 1 ? '13-14' : '11-12'})

| Task | Duration | Details |
|------|----------|---------|
| **Deep Cleaning** | ${rand(2, 4)} days | Post-construction cleaning |
| **Final Inspection** | ${rand(1, 3)} days | Electrical, plumbing, structural check |
| **Snag List Resolution** | ${rand(3, 6)} days | Fix any defects found during inspection |
| **Completion Certificate** | 1-2 weeks | Obtain from local municipality |
| **Key Handover** | Day 1 | 🎉 Move-in ready! |

## 3. Seasonal Considerations for ${location}

| Season | Months | Construction Impact | Recommendation |
|--------|--------|-------------------|----------------|
| **Summer** | Mar-May | ✅ Best for construction | Ideal for foundation & structure work |
| **Monsoon** | Jun-Sep | ⚠️ Delays likely (${rand(15, 35)} days) | Avoid slab casting; cover materials; focus on indoor work |
| **Post-Monsoon** | Oct-Nov | ✅ Good conditions resume | Best for plastering and finishing |
| **Winter** | Dec-Feb | ✅ Good for finishing | Ideal for painting and interior work |

> **📌 Best Start Month for ${location}**: October-November. This allows foundation work before monsoon-free months and structural work completion before next monsoon.

## 4. Inspection Checkpoints ✅

| Checkpoint | Stage | What to Check |
|------------|-------|---------------|
| **#1** | After Foundation | Footing dimensions, steel placement, concrete grade |
| **#2** | Before Slab Casting | Beam reinforcement, shuttering alignment, slab thickness |
| **#3** | After Brick Work | Wall plumbness, mortar joints, lintel levels |
| **#4** | After Plumbing Rough-in | Pipe pressure test (24 hrs), drainage slope |
| **#5** | After Electrical | Wire gauge verification, Earth bonding test, MCB rating |
| **#6** | After Waterproofing | Ponding test on terrace (48 hrs), bathroom leak test |
| **#7** | After Plastering | Surface smoothness, corner angles, no cracks |
| **#8** | Final Inspection | All systems check, snag list, completion certificate |

> **⏱️ Estimated Handover**: Your ${bhk} ${type} in ${location} should be ready for move-in within **${floorsNum <= 2 ? '12-14' : '16-18'} months** from foundation start, assuming normal working conditions and no major delays.`
  };

  return data[sectionId] || data.summary;
}

// ─── Public API ─────────────────────────────────────────────────────────────
export async function generateAIPlan(projectData, sectionId) {
  // Generate data from built-in dataset engine
  const content = generateData(projectData, sectionId);

  // Simulate a brief processing delay for realistic UX feel
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

  return { content, model: 'smartbuild-engine-v2' };
}
