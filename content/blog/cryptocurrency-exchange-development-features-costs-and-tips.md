---
title: >-
  Cryptocurrency Exchange Development: Features, Costs, and Realistic
  Considerations
slug: cryptocurrency-exchange-development-features-costs-and-tips
description: >-
  Crypto exchange development: CEX, DEX, and hybrid architectures. UK FCA
  registration, GBP 1-10m first-year cost, and security discipline required.
author: temur-khan
publishDate: '2025-06-20'
updatedDate: '2026-04-24'
thumbnailImage: /images/blog/cryptocurrency-exchange-development-features-costs-and-tips.webp
---
## Direct Answer

A cryptocurrency exchange (CEX or DEX) is a platform enabling users to buy, sell, and trade crypto-assets. Centralised exchanges (CEX) hold customer funds in custody and operate matching engines; decentralised exchanges (DEX) use smart contracts and non-custodial trading. Building a production exchange requires: technical expertise across wallet infrastructure, smart contracts, KYC/AML compliance, security disciplines, and operational discipline for holding customer assets. Historical losses from exchange failures (Mt. Gox, FTX, Celsius, BlockFi) exceed tens of billions of pounds and trace consistently to inadequate custody discipline, insufficient security investment, or fraud. New entrants must operate at significantly higher discipline than the industry average.

---

## Who this guide is for

**This guide is written for:**

- Founders and entrepreneurs evaluating cryptocurrency exchange viability as a business model.
- Technical leaders assessing the scope and complexity of building a production exchange.
- Business decision-makers determining whether to build custom versus white-label exchange solutions.
- Regulatory and compliance teams understanding UK FCA obligations for crypto-asset service providers.

It assumes business literacy and customer development capability. It does not assume the technical feasibility of an exchange project is automatic or that all founders should attempt building one.

---

**TL;DR, Key Takeaways**

- The cryptocurrency exchange market is dominated by a small number of established platforms (Binance, Coinbase, Kraken, OKX) with substantial network effects, liquidity advantages, and regulatory relationships. New entrants face a genuinely difficult competitive environment.
- The most realistic crypto exchange opportunities for new entrants are in specific niches: regional exchanges in underserved markets, specialised exchanges for specific asset classes or trading strategies, white-label deployments for institutions, and B2B infrastructure rather than consumer-facing products.
- UK FCA registration under the Money Laundering Regulations is mandatory for any UK-based crypto-asset service provider. The registration process is substantive, and the FCA has refused many applications. Founders should plan for compliance from project start, not as an afterthought.
- Realistic costs for a serious cryptocurrency exchange in the UK range from 150,000 pounds for white-label MVP deployments to 1,500,000+ pounds for custom enterprise-grade exchanges. Add comparable amounts for compliance, security audits, liquidity, and customer acquisition.
- The category has produced spectacular failures (FTX, Celsius, BlockFi, QuadrigaCX, Mt. Gox) consistently traceable to inadequate operational discipline, custodial failures, or fraud. New entrants must operate with significantly higher discipline than the industry average to be viable.

---

Cryptocurrency exchanges are one of the most commercially significant categories in the broader crypto ecosystem. They handle billions in daily trading volume, hold billions in customer assets, and generate substantial revenue through trading fees and related services. They are also one of the most operationally demanding businesses in the space, with consistent failures of major platforms producing some of the largest losses in financial history.

This guide covers cryptocurrency exchange development with the honesty that the category requires. It addresses the question that comes before the technical specifications: should you actually build a crypto exchange given the competitive environment, regulatory obligations, operational discipline required, and the documented failure rate of even well-funded entrants? It then covers the realistic technical and commercial considerations for founders who proceed with the project.

The reason for the honest framing is that crypto exchanges are not a category where optimism produces good outcomes. The list of failed exchanges is long and consistent. Mt. Gox lost approximately 850,000 Bitcoin in 2014. QuadrigaCX collapsed in 2019 after the founder's death allegedly took the only access to customer funds with him. Celsius and BlockFi collapsed in 2022. FTX collapsed catastrophically in November 2022, with billions in customer losses. The pattern is consistent enough that founders entering this category must approach it with significantly more discipline than the industry average.


## Should you actually build a crypto exchange? The viability question

Before specifying features or estimating costs, founders considering a cryptocurrency exchange should answer four questions honestly:

