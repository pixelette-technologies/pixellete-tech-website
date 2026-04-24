---
title: 'AR vs VR Development: A Practitioner''s Guide'
slug: ar-vs-vr-development-explained
description: >-
  AR overlays digital content on reality; VR replaces it with computer-generated
  environments. UK guide with realistic costs and viable markets.
author: ammar-hanif
publishDate: '2025-03-07'
updatedDate: '2026-04-24'
thumbnailImage: /images/blog/ar-vs-vr-development-explained.webp
readTime: 6
---
## Direct Answer

AR (Augmented Reality) overlays digital content onto the user's view of the physical world, typically through smartphones, tablets, or AR glasses. VR (Virtual Reality) replaces the user's view with a fully computer-generated environment through head-mounted displays. Both solve fundamentally different problems: AR enhances physical-world tasks; VR creates fully immersive alternative environments. They differ in hardware, development approach, use cases, and commercial viability. Most viable commercial deployments focus on specific categories: enterprise training and simulation, industrial applications, healthcare visualisation, specific consumer gaming, and specialised remote collaboration.

---

**TL;DR, Key Takeaways**

- The AR and VR market has produced a significant gap between marketing promises and actual commercial adoption. Meta Reality Labs reported cumulative losses exceeding 50 billion dollars by 2024. Apple Vision Pro, launched in 2024, has faced weaker-than-expected sales and widely reported production cuts. Microsoft discontinued HoloLens 2 in 2024. The category has not produced the mainstream consumer adoption that earlier forecasts predicted.
- Despite the broader market challenges, specific AR and VR use cases have demonstrated genuine value: enterprise training and simulation, industrial maintenance and design, healthcare visualisation and therapy, specific consumer gaming experiences, and remote collaboration for specialised use cases. Founders building in these surviving categories can succeed; founders building for general consumer metaverse experiences face an extremely difficult market.
- AR and VR development requires distinct expertise from conventional software development. The 3D modelling, spatial interaction design, performance optimisation, hardware-specific testing, and content production requirements consume significant development budget that conventional projects do not face.
- Realistic costs for serious AR and VR applications in the UK range from 60,000 pounds for focused single-purpose AR applications to 2,000,000 pounds or more for comprehensive VR training platforms and enterprise solutions. Content production costs often exceed software development costs for experience-focused applications.
- The right question for founders considering AR or VR is not which technology is better but whether your specific use case fits one of the surviving categories where the technology has demonstrated commercial value. Founders following this diagnostic consistently produce better outcomes than those pursuing the broader consumer metaverse narrative.

---

The AR and VR category has been one of the most heavily marketed and least commercially successful technology areas of the past decade. Major technology companies have collectively invested over 100 billion dollars in AR, VR, and related immersive technologies since 2015. Meta has publicly reported cumulative losses from its Reality Labs division exceeding 50 billion dollars. Apple launched its Vision Pro in 2024 with substantial marketing investment. Microsoft invested significantly in HoloLens before discontinuing the HoloLens 2 in 2024. The pattern is consistent: massive investment, difficult commercial outcomes.

This guide covers AR and VR application development with the honesty that practitioners need to make informed decisions. It explains what AR and VR actually are at a technical level, the honest market reality of commercial adoption, the specific use cases where the technology has demonstrated genuine value, the development requirements that distinguish AR and VR projects from conventional software work, and the realistic costs for UK implementations. It is written for technical leaders and founders making real decisions about AR and VR investments, not for enthusiasts looking for positive coverage of the category.

The reason for the practitioner framing is that AR and VR marketing has consistently overstated near-term commercial viability while understating implementation difficulty. Organisations making investment decisions based on marketing materials have produced disappointing outcomes repeatedly over the past decade. Organisations focusing on the specific use cases where the technology has genuine commercial value have produced better results.


## What AR and VR actually are

Before discussing market reality and commercial viability, both technologies deserve accurate technical description.

**Augmented Reality (AR)** overlays digital content onto the user's view of the physical world. AR applications typically run on smartphones, tablets, or dedicated AR glasses. The digital content is positioned relative to the physical world through various tracking mechanisms: markerless tracking using camera input (the dominant approach on modern smartphones), marker-based tracking using specific visual targets, location-based tracking using GPS and compass, and hybrid approaches combining multiple methods.

