#Requires AutoHotkey v2.0
#SingleInstance Force
SetTitleMatchMode(2)

; 관리자 권한 강제 실행
if !A_IsAdmin {
    Run('*RunAs "' A_AhkPath '" "' A_ScriptFullPath '"')
    ExitApp
}

; ✅ 창 제목 설정 (크롬 탭 제목의 일부만 정확히 입력)
winTitle := "Google Gemini"
targetWin := winTitle " ahk_exe chrome.exe"

messages := [
"0 The Fool, mystical tarot card illustration, Noa master style, ethereal seer with glowing pupil-less eyes, standing at the edge of a surreal cliff, translucent flowing garments, floating light shards, calm detached expression, distorted dreamlike space, cold blue silver palette, minimal luminous tarot frame, cinematic soft lighting, aspect ratio 1:1.6",
"1 The Magician, mystical tarot card illustration, Noa master style, ethereal seer manipulating floating symbolic elements (wand, cup, sword, pentacle) as light constructs, glowing eyes, fluid gesture without force, fragmented future shards orbiting, surreal space distortion, cold blue silver palette, minimal luminous frame, cinematic glow, aspect ratio 1:1.6",
"2 The High Priestess, mystical tarot card illustration, Noa master style, silent seer seated between abstract pillars of light and shadow, veil made of liquid mist, glowing pupil-less eyes, floating symbols of hidden knowledge, layered translucent fabrics, deep calm atmosphere, cold pale blue violet tones, aspect ratio 1:1.6",
"3 The Empress, mystical tarot card illustration, Noa master style, ethereal feminine seer surrounded by flowing organic light forms instead of nature, soft glowing presence, life energy visualized as floating luminous particles, translucent garments, serene but distant expression, cold pastel tones, aspect ratio 1:1.6",
"4 The Emperor, mystical tarot card illustration, Noa master style, structured seer figure composed of layered light geometry, seated in a rigid symmetrical composition, glowing eyes, controlled posture, floating geometric constructs representing order, cold blue silver tones, minimal frame, aspect ratio 1:1.6",
"5 The Hierophant, mystical tarot card illustration, Noa master style, seer acting as channel of higher knowledge, vertical beam of light passing through body, floating symbolic scripts and glyphs, glowing eyes, ritualistic composition, calm detached authority, cold pale palette, aspect ratio 1:1.6",
"6 The Lovers, mystical tarot card illustration, Noa master style, two ethereal figures connected by shared light core, mirrored silhouettes, glowing eyes, floating shards forming emotional resonance field, subtle tension between unity and separation, cold soft tones, aspect ratio 1:1.6",
"7 The Chariot, mystical tarot card illustration, Noa master style, seer moving forward through distorted space without physical vehicle, light trails forming directional flow, floating opposing energy forms aligned, glowing eyes, sense of controlled momentum, cold blue tones, aspect ratio 1:1.6",
"8 Strength, mystical tarot card illustration, Noa master style, calm seer gently stabilizing a chaotic light entity, no force used, glowing eyes, soft containment field, fluid motion, emotional restraint visualized as smooth energy flow, cold pale tones, aspect ratio 1:1.6",
"9 The Hermit, mystical tarot card illustration, Noa master style, solitary seer holding a faint glowing light source, surrounded by vast empty distorted space, minimal composition, glowing eyes, deep introspective silence, cold desaturated tones, aspect ratio 1:1.6",
"10 Wheel of Fortune, mystical tarot card illustration, Noa master style, massive floating circular construct made of shifting light fragments, seer observing from still position, glowing eyes, fragments rotating in layered depth, abstract sense of fate flow, cold luminous tones, aspect ratio 1:1.6",
"11 Justice, mystical tarot card illustration, Noa master style, perfectly symmetrical composition, seer holding balanced light constructs, glowing eyes, razor-sharp clarity, minimal emotion, floating scale-like geometry, cold silver blue tones, aspect ratio 1:1.6",
"12 The Hanged Man, mystical tarot card illustration, Noa master style, seer suspended upside down in stillness, glowing eyes open calmly, flowing garments drifting upward, time distortion effect, peaceful surrender, cold pale tones, aspect ratio 1:1.6",
"13 Death, mystical tarot card illustration, Noa master style, transformation visualized as dissolving body into light fragments, glowing eyes fading into void, no fear expression, calm transition, fragmented particles flowing into new form, cold dark blue tones, aspect ratio 1:1.6",
"14 Temperance, mystical tarot card illustration, Noa master style, seer blending two streams of luminous energy, smooth continuous flow, glowing eyes, perfect balance and harmony, fluid motion without interruption, cold soft blue violet tones, aspect ratio 1:1.6",
"15 The Devil, mystical tarot card illustration, Noa master style, seer surrounded by binding energy constructs rather than physical chains, glowing eyes observing without fear, subtle tension field, distorted space, cold dark tones with sharp highlights, aspect ratio 1:1.6",
"16 The Tower, mystical tarot card illustration, Noa master style, collapsing light structure breaking into shards, explosive fragmentation, seer present within destruction, glowing eyes calm amid chaos, dynamic motion, cold electric blue tones, aspect ratio 1:1.6",
"17 The Star, mystical tarot card illustration, Noa master style, seer channeling gentle streams of light into space, floating luminous particles forming constellations, glowing eyes, calm healing presence, cold soft blue tones, aspect ratio 1:1.6",
"18 The Moon, mystical tarot card illustration, Noa master style, surreal dream distortion, dual light sources, reflective space, glowing eyes, unclear boundaries, floating fragments forming illusion, cold blue violet tones, aspect ratio 1:1.6",
"19 The Sun, mystical tarot card illustration, Noa master style, radiant light source behind seer, glowing eyes brighter than surroundings, soft overwhelming illumination, minimal shadow, cold bright white-blue tones, aspect ratio 1:1.6",
"20 Judgement, mystical tarot card illustration, Noa master style, ascending light forms rising from fragmented bodies, seer observing awakening, glowing eyes, vertical energy flow, sense of revelation, cold luminous tones, aspect ratio 1:1.6",
"21 The World, mystical tarot card illustration, Noa master style, complete circular composition of floating light fragments forming unified whole, seer at center in perfect balance, glowing eyes, seamless flow of energy, cold harmonious tones, aspect ratio 1:1.6",
"22 Ace of Wands, mystical tarot card illustration, Noa master style, a single luminous energy spark emerging from void, seer observing with glowing pupil-less eyes, raw potential visualized as expanding light flame, floating fragments forming around central ignition, cold blue silver palette with subtle energy glow, minimal luminous tarot frame, cinematic soft lighting, aspect ratio 1:1.6",
"23 Two of Wands, mystical tarot card illustration, Noa master style, seer holding two parallel streams of light energy, both extending into different futures, glowing eyes analyzing possibilities, floating fragmented paths diverging, calm detached posture, cold blue silver tones, aspect ratio 1:1.6",
"24 Three of Wands, mystical tarot card illustration, Noa master style, three aligned energy beams extending forward into distance, seer standing still observing expansion, glowing eyes reflecting future projections, layered depth with floating shards, cold pale tones, aspect ratio 1:1.6",
"25 Four of Wands, mystical tarot card illustration, Noa master style, stable square formation of four luminous pillars, energy structure hovering in perfect balance, seer within calm field, glowing eyes, subtle celebratory harmony without emotion, cold soft tones, aspect ratio 1:1.6",
"26 Five of Wands, mystical tarot card illustration, Noa master style, chaotic collision of multiple light streams, fragmented shards clashing mid-air, seer centered observing conflict, glowing eyes calm amidst disorder, sharp energy tension, cold electric tones, aspect ratio 1:1.6",
"27 Six of Wands, mystical tarot card illustration, Noa master style, one dominant energy stream rising above others, victory visualized as elevated light axis, seer aligned with ascending flow, glowing eyes, subtle triumph without expression, cold blue tones, aspect ratio 1:1.6",
"28 Seven of Wands, mystical tarot card illustration, Noa master style, seer defending position against incoming energy streams, layered directional light attacks, glowing eyes steady, balanced stance in unstable space, cold sharp tones, aspect ratio 1:1.6",
"29 Eight of Wands, mystical tarot card illustration, Noa master style, multiple fast-moving light streaks cutting through space, strong motion blur and directionality, seer slightly blurred within flow, glowing eyes tracking movement, cold dynamic tones, aspect ratio 1:1.6",
"30 Nine of Wands, mystical tarot card illustration, Noa master style, worn but stable energy field surrounding seer, residual light fragments hovering defensively, glowing eyes alert, tension without collapse, cold muted tones, aspect ratio 1:1.6",
"31 Ten of Wands, mystical tarot card illustration, Noa master style, overwhelming accumulation of heavy light structures pressing downward, seer burdened but upright, glowing eyes dimmed slightly, dense layered fragments, cold heavy tones, aspect ratio 1:1.6",
"32 Page of Wands, mystical tarot card illustration, Noa master style, young seer observing a newly formed energy spark with curiosity, glowing eyes softer, small floating light fragment held gently, sense of beginning awareness, cold soft tones, aspect ratio 1:1.6",
"33 Knight of Wands, mystical tarot card illustration, Noa master style, fast-moving seer cutting through space with strong directional energy, elongated light trails, aggressive forward momentum, glowing eyes focused, cold intense tones, aspect ratio 1:1.6",
"34 Queen of Wands, mystical tarot card illustration, Noa master style, composed seer radiating stable internal energy, warmest tone within Noa palette but still restrained, glowing eyes calm, controlled luminous aura, cold balanced tones, aspect ratio 1:1.6",
"35 King of Wands, mystical tarot card illustration, Noa master style, dominant seer controlling large-scale energy field, structured light formations obeying central axis, glowing eyes authoritative yet emotionless, strong vertical composition, cold powerful tones, aspect ratio 1:1.6",
"36 Ace of Cups, mystical tarot card illustration, Noa master style, a single luminous liquid sphere overflowing with soft light, seer observing calmly with glowing pupil-less eyes, emotional potential visualized as gentle expanding fluid energy, floating droplets suspended in space, cold blue silver palette with soft glow, minimal luminous tarot frame, cinematic soft lighting, aspect ratio 1:1.6",
"37 Two of Cups, mystical tarot card illustration, Noa master style, two mirrored liquid light forms merging into one shared flow, seer observing connection without emotion, glowing eyes reflecting symmetry, fluid energy exchange suspended mid-air, cold pale blue tones, aspect ratio 1:1.6",
"38 Three of Cups, mystical tarot card illustration, Noa master style, three flowing liquid streams forming a circular harmony, suspended droplets creating rhythmic balance, seer present within gentle resonance field, glowing eyes calm, cold soft tones, aspect ratio 1:1.6",
"39 Four of Cups, mystical tarot card illustration, Noa master style, stagnant liquid energy pools hovering in still air, one subtle new stream forming unnoticed, seer detached and unresponsive, glowing eyes unfocused, emotional stillness, cold muted tones, aspect ratio 1:1.6",
"40 Five of Cups, mystical tarot card illustration, Noa master style, fragmented liquid forms spilling into void, broken droplets dissolving into space, seer observing loss without reaction, glowing eyes dimmed slightly, cold desaturated tones, aspect ratio 1:1.6",
"41 Six of Cups, mystical tarot card illustration, Noa master style, soft echoing liquid forms repeating in smaller patterns, memory visualized as layered reflections, seer surrounded by gentle recurring droplets, glowing eyes calm, nostalgic but detached, cold soft tones, aspect ratio 1:1.6",
"42 Seven of Cups, mystical tarot card illustration, Noa master style, multiple floating liquid spheres each containing distorted realities, illusion-like reflections inside, seer observing possibilities without choosing, glowing eyes reflecting multiplicity, cold pale tones, aspect ratio 1:1.6",
"43 Eight of Cups, mystical tarot card illustration, Noa master style, seer turning away from stable liquid structures, fading energy forms dissolving behind, forward movement into emptier space, glowing eyes fixed ahead, cold quiet tones, aspect ratio 1:1.6",
"44 Nine of Cups, mystical tarot card illustration, Noa master style, perfectly balanced arc of floating liquid spheres forming satisfaction structure, stable emotional field, seer centered within calm fulfillment, glowing eyes steady, cold soft luminous tones, aspect ratio 1:1.6",
"45 Ten of Cups, mystical tarot card illustration, Noa master style, complete flowing network of connected liquid light forming harmonious system, gentle arcs of energy linking all points, seer within unified field, glowing eyes serene, cold radiant tones, aspect ratio 1:1.6",
"46 Page of Cups, mystical tarot card illustration, Noa master style, young seer gently interacting with small floating liquid entity, curiosity without strong emotion, glowing eyes softer, delicate fluid motion, cold pastel tones, aspect ratio 1:1.6",
"47 Knight of Cups, mystical tarot card illustration, Noa master style, seer moving smoothly through flowing liquid space, continuous motion without resistance, elongated fluid trails following, glowing eyes focused forward, cold elegant tones, aspect ratio 1:1.6",
"48 Queen of Cups, mystical tarot card illustration, Noa master style, seer surrounded by stable calm liquid field, deep internal stillness, glowing eyes reflecting depth, soft luminous aura, controlled emotional space, cold serene tones, aspect ratio 1:1.6",
"49 King of Cups, mystical tarot card illustration, Noa master style, dominant seer stabilizing vast liquid energy system, large-scale calm structure, perfect emotional control visualized as smooth continuous flow, glowing eyes unwavering, cold powerful tones, aspect ratio 1:1.6",
"50 Ace of Swords, mystical tarot card illustration, Noa master style, a single sharp luminous blade of light piercing through void, seer observing with glowing pupil-less eyes, clarity visualized as clean vertical cut through space, floating fractured edges, cold blue silver palette with sharp highlights, minimal luminous tarot frame, cinematic lighting, aspect ratio 1:1.6",
"51 Two of Swords, mystical tarot card illustration, Noa master style, seer holding two crossed light blades in perfect balance, glowing eyes closed, decision suspended, mirrored symmetry, tension without movement, cold pale tones, aspect ratio 1:1.6",
"52 Three of Swords, mystical tarot card illustration, Noa master style, three sharp light blades piercing a central luminous core, fragmentation spreading outward, seer observing without reaction, glowing eyes steady, emotional pain abstracted into geometry, cold sharp tones, aspect ratio 1:1.6",
"53 Four of Swords, mystical tarot card illustration, Noa master style, still suspended blades floating in quiet space, seer resting within stable energy field, glowing eyes dimmed slightly, silence and pause, cold muted tones, aspect ratio 1:1.6",
"54 Five of Swords, mystical tarot card illustration, Noa master style, scattered broken blades floating in aftermath of conflict, fragmented light shards drifting apart, seer standing among imbalance, glowing eyes calm, cold harsh tones, aspect ratio 1:1.6",
"55 Six of Swords, mystical tarot card illustration, Noa master style, seer moving through aligned light blades forming directional path, transition visualized as smooth passage, glowing eyes forward, layered depth, cold soft tones, aspect ratio 1:1.6",
"56 Seven of Swords, mystical tarot card illustration, Noa master style, misaligned floating blades subtly shifting positions, hidden movement within stillness, seer partially obscured, glowing eyes watching, deception visualized as displacement, cold pale tones, aspect ratio 1:1.6",
"57 Eight of Swords, mystical tarot card illustration, Noa master style, seer surrounded by vertical light blades forming containment field, restricted space, glowing eyes still calm, limitation visualized as structured confinement, cold tight tones, aspect ratio 1:1.6",
"58 Nine of Swords, mystical tarot card illustration, Noa master style, overwhelming cluster of suspended blades pressing inward, dense mental pressure, seer centered within tension, glowing eyes reflecting sharp fragments, cold intense tones, aspect ratio 1:1.6",
"59 Ten of Swords, mystical tarot card illustration, Noa master style, complete collapse with multiple light blades embedded into fractured surface, total breakdown visualized as shattered structure, seer present within ruin, glowing eyes unchanged, cold dark tones, aspect ratio 1:1.6",
"60 Page of Swords, mystical tarot card illustration, Noa master style, young seer cautiously observing a newly formed light blade, alert posture, glowing eyes sharp, subtle movement in space, cold light tones, aspect ratio 1:1.6",
"61 Knight of Swords, mystical tarot card illustration, Noa master style, fast-moving seer cutting through space with elongated light blade, aggressive forward motion, sharp energy trails, glowing eyes focused, cold high contrast tones, aspect ratio 1:1.6",
"62 Queen of Swords, mystical tarot card illustration, Noa master style, composed seer holding a perfectly vertical light blade, absolute clarity and detachment, glowing eyes piercing, minimal surrounding elements, cold silver tones, aspect ratio 1:1.6",
"63 King of Swords, mystical tarot card illustration, Noa master style, dominant seer controlling structured array of floating blades, precise alignment forming rigid system, glowing eyes authoritative, sharp geometric composition, cold powerful tones, aspect ratio 1:1.6",
"64 Ace of Pentacles, mystical tarot card illustration, Noa master style, a single dense luminous core forming a stable geometric sphere, seer observing with glowing pupil-less eyes, material potential visualized as condensed light mass, subtle orbiting fragments, cold blue silver palette, minimal luminous tarot frame, cinematic soft lighting, aspect ratio 1:1.6",
"65 Two of Pentacles, mystical tarot card illustration, Noa master style, two rotating geometric light cores connected by fluid energy loop, continuous balance motion, seer maintaining equilibrium, glowing eyes steady, cold soft tones, aspect ratio 1:1.6",
"66 Three of Pentacles, mystical tarot card illustration, Noa master style, structured collaboration visualized as interlocking geometric light forms, precise construction in progress, seer within system observing alignment, glowing eyes focused, cold structured tones, aspect ratio 1:1.6",
"67 Four of Pentacles, mystical tarot card illustration, Noa master style, tightly contained geometric light core held within rigid boundary, no movement allowed, seer stabilizing structure, glowing eyes fixed, cold dense tones, aspect ratio 1:1.6",
"68 Five of Pentacles, mystical tarot card illustration, Noa master style, fragmented broken geometric structures drifting in empty space, instability and lack visualized as disconnection, seer observing collapse, glowing eyes dimmed slightly, cold desolate tones, aspect ratio 1:1.6",
"69 Six of Pentacles, mystical tarot card illustration, Noa master style, controlled distribution of smaller light cores from central source, balanced flow of energy units, seer directing flow without emotion, glowing eyes calm, cold balanced tones, aspect ratio 1:1.6",
"70 Seven of Pentacles, mystical tarot card illustration, Noa master style, slowly forming geometric structures in growth phase, partial completion visible, seer observing progress patiently, glowing eyes steady, cold muted tones, aspect ratio 1:1.6",
"71 Eight of Pentacles, mystical tarot card illustration, Noa master style, repeated precise formation of identical geometric light units, high detail craftsmanship visualized as perfect repetition, seer focused on refinement, glowing eyes sharp, cold structured tones, aspect ratio 1:1.6",
"72 Nine of Pentacles, mystical tarot card illustration, Noa master style, refined and complete geometric environment surrounding seer, self-sustained system of stable light constructs, glowing eyes calm, sense of independent abundance, cold luminous tones, aspect ratio 1:1.6",
"73 Ten of Pentacles, mystical tarot card illustration, Noa master style, complex multi-layered network of interconnected geometric systems, full structural completion, generational continuity visualized as nested systems, seer centered within total order, glowing eyes unwavering, cold powerful tones, aspect ratio 1:1.6",
"74 Page of Pentacles, mystical tarot card illustration, Noa master style, young seer carefully examining a newly formed geometric light core, curiosity in structure, glowing eyes attentive, small stable object floating, cold soft tones, aspect ratio 1:1.6",
"75 Knight of Pentacles, mystical tarot card illustration, Noa master style, slow steady movement through structured environment, seer carrying dense geometric core forward, deliberate progression, glowing eyes focused, cold grounded tones, aspect ratio 1:1.6",
"76 Queen of Pentacles, mystical tarot card illustration, Noa master style, seer nurturing stable geometric system, gentle containment of dense light core, balanced environment, glowing eyes calm, controlled abundance, cold harmonious tones, aspect ratio 1:1.6",
"77 King of Pentacles, mystical tarot card illustration, Noa master style, dominant seer seated within fully realized geometric system, complete control over structured light environment, massive stable constructs surrounding, glowing eyes authoritative, cold ultimate stability, aspect ratio 1:1.6"
]