### 1. Do you have realistic differentiation against established competitors?

The major exchanges have substantial network effects: they have the deepest liquidity, the most trading pairs, the most jurisdictions covered, the most integrated services, and the strongest brand recognition. New entrants competing in the same space face an extremely difficult position. Realistic differentiation typically requires one of the following: a specific geographic market that the major exchanges underserve, a specific asset class or trading strategy that incumbents do not handle well, a B2B infrastructure focus that targets institutions rather than consumers, or a regulatory positioning that incumbents cannot easily match.

### 2. Do you have operational discipline for customer assets?

Custodial exchanges hold customer funds, which creates significant operational risk. The discipline required to hold customer funds safely includes hardware security modules, multi-signature wallets, segregation of customer assets from operational funds, regular proof-of-reserves verification, comprehensive insurance, and operational procedures that prevent any single individual from accessing customer funds. Most failed exchanges had inadequate discipline in one or more of these areas.

### 3. Are you genuinely committed to regulatory compliance?

Operating a crypto exchange compliantly in the UK or other major jurisdictions requires substantial ongoing investment in compliance infrastructure: KYC and AML procedures, transaction monitoring, suspicious activity reporting, sanctions screening, regulatory reporting, and the legal and compliance team to manage all of this. Founders who treat regulation as a friction to minimise rather than a core operational function consistently encounter problems.

### 4. Do you have capital for the full build cycle?

Realistic capital requirements for a serious crypto exchange venture in the UK range from 1,000,000 to 10,000,000 pounds or more, depending on scope and ambition. Most of this is not in initial development; it is in compliance, security, liquidity, customer acquisition, and the operational team needed to run an exchange safely. Founders with smaller capital pools should pursue different opportunities.

If you can answer all four questions positively, the rest of this guide describes what serious cryptocurrency exchange development actually involves.


## What is a cryptocurrency exchange? Three architectures and which fits what use case

Cryptocurrency exchanges fall into three main architectural categories. Each has different operational requirements, regulatory implications, and competitive positioning.

### Centralised Exchange (CEX): Fastest transactions, highest custody risk

A traditional exchange architecture where the exchange holds customer funds in custodial wallets and operates the trading engine on centralised infrastructure. Examples include Binance, Coinbase, Kraken, and OKX. This is the model that has produced both the largest commercial successes and the most significant failures in the category.

**Operational characteristics:** Faster transactions because trading happens off-chain on exchange-controlled infrastructure. Higher liquidity because order books concentrate user demand. Better user experience because users do not need to manage wallets directly. Easier integration with fiat currency on-ramps and off-ramps.

**Risks and obligations:** Custodial responsibility for customer assets creates substantial operational and legal risk. Regulatory obligations are most extensive for centralised exchanges because they hold customer assets and act as financial intermediaries. The single point of failure makes them vulnerable to hacks, fraud, and operational mistakes. The history of CEX failures is the most cautionary part of crypto history.

**When it fits:** When the target market values speed and ease of use over self-custody, when fiat currency integration is essential, when the business model requires high transaction throughput, and when the founders have the operational discipline and regulatory commitment to handle the obligations.

### Decentralised Exchange (DEX): Non-custodial, smart contract-based

A non-custodial exchange architecture where trades execute directly through smart contracts on a blockchain network, with users retaining control of their funds at all times. Examples include Uniswap, SushiSwap, Curve, and 1inch. The model has matured significantly since 2020 and now handles billions in monthly trading volume.

**Operational characteristics:** No custodial responsibility because users hold their own funds. Reduced regulatory complexity in some jurisdictions because the exchange does not act as a financial intermediary in the traditional sense. Smart contract-based trading mechanisms (automated market makers, order books, hybrid models) replace traditional matching engines. Users pay gas fees for each transaction, which can be significant on busy networks.

**Risks and obligations:** Smart contract security becomes the central concern because exploits can drain liquidity pools instantly. Regulatory landscape is evolving, with regulators in some jurisdictions classifying DEX operators as financial intermediaries despite the non-custodial architecture. Liquidity depth depends on user-provided liquidity, which can be volatile.

**When it fits:** When the target market values self-custody and decentralisation, when smart contract development expertise is available, when the business model can support gas costs for users, and when the founders have appetite for operating in evolving regulatory territory.

### Hybrid Exchange: Balanced complexity

