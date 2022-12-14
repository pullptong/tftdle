export interface Guess {
  name: Names;
  set?: GuessNumberAnswer;
  class1?: GuessAnswer;
  class2?: GuessAnswer;
  origin1?: GuessAnswer;
  origin2?: GuessAnswer;
  cost?: GuessNumberAnswer;
  range?: GuessNumberAnswer;
}

export enum GuessAnswer {
  Wrong,
  Right,
  Swap,
}

export enum GuessNumberAnswer {
  Under,
  Over,
  Exact,
}

export enum IsGuessed {
  NotYet,
  Right,
  Wrong,
}

export interface TFTSetSelectValue {
  readonly value: number;
  readonly label: string;
  readonly champions: Champion[];
}

export interface Champion {
  name: Names;
  set: number;
  class1?: Classes;
  class2?: Classes;
  origin1?: Origins;
  origin2?: Origins;
  cost: number;
  range: number;
}

export enum Names {
  Aatrox = "Aatrox",
  Ahri = "Ahri",
  Akali = "Akali",
  Alistar = "Alistar",
  Anivia = "Anivia",
  AoShin = "Ao Shin",
  Aphelios = "Aphelios",
  Ashe = "Ashe",
  AurelionSol = "Aurelion Sol",
  Bard = "Bard",
  Blitzcrank = "Blitzcrank",
  Brand = "Brand",
  Braum = "Braum",
  Caitlyn = "Caitlyn",
  Camille = "Camille",
  Chogath = "Cho'Gath",
  Corki = "Corki",
  Daeja = "Daeja",
  Darius = "Darius",
  Diana = "Diana",
  DragonTyrantSwain = "Dragon Tyrant Swain",
  Draven = "Draven",
  DrMundo = "Dr Mundo",
  Ekko = "Ekko",
  Elise = "Elise",
  Evelynn = "Evelynn",
  Ezreal = "Ezreal",
  Fiora = "Fiora",
  Galio = "Galio",
  Gangplank = "Gangplank",
  Garen = "Garen",
  Gnar = "Gnar",
  Graves = "Graves",
  Hecarim = "Hecarim",
  Heimerdinger = "Heimerdinger",
  Idas = "Idas",
  Illaoi = "Illaoi",
  Irelia = "Irelia",
  Janna = "Janna",
  JarvanIV = "Jarvan IV",
  Jax = "Jax",
  Jayce = "Jayce",
  Jhin = "Jhin",
  Jinx = "Jinx",
  KaiSa = "Kai'Sa",
  Karma = "Karma",
  Karthus = "Karthus",
  Kassadin = "Kassadin",
  Katarina = "Katarina",
  Kayle = "Kayle",
  Kayn = "Kayn",
  Kennen = "Kennen",
  KhaZix = "Kha'Zix",
  Kindred = "Kindred",
  KogMaw = "Kog'Maw",
  LeeSin = "Lee Sin",
  Leona = "Leona",
  Lillia = "Lillia",
  Lissandra = "Lissandra",
  Lucian = "Lucian",
  Lulu = "Lulu",
  Lux = "Lux",
  Malphite = "Malphite",
  Malzahar = "Malzahar",
  MissFortune = "Miss Fortune",
  Mordekaiser = "Mordekaiser",
  Morgana = "Morgana",
  Nami = "Nami",
  Nasus = "Nasus",
  Neeko = "Neeko",
  Nidalee = "Nidalee",
  Nilah = "Nilah",
  Nomsy = "Nomsy",
  Nocturne = "Nocturne",
  Nunu = "Nunu",
  Olaf = "Olaf",
  Orianna = "Orianna",
  Ornn = "Ornn",
  Pantheon = "Pantheon",
  Poppy = "Poppy",
  Pyke = "Pyke",
  Qiyana = "Qiyana",
  Quinn = "Quinn",
  Rakan = "Rakan",
  Rell = "Rell",
  RekSai = "Rek'Sai",
  Rengar = "Rengar",
  Renata = "Renata",
  Ryze = "Ryze",
  Samira = "Samira",
  Sejuani = "Sejuani",
  Senna = "Senna",
  Seraphine = "Seraphine",
  Sett = "Sett",
  Shaco = "Shaco",
  Shen = "Shen",
  ShiOhYu = "Shi Oh Yu",
  Shyvana = "Shyvana",
  Silco = "Silco",
  Singed = "Singed",
  Sion = "Sion",
  Sivir = "Sivir",
  Skarner = "Skarner",
  Sohm = "Sohm",
  Sona = "Sona",
  Soraka = "Soraka",
  Swain = "Swain",
  Syfen = "Sy'fen",
  Sylas = "Sylas",
  Syndra = "Syndra",
  TahmKench = "Tahm Kench",
  Taliyah = "Taliyah",
  Taric = "Taric",
  Talon = "Talon",
  Terra = "Terra",
  Thresh = "Thresh",
  Tristana = "Tristana",
  Trundle = "Trundle",
  Tryndamere = "Tryndamere",
  TwistedFate = "Twisted Fate",
  Twitch = "Twitch",
  Urgot = "Urgot",
  Varus = "Varus",
  Vayne = "Vayne",
  Veigar = "Veigar",
  Vex = "Vex",
  Vi = "Vi",
  Viktor = "Viktor",
  Vladimir = "Vladimir",
  Volibear = "Volibear",
  Warwick = "Warwick",
  Wukong = "Wukong",
  Xayah = "Xayah",
  Yasuo = "Yasuo",
  Yone = "Yone",
  Yuumi = "Yuumi",
  Zac = "Zac",
  Zed = "Zed",
  Zeri = "Zeri",
  Ziggs = "Ziggs",
  Zilean = "Zilean",
  Zippy = "Zippy",
  Zoe = "Zoe",
  Zyra = "Zyra",
}