currentIndex := 1
isSending := false

; 테스트를 위해 주기를 10초(10000)로 설정해 보세요. 확인 후 250000으로 변경.
SetTimer(SendNextMessage, 240000) 
SendNextMessage()

SendNextMessage(*) {
    global messages, currentIndex, targetWin, isSending

    if isSending || (currentIndex > messages.Length) {
        if (currentIndex > messages.Length) {
            SetTimer(SendNextMessage, 0)
            MsgBox("✅ 모든 전송이 완료되었습니다.")
            ExitApp
        }
        return
    }

    isSending := true

    try {
        if !WinExist(targetWin) {
            ToolTip("❌ 창을 찾을 수 없음: " winTitle)
            SetTimer(() => ToolTip(), -3000)
            return
        }

        WinActivate(targetWin)
        if !WinWaitActive(targetWin, , 3) {
            return
        }

        ; 입력창을 확실히 클릭하기 위해 잠시 대기
        Sleep(500)
        ; 마우스가 입력창 위에 있다고 가정하거나, 특정 좌표를 클릭하게 수정 가능
        Click 
        Sleep(500)

        SendText(messages[currentIndex])
        Sleep(500)
        Send("{Enter}")

        currentIndex += 1
        ToolTip("🚀 메시지 전송 중... (" currentIndex - 1 "/" messages.Length ")")
        SetTimer(() => ToolTip(), -3000)

    } finally {
        isSending := false
    }
}

Esc::ExitApp