An architecture combining elements of both centralised and decentralised models. Various hybrid designs exist, with different tradeoffs around custody, liquidity, and operational complexity.

**Operational characteristics:** Higher complexity than either pure CEX or pure DEX architectures. Specific implementations vary substantially. Some hybrids use centralised order matching with decentralised settlement; others use DEX-style automated market makers with centralised user accounts and fiat on-ramps.

**Risks and obligations:** The complexity creates more potential failure modes. Regulatory classification is often unclear, which can produce friction with regulators who expect clean categorisation.

**When it fits:** When the founders have specific reasons to believe their hybrid design produces meaningful advantages over either pure architecture, when the technical capability exists to handle the additional complexity, and when the regulatory positioning is genuinely better than alternatives.


## Critical features for any serious exchange

Regardless of architecture, certain features are essential for any cryptocurrency exchange handling real value. The list below covers the minimum scope; production-grade exchanges typically include substantially more.

### 1. Wallet infrastructure

Custodial exchanges need sophisticated wallet infrastructure: hot wallets for operational liquidity, cold storage for the majority of customer funds (typically 95 to 99 percent), multi-signature controls on cold storage, hardware security modules where appropriate, and procedures for moving funds between hot and cold storage. The security discipline around wallet infrastructure is often what distinguishes well-run exchanges from those that fail catastrophically.

### 2. Trading engine

The component that matches buy and sell orders. Production-grade matching engines must handle high transaction volumes with low latency, support multiple order types (market, limit, stop, stop-limit, iceberg), maintain accurate order book state under concurrent updates, and provide fair execution that does not advantage specific users. Building a matching engine from scratch is technically demanding; most new exchanges use proven open-source or commercial implementations.

### 3. Security infrastructure

Multi-factor authentication is mandatory. Hardware token support (YubiKey, equivalent) provides stronger protection than SMS or app-based authentication. SSL encryption, web application firewalls, DDoS protection, and intrusion detection are baseline requirements. Anti-phishing measures, withdrawal address whitelisting, and time-delayed withdrawals provide additional protection. Regular security audits by external firms are essential.

### 4. KYC and AML compliance infrastructure

For UK and EU operations, comprehensive KYC and AML procedures are mandatory. Identity verification (ID document checks, biometric verification, address verification), ongoing monitoring of customer activity, transaction monitoring for suspicious patterns, sanctions list screening (OFAC, UK and EU sanctions), suspicious activity reporting to regulators, and record-keeping for regulatory inspection. Compliance technology vendors (Chainalysis, Elliptic, TRM Labs, ComplyAdvantage, Sumsub) provide infrastructure for these capabilities.

### 5. Liquidity management

New exchanges face the chicken-and-egg problem: traders go where liquidity is, and liquidity goes where traders are. Solutions include partnerships with market-making firms, integration with liquidity aggregators, incentive programmes for early users, and listing well-known assets that attract organic demand. Liquidity acquisition is a significant ongoing cost that founders often underestimate.

### 6. Admin and operations console

Internal tools for managing the exchange: customer support, account management, fraud investigation, fee adjustment, trading pair management, market making controls, financial reporting, and regulatory reporting. The operations console is often less visible than user-facing components but consumes significant development effort and is essential for running the business.

### 7. API and integration infrastructure

Professional traders demand robust APIs (REST and WebSocket) for programmatic trading. The API infrastructure requires careful design for rate limiting, authentication, data feeds, order management, and historical data access. Many exchanges generate substantial revenue from API users, so API quality is a commercial consideration not just a technical one.

### 8. Payment infrastructure

Fiat currency on-ramps and off-ramps are essential for most consumer exchanges. Integration with banking partners, payment processors (for card payments), bank transfer rails (Faster Payments in the UK, SEPA in the EU), and stablecoin infrastructure. Banking relationships for crypto businesses remain difficult to establish in many jurisdictions, which can be a significant operational obstacle.

### 9. User interface and user experience

A clean, intuitive interface is essential for user adoption. Modern exchange interfaces include real-time price displays, order management, portfolio tracking, transaction history, and notifications. Mobile applications are now mandatory because most retail users primarily access exchanges through mobile devices. Cross-platform compatibility (iOS, Android, web) requires significant frontend investment.

### 10. Customer support and dispute resolution

