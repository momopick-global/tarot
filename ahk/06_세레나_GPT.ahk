#Requires AutoHotkey v2.0
#SingleInstance Force
SetTitleMatchMode(2)

; 관리자 권한은 환경에 따라 오히려 실행을 막을 수 있어 기본 비활성화.
forceAdmin := false
if forceAdmin && !A_IsAdmin {
    if A_AhkPath {
        Run('*RunAs "' A_AhkPath '" "' A_ScriptFullPath '"')
    } else {
        Run('*RunAs "' A_ScriptFullPath '"')
    }
    ExitApp
}

; ✅ 창 제목 설정 (크롬 탭 제목의 일부만 정확히 입력)
winTitle := "유어타로_카드 - 카드_06_세레나_이미지생성"
targetWin := winTitle " ahk_exe chrome.exe"
titleHints := ["Google Gemini", "Gemini", "Google Gemini -", "Gemini -"]

messages := [
    "5 The Hierophant, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

wise religious figure seated on an ornate throne, wearing ceremonial robes in red and white with gold details, holding a staff with triple cross, two followers kneeling before him, 

grand temple interior with stone pillars and symbolic carvings, 

rich red, gold and neutral tones, soft sacred lighting, 

sense of tradition, guidance, spiritual authority, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"6 The Lovers, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

a man and woman standing together, gazing at each other, angel with radiant wings above them, both figures partially draped in soft flowing garments, 

lush garden with tree bearing fruit behind the woman and a tree with flames behind the man, distant mountain, 

warm vibrant color palette, golden sunlight, 

sense of love, harmony, union and choice, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"7 The Chariot, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

armored warrior standing in a chariot, holding reins, determined expression, wearing crown and armor, 

two sphinxes or horses in black and white pulling the chariot, city behind, 

strong contrast lighting, blue and gold tones, 

sense of control, victory, forward movement, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"8 Strength, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

gentle woman calmly holding open the mouth of a lion, serene expression, wearing white dress with floral wreath, infinity symbol above head, 

natural landscape with soft hills and sky, 

warm golden tones, soft sunlight, 

sense of inner strength, compassion, calm control, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"9 The Hermit, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

elderly man with long beard standing alone, holding a lantern glowing warmly and a wooden staff, cloaked in grey robes, 

snowy mountain peak, dark sky, 

cool blue and grey tones with warm light contrast, 

sense of solitude, wisdom, introspection, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"10 Wheel of Fortune, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

large ornate wheel with mystical symbols rotating in the sky, winged creatures in the corners reading books, 

cloud-filled sky with dynamic movement, 

gold, blue and red tones, dramatic lighting, 

sense of fate, cycles, destiny, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"11 Justice, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

balanced figure seated holding sword upright and scales, wearing red robe, calm and firm expression, 

architectural interior with pillars, 

balanced lighting, red and gold tones, 

sense of fairness, truth, balance, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"12 The Hanged Man, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

man hanging upside down from a tree by one foot, calm expression, glowing halo around head, 

tree branches forming frame, 

muted green and gold tones, soft lighting, 

sense of surrender, perspective, pause, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"13 Death, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

skeleton knight riding a white horse, holding black flag with white symbol, 

fallen figures on the ground, rising sun in the background, 

strong contrast, black, white and gold tones, 

sense of transformation, endings, renewal, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"14 Temperance, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

angel figure pouring water between two cups, one foot on land and one in water, 

calm landscape with path and rising sun, 

soft pastel colors, gentle lighting, 

sense of balance, harmony, flow, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"15 The Devil, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

horned dark figure with wings seated above chained man and woman, intense gaze, 

dark cavern setting, 

deep reds, blacks and shadows, dramatic lighting, 

sense of bondage, temptation, shadow, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"16 The Tower, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

tall tower struck by lightning, flames bursting from windows, figures falling, 

stormy sky, chaotic motion, 

strong yellow lightning, dark clouds, high contrast, 

sense of destruction, sudden change, chaos, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"17 The Star, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

beautiful woman kneeling by water pouring from two vessels, long flowing hair, calm expression, 

night sky with large radiant star and smaller stars, natural landscape, 

cool blues and soft gold tones, glowing light, 

sense of hope, healing, serenity, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"18 The Moon, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

large glowing moon with face in the sky, wolf and dog howling, crayfish emerging from water, 

path leading between two towers, 

deep blue tones, mysterious lighting, 

sense of illusion, fear, subconscious, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"19 The Sun, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

child riding a white horse under a radiant sun, joyful expression, waving red banner, 

sunflowers behind, bright open sky, 

warm yellow and orange tones, bright lighting, 

sense of joy, vitality, success, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"20 Judgement, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

angel blowing a trumpet from the sky, people rising from coffins below, 

clouds opening above, dramatic sky, 

light vs shadow contrast, glowing highlights, 

sense of awakening, rebirth, calling, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"21 The World, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

dancing figure surrounded by a wreath, holding two wands, flowing fabric around body, 

four symbolic creatures in the corners, 

rich balanced color palette, harmonious lighting, 

sense of completion, unity, fulfillment, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",
"22 Ace of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

a glowing wooden wand emerging from a cloud, sprouting fresh green leaves, 

bright sky and distant hills, 

warm orange and gold tones, radiant energy, 

sense of inspiration, creation, new potential, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"23 Two of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

man standing on a balcony holding a globe, looking into distance, two wands beside him, 

expansive landscape and sea horizon, 

warm earthy tones, soft sunlight, 

sense of planning, future vision, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"24 Three of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure watching ships sailing away, three wands planted in ground, 

coastal landscape with ocean view, 

golden light, deep blue sea, 

sense of expansion, progress, waiting for results, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"25 Four of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

four wands forming a decorated arch with flowers, people celebrating beneath, 

village background, festive setting, 

warm vibrant colors, joyful lighting, 

sense of celebration, stability, harmony, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"26 Five of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

group of figures clashing with wands in chaotic motion, 

open field, dynamic composition, 

mixed warm tones, energetic lighting, 

sense of conflict, competition, tension, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"27 Six of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

victorious rider on a horse holding a wand with wreath, crowd around, 

bright outdoor setting, 

golden light, triumphant mood, 

sense of victory, recognition, success, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"28 Seven of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure defending against multiple wands from below, 

elevated terrain, 

strong contrast lighting, 

sense of defense, challenge, resilience, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"29 Eight of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

eight wands flying diagonally through the sky, 

open landscape below, 

bright sky, dynamic motion blur, 

sense of speed, movement, communication, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"30 Nine of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

wounded figure standing guarded with one wand, others behind, 

defensive posture, 

earth tones, tense lighting, 

sense of persistence, endurance, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"31 Ten of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure carrying heavy bundle of wands, struggling forward, 

village in distance, 

warm muted tones, 

sense of burden, responsibility, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"32 Page of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

young messenger holding a wand, curious expression, 

desert-like landscape, 

warm tones, 

sense of exploration, curiosity, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"33 Knight of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

armored knight riding fast horse holding wand, 

desert landscape, 

dynamic motion, fiery tones, 

sense of action, passion, impulsiveness, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"34 Queen of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

confident queen seated holding a wand, sunflower beside her, black cat at feet, 

warm throne setting, 

golden tones, 

sense of confidence, charisma, warmth, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"35 King of Wands, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

king seated holding wand, decorated throne with salamander motifs, 

warm interior, 

rich gold and red tones, 

sense of leadership, vision, authority, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",
"36 Ace of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

a golden cup overflowing with water, emerging from a cloud, water flowing into a calm lake, 

soft sky and gentle ripples, 

cool blue and gold tones, glowing highlights, 

sense of emotion, love, new beginnings, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"37 Two of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

man and woman exchanging cups, gazing at each other, 

caduceus symbol above, 

warm harmonious tones, 

sense of partnership, connection, love, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"38 Three of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

three women celebrating, raising cups together, 

festive outdoor setting, 

warm vibrant tones, 

sense of friendship, celebration, joy, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"39 Four of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

man sitting under tree looking uninterested, three cups before him, fourth cup offered from cloud, 

quiet natural setting, 

muted tones, 

sense of apathy, contemplation, missed opportunity, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"40 Five of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure in dark cloak mourning spilled cups, two cups standing behind, 

river and bridge in background, 

dark muted tones, 

sense of loss, regret, reflection, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"41 Six of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

children exchanging cups filled with flowers, 

village setting, 

soft warm tones, 

sense of nostalgia, innocence, memory, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"42 Seven of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure facing floating cups filled with various symbols, 

dark surreal background, 

mystical tones, 

sense of illusion, choices, imagination, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"43 Eight of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure walking away from stacked cups toward mountains, 

night sky, 

cool blue tones, 

sense of leaving, searching, transition, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"44 Nine of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

man sitting proudly with nine cups arranged behind him, 

warm interior, 

golden tones, 

sense of satisfaction, fulfillment, pride, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"45 Ten of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

family standing under rainbow of cups, arms raised, 

bright landscape, 

vivid rainbow colors, 

sense of happiness, harmony, completion, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"46 Page of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

young figure holding a cup with a fish emerging, surprised expression, 

shoreline setting, 

soft blue tones, 

sense of curiosity, creativity, emotion, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"47 Knight of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

knight on horse holding cup, calm posture, 

river landscape, 

soft romantic tones, 

sense of romance, charm, pursuit, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"48 Queen of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

queen seated by water holding ornate cup, calm expression, 

coastal setting, 

cool blue tones, 

sense of intuition, compassion, depth, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"49 King of Cups, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

king seated on throne floating on water, holding cup and scepter, 

waves surrounding, 

deep blue tones, 

sense of emotional control, wisdom, balance, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",
"50 Ace of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

a sword emerging from cloud crowned with light, 

mountain background, 

bright white and gold tones, 

sense of clarity, truth, breakthrough, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"51 Two of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

blindfolded woman holding crossed swords, 

moonlit water behind, 

cool blue tones, 

sense of indecision, balance, tension, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"52 Three of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

heart pierced by three swords, 

storm clouds and rain, 

dark red tones, 

sense of heartbreak, sorrow, pain, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"53 Four of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure lying on tomb in rest, hands in prayer, swords above, 

church interior, 

muted tones, 

sense of rest, recovery, pause, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"54 Five of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

man holding swords while others walk away defeated, 

open field, 

cool tones, 

sense of conflict, defeat, tension, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"55 Six of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

boat carrying figures across water, swords upright, 

calm river, 

soft blue tones, 

sense of transition, moving forward, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"56 Seven of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure sneaking away carrying swords, 

camp setting, 

muted tones, 

sense of deception, strategy, secrecy, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"57 Eight of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

blindfolded figure surrounded by swords, bound, 

foggy landscape, 

cool gray tones, 

sense of restriction, limitation, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"58 Nine of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure sitting in bed covering face, swords behind, 

dark interior, 

deep shadows, 

sense of anxiety, fear, nightmares, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"59 Ten of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure lying with ten swords in back, sunrise in distance, 

dark foreground with light horizon, 

strong contrast tones, 

sense of ending, betrayal, transformation, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"60 Page of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

young figure holding sword, alert posture, 

windy landscape, 

cool tones, 

sense of curiosity, vigilance, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"61 Knight of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

knight charging forward with sword raised, 

stormy sky, 

dynamic motion, 

sense of action, aggression, speed, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"62 Queen of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

queen seated holding sword upright, 

cloudy sky, 

cool tones, 

sense of clarity, independence, intellect, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"63 King of Swords, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

king seated holding sword, stern expression, 

sky background, 

cool blue tones, 

sense of authority, logic, truth, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",
"64 Ace of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

golden pentacle held by hand emerging from cloud, 

garden path leading to mountains, 

green and gold tones, 

sense of opportunity, prosperity, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"65 Two of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure juggling two pentacles connected by infinity loop, 

ocean waves with ships, 

dynamic tones, 

sense of balance, adaptability, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"66 Three of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

craftsmen working together on cathedral, 

architectural interior, 

warm tones, 

sense of teamwork, skill, collaboration, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"67 Four of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure holding pentacles tightly, seated, 

city background, 

muted tones, 

sense of control, security, holding on, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"68 Five of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

two figures walking in snow past a lit window, 

cold setting, 

blue tones, 

sense of hardship, struggle, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"69 Six of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

wealthy figure giving coins to others, holding scales, 

urban setting, 

balanced tones, 

sense of generosity, balance, giving, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"70 Seven of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

figure observing pentacles growing on plant, 

garden setting, 

earthy tones, 

sense of patience, evaluation, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"71 Eight of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

craftsman carving pentacles, focused, 

workshop setting, 

warm tones, 

sense of skill, dedication, mastery, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"72 Nine of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

woman in garden with falcon, surrounded by pentacles, 

lush environment, 

gold and green tones, 

sense of luxury, independence, success, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"73 Ten of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

family scene with pentacles arranged, 

archway setting, 

rich warm tones, 

sense of legacy, wealth, stability, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"74 Page of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

young figure holding pentacle, focused expression, 

open field, 

natural tones, 

sense of learning, opportunity, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"75 Knight of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

knight on horse holding pentacle, steady posture, 

field landscape, 

earth tones, 

sense of persistence, responsibility, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"76 Queen of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

queen seated holding pentacle, surrounded by nature, 

lush environment, 

warm natural tones, 

sense of nurturing, stability, abundance, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16",

"77 King of Pentacles, vintage tarot card illustration, detailed engraving style, fine hatching, textured aged paper, imperfect hand-drawn lines, 

king seated holding pentacle, luxurious throne, 

rich environment, 

gold and green tones, 

sense of wealth, authority, mastery, 

classic rider-waite inspired composition, highly detailed linework, balanced composition, 

full tarot card fully visible, no cropping, frame edge-to-edge, ornate vintage tarot frame, 

number at the top, English card title at the bottom, aspect ratio 1:1.16"
]

