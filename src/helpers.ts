// sluggify
export const sluggify = (str: string) => {
    return str.toLowerCase().replace(/ /g, '-')
}

export const pickRandom = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function lightenColor(color: string, percent: number) {
    var num = parseInt(color.replace("#",""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
        
    return "#" + (
        0x1000000 
        + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000
        + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100
        + (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

function pickRandomWithSeed(arr: any[], item: string|null) {
    return item ?? pickRandom(arr);
}

export const genRandomFace = (seed: any = null, config: any = null) => {
    // convert to array
    let hairColors = { 'brown': '#AD6224', 'black': '#262020', 'blonde': '#DE9230', ...config?.hairColors ?? {} }
    let skinTones = { 'light': '#FAC6B9', 'lighter': '#F9A08A', 'dark': '#924733', ...config?.skinTones ?? {} }
    let shirtColors = { 'blue': '#3B5DC9', 'green': '#3BC97D', 'red': '#C93B3B', 'yellow': '#C9B33B', 'purple': '#A33BC9', ...config?.shirtColors ?? {} }

    let output = {
        hairType: pickRandomWithSeed(['hair-on-top', 'long-hair', 'no-hair', 'long-hair-with-buns', 'long-hair-with-diadem', 'long-hair-lush'], seed?.hairType ?? null),
        mouthType: pickRandomWithSeed(['happy-smile', 'happy-teeth', 'happy-teeth-wide'], seed?.mouthType ?? null),
        glassesType: pickRandomWithSeed(['glasses', 'no-glasses', 'no-glasses'], seed?.glassesType ?? null),
        eyeType: pickRandomWithSeed(['normal', 'normal', 'squint'], seed?.eyeType ?? null),
        facialHairType: pickRandomWithSeed(['beard', 'no-beard'], seed?.eyeType ?? null),
        cheekType: pickRandomWithSeed(['normal', 'normal', 'blush'], seed?.cheekType ?? null),
        hairColor: pickRandomWithSeed(Object.values(hairColors), seed?.hairColor ?? null),
        skinTone: pickRandomWithSeed(Object.values(skinTones), seed?.skinTone ?? null),
        shirtColor: pickRandomWithSeed(Object.values(shirtColors), seed?.shirtColor ?? null)
    }

    if (output.hairType.indexOf("long") !== -1) {
        output.facialHairType = 'no-beard';
    }
    if (output.skinTone === skinTones.dark) {
        output.hairColor = hairColors.black;
    }

    return output;
}

export const drawRandomFace = (seed : any = null, config: any = null) => {

let output = '';

let x = genRandomFace(seed, config);

output += `<svg width="100%" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`
output += `<defs>`

if (x.hairType === 'long-hair-with-diadem') {
output += `     <path id="diam-path" d="M64.7247613,13.5693634 C92.9548598,13.5693634 116.039565,34.3437342 117.725026,60.5650655 C112.793782,37.2116566 90.938989,19.6105706 64.7247613,19.6105706 C38.5090338,19.6105706 16.6532394,37.2136707 11.7243124,60.5692304 C13.4076119,34.3458448 36.4932288,13.5693634 64.7247613,13.5693634 Z" ></path>`
}

if (x.facialHairType === "beard") {
output += `     <path id="path-beard" d="M64.1199721,55.5292258 C63.5529309,55.4274934 61.2411723,51.806807 55.4998388,51.806807 C49.7585053,51.806807 47.447072,55.4274934 46.8797054,55.5292258 C43.5844897,56.1209738 40.9773361,55.2747577 38.529917,53.3931196 C33.9291725,49.8555193 30.1030266,44.0104124 32.4020975,38.6879706 C33.6002691,35.9137746 35.5489651,29.8681094 39.0940303,28.9840521 C42.8795107,28.0404909 48.1943432,28.9824068 52.0091028,28.3380102 C53.245012,28.1290612 54.5951103,27.7577791 55.4998388,27.1419004 C56.4045673,27.7577791 57.7549908,28.1290612 58.9902494,28.3380102 C62.8053343,28.9824068 68.1201669,28.0404909 71.9056472,28.9840521 C75.4507124,29.8681094 77.3994085,35.9137746 78.5979053,38.6879706 C80.8969763,44.0104124 77.0708303,49.8555193 72.4697605,53.3931196 C70.0223415,55.2747577 67.4151879,56.1209738 64.1199721,55.5292258 Z M107.452543,22.7004347 C106.953405,28.5792492 105.486143,28.6885744 99.2893622,32.4852128 C96.1205091,34.4267526 90.3524033,37.6898402 86.2118209,36.7796333 C83.3615246,36.1531378 83.0573881,25.2662943 79.3117244,22.6882329 C75.0629901,19.7644067 69.7576437,18.4797116 64.408381,18.6780657 C62.1001555,18.763694 57.4319226,18.7433708 55.4999349,20.2386139 C53.5679472,18.7433708 48.900042,18.763694 46.5918165,18.6780657 C41.2422261,18.4797116 35.9368797,19.7644067 31.6881454,22.6882329 C27.9424816,25.2662943 27.6386729,36.1531378 24.7883765,36.7796333 C20.6477942,37.6898402 14.8796884,34.4267526 11.7105075,32.4852128 C5.51339887,28.6885744 4.04679242,28.5792492 3.54699916,22.7004347 C2.93282698,15.4678263 4.21524733,6.89009529 0.894653689,0 C-0.72074367,0 0.344717237,13.2292973 0.344717237,13.2292973 L0.344717237,29.9259977 C0.375524166,42.4656622 9.67364518,61.2342417 30.2893797,68.401003 C35.3312285,70.1536728 46.7517503,73 55.4999349,73 C64.2481194,73 75.6686412,70.4246484 80.71049,68.6719785 C101.326225,61.5052172 110.624346,42.4656622 110.65548,29.9259977 L110.65548,13.2292973 C110.65548,13.2292973 111.720613,0 110.105216,0 C106.784622,6.89009529 108.067043,15.4678263 107.452543,22.7004347 Z" ></path>`
}

output += `</defs>`

output += `    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">`
output += `        <g id="Dude" transform="translate(34.500000, 3.861940)">`

if(x.hairType === 'hair-on-top') {
output += `            <path id="hair-on-top" d="M10.3382838,99.2066847 L10.3382838,38.2812255 C10.9660837,32.6836904 13.7648512,29.8849229 18.7345864,29.8849229 C23.7043216,29.8849229 25.4135117,29.8849229 23.8621568,29.8849229 L23.8621568,7.34866752 C25.3600367,2.44955584 29.9411515,0 37.6055011,0 C45.2698508,0 50.2293863,0 52.4841078,0 C59.4539476,0.730855388 64.063042,3.33679003 66.311391,7.81780393 C72.2731599,4.33134078 79.6469511,2.5881092 88.4327644,2.5881092 C101.611484,2.5881092 120.661716,14.0004282 120.661716,29.8849229 C120.661716,40.4745861 120.661716,63.58184 120.661716,99.2066847 L10.3382838,99.2066847 Z" fill="${x.hairColor}"></path>`
}

if(x.hairType === 'long-hair') {
output += `            <path id="Hair-back" fill="${x.hairColor}" transform="translate(0,13)" d="M65.6617162,0 C97.970374,-5.93500417e-15 124.161716,26.1913421 124.161716,58.5 L124.161716,126 C124.161716,150.852814 104.01453,171 79.1617162,171 L52.1617162,171 C27.3089024,171 7.16171617,150.852814 7.16171617,126 L7.16171617,58.5 C7.16171617,26.1913421 33.3530583,5.93500417e-15 65.6617162,0 Z"></path>`
}

if (x.hairType === 'long-hair-lush') {
output += `            <path id="hair-back" fill="${x.hairColor}" transform="translate(0,13)" d="M65.6617162,0 C97.970374,-5.93500417e-15 124.161716,26.1913421 124.161716,58.5 L124.161716,96 C124.161716,120.852814 104.01453,141 79.1617162,141 L52.1617162,141 C27.3089024,141 7.16171617,120.852814 7.16171617,96 L7.16171617,58.5 C7.16171617,26.1913421 33.3530583,5.93500417e-15 65.6617162,0 Z" ></path>`
output += `            <circle id="hair-back-tail" fill="${x.hairColor}" transform="translate(0,13)" cx="65.6617162" cy="133.282088" r="58.5"></circle>`
}

if(x.hairType === 'long-hair-with-diadem') {
output += `            <path id="hair-back" fill="${x.hairColor}" transform="translate(0,13)" d="M65.6617162,0 C97.970374,-5.93500417e-15 124.161716,26.1913421 124.161716,58.5 L124.161716,96 C124.161716,120.852814 104.01453,141 79.1617162,141 L52.1617162,141 C27.3089024,141 7.16171617,120.852814 7.16171617,96 L7.16171617,58.5 C7.16171617,26.1913421 33.3530583,5.93500417e-15 65.6617162,0 Z" ></path>`
output += `            <circle id="hair-back-tail" fill="${x.hairColor}" cx="104.188826" cy="145.75" r="32.25"></circle>`
}

if (x.hairType === 'long-hair-with-buns') {
output += `            <g id="hair-buns" transform="translate(-10,0)">`
output += `            <g id="Right-bun">`
output += `                <circle id="Left-bun" fill="${x.hairColor}" cx="19.8390106" cy="19.8390106" r="19.8390106"></circle>`
output += `                <circle id="Oval" fill="#E95865" cx="37.380584" cy="37.6069802" r="12"></circle>`
output += `            </g>`
output += `            <g id="Left-bun" transform="translate(125.072374, 24.803490) scale(-1, 1) translate(-125.072374, -24.803490) translate(100.382082, 0.000000)">`
output += `                <circle fill="${x.hairColor}" cx="19.8390106" cy="19.8390106" r="19.8390106"></circle>`
output += `                <circle id="Oval" fill="#E95865" cx="37.380584" cy="37.6069802" r="12"></circle>`
output += `            </g>`
output += `            <path d="M69.6617162,19.8390106 L80.6617162,19.8390106 C109.932808,19.8390106 133.661716,43.5679189 133.661716,72.8390106 L133.661716,87.3390106 C133.661716,112.191824 113.51453,132.339011 88.6617162,132.339011 L61.6617162,132.339011 C36.8089024,132.339011 16.6617162,112.191824 16.6617162,87.3390106 L16.6617162,72.8390106 C16.6617162,43.5679189 40.3906244,19.8390106 69.6617162,19.8390106 Z" id="Hair-back" fill="${x.hairColor}"></path>`
output += `            </g>`
}

output += `            <ellipse id="Face" fill="${x.skinTone}" cx="65.5" cy="96.1380601" rx="55.1617162" ry="61"></ellipse>`

if(x.glassesType === 'glasses') {
output += `            <ellipse id="Left-glass" stroke="#402119" stroke-width="2" fill="#FFFFFF" cx="43.5390967" cy="87.3880601" rx="17.0390967" ry="17.75"></ellipse>`
output += `            <ellipse id="Right-glass" stroke="#402119" stroke-width="2" fill="#FFFFFF" cx="87.4609033" cy="87.3880601" rx="17.0390967" ry="17.75"></ellipse>`
output += `            <path id="Connector" d="M60.513605,87.1312226 C64.0932833,85.5639711 67.4222803,85.5639711 70.500596,87.1312226"  stroke="#402119" stroke-width="2"></path>`
}

if (x.eyeType === 'normal') {
    output += `            <ellipse id="Left-eye" fill="#402119" cx="43.5" cy="88.4566847" rx="3.38208223" ry="4.09949361"></ellipse>`
    output += `            <ellipse id="Right-eye" fill="#402119" cx="87.5" cy="88.4566847" rx="3.38208223" ry="4.09949361"></ellipse>`
}

if (x.eyeType === 'squint') {
output += `            <g transform="translate(39,87)">`
output += `            <path id="left-eye" stroke-width="3.1" stroke="#402119" d="M0.00841041076,3.95420276 C-0.130515189,1.31806759 1.45166918,-5.68434189e-14 4.75496351,-5.68434189e-14 C8.05825785,-5.68434189e-14 9.70990502,1.31806759 9.70990502,3.95420276"></path>`
output += `            <path id="right-eye" stroke-width="3.1" stroke="#402119" d="M44.0084104,3.95420276 C43.8694848,1.31806759 45.4516692,0 48.7549635,0 C52.0582578,0 53.709905,1.31806759 53.709905,3.95420276"></path>`
output += `            </g>`
}

output += `            <ellipse id="Left-ear" fill="${x.skinTone}" cx="13.0945946" cy="116.88806" rx="13.0945946" ry="12.75"></ellipse>`
output += `            <ellipse id="Right-ear" fill="${x.skinTone}" cx="117.905405" cy="116.88806" rx="13.0945946" ry="12.75"></ellipse>`

if (x.mouthType == 'happy-smile') {
output += `            <path id="Mouth" transform="translate(7,14) scale(0.9)" d="M45.7199433,116.88806 C59.5291427,126.631138 72.7158472,126.631138 85.2800567,116.88806" stroke="#402119" stroke-width="3" stroke-linecap="round"></path>`
}

if (x.mouthType == 'happy-teeth') {
output += `            <path id="Mouth" transform="translate(0,24)" id="Mouth" d="M57.123228,90 L73.876772,90 C73.876772,102.387984 71.0845147,108.581975 65.5,108.581975 C61.0884541,108.581975 58.049827,104.648592 57.123228,96.9180245 C56.9589815,95.5477242 56.9589815,93.2417161 57.123228,90 Z" fill="#FFFFFF"></path>`
}

if (x.mouthType == 'happy-teeth-wide') {
output += `            <path id="Mouth" transform="translate(0,21)" d="M47.9306945,95.6822688 L83.0693055,95.6822688 C83.0693055,108.070252 77.3691906,114.264244 65.9689608,114.264244 C56.9632298,114.264244 50.7601755,110.33086 48.8686161,102.600293 C48.5333232,101.229993 48.2206827,98.9239849 47.9306945,95.6822688 Z"  fill="#FFFFFF"></path>`
}

output += `            <rect id="Neck" fill="${x.skinTone}" x="52.4841078" y="141.63806" width="26.0317844" height="36.5" rx="13.0158922"></rect>`
output += `            <rect id="Shirt" fill="${x.shirtColor}" x="39.125" y="166.112169" width="52.75" height="56" rx="13.015892"></rect>`
output += `            <rect id="Left-arm" fill="${x.skinTone}" x="39.125" y="185.612169" width="13.5" height="20"></rect>`
output += `            <rect id="Right-arm" fill="${x.skinTone}" x="78.375" y="185.612169" width="13.5" height="20"></rect>`

if (x.cheekType === 'blush') {
    output += `            <g id="blosjes" transform="translate(29,103)" >`
    output += `                <circle id="blosje-right" fill="#E82A2A" fill-opacity="0.141936189" cx="5.99352728" cy="5.99352728" r="5.99352728"></circle>`
    output += `                <circle id="blosje-left" fill="#E82A2A" fill-opacity="0.141936189" cx="69.9935273" cy="5.99352728" r="5.99352728"></circle>`
    output += `            </g>`
}

if(x.hairType === 'long-hair') {
output += `            <path id="hair-front" transform="translate(0,15)" d="M95.0069828,16 C64.425175,8.80295687 44.0631063,12.4014784 33.920777,26.7955647 C48.2285173,57.26248 76.2233935,68.0684975 117.905405,59.2136174 C117.787628,49.0505918 116.551324,41.7470766 114.196495,37.3030716 C111.462786,32.1440505 105.066282,25.0430266 95.0069828,16 Z"  fill="${x.hairColor}"></path>`
}

if (x.hairType === 'long-hair-lush') {
    output += `<path id="hair-front" fill="${x.hairColor}" transform="translate(0,13)" d="M118.765706,50.5878231 L116.004164,55.6380109 C87.3456695,65.8286673 89.5126912,53.3085849 87.6617162,47.8885848 C85.4600711,39.3072442 82.4114631,35.0165739 78.5158922,35.0165739 C74.6203213,35.0165739 69.3673793,39.3072442 62.7570664,47.8885848 C48.7589869,64.499519 31.2860594,70.2715457 10.3382838,65.2046648 C9.61455518,47.1377225 14.8981903,32.9555647 26.1891892,22.6581911 C43.1256875,7.21213087 95.1498825,-11.3978019 118.765706,50.5878231 Z"></path>`
}

if (x.hairType === 'long-hair-with-buns') {
output += `            <path id="hair-front" transform="translate(0,15)" d="M95.0069828,16 C64.425175,8.80295687 44.0631063,12.4014784 33.920777,26.7955647 C48.2285173,57.26248 76.2233935,68.0684975 117.905405,59.2136174 C117.787628,49.0505918 116.551324,41.7470766 114.196495,37.3030716 C111.462786,32.1440505 105.066282,25.0430266 95.0069828,16 Z"  fill="${x.hairColor}"></path>`
}

if (x.hairType === 'long-hair-with-diadem') {
output += `            <g id="hair-buns" transform="translate(0,10)">`
output += `            <path id="hair-front-right" d="M95.0069828,19 C87.7476061,15.390982 80.0582206,16.735297 71.9388264,23.0329452 C78.1610774,43.7696487 94.4020407,56.4022025 120.661716,60.9306066 C118.706398,51.6229216 116.551324,44.7470766 114.196495,40.3030716 C111.462786,35.1440505 105.066282,28.0430266 95.0069828,19 Z"  fill="${x.hairColor}"></path>`
output += `            <path id="hair-front-left" d="M84.1179178,19 C66.0393347,62.3918949 41.4461233,77.7934498 10.3382838,65.2046648 C9.61455518,47.9746466 14.8981903,34.2109508 26.1891892,23.9135772 C37.4801881,13.6162037 56.7897643,11.9783446 84.1179178,19 Z" fill="${x.hairColor}"></path>`
output += `            </g>`
output += `            <mask id="mask-m92kk2wjaj-2" fill="white">`
output += `                <use xlink:href="#diam-path"></use>`
output += `            </mask>`
output += `            <use id="Diadem" transform="translate(0,10)" fill="#7CE6E6" xlink:href="#diam-path"></use>`
}

if (x.facialHairType == 'beard') {
output += `           <g id="Beard" transform="translate(10, 83)">`
output += `               <mask id="mark-beard" fill="white">`
output += `                   <use xlink:href="#path-beard"></use>`
output += `               </mask>`
output += `               <use id="beard" fill="${x.hairColor}" xlink:href="#path-beard"></use>`
output += `           </g>`
}

output += `        </g>`
output += `    </g>`
output += `</svg>`

return output

}