Often overlooked but operationally critical. Exchange transactions sometimes fail, users sometimes lose access to wallets, disputes arise between buyers and sellers. The exchange needs operational capability to handle these situations. Customer support is one of the largest hidden costs in exchange operations.


## Custom development versus white label deployment

Founders considering exchange development face a fundamental choice between custom development and white label deployment.

**Custom development** means building the exchange from scratch, with full control over architecture, features, branding, and intellectual property. This is the right approach when the founders have specific requirements that white label solutions cannot meet, when long-term competitive differentiation is essential, and when the budget supports the substantial cost.

Realistic cost ranges: 500,000 to 3,000,000+ pounds for the initial build. Timelines: 9 to 18 months for production-grade deployment. Ongoing engineering investment: 30 to 50 percent of build cost per year for maintenance, security updates, and feature development.

**White label deployment** uses pre-built exchange software customised to your branding and basic configuration. Vendors include Modulus, AlphaPoint, Bitfury, Skalex, OpenWare, and similar providers. White label is the right approach when speed to market matters more than differentiation, when budget is constrained, and when the founders have specific niche distribution rather than ambition to compete on platform quality.

Realistic cost ranges: 50,000 to 250,000 pounds for licensing and customisation. Timelines: 6 to 16 weeks for deployment. Ongoing fees: licensing or revenue share with the white label provider.

The white label approach has significant tradeoffs. The shared codebase means competitors using the same provider have similar capabilities. Backend control is limited. Differentiation depends primarily on go-to-market and customer relationships rather than product features. For most founders without specific technical differentiation, white label is often the more realistic starting point.

For more on the broader build-versus-buy decision in software, see [Custom Software Solutions vs Off-the-Shelf Software](/blog/custom-software-solutions-vs-off-the-shelf-software).


## UK regulatory framework for crypto exchanges

Operating a cryptocurrency exchange in the UK requires substantial regulatory compliance. The framework has matured significantly since 2020, with the FCA actively enforcing requirements and refusing applications that do not meet its standards.

**FCA registration under the Money Laundering Regulations.** Any UK-based crypto-asset service provider, including exchanges, must register with the FCA under the Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017. The registration process is substantive and not a formality. The FCA has refused over 80 percent of applications since the regime began. Founders should plan for a 6 to 12 month registration process and engage specialist legal counsel from the beginning.

The application requires comprehensive documentation of: business model and operations, AML and counter-terrorism financing procedures, risk assessments, customer due diligence procedures, ongoing monitoring procedures, suspicious activity reporting procedures, governance and senior management arrangements, financial crime compliance officer appointment, and financial resources to support compliant operations.

**Financial promotions regime.** Crypto-asset financial promotions in the UK must comply with the financial promotions regime, requiring authorisation by an FCA-authorised firm or fitting within specific exemptions. Marketing crypto products to UK consumers without complying with this regime is a criminal offence. The regime affects how exchanges can advertise, what claims can be made, and what disclosures are required.

**Sanctions compliance.** UK and international sanctions regimes apply to crypto businesses. Sanctions screening, transaction monitoring for sanctioned addresses, and reporting requirements all apply. The Office of Financial Sanctions Implementation (OFSI) publishes guidance specific to crypto-asset businesses.

**Consumer protection.** Although crypto-assets are not currently regulated for consumer protection purposes in the same way as traditional financial services, the FCA has signalled increasing focus on consumer protection in the crypto sector. Future regulatory changes are expected to extend conduct rules to crypto-asset firms.