export enum Classes {
  Arcanist = "Arcanist",
  Assassin = "Assassin",
  Bard = "Bard",
  Blademaster = "Blademaster",
  Bodyguard = "Bodyguard",
  Brawler = "Brawler",
  Bruiser = "Bruiser",
  Cannoneer = "Cannoneer",
  Cavalier = "Cavalier",
  Challenger = "Challenger",
  Colossus = "Colossus",
  Dragonmancer = "Dragonmancer",
  Elementalist = "Elementalist",
  Enchanter = "Enchanter",
  Evoker = "Evoker",
  Guardian = "Guardian",
  Gunslinger = "Gunslinger",
  Innovator = "Innovator",
  Knight = "Knight",
  Legend = "Legend",
  Mage = "Mage",
  Mastermind = "Mastermind",
  Monolith = "Monolith",
  Mystic = "Mystic",
  Prodigy = "Prodigy",
  Protector = "Protector",
  Ranger = "Ranger",
  Scholar = "Scholar",
  Shapeshifter = "Shapeshifter",
  Sniper = "Sniper",
  Sorcerer = "Sorcerer",
  SpellThief = "Spell Thief",
  Starcaller = "Starcaller",
  Swiftshot = "Swiftshot",
  Transformer = "Transformer",
  Twinshot = "Twinshot",
  Warrior = "Warrior",
}

export enum Origins {
  Academy = "Academy",
  Astral = "Astral",
  Darkflight = "Darkflight",
  Debornair = "Debornair",
  Demon = "Demon",
  Dragon = "Dragon",
  Chemtech = "Chemtech",
  Clockwork = "Clockwork",
  Cuddly = "Cuddly",
  Enforcer = "Enforcer",
  Exile = "Exile",
  Glacial = "Glacial",
  Glutton = "Glutton",
  Guild = "Guild",
  Hextech = "Hextech",
  Imperial = "Imperial",
  Jade = "Jade",
  Lagoon = "Lagoon",
  Mercenary = "Mercenary",
  Mirage = "Mirage",
  Mutant = "Mutant",
  Ninja = "Ninja",
  Noble = "Noble",
  Phantom = "Phantom",
  Pirate = "Pirate",
  Ragewing = "Ragewing",
  Revel = "Revel",
  Rivals = "Rivals",
  Robot = "Robot",
  Scalescorn = "Scalescorn",
  Scrap = "Scrap",
  Shimmerscale = "Shimmerscale",
  Sister = "Sister",
  Socialite = "Socialite",
  Striker = "Striker",
  Syndicate = "Syndicate",
  Tempest = "Tempest",
  Trainer = "Trainer",
  Void = "Void",
  Whispers = "Whispers",
  Wild = "Wild",
  Yordle = "Yordle",
  YordleLord = "Yordle-Lord",
}
