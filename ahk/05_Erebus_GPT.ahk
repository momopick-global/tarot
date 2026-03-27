#Requires AutoHotkey v2.0
#SingleInstance Force
SetTitleMatchMode(2)

; 관리자 권한 강제 실행
if !A_IsAdmin {
    Run('*RunAs "' A_AhkPath '" "' A_ScriptFullPath '"')
    ExitApp
}

; ✅ 창 제목 설정 (크롬 탭 제목의 일부만 정확히 입력)
winTitle := "유어타로_카드 - 카드_05_에레버스_이미지생성"
targetWin := winTitle " ahk_exe chrome.exe"

messages := [
"0 The Fool, Erebus tarot card illustration, bright cosmic mist background with pale blue and soft violet light, androgynous shadow figure stepping off a floating cliff, body partially dissolving into darkness, strong central black void behind absorbing light, high contrast silhouette, floating fragments and warped space, elegant slightly broken tarot frame, full card visible, no cropping, number 0 at top, THE FOOL at bottom, cinematic lighting, ultra detailed, aspect ratio 1:1.6",
"1 The Magician, Erebus tarot card illustration, luminous mist background with radiant pale gold and blue light, shadow figure standing with one hand raised and one downward, energy streams being absorbed into a central dark core instead of emitted, distorted symbols of wand cup sword pentacle orbiting, high contrast, elegant warped frame, full card visible, number 1 at top, THE MAGICIAN at bottom, ultra detailed, aspect ratio 1:1.6",
"2 The High Priestess, Erebus tarot card illustration, soft glowing mist background with pale silver and violet tones, mysterious shadow feminine figure seated, veil partially dissolving into darkness, hidden void behind her absorbing light, faint symbolic patterns fading into shadow, calm but unreadable presence, elegant broken frame, full card visible, number 2 at top, THE HIGH PRIESTESS at bottom, ultra detailed, aspect ratio 1:1.6",
"3 The Empress, Erebus tarot card illustration, bright dreamy nature-like mist with soft green and gold light, feminine shadow figure surrounded by fading organic forms, life forms partially dissolving into void, nurturing energy being slowly absorbed, contrast between growth and decay, elegant distorted frame, number 3 at top, THE EMPRESS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"4 The Emperor, Erebus tarot card illustration, bright structured light background with pale red and gold tones, dominant shadow figure seated on a fractured throne, structure breaking and collapsing into darkness, rigid forms dissolving into void, authority being consumed, high contrast composition, number 4 at top, THE EMPEROR at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"5 The Hierophant, Erebus tarot card illustration, luminous temple-like mist background with pale ivory and gold light, shadow priest figure, sacred symbols being absorbed into darkness, broken spiritual structures fading into void, duality of belief and emptiness, elegant damaged frame, number 5 at top, THE HIEROPHANT at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"6 The Lovers, Erebus tarot card illustration, soft glowing sky with pale pink and light gold tones, two shadow figures facing each other, connection dissolving into darkness between them, central void separating and absorbing emotional energy, fragmented light drifting apart, number 6 at top, THE LOVERS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"7 The Chariot, Erebus tarot card illustration, bright dynamic light background with pale blue and silver motion streaks, shadow warrior figure riding forward, motion being pulled and distorted toward a central void, fragmented path, control slipping into darkness, number 7 at top, THE CHARIOT at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"8 Strength, Erebus tarot card illustration, soft glowing background with warm pale gold light, shadow figure gently controlling a fading beast, beast dissolving into void particles, strength expressed through containment of darkness, calm tension, number 8 at top, STRENGTH at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"9 The Hermit, Erebus tarot card illustration, bright foggy environment with pale blue-gray light, solitary shadow figure holding dim lantern, light being absorbed rather than emitted, surrounding space dissolving into darkness, isolation emphasized, number 9 at top, THE HERMIT at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"10 Wheel of Fortune, Erebus tarot card illustration, luminous cosmic background with soft gold and blue light, massive rotating structure partially collapsing into void, symbols being pulled inward, fate distorted and unstable, high contrast motion, number 10 at top, WHEEL OF FORTUNE at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"11 Justice, Erebus tarot card illustration, bright balanced light background with pale white and gold tones, shadow figure holding scales and sword, scales dissolving unevenly into darkness, truth being consumed or hidden, sharp contrast symmetry, number 11 at top, JUSTICE at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"12 The Hanged Man, Erebus tarot card illustration, soft glowing background with pale cyan light, upside-down shadow figure suspended in distorted space, body partially dissolving into void, surrender into darkness, time and space warped, number 12 at top, THE HANGED MAN at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"13 Death, Erebus tarot card illustration, bright pale light with strong contrast, shadow skeletal or abstract entity, transformation represented as dissolution into void rather than ending, fragments of existence fading, high contrast symbolic rebirth, number 13 at top, DEATH at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"14 Temperance, Erebus tarot card illustration, soft glowing background with pale gold and blue harmony tones, shadow figure pouring energy between vessels, liquid turning into void particles mid-transfer, balance unstable, subtle distortion, number 14 at top, TEMPERANCE at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"15 The Devil, Erebus tarot card illustration, bright glowing background contrasting strong darkness, dominant shadow entity binding smaller figures, chains dissolving into void energy, control through absorption, oppressive atmosphere with high contrast, number 15 at top, THE DEVIL at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"16 The Tower, Erebus tarot card illustration, bright storm-like sky with pale electric light, towering structure collapsing into void, explosion turning into darkness absorption instead of light burst, chaos and distortion, number 16 at top, THE TOWER at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"17 The Star, Erebus tarot card illustration, luminous cosmic sky with pale blue and silver glow, shadow figure beneath stars, stars fading and being absorbed into darkness, hope unstable, quiet contrast, number 17 at top, THE STAR at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"18 The Moon, Erebus tarot card illustration, bright misty night with pale blue glow, large distorted moon partially consumed by void, shadow landscape warped, illusions dissolving into darkness, eerie atmosphere, number 18 at top, THE MOON at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"19 The Sun, Erebus tarot card illustration, bright radiant background with pale golden light, sun partially eclipsed by void, light being consumed, shadow figure standing in contrast, warmth turning into emptiness, number 19 at top, THE SUN at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"20 Judgement, Erebus tarot card illustration, luminous sky with pale white light, rising shadow figures dissolving into void mid-ascent, calling force being absorbed, transformation interrupted, high contrast spiritual tension, number 20 at top, JUDGEMENT at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"21 The World, Erebus tarot card illustration, bright cosmic harmony background with pale multicolor light, central circular structure partially collapsing into void, completion being undone, figure dissolving into cosmic darkness, contrast between unity and emptiness, number 21 at top, THE WORLD at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"22 Ace of Wands, Erebus tarot card illustration, bright misty cosmic background with pale orange and gold light, a single wand emerging but partially dissolving into darkness, energy being absorbed into a small void core, high contrast, elegant warped frame, full card visible, number 22 at top, ACE OF WANDS at bottom, ultra detailed, aspect ratio 1:1.6",
"23 Two of Wands, Erebus tarot card illustration, luminous soft background with pale gold and light red tones, shadow figure holding two wands, one stable and one dissolving into void, duality of choice fading into darkness, number 23 at top, TWO OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"24 Three of Wands, Erebus tarot card illustration, bright horizon with pale warm light, three wands aligned but one partially absorbed into void, distant landscape distorted, expansion uncertain, number 24 at top, THREE OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"25 Four of Wands, Erebus tarot card illustration, soft glowing environment with pale gold tones, celebratory structure partially collapsing into darkness, stability fading, high contrast composition, number 25 at top, FOUR OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"26 Five of Wands, Erebus tarot card illustration, bright chaotic background with pale orange tones, multiple shadow figures clashing, forms dissolving into void mid-conflict, fragmented motion, number 26 at top, FIVE OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"27 Six of Wands, Erebus tarot card illustration, bright victorious glow with pale gold light, shadow figure elevated but victory dissolving into darkness, recognition unstable, number 27 at top, SIX OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"28 Seven of Wands, Erebus tarot card illustration, luminous defensive stance scene, shadow figure resisting incoming forces, attacks fading into void particles, tension high, number 28 at top, SEVEN OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"29 Eight of Wands, Erebus tarot card illustration, bright motion streak background with pale light, fast moving wands dissolving mid-flight into void, speed distorted, number 29 at top, EIGHT OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"30 Nine of Wands, Erebus tarot card illustration, bright but tense environment, wounded shadow figure, protective stance, body partially dissolving into darkness, endurance fading, number 30 at top, NINE OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"31 Ten of Wands, Erebus tarot card illustration, bright heavy atmosphere, shadow figure burdened by wands dissolving into void weight, exhaustion emphasized, number 31 at top, TEN OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"32 Page of Wands, Erebus tarot card illustration, bright youthful energy background, shadow youth holding wand, curiosity mixed with void energy, potential unstable, number 32 at top, PAGE OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"33 Knight of Wands, Erebus tarot card illustration, dynamic bright motion background, fast shadow warrior charging forward, energy trailing into darkness, aggressive movement distorted, number 33 at top, KNIGHT OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"34 Queen of Wands, Erebus tarot card illustration, bright warm glowing scene, confident shadow feminine figure, aura partially dissolving into void, charisma unstable, number 34 at top, QUEEN OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"35 King of Wands, Erebus tarot card illustration, bright powerful environment, dominant shadow figure holding wand, authority slowly consumed by darkness, number 35 at top, KING OF WANDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"36 Ace of Cups, Erebus tarot card illustration, bright soft water-like background with pale blue light, overflowing cup dissolving into void particles, emotional energy being absorbed, number 36 at top, ACE OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"37 Two of Cups, Erebus tarot card illustration, luminous soft romantic background, two figures exchanging cups, connection dissolving into darkness between them, number 37 at top, TWO OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"38 Three of Cups, Erebus tarot card illustration, bright celebratory atmosphere, three figures raising cups, joy fading into void fragments, number 38 at top, THREE OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"39 Four of Cups, Erebus tarot card illustration, bright calm background, seated shadow figure ignoring offered cup dissolving into darkness, emotional disconnection, number 39 at top, FOUR OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"40 Five of Cups, Erebus tarot card illustration, bright but melancholic background, spilled cups dissolving into void, grief emphasized through fading forms, number 40 at top, FIVE OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"41 Six of Cups, Erebus tarot card illustration, soft nostalgic light background, exchange of cups, memory dissolving into darkness, innocence fading, number 41 at top, SIX OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"42 Seven of Cups, Erebus tarot card illustration, bright dreamlike background, multiple cups with illusions dissolving into void, choices unclear, number 42 at top, SEVEN OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"43 Eight of Cups, Erebus tarot card illustration, bright fading horizon, shadow figure walking away, cups dissolving behind into darkness, abandonment theme, number 43 at top, EIGHT OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"44 Nine of Cups, Erebus tarot card illustration, bright satisfied atmosphere, arranged cups partially dissolving into void, fulfillment unstable, number 44 at top, NINE OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"45 Ten of Cups, Erebus tarot card illustration, bright harmonious sky, emotional unity dissolving into darkness, rainbow-like structure fading, number 45 at top, TEN OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"46 Page of Cups, Erebus tarot card illustration, bright soft background, youthful figure holding cup, curiosity mixed with void presence emerging, number 46 at top, PAGE OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"47 Knight of Cups, Erebus tarot card illustration, bright dreamy motion, shadow knight offering cup, emotional intent dissolving into darkness, number 47 at top, KNIGHT OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"48 Queen of Cups, Erebus tarot card illustration, bright calm water-like environment, feminine shadow figure holding cup, emotional depth partially consumed by void, number 48 at top, QUEEN OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"49 King of Cups, Erebus tarot card illustration, bright balanced oceanic background, composed shadow figure, emotional control dissolving subtly into darkness, number 49 at top, KING OF CUPS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"50 Ace of Swords, Erebus tarot card illustration, bright sharp light background, sword emerging but partially dissolving into void, truth unstable, number 50 at top, ACE OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"51 Two of Swords, Erebus tarot card illustration, bright calm tension background, blindfolded shadow figure, dual swords fading into darkness, decision unclear, number 51 at top, TWO OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"52 Three of Swords, Erebus tarot card illustration, bright emotional contrast background, heart pierced but dissolving into void, pain abstracted into darkness, number 52 at top, THREE OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"53 Four of Swords, Erebus tarot card illustration, bright resting environment, lying shadow figure, swords fading into void, recovery unstable, number 53 at top, FOUR OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"54 Five of Swords, Erebus tarot card illustration, bright conflict aftermath scene, shadow figures, victory dissolving into darkness, emptiness emphasized, number 54 at top, FIVE OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"55 Six of Swords, Erebus tarot card illustration, bright transitional background, movement across space, swords dissolving behind, journey uncertain, number 55 at top, SIX OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"56 Seven of Swords, Erebus tarot card illustration, bright subtle tension scene, shadow figure sneaking, stolen swords dissolving into void, deception unstable, number 56 at top, SEVEN OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"57 Eight of Swords, Erebus tarot card illustration, bright trapped environment, bound shadow figure, restraints dissolving into darkness, imprisonment psychological, number 57 at top, EIGHT OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"58 Nine of Swords, Erebus tarot card illustration, bright anxiety atmosphere, seated shadow figure, thoughts dissolving into void fragments, mental tension, number 58 at top, NINE OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"59 Ten of Swords, Erebus tarot card illustration, bright dramatic contrast background, collapse scene, swords dissolving into void instead of impact, total ending abstracted, number 59 at top, TEN OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"60 Page of Swords, Erebus tarot card illustration, bright alert background, youthful shadow figure holding sword, curiosity mixed with instability, number 60 at top, PAGE OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"61 Knight of Swords, Erebus tarot card illustration, bright high-speed motion scene, aggressive shadow warrior, movement tearing into void, number 61 at top, KNIGHT OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"62 Queen of Swords, Erebus tarot card illustration, bright sharp clarity background, composed shadow feminine figure, sword dissolving slightly into void, cold precision, number 62 at top, QUEEN OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"63 King of Swords, Erebus tarot card illustration, bright authoritative environment, dominant shadow figure, structure dissolving subtly into darkness, intellect unstable, number 63 at top, KING OF SWORDS at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"64 Ace of Pentacles, Erebus tarot card illustration, bright earthy light background, pentacle emerging but partially dissolving into void, material reality unstable, number 64 at top, ACE OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"65 Two of Pentacles, Erebus tarot card illustration, bright balanced motion background, juggling pentacles dissolving into void, balance fragile, number 65 at top, TWO OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"66 Three of Pentacles, Erebus tarot card illustration, bright collaborative environment, structured work dissolving into darkness, teamwork unstable, number 66 at top, THREE OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"67 Four of Pentacles, Erebus tarot card illustration, bright guarded scene, shadow figure holding pentacles tightly, form dissolving into void, control slipping, number 67 at top, FOUR OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"68 Five of Pentacles, Erebus tarot card illustration, bright cold environment, struggling figures, resources dissolving into darkness, hardship emphasized, number 68 at top, FIVE OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"69 Six of Pentacles, Erebus tarot card illustration, bright giving scene, exchange dissolving into void, fairness unstable, number 69 at top, SIX OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"70 Seven of Pentacles, Erebus tarot card illustration, bright reflective scene, growth dissolving into void, patience uncertain, number 70 at top, SEVEN OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"71 Eight of Pentacles, Erebus tarot card illustration, bright focused environment, repetitive work dissolving into darkness, effort unstable, number 71 at top, EIGHT OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"72 Nine of Pentacles, Erebus tarot card illustration, bright luxurious environment, abundance dissolving subtly into void, independence fragile, number 72 at top, NINE OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"73 Ten of Pentacles, Erebus tarot card illustration, bright structured wealth scene, legacy dissolving into darkness, stability fading, number 73 at top, TEN OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"74 Page of Pentacles, Erebus tarot card illustration, bright curious environment, youthful shadow figure holding pentacle, potential dissolving slightly into void, number 74 at top, PAGE OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"75 Knight of Pentacles, Erebus tarot card illustration, bright steady environment, grounded shadow figure, movement slow but dissolving subtly into darkness, persistence unstable, number 75 at top, KNIGHT OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"76 Queen of Pentacles, Erebus tarot card illustration, bright nurturing environment, feminine shadow figure holding pentacle, stability dissolving into void particles, number 76 at top, QUEEN OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6",
"77 King of Pentacles, Erebus tarot card illustration, bright powerful environment, dominant shadow figure seated, material authority dissolving into darkness, final stability unstable, number 77 at top, KING OF PENTACLES at bottom, full card visible, ultra detailed, aspect ratio 1:1.6"


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