**Tax reporting.** HMRC requires reporting of crypto activities under various circumstances. Exchanges may need to provide customer transaction data to HMRC under specific reporting frameworks (the Crypto-Asset Reporting Framework, the OECD's CARF, is being implemented in the UK and other jurisdictions).

For more on the broader regulatory environment for blockchain in finance, see [How to Apply Blockchain in Finance App Development](/blog/how-to-apply-blockchain-in-development-of-finance-apps).


## Key principles: citation-ready statements

**On the viability question:** Before evaluating technical specifications or architecture options, founders must answer four honest questions: do you have realistic differentiation, operational discipline for customer assets, regulatory commitment, and capital for the full build cycle? If not, the realistic outcome is failure rather than sustainable business. Pursue different opportunities or significantly narrow the niche.

**On the failure pattern:** Documented exchange failures (Mt. Gox, QuadrigaCX, Celsius, BlockFi, FTX) consistently trace to inadequate operational discipline around customer assets, custodial failures, fraud, or regulatory failures. The pattern is consistent enough that new entrants must operate with significantly higher discipline than the industry average. The technology is not the limiting factor; operational and compliance discipline is.

**On regulatory environment:** UK FCA registration under the Money Laundering Regulations is substantive, with the FCA having refused over 80 percent of applications. Founders should plan for 6 to 12 months of regulatory engagement and engage specialist legal counsel from project start. Treating regulation as friction rather than a core operational function produces expensive failures.

**On capital requirements:** Realistic total first-year capital for a serious cryptocurrency exchange ranges from 1,000,000 to 10,000,000+ pounds, depending on scope and ambition. Founders working with significantly less should reconsider the project entirely or pursue substantially narrower niches. Underestimating capital requirements is a primary cause of failed exchange ventures.

**On specialisation:** The most realistic opportunities for new entrants are in specific niches (regional exchanges, specialised asset classes, institutional infrastructure) rather than in competing with established platforms in the general market. The network effects and brand advantages of major exchanges create an extremely difficult competitive environment for generalist new entrants.


## Realistic costs for a UK cryptocurrency exchange in GBP

Cost ranges vary substantially based on scope and ambition. Realistic ranges:

**White label MVP exchange:** 100,000 to 300,000 pounds for licensing, customisation, basic compliance setup, and initial deployment. Suitable for founders testing a specific niche or geographic market.

**Custom mid-range exchange:** 500,000 to 1,500,000 pounds for custom development, compliance infrastructure, security audits, and initial liquidity. Suitable for founders with specific differentiation and capital to execute a serious build.

**Enterprise-grade custom exchange:** 1,500,000 to 5,000,000+ pounds for comprehensive custom development, full compliance infrastructure, multiple security audits, robust liquidity arrangements, and the operational team needed to launch and operate the exchange. Suitable for well-capitalised ventures with substantial commercial ambition.

**Compliance and legal costs:** UK FCA registration, ongoing legal counsel, compliance technology, and the legal infrastructure for international operations typically costs 100,000 to 500,000 pounds in the first year, with comparable ongoing annual costs.

**Security audits:** External security audits by reputable firms typically cost 50,000 to 200,000 pounds for comprehensive review of an exchange platform. Audits should be conducted before mainnet deployment and after significant changes.

**Liquidity provision:** Market-making arrangements, partnership fees, and inventory for initial trading typically cost 200,000 to 2,000,000+ pounds depending on scope. This is often the largest hidden cost in exchange launches.

**Customer acquisition:** Acquiring users in a competitive market typically costs 200,000 to 2,000,000+ pounds in the first year, depending on growth ambitions and competitive intensity.

**Total realistic first year:** 1,000,000 to 10,000,000 pounds for a serious cryptocurrency exchange venture in the UK, depending on scope. Founders working with significantly less capital should reconsider the project or pursue a substantially narrower niche.


## How Pixelette approaches cryptocurrency exchange projects

Pixelette Technologies works with founders on cryptocurrency exchange and digital asset infrastructure projects through engagement models matched to the founder's situation and capital position.

For founders building serious crypto exchange ventures, Pixelette delivers through milestone-based custom development with the security, compliance, and operational discipline that distinguishes viable exchange ventures from those that fail catastrophically. Our delivery operates under ISO 9001 quality management and ISO 27001 information security frameworks.

Our experience with regulated digital asset infrastructure includes SettleStack (regulated digital asset settlement infrastructure), which addresses many of the same security, compliance, and operational concerns as crypto exchange development. The technical patterns and operational disciplines transfer directly to exchange projects.

For founders with capital constraints but strong differentiation and customer development capability, our HSE (Hybrid Sweat Equity) model contributes up to 50 percent of build cost as equity investment in ventures we co-build with founding teams. This model fits founders building specific niche exchanges where the equity alignment makes sense for both parties. It does not fit founders who lack the differentiation or capital base to make a crypto exchange viable in the first place.

As Official Secretariat to the UK Parliament's APPG on AI, we maintain direct engagement with the UK policy environment shaping crypto-asset regulation. For founders building serious exchange ventures, regulatory awareness is often as important as technical capability.

Our diagnostic conversation with prospective exchange founders typically covers the four viability questions described earlier: differentiation, operational discipline, regulatory commitment, and capital. Founders who answer positively to all four can engage Pixelette as a development and strategic partner. Founders who do not answer positively typically receive an honest recommendation to pursue different opportunities.

For more on our broader blockchain delivery methodology, see [The Complete Blueprint for Blockchain Application Development](/blog/blockchain-application-development-blueprint-plan) and [Why Choose a dApp Development Company](/blog/why-choose-dapp-development-company-blockchain-solutions). For our blockchain services overview, see our [blockchain development services](/blockchain-development-services) page.


## FAQs

**Should I build a cryptocurrency exchange?**
Probably not, unless you can answer positively to four questions: do you have realistic differentiation against established competitors, the operational discipline to handle customer assets safely, the regulatory commitment to operate compliantly in target jurisdictions, and the capital to execute through a multi-year build-and-launch cycle costing 1,000,000 to 10,000,000 pounds or more? If you cannot answer positively to all four, the realistic outcome is failure rather than sustainable business. Pursue different opportunities or significantly narrow the niche.

**How much does it cost to build a cryptocurrency exchange in the UK?**
White label MVP exchanges cost 100,000 to 300,000 pounds. Custom mid-range exchanges cost 500,000 to 1,500,000 pounds. Enterprise-grade custom exchanges cost 1,500,000 to 5,000,000+ pounds. Add 100,000 to 500,000 pounds for compliance and legal in the first year, 50,000 to 200,000 pounds for security audits, 200,000 to 2,000,000+ pounds for liquidity provision, and 200,000 to 2,000,000+ pounds for customer acquisition. Total realistic first-year capital is 1,000,000 to 10,000,000+ pounds depending on scope.

**What is the difference between a CEX, DEX, and hybrid exchange?**
Centralised exchanges (CEX) hold customer funds in custodial wallets and operate centralised infrastructure (Binance, Coinbase, Kraken). Decentralised exchanges (DEX) execute trades through smart contracts on blockchain networks, with users retaining control of funds (Uniswap, Curve, SushiSwap). Hybrid exchanges combine elements of both. Each has different operational characteristics, regulatory implications, and competitive positioning. The right choice depends on your specific use case and target market.

**What UK regulations apply to cryptocurrency exchanges?**
The most important UK requirements are FCA registration under the Money Laundering Regulations (mandatory for any UK-based crypto-asset service provider), the financial promotions regime (controlling crypto-asset marketing), sanctions compliance, and emerging consumer protection rules. The FCA has refused over 80 percent of registration applications, so the process is substantive. Engage specialist legal counsel from project start, not as an afterthought.

**How long does it take to launch a crypto exchange?**
White label deployments can launch in 6 to 16 weeks. Custom mid-range exchanges take 9 to 18 months. Enterprise-grade custom exchanges take 12 to 24 months. The FCA registration process adds 6 to 12 months to launch in the UK. Plan timelines around the longest path, which is usually regulatory rather than technical.

**Why do crypto exchanges fail so often?**
The history of crypto exchange failures (Mt. Gox, QuadrigaCX, Celsius, BlockFi, FTX, and many smaller examples) consistently traces back to inadequate operational discipline around customer assets, custodial failures, fraud, or regulatory failures. The pattern is consistent enough that founders entering this category must operate with significantly higher discipline than the industry average. The technology is not the limiting factor; operational and compliance discipline is. New entrants without the commitment to operate at higher standards than failed competitors should expect similar outcomes.

**What is the biggest opportunity for new exchange entrants?**
The most realistic opportunities for new entrants are in specific niches rather than general-purpose marketplaces: regional exchanges in underserved geographic markets, specialised exchanges for specific asset classes (DeFi tokens, staking-enabled assets, specific blockchain ecosystems), white-label institutional deployments, and B2B infrastructure for institutions. Competing with Binance, Coinbase, and Kraken in the general market is not a viable strategy for new entrants given network effects and established liquidity.

---

*Pixelette Technologies is a frontier technology group delivering AI, blockchain, and quantum computing solutions for enterprises, startups, and public-sector programmes since 2001. Our digital asset infrastructure portfolio includes SettleStack regulated digital asset settlement infrastructure. We hold ISO 9001 and ISO 27001 certifications and serve as Official Secretariat to the UK Parliament's All-Party Parliamentary Group on Artificial Intelligence.*