Modern AR development typically uses frameworks that handle the underlying tracking and rendering: ARKit (Apple's framework for iOS devices), ARCore (Google's framework for Android devices), or cross-platform frameworks like Unity AR Foundation and Unreal Engine's AR capabilities.

**Virtual Reality (VR)** replaces the user's view of the physical world with a computer-generated environment, typically displayed through a head-mounted display. VR applications run on dedicated VR headsets (Meta Quest, Sony PlayStation VR, HTC Vive, Valve Index, Apple Vision Pro), require specific input devices (hand controllers, gesture tracking, voice input), and must handle the specific requirements of immersive experiences (low latency, high frame rates, head tracking, spatial audio).

Modern VR development uses game engines (Unity and Unreal Engine dominate) with VR-specific SDKs for each target platform. The development work combines conventional software engineering with 3D content creation, spatial interaction design, and performance optimisation for specific hardware constraints.

**Mixed Reality (MR) and Extended Reality (XR)** are broader terms covering the spectrum from pure AR (physical world with digital overlays) to pure VR (fully virtual environment). MR specifically refers to experiences that blend real and virtual elements with bidirectional interaction, where virtual objects respond to the physical environment. Apple Vision Pro, Meta Quest 3, and the discontinued HoloLens 2 are examples of devices targeting this category.


## Key terms defined

**AR (Augmented Reality)** — technology that overlays digital content (graphics, text, 3D models, video) onto the user's view of the physical world. AR applications run on smartphones, tablets, or AR glasses. The digital content is registered to the physical world through tracking mechanisms (camera-based vision, GPS, compass) so it appears to exist in physical space.

**VR (Virtual Reality)** — technology that replaces the user's view of the physical world with a fully computer-generated environment. VR applications run on dedicated head-mounted displays and typically require hand controllers or gesture tracking for interaction. Users are immersed in the virtual environment with little or no view of the physical world.

**Mixed Reality (MR)** — experiences that blend real and virtual elements with bidirectional interaction, where virtual objects respond to and interact with the physical environment. MR requires more sophisticated spatial understanding than traditional AR.

**Extended Reality (XR)** — the umbrella term covering AR, VR, MR, and related immersive technologies along the spectrum from augmented to fully virtual.

**Spatial computing** — computing paradigm where digital content is placed and interacts in three-dimensional physical space. Spatial computing is the foundation enabling AR, VR, and MR experiences.

**Head-mounted display (HMD)** — wearable device that displays visual content. VR headsets (Meta Quest, PlayStation VR, HTC Vive) are fully immersive HMDs. AR glasses (not yet mature as consumer products) are see-through displays with light digital overlays.

**6DoF (Six Degrees of Freedom)** — tracking technology that monitors both position and orientation in three-dimensional space, enabling natural movement and interaction. Most modern VR systems use 6DoF tracking. Less sophisticated systems use 3DoF (rotation only without position tracking).

**SDK (Software Development Kit)** — development tools provided by hardware manufacturers. ARKit (Apple), ARCore (Google), Meta Quest SDK, and various others provide frameworks, APIs, and documentation for building applications for their platforms.

**Haptic feedback** — technology that provides physical sensations (vibration, pressure, resistance) to users, creating sense of touch and physical interaction in virtual environments. Advanced haptic suits can provide full-body feedback.

**Foveated rendering** — performance optimisation technique that renders high detail where the user is looking (tracked by eye-gaze) and lower detail in peripheral vision. This reduces processing requirements significantly while maintaining perceived visual quality.


## The honest market reality

Marketing materials for AR and VR typically focus on theoretical market size and aspirational use cases. The honest assessment should focus on actual commercial adoption, which tells a different story.