currentIndex := 1
isSending := false

; 전송 주기(ms). 현재 240000 = 4분. 빠르게 테스트하려면 10000(10초) 등으로.
sendIntervalMs := 240000
SetTimer(SendNextMessage, sendIntervalMs)
SendNextMessage()

SendNextMessage(*) {
    global messages, currentIndex, targetWin, isSending, winTitle, titleHints

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
        hwnd := FindGeminiChromeHwnd(titleHints)
        if !hwnd {
            ToolTip("❌ Gemini 크롬 창을 찾을 수 없음 (탭 제목 확인 필요)")
            SetTimer(() => ToolTip(), -3000)
            return
        }

        idTarget := "ahk_id " hwnd
        WinActivate(idTarget)
        if !WinWaitActive(idTarget, , 5) {
            return
        }

        ; 입력창 포커스 안정화: 창 하단 중앙을 "창 기준 좌표"로 클릭
        CoordMode("Mouse", "Window")
        Sleep(300)
        try {
            WinGetClientPos(&cx, &cy, &cw, &ch, idTarget)
        } catch {
            WinGetPos(&cx, &cy, &cw, &ch, idTarget)
            cx := 0, cy := 0
        }
        x := Round(cw * 0.5)
        y := ch - 120
        if (y < 40)
            y := ch - 40
        Click(x, y)
        Sleep(200)

        SendText(messages[currentIndex])
        Sleep(150)
        Send("{Enter}")

        currentIndex += 1
        ToolTip("🚀 메시지 전송 중... (" currentIndex - 1 "/" messages.Length ")")
        SetTimer(() => ToolTip(), -3000)

    } finally {
        isSending := false
    }
}

FindGeminiChromeHwnd(titleHints) {
    ; 크롬 창을 모두 훑어서 제목에 Gemini 힌트가 들어간 창을 찾는다.
    ; 찾으면 ahk_id로 고정해 탭 제목 변경에도 안정적으로 동작.
    wins := WinGetList("ahk_exe chrome.exe")
    for hwnd in wins {
        title := WinGetTitle("ahk_id " hwnd)
        if !title
            continue
        for hint in titleHints {
            if InStr(title, hint) {
                return hwnd
            }
        }
    }
    ; 마지막 fallback: chrome 창이 1개면 그걸 사용
    if wins.Length = 1
        return wins[1]
    return 0
}

Esc::ExitApp
F8::SendNextMessage()  ; 수동으로 다음 메시지 즉시 전송