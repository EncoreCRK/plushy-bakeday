// PERSONALIZE HERE. All filenames are examples; replace them with your actual assets.
const SITE_CONFIG = {
  birthdayName: 'Plushy',
  title: 'THE GRAND BIRTHDAY DECEPTION',
  subtitle: 'An invitation to the Spire of Deceit',
  canvaGiftUrl: 'https://www.canva.com/', // REPLACE with your public Canva view link
  // Audio changes as soon as the story enters a new act.
  music: {
    prologue: 'assets/music/prologue.mp3',
    welcome: 'assets/music/welcome.mp3',
    spire: 'assets/music/spire.mp3',
    cake: 'assets/music/birthday.mp3',
    finale: 'assets/music/finale.mp3'
  },
  // Optional backdrop files. Without them, built-in painted gradients show.
  backgrounds: {
    prologue: '',
    welcome: '',
    spire: '',
    cake: '',
    finale: ''
  }
};

const CHARACTERS = {
  blackSapphire: {
    name: 'Black Sapphire Cookie',
    label: 'BLACK SAPPHIRE',
    folder: 'assets/bsaph/',
    expressions: { normal: 'normal.png', smile: 'smile.png', startled: 'startled.png', bow: 'bow.png' },
    defaultExpression: 'normal',
    scale: 1.0,
    positionY: '0px'
  },
  candy: {
    name: 'Candy Apple Cookie',
    label: 'CANDY APPLE',
    folder: 'assets/candy/',
    expressions: { normal: 'normal.png', grin: 'grin.png', excited: 'excited.png', peek: 'peek.png' },
    defaultExpression: 'normal',
    scale: 1.0,
    positionY: '0px'
  },
  shadowMilk: {
    name: 'Shadow Milk Cookie',
    label: 'SHADOW MILK',
    folder: 'assets/shamil/',
    expressions: { normal: 'normal.png', grin: 'grin.png', sinister: 'sinister.png', surprise: 'surprise.png' },
    defaultExpression: 'normal',
    scale: 1.1,
    positionY: '0px'
  }
};

const OCS = {
  tofu: { name: 'Tofu Cookie', image: 'assets/ocs/tofu.png' },
  mold: { name: 'Mold Muffin', image: 'assets/ocs/mold-muffin.png' },
  // Add as many as you want: another: { name: 'Another OC', image: 'assets/ocs/another.png' }
};

const SCENES = [
  {
    act: 'prologue', speaker: 'narrator', text: 'Ladies, gentlemen, and mischievous little Cookies… the Spire is opening its doors for one very special guest.',
    button: 'The curtains rise…'
  },
  {
    act: 'welcome', speaker: 'shadowMilk', expression: 'grin', center: 'shadowMilk',
    text: 'OHOHO! And who do we have here? PLUSHY?! My, my. You really walked straight into my theatre!',
    button: 'Continue'
  },
  {
    act: 'welcome', speaker: 'blackSapphire', expression: 'bow', left: 'blackSapphire',
    text: 'Welcome, Plushy. Our master has been expecting you. Please, allow me to escort you to the stage.',
    button: 'Follow him'
  },
  {
    act: 'welcome', speaker: 'candy', expression: 'peek', left: 'blackSapphire', right: 'candy',
    text: 'PEEKABOO! Did someone say special guest?! You didn’t think we’d let you wander around without a proper celebration, did you?',
    button: 'Of course not!'
  },
  {
    act: 'welcome', speaker: 'blackSapphire', expression: 'startled', left: 'blackSapphire', right: 'candy',
    text: 'Candy Apple Cookie, please. We had rehearsed a dignified entrance. Regardless… onward, Plushy. The Spire awaits.',
    button: 'Enter the Spire'
  },
  {
    act: 'spire', speaker: 'narrator', text: 'Beyond the doors lies a glittering hallway of sapphire lights. Somewhere in the distance… a familiar laugh echoes.',
    button: 'Walk deeper'
  },
  {
    act: 'spire', speaker: 'candy', expression: 'excited', left: 'candy', right: 'blackSapphire',
    text: 'We found a few familiar faces waiting for you, too! Look! They’ve been keeping the secret all day!',
    oc: 'tofu', button: 'Say hello to Tofu!'
  },
  {
    act: 'spire', speaker: 'blackSapphire', expression: 'smile', left: 'blackSapphire',
    text: 'And Mold Muffin has made an appearance as well. A rather impressive guest list, wouldn’t you agree?',
    oc: 'mold', button: 'Keep going'
  },
  {
    act: 'cake', speaker: 'candy', expression: 'excited', left: 'candy', right: 'blackSapphire',
    text: 'SURPRIIIISE! A cake for our birthday star!! Go on, touch it! Just one little tap!',
    effect: 'cake', button: 'Light the candles!'
  },
  {
    act: 'cake', speaker: 'narrator', text: 'The candles shimmer. The whole stage glows, and an absurdly grand birthday melody fills the Spire. Happy birthday, Plushy!',
    effect: 'confetti', button: 'Make a wish'
  },
  {
    act: 'finale', speaker: 'shadowMilk', expression: 'sinister', center: 'shadowMilk',
    text: 'Oh, Plushy, Plushy… You thought a cake was the end? How adorable. Tell me, do you have any idea what happens to guests who enter MY spire?',
    effect: 'shiver', button: '…What happens?'
  },
  {
    act: 'finale', speaker: 'shadowMilk', expression: 'grin', center: 'shadowMilk',
    text: 'First, we steal their attention. Then, we trap them in suspense. And FINALLY…',
    button: 'FINALLY…?'
  },
  {
    act: 'finale', speaker: 'shadowMilk', expression: 'surprise', center: 'shadowMilk',
    text: 'WE GIVE THEM A PRESENT! HAPPY BIRTHDAY, PLUSHY!! HAHAHA! You should’ve seen your face. Go ahead. Open it!',
    effect: 'gift', button: 'Open your gift 🎁'
  }
];