**Meta Reality Labs.** Meta (Facebook's parent company) has invested heavily in AR and VR through Reality Labs. Meta's public financial disclosures show cumulative operating losses from Reality Labs exceeding 50 billion dollars by 2024. Mark Zuckerberg has indicated that the strategic investment will continue but acknowledged that the commercial outcomes have been slower than hoped. The Meta Quest platform remains the largest consumer VR platform by installed base but has not achieved the adoption that would justify the investment scale.

**Apple Vision Pro.** Apple launched Vision Pro in February 2024 at a starting price of 3,499 dollars. The device represented Apple's most significant new product category since the Apple Watch. Despite substantial marketing investment and Apple's distribution capability, Vision Pro has faced weaker-than-expected sales. Reports through 2024 indicated production cuts and demand that did not match initial expectations. Apple has continued development but the commercial reality has been more challenging than the launch marketing suggested.

**Microsoft HoloLens.** Microsoft discontinued HoloLens 2 in 2024 after cancelling HoloLens 3 development earlier. The company had invested substantially in AR for enterprise use cases but concluded that the commercial opportunity did not justify continued investment. This is a significant signal: one of the largest technology companies in the world exited the enterprise AR hardware market after years of investment.

**Google.** Google has shipped several generations of AR and VR products (Google Glass in various forms, Google Daydream, various ARCore capabilities) with limited commercial success. Google's approach has shifted toward providing AR capabilities through smartphones rather than dedicated AR devices.

**Broader XR market.** IDC and other market research firms have consistently reduced their forecasts for AR and VR market growth through 2023 and 2024, reflecting the gap between earlier projections and actual adoption. The market has not collapsed entirely but has grown substantially slower than forecasts predicted.

**The metaverse narrative.** The broader "metaverse" narrative that emerged in 2021 and 2022 has substantially faded from corporate communications. Major platforms that were positioned as metaverse components (Decentraland, The Sandbox, Meta's Horizon Worlds) have shown modest active user counts compared to the consumer reach needed to justify their investment. Meta renamed itself from Facebook partly to emphasise its metaverse commitment; the metaverse rhetoric has since been substantially reduced in favour of AI-focused messaging.

For founders considering AR and VR investments, the honest implication is that the broader consumer metaverse and general AR and VR adoption narratives should be approached with significant scepticism. The specific use cases where AR and VR have demonstrated commercial value are narrower than marketing suggests.


## AR vs VR: comparison at a glance

| Dimension | Augmented Reality | Virtual Reality |
|---|---|---|
| **Primary purpose** | Enhance physical-world tasks with digital overlays | Create fully immersive alternative environments |
| **Display technology** | Smartphone/tablet/AR glasses | Head-mounted display (fully immersive) |
| **Field of view** | Varies; smartphone AR limited, AR glasses fuller | Typically 100 degrees or greater |
| **User connection to physical world** | Remains aware of and connected to physical surroundings | Fully immersed; minimal awareness of physical surroundings |
| **Typical hardware cost** | £0 (smartphone AR) to £3,000+ (dedicated glasses) | £300 (Meta Quest) to £3,500+ (Apple Vision Pro) |
| **Development complexity** | Lower for smartphone AR; higher for AR glasses | Moderate to high; more mature tooling |
| **Content production cost** | Variable; photography-based content cheaper | High; 3D environment creation is expensive |
| **Performance requirements** | Depends on hardware; smartphones have constraints | High frame rates (90+ fps) required to avoid motion sickness |
| **Primary viable use cases** | Industrial maintenance, product visualisation, specific consumer apps | Enterprise training, medical simulation, specific gaming, design review |
| **Hardware maturity** | Consumer AR glasses immature; smartphone AR mature | Consumer VR headsets mature; enterprise VR mature |
| **Market adoption (consumer)** | Limited beyond smartphone AR | Modest; Meta Quest is dominant with millions of users |
| **Commercial viability assessment** | Narrow viable categories; general consumer AR has underperformed | Specific categories viable; broader consumer adoption unrealistic |


## The specific use cases that actually work

Despite the broader market challenges, several specific categories have demonstrated genuine commercial value for AR and VR applications. These are the categories where founders have realistic opportunity.

### 1. Enterprise training and simulation

The single most commercially viable AR and VR category. Training applications for complex operational tasks (manufacturing equipment operation, medical procedures, military operations, emergency response, hazardous environment work, aviation) benefit from immersive simulation in ways that conventional training cannot match. The ROI is measurable: reduced training time, reduced equipment risk during training, better skill retention, and the ability to practice dangerous scenarios safely.

**Why it works:** Training has a clear cost baseline (current training methods) that new approaches can beat. The value is concrete and measurable. The user base (employees undergoing training) does not need to choose to engage; their employer mandates participation. The hardware cost is distributed across many training sessions, making per-use economics favourable.

**Examples in production:** Walmart has used VR extensively for employee training. UPS uses VR for driver training. Hospitals use VR for surgical training and simulation. Military organisations worldwide use VR for mission rehearsal. STRIVR, Talespin, and various other enterprise VR training vendors have built sustainable businesses in this category.

**Realistic founder profile:** Training design expertise combined with AR or VR development capability. Existing relationships with potential enterprise customers. Understanding of specific industry training requirements and budgets.

### 2. Industrial maintenance, design, and visualisation

AR applications that help industrial workers perform maintenance tasks, assemble complex equipment, or inspect installations have demonstrated value in specific contexts. VR applications for product design review, architectural walkthroughs, and engineering visualisation have become standard tools in certain industries.

**Why it works:** Industrial applications have clear productivity benefits that justify hardware investment. The users are workers completing tasks, not consumers seeking entertainment. The hardware can be centralised and maintained as operational equipment.

**Examples in production:** Boeing, Airbus, and other aerospace companies use AR and VR for assembly and maintenance. Automotive manufacturers use VR for design review. Construction and architecture firms use VR for client presentations and design coordination. Industrial maintenance vendors like Librestream, PTC, and various others have built commercial businesses serving these use cases.

**Realistic founder profile:** Industrial domain expertise, engineering or manufacturing background, understanding of enterprise procurement in industrial contexts.

### 3. Healthcare visualisation and therapy

AR and VR applications in healthcare span multiple use cases: surgical planning and simulation, rehabilitation and physical therapy, pain management during procedures, mental health therapy (particularly for phobias, PTSD, and anxiety disorders), and medical education. Several clinical studies have demonstrated efficacy for specific therapeutic applications.

**Why it works:** Healthcare applications have clinical validation pathways that can demonstrate efficacy. The investment decision-makers (hospitals, insurance companies, specialised clinics) have budgets for technology that improves patient outcomes. The use cases have clear alternatives (conventional therapy, traditional training) that new approaches can compete against.

**Examples in production:** Osso VR for surgical training. Applied VR for pain management and therapy. Various VR therapy platforms for PTSD and phobia treatment. Many hospitals have deployed surgical simulation capabilities. The regulatory environment for medical devices creates barriers to entry that protect established providers.

**Realistic founder profile:** Healthcare domain expertise, understanding of clinical validation processes, regulatory awareness (FDA in the US, CE marking and UKCA in Europe), relationships with healthcare institutions.

### 4. Specific consumer gaming experiences

VR gaming has produced some commercially successful experiences, particularly on the Meta Quest platform, which has the largest consumer VR installed base. Games like Beat Saber, Half-Life: Alyx, and various others have achieved commercial success. The VR gaming market is smaller than conventional gaming but not insignificant.

**Why it works:** Gaming users are willing to buy hardware specifically for gaming experiences. Dedicated VR users often purchase multiple games per year. The Meta Quest platform provides a standardised distribution channel.

**Examples in production:** Beat Games (acquired by Meta), Valve (Half-Life: Alyx), and various independent VR game developers have built sustainable businesses. The Meta Quest Store provides revenue opportunities for smaller developers.

**Realistic founder profile:** Game development experience, understanding of VR-specific design constraints, ability to market directly to VR gaming communities.

### 5. Remote collaboration for specialised use cases

VR and AR applications for remote collaboration in specific contexts (engineering review, design coordination, training, surgical support) have demonstrated value where the alternative is physical travel. The category did not become the mainstream remote work solution that some marketing suggested, but specific use cases have found commercial traction.

**Why it works:** For specific high-value collaboration scenarios (expensive experts providing remote guidance, design review across geographic distances, training that would otherwise require travel), the value of immersive collaboration justifies the hardware investment.

**Examples in production:** Spatial, Glue, and various other remote collaboration platforms have found specific markets. Industrial applications for remote expert support have been deployed by several major industrial companies.

### What does not work

Equally important is understanding which AR and VR use cases have consistently disappointed commercially despite heavy marketing:

**General consumer metaverse experiences.** Despite substantial investment, general consumer metaverse platforms have not achieved mainstream adoption. User counts remain modest compared to conventional digital platforms. New entrants in this category face very poor unit economics.

**AR for general consumer utility applications.** Despite years of predictions about AR glasses replacing smartphones, consumer AR adoption beyond specific use cases (gaming, shopping visualisation) has been limited. Building general consumer AR applications faces the dual challenge of limited hardware adoption and limited user demand.

**Mainstream remote work through VR.** Despite extensive marketing during the COVID-19 period, VR did not become the mainstream remote work tool. Video conferencing through conventional tools has proven more than sufficient for most remote work. VR remote work has found specific niches but has not replaced conventional alternatives.

**Generic "AR marketing campaigns."** Marketing AR experiences (Instagram and Snapchat filters, brand AR activations, AR advertisements) have produced some commercial value but have not transformed marketing in the way early marketing suggested. These capabilities have become routine features within broader platforms rather than standalone business opportunities.


## What development platforms and tools actually matter

For teams building AR or VR applications, several platforms dominate production use:

**Unity.** The most widely used development platform for both AR and VR applications. Large ecosystem of assets, documentation, and third-party tools. Dominant in VR game development and widely used for AR applications. Unity's subscription model and pricing changes in 2023 created some market uncertainty but Unity remains the default choice for most new AR and VR projects.

**Unreal Engine.** Epic Games' engine, particularly strong for high-fidelity VR experiences. Unreal Engine 5 features (Nanite, Lumen) enable visual quality that Unity finds difficult to match for specific applications. Less widely adopted than Unity for AR development but significant in VR and high-end experiences.

**ARKit (Apple) and ARCore (Google).** Native AR development frameworks for iOS and Android respectively. The right choice for applications targeting specific mobile platforms with deep integration with device capabilities. Many cross-platform AR applications use these through Unity AR Foundation or similar abstraction layers.

**WebXR.** Browser-based AR and VR through the WebXR API. Limited capability compared to native platforms but enables AR and VR experiences without requiring app installation. Suitable for specific use cases where installation friction must be avoided.

**Native platform SDKs.** Each major AR and VR platform (Meta Quest, Apple Vision Pro, PlayStation VR, HTC Vive) has its own SDK for applications targeting that specific platform. Native development produces the best performance and platform-specific features but limits portability.

For teams new to AR and VR development, Unity is typically the default starting point because of its broad platform support, large developer community, and extensive documentation.


## Realistic costs in GBP

Cost ranges for AR and VR development vary significantly based on scope, content requirements, and hardware targets. Realistic ranges:

**Focused AR application (60,000 to 200,000 pounds).** A specific mobile AR application targeting iOS, Android, or both. Limited 3D content requirements. Suitable for single-purpose commercial AR applications (product visualisation, simple games, utility applications).

**Mid-range AR or VR application (200,000 to 600,000 pounds).** More substantial applications with custom 3D content, sophisticated interactions, and polished user experience. VR applications targeting Meta Quest or similar consumer platforms. AR applications with extensive content libraries or enterprise integration.

**Enterprise VR training platforms (400,000 to 2,000,000+ pounds).** Comprehensive VR training systems with multiple scenarios, enterprise integration, analytics, and ongoing content expansion. Substantial content production investment. Multiple VR hardware targets. Enterprise deployment infrastructure.

**High-end VR experiences (500,000 to 3,000,000+ pounds).** Flagship VR games or experience products with AAA production values. Professional voice acting, motion capture, original music, sophisticated game design, multiple platform support. Content production costs typically exceed software development costs.

**Hardware considerations.** AR and VR development requires substantial hardware investment beyond typical software development. Teams need target devices for testing (Meta Quest, Apple Vision Pro, iOS and Android devices), development hardware capable of handling 3D content creation, and often specialised capture equipment. Budget 10,000 to 50,000 pounds or more for hardware depending on team size and target platforms.

**Ongoing operational costs.** Plan for 20 to 40 percent of build cost per year for content updates, platform SDK updates, device compatibility maintenance, and continued development. AR and VR platforms evolve quickly, requiring ongoing maintenance to remain current.

For broader software development cost framework, see [How Much Software Development Costs](/blog/how-much-software-development-costs).


## Key principles: citation-ready statements

**On market reality:** The AR and VR category has not delivered the consumer adoption that marketing predicted. Meta Reality Labs has reported cumulative losses exceeding 50 billion dollars. Apple Vision Pro has faced weaker-than-expected sales. Microsoft discontinued HoloLens. Specific use-case categories have demonstrated value; general consumer metaverse narratives should be approached with scepticism.

**On viable use cases:** AR and VR deliver measurable commercial value in five specific categories: enterprise training and simulation, industrial maintenance and design, healthcare visualisation and therapy, specific consumer gaming, and specialised remote collaboration. Building in these categories produces better outcomes than pursuing general consumer adoption narratives.

**On development requirements:** AR and VR development differs from conventional software development in requiring 3D content creation, spatial interaction design, performance optimisation for specific hardware, hardware-specific testing, and content production that often exceeds software costs.

**On platform selection:** Unity is the default platform for most AR and VR projects. Unreal Engine is preferred for high-fidelity VR. ARKit and ARCore suit native mobile AR. WebXR enables browser-based delivery. Platform selection should be driven by specific requirements rather than technology fashion.

**On cost realism:** AR and VR projects are expensive and require substantial content production budgets. Focused AR applications cost 60,000 to 200,000 pounds. Mid-range applications cost 200,000 to 600,000 pounds. Enterprise VR training platforms cost 400,000 to 2,000,000 pounds or more. Content production often exceeds software development costs.

**On founder diagnostic:** The right question for AR and VR founders is whether their specific use case fits one of the demonstrated commercial categories, not whether AR and VR will become mainstream. This diagnostic determines project viability more than any technology choice.


## How Pixelette approaches AR and VR projects

Pixelette Technologies works on AR and VR application development as part of our broader custom software delivery. Our approach emphasises identifying which specific use case category a project fits (enterprise training, industrial applications, healthcare, specific consumer gaming, specialised remote collaboration) and delivering against the realistic requirements of that category rather than pursuing broad consumer metaverse narratives.

Our delivery operates under ISO 9001 quality management and ISO 27001 information security frameworks, providing the structured approach that enterprise AR and VR projects require. The governance is particularly relevant for healthcare and industrial applications where regulatory and operational accountability matter alongside technical capability.

Our diagnostic conversation with prospective AR and VR clients typically starts with honest assessment of which use case category the project fits and whether the project has realistic commercial prospects in the current market. Projects pursuing general consumer metaverse strategies typically receive honest recommendations to narrow scope to specific surviving categories or reconsider the investment entirely.

For capital-constrained founders with validated concepts in the viable categories, our HSE (Hybrid Sweat Equity) model contributes up to 50 percent of build cost as equity investment in ventures we co-build with founding teams. This model preserves cash for customer acquisition and content production while providing access to specialist development capability.

As Official Secretariat to the UK Parliament's APPG on AI, we maintain direct engagement with the UK policy environment shaping AR, VR, and broader digital infrastructure regulation. For projects affected by specific regulatory frameworks (healthcare applications, workplace training compliance, consumer protection), regulatory awareness is often as important as technical capability.

For more on related areas, see [How to Make a Mobile App That Earns Real Money](/blog/how-to-make-a-mobile-app-that-earns-real-money) for mobile development considerations and [UX/UI Design in Ecommerce](/blog/ui-ux-design-role-in-ecommerce-development-sales) for user experience design disciplines that also apply to AR and VR.


## FAQs

**What is the difference between AR and VR?**
AR (Augmented Reality) overlays digital content onto the user's view of the physical world, typically through smartphones, tablets, or AR glasses. VR (Virtual Reality) replaces the user's view of the physical world with a computer-generated environment, typically through head-mounted displays. AR preserves connection to physical surroundings while enhancing them; VR creates fully immersive alternative environments. Both use different hardware, different development approaches, and different use cases.

**Has AR and VR lived up to the hype?**
Largely no, despite massive investment. Meta Reality Labs has reported cumulative losses exceeding 50 billion dollars. Apple Vision Pro has faced weaker-than-expected sales since its 2024 launch. Microsoft discontinued HoloLens 2 in 2024. The broader consumer metaverse narrative has substantially faded. However, specific use cases (enterprise training, industrial applications, healthcare visualisation, specific consumer gaming, specialised remote collaboration) have demonstrated genuine commercial value. The right framing is not whether AR and VR have succeeded generally but which specific applications have succeeded.

**Which AR and VR use cases actually work commercially?**
The use cases with demonstrated commercial value are enterprise training and simulation, industrial maintenance and design visualisation, healthcare applications (surgical training, therapy, rehabilitation), specific consumer VR gaming, and remote collaboration for specialised high-value scenarios. General consumer metaverse experiences, consumer AR utility applications, and mainstream remote work through VR have consistently disappointed commercially despite extensive marketing.

**How much does AR or VR development cost in the UK?**
Focused AR applications cost 60,000 to 200,000 pounds. Mid-range AR or VR applications cost 200,000 to 600,000 pounds. Enterprise VR training platforms cost 400,000 to 2,000,000 pounds or more. High-end VR experiences cost 500,000 to 3,000,000 pounds or more. Add 10,000 to 50,000 pounds for development hardware and 20 to 40 percent of build cost per year for ongoing operational costs. Content production costs often exceed software development costs for experience-focused applications.

**Which platform should I use for AR and VR development?**
Unity is the default choice for most AR and VR projects because of its broad platform support, large developer community, and extensive documentation. Unreal Engine is preferred for high-fidelity VR experiences requiring AAA visual quality. ARKit and ARCore are appropriate for native mobile AR development. WebXR suits applications requiring browser-based delivery without installation. Native platform SDKs (Meta Quest, Apple Vision Pro) are appropriate for applications targeting specific platforms with deep integration.

**Should I build an AR or VR application for my business?**
Probably only if your specific use case fits one of the categories with demonstrated commercial value: enterprise training, industrial applications, healthcare visualisation, specific consumer gaming, or specialised remote collaboration. Building general consumer AR or VR applications in pursuit of broad metaverse narratives is not a viable business plan in the current market. The diagnostic question is whether your specific use case justifies the investment, not whether AR and VR will become mainstream in some general sense.

**What is 6DoF and why does it matter for VR?**
6DoF (Six Degrees of Freedom) refers to tracking systems that monitor both the user's position and orientation in three-dimensional space. This enables natural movement and interaction where users can walk around, lean, reach, and view objects from different angles. Most modern VR systems use 6DoF tracking. Less sophisticated systems use 3DoF (rotation only, without position tracking), which produces more limited interaction capabilities. 6DoF is a baseline requirement for most serious VR applications.

**Can I use a smartphone for AR development?**
Yes, smartphone AR is the most accessible entry point for AR development. ARKit (iOS) and ARCore (Android) provide mature, free frameworks for building smartphone AR applications. Smartphone AR is less powerful than dedicated AR glasses but benefits from massive installed base (billions of smartphones worldwide). For consumer-facing AR applications, smartphone AR is often the right choice. For enterprise AR applications, dedicated AR glasses may be more appropriate if the use case justifies the cost.

---

*Pixelette Technologies is a frontier technology group delivering AI, blockchain, and quantum computing solutions for enterprises, startups, and public-sector programmes since 2001. Our HSE (Hybrid Sweat Equity) model offers founders a structured way to access full development capability while preserving runway. We hold ISO 9001 and ISO 27001 certifications and serve as Official Secretariat to the UK Parliament's All-Party Parliamentary Group on Artificial Intelligence.*
