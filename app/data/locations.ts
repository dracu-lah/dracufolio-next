export type LocationKind = "country" | "state" | "district" | "town";

export type Location = {
  /** URL segment: /hire/<slug> */
  slug: string;
  /** English name as people write it */
  name: string;
  /** Malayalam name */
  nameMl: string;
  /** Other spellings and older names people search for */
  altNames: string[];
  kind: LocationKind;
  /** District this place sits in. Only for kind "town". */
  district?: string;
  /** 2 to 3 sentences, specific to this place. See the rules below. */
  blurb: string;
  /** Slugs of 2 to 4 other entries in this list */
  nearby: string[];
};

// Malayalam names follow ml.wikipedia so the lang="ml" text renders the way a
// reader here would write it (Ollur is ഒല്ലൂർ, not ഒള്ളൂർ).
export const locations: Location[] = [
  {
    slug: "poonkunnam",
    name: "Poonkunnam",
    nameMl: "പൂങ്കുന്നം",
    altNames: ["Punkunnam", "Poonkunam"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Poonkunnam sits about three kilometres from the Swaraj Round, near enough to reach on foot when I feel like the walk. Its railway station is the point where the Guruvayur spur leaves the main line, so there is steady through traffic. Same day meetings here take no planning at all.",
    nearby: ["thrissur", "ollur", "mannuthy"],
  },
  {
    slug: "vazhakode",
    name: "Vazhakode",
    nameMl: "വാഴക്കോട്",
    altNames: ["Vazhakkodu", "Vezhakode", "Vazhakkode"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Mullurkara panchayat holds Vazhakode, a Talappilly taluk pocket on the Kodungallur to Shoranur road, twenty kilometres up from Thrissur. Paddy and coconut fill most of the land around it, and Mullurkara station is the nearest stop on the railway. Half an hour by car, so I come out when a project needs it.",
    nearby: ["wadakkanchery", "cheruthuruthy", "kunnamkulam", "thrissur"],
  },
  {
    slug: "wadakkanchery",
    name: "Wadakkanchery",
    nameMl: "വടക്കാഞ്ചേരി",
    altNames: [
      "Vadakkanchery",
      "Wadakkancherry",
      "Wadakkancheri",
      "Vadakkancheri",
    ],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Headquarters of Thalappilly taluk, Wadakkanchery sits roughly twenty kilometres north of Thrissur on the road to Shoranur. Vazhani dam, built across the Kechery river in 1962, is about ten kilometres further out and irrigates the paddy land all around. The drive takes twenty minutes, so client meetings happen face to face.",
    nearby: ["vazhakode", "cheruthuruthy", "kunnamkulam", "thrissur"],
  },
  {
    slug: "cheruthuruthy",
    name: "Cheruthuruthy",
    nameMl: "ചെറുതുരുത്തി",
    altNames: ["Cheruthuruthi", "Vallathol Nagar"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Vallathol Narayana Menon founded Kerala Kalamandalam in Cheruthuruthy in 1930, which is why the village is known for Kathakali and not for commerce. It sits on the south bank of the Bharathapuzha, across the river from Shoranur. Thirty kilometres from my desk, close enough to visit.",
    nearby: ["shoranur", "wadakkanchery", "vazhakode", "thrissur"],
  },
  {
    slug: "kunnamkulam",
    name: "Kunnamkulam",
    nameMl: "കുന്നംകുളം",
    altNames: ["Kunamkulam", "Kunnankulam"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Kunnamkulam runs on printing. Offset presses have clustered in the town for decades, alongside a wholesale trade that pulls buyers in from across northern Thrissur. The town is twenty five kilometres north west of the city, an easy drive when someone would rather sit across a table than open a video call.",
    nearby: ["guruvayur", "wadakkanchery", "chavakkad", "thrissur"],
  },
  {
    slug: "chalakudy",
    name: "Chalakudy",
    nameMl: "ചാലക്കുടി",
    altNames: ["Chalakkudy", "Chalakudi", "Chalakkudi"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Anyone heading to Athirappilly or Vazhachal passes through Chalakudy first, which has given the town a steady tourism and transport trade alongside its riverside market. It lies thirty kilometres down NH 544 from Thrissur. A thirty minute run down the highway is nothing, so meetings there happen in person.",
    nearby: ["irinjalakuda", "kodungallur", "thrissur", "ernakulam"],
  },
  {
    slug: "irinjalakuda",
    name: "Irinjalakuda",
    nameMl: "ഇരിഞ്ഞാലക്കുട",
    altNames: ["Irinjalakkuda", "Irinjalakudy", "Irinjalakkudy"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Koodalmanikyam in Irinjalakuda is the only old temple in India where Bharata is the main deity, and the Unnayi Warrier Smaraka Kalanilayam has taught Kathakali in the town since 1955. Christ College keeps a young crowd around. Twenty five kilometres south of Thrissur, which is a short enough trip to sit down together.",
    nearby: ["chalakudy", "kodungallur", "ollur", "thrissur"],
  },
  {
    slug: "guruvayur",
    name: "Guruvayur",
    nameMl: "ഗുരുവായൂർ",
    altNames: ["Guruvayoor"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Guruvayur works around its Sree Krishna temple. Hotels, wedding halls and gold shops take their season from the temple calendar, and the elephants live a few kilometres out at Punnathur Kotta. Under thirty kilometres of road separates us, and I would rather drive it than handle everything by call.",
    nearby: ["chavakkad", "kunnamkulam", "poonkunnam", "thrissur"],
  },
  {
    slug: "kodungallur",
    name: "Kodungallur",
    nameMl: "കൊടുങ്ങല്ലൂർ",
    altNames: ["Cranganore", "Kodungalloor", "Muziris", "Kodungaloor"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Old Muziris stood here, and Kodungallur still keeps the Cheraman Juma Masjid, dated to AD 629 and claimed as India's first mosque. The town lies where the Periyar reaches the backwaters, forty kilometres south west of Thrissur. It is a forty five minute drive, which I make for a first meeting and then keep things remote.",
    nearby: ["irinjalakuda", "chalakudy", "ernakulam", "thrissur"],
  },
  {
    slug: "ollur",
    name: "Ollur",
    nameMl: "ഒല്ലൂർ",
    altNames: ["Olloor"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Ollur is eight kilometres down the Ernakulam road from Thrissur, close enough that the city has more or less grown into it. The Feast of Saint Raphael at St Antony's Forane Church has run here every October since 1839 and still shuts the place down for two days. I can be there in fifteen minutes.",
    nearby: ["thrissur", "poonkunnam", "mannuthy", "irinjalakuda"],
  },
  {
    slug: "mannuthy",
    name: "Mannuthy",
    nameMl: "മണ്ണുത്തി",
    altNames: ["Mannuthi"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Six kilometres out of the city, Mannuthy sits at the junction where the highway splits towards Palakkad and Ernakulam. The veterinary college has stood here since 1955 and Kerala Agricultural University is next door at Vellanikkara. Ten minutes away, which makes in person work simple.",
    nearby: ["thrissur", "ollur", "poonkunnam", "wadakkanchery"],
  },
  {
    slug: "chavakkad",
    name: "Chavakkad",
    nameMl: "ചാവക്കാട്",
    altNames: ["Chavakad", "Chowghat", "Chavakkadu"],
    kind: "town",
    district: "Thrissur",
    blurb:
      "Fishing and the beach shape Chavakkad, a coastal municipality twenty six kilometres north west of Thrissur and five from the Guruvayur temple. Its taluk is the one part of Thrissur district that lay entirely in British Malabar. Thirty minutes on the coast road and I am on site, which happens when it helps.",
    nearby: ["guruvayur", "kunnamkulam", "thrissur", "malappuram"],
  },
  {
    slug: "shoranur",
    name: "Shoranur",
    nameMl: "ഷൊർണൂർ",
    altNames: ["Shornur", "Shoranur Junction", "Sornur"],
    kind: "town",
    district: "Palakkad",
    blurb:
      "Shoranur belongs to Palakkad district, not Thrissur, though it is a bridge away from Cheruthuruthy on the far bank of the Bharathapuzha. Its junction is the largest railway station in Kerala by area, with lines leaving in four directions. Thirty kilometres north on the same road, and I treat it like the Thrissur towns next door.",
    nearby: ["cheruthuruthy", "palakkad", "wadakkanchery", "thrissur"],
  },
  {
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    nameMl: "തിരുവനന്തപുരം",
    altNames: ["Trivandrum", "Anantapuri"],
    kind: "district",
    blurb:
      "Thiruvananthapuram is the state capital and its own district headquarters, and Technopark opened there in 1990 as the first IT park in the country. Close to 280 kilometres south, a run that eats a full day. Work with clients there stays remote, with a trip when one is warranted.",
    nearby: ["kollam", "pathanamthitta", "kerala"],
  },
  {
    slug: "kollam",
    name: "Kollam",
    nameMl: "കൊല്ലം",
    altNames: ["Quilon", "Kollam City", "Desinganadu"],
    kind: "district",
    blurb:
      "Cashew is the trade that built Kollam, and the processing units around the district headquarters still handle a large share of what India shells and exports. Ashtamudi lake covers close to a third of the district. Roughly 210 kilometres from Thrissur, far enough that everything runs over calls and shared repositories.",
    nearby: ["thiruvananthapuram", "pathanamthitta", "alappuzha"],
  },
  {
    slug: "pathanamthitta",
    name: "Pathanamthitta",
    nameMl: "പത്തനംതിട്ട",
    altNames: ["Pathanamthitha"],
    kind: "district",
    blurb:
      "Pathanamthitta town administers the district, which is best known for Sabarimala and the millions of pilgrims it draws every season. Rubber smallholdings cover much of the rest, and Aranmula still makes its metal mirrors. The distance is two hundred kilometres, which means calls and a shared tracker rather than site visits.",
    nearby: ["kollam", "alappuzha", "kottayam", "idukki"],
  },
  {
    slug: "alappuzha",
    name: "Alappuzha",
    nameMl: "ആലപ്പുഴ",
    altNames: ["Alleppey", "Allepey", "Alapuzha"],
    kind: "district",
    blurb:
      "Coir has been Alappuzha's industry since the nineteenth century, and the mills and mat factories in the headquarters town still live off it. Punnamada lake hosts the Nehru Trophy boat race every August. A hundred and forty kilometres south of Thrissur puts this firmly in remote territory, with a visit now and then.",
    nearby: ["kollam", "pathanamthitta", "kottayam", "ernakulam"],
  },
  {
    slug: "kottayam",
    name: "Kottayam",
    nameMl: "കോട്ടയം",
    altNames: ["Cottayam"],
    kind: "district",
    blurb:
      "Kottayam reached full literacy in 1989, the first town in India to manage it, and the printing trade behind its city of letters name still runs there through Malayala Manorama and DC Books. The Rubber Board works out of the district headquarters too. The 125 kilometres between us is covered remotely, with the occasional drive down.",
    nearby: ["alappuzha", "pathanamthitta", "idukki", "ernakulam"],
  },
  {
    slug: "idukki",
    name: "Idukki",
    nameMl: "ഇടുക്കി",
    altNames: ["Idukky"],
    kind: "district",
    blurb:
      "Idukki keeps its headquarters at Painavu, a small hill settlement rather than a city, and the district is dominated by the arch dam and the cardamom estates above Kattappana. Power and spices are the economy here. Getting there means a climb of about 150 kilometres, so the work is remote by default.",
    nearby: ["kottayam", "ernakulam", "pathanamthitta"],
  },
  {
    slug: "ernakulam",
    name: "Ernakulam",
    nameMl: "എറണാകുളം",
    altNames: ["Kochi", "Cochin", "Ernakulum", "Eranakulam"],
    kind: "district",
    blurb:
      "Ernakulam runs its administration from Kakkanad, which is also where Infopark and most of the district's software companies sit. Kochi below it handles the port and the bulk of Kerala's corporate work. Seventy five kilometres from Thrissur is an hour by train, so I go down often.",
    nearby: ["thrissur", "idukki", "kottayam", "alappuzha"],
  },
  {
    slug: "thrissur",
    name: "Thrissur",
    nameMl: "തൃശ്ശൂർ",
    altNames: ["Trichur", "Trissur", "Thrisur", "Thrissivaperur"],
    kind: "district",
    blurb:
      "This one is home. Thrissur city is the district headquarters, holds the Pooram in April or May, and is where South Indian Bank, CSB Bank and Dhanlaxmi Bank keep their head offices, which accounts for a lot of the local software work. Anywhere in the district is a short ride from my desk.",
    nearby: ["ernakulam", "palakkad", "malappuram"],
  },
  {
    slug: "palakkad",
    name: "Palakkad",
    nameMl: "പാലക്കാട്",
    altNames: ["Palghat", "Pallakkad", "Palakad"],
    kind: "district",
    blurb:
      "Palakkad sits at the gap in the Western Ghats that everything from Tamil Nadu comes through, and that is how the district became the state's granary and Kanjikode its second largest industrial belt after Kochi. Malampuzha dam is fourteen kilometres from the headquarters town. Meetings there cost me an hour of driving, which is worth it often enough.",
    nearby: ["thrissur", "malappuram", "shoranur"],
  },
  {
    slug: "malappuram",
    name: "Malappuram",
    nameMl: "മലപ്പുറം",
    altNames: ["Malapuram"],
    kind: "district",
    blurb:
      "More people live in Malappuram than in any other Kerala district, and households here draw roughly twice the state average in remittances from the Gulf. The University of Calicut has its campus at Tenhipalam, inside the district, despite the name. Ninety kilometres north of Thrissur, mostly remote with a drive up when needed.",
    nearby: ["kozhikode", "palakkad", "thrissur", "wayanad"],
  },
  {
    slug: "kozhikode",
    name: "Kozhikode",
    nameMl: "കോഴിക്കോട്",
    altNames: ["Calicut", "Kozhikkode", "Kozhicode"],
    kind: "district",
    blurb:
      "UNESCO named Kozhikode India's first City of Literature in 2023, which suits a city that has been publishing and arguing in print for centuries. Kallai still has its timber mills and IIM Kozhikode sits up at Kunnamangalam. At a hundred and thirty kilometres north it is remote first, with visits when they earn the trip.",
    nearby: ["malappuram", "wayanad", "kannur"],
  },
  {
    slug: "wayanad",
    name: "Wayanad",
    nameMl: "വയനാട്",
    altNames: ["Wynad", "Wayanadu", "Vayanad"],
    kind: "district",
    blurb:
      "Wayanad grows most of Kerala's coffee, along with pepper and tea, and its headquarters at Kalpetta is a plantation town more than an administrative one. The ghat road up from the coast is the slow part. Around 175 kilometres and four hours from Thrissur, which makes this remote work.",
    nearby: ["kozhikode", "kannur", "malappuram"],
  },
  {
    slug: "kannur",
    name: "Kannur",
    nameMl: "കണ്ണൂർ",
    altNames: ["Cannanore", "Kannoor"],
    kind: "district",
    blurb:
      "Handloom is what Kannur is known for, with weaving societies around Kanhirode and Azhikode supplying a good share of India's handloom exports. The international airport that opened in 2018 pulled more business into the district. Thrissur to Kannur is 215 kilometres, and I have never needed to be there in person.",
    nearby: ["kasaragod", "kozhikode", "wayanad"],
  },
  {
    slug: "kasaragod",
    name: "Kasaragod",
    nameMl: "കാസർഗോഡ്",
    altNames: ["Kasargod", "Kasaragode", "Kasargode", "Kasarkode"],
    kind: "district",
    blurb:
      "At the northern end of Kerala, Kasaragod is called the land of seven languages, where Malayalam, Tulu, Kannada and Konkani are all in use. Bekal Fort stands fifteen kilometres south of the headquarters town and the coconut research institute is at Kudlu. Three hundred kilometres of coast road lie in between, which rules out casual visits.",
    nearby: ["kannur", "kozhikode", "kerala"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    nameMl: "കേരളം",
    altNames: ["Keralam"],
    kind: "state",
    blurb:
      "Kerala is about 600 kilometres from end to end, and I have worked with people from Kasaragod down to Thiruvananthapuram without moving from Thrissur. Being roughly in the middle helps, since most district headquarters are a few hours away by train or road. Anything past that runs on video and a shared repo.",
    nearby: ["ernakulam", "thiruvananthapuram", "thrissur", "kozhikode"],
  },
  {
    slug: "india",
    name: "India",
    nameMl: "ഇന്ത്യ",
    altNames: ["Bharat", "Bharath", "Hindustan"],
    kind: "country",
    blurb:
      "India has one timezone, so a standup at ten in the morning works the same for a team in Gurgaon, Bengaluru or Guwahati. My base stays Thrissur and always has. Work happens over video, pull requests and whatever tracker the client already uses, with travel only when there is a reason for it.",
    nearby: ["kerala", "ernakulam", "thiruvananthapuram"],
  },
];

export const locationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);

export const townLocations = locations.filter((l) => l.kind === "town");
export const districtLocations = locations.filter((l) => l.kind === "district");
export const wideLocations = locations.filter(
  (l) => l.kind === "state" || l.kind === "country",
);
