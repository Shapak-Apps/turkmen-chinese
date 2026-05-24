/**
 * Restructure course_content.json from 16 arbitrary chapters
 * to 30 HSK Standard Course chapters (15 HSK1 + 15 HSK2)
 */

const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "..", "assets", "data", "course_content.json");
const backupPath = path.join(__dirname, "..", "assets", "data", "course_content_backup.json");
// Read from backup (original structure) if it exists, otherwise from main file
const inputPath = fs.existsSync(backupPath) ? backupPath : outputPath;

const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

// Build a lookup: lessonId -> lesson object
const lessonMap = {};
data.chapters.forEach((ch) => {
  ch.lessons.forEach((l) => {
    lessonMap[String(l.id)] = l;
  });
});

function getLessons(ids) {
  return ids.map((id) => {
    const l = lessonMap[String(id)];
    if (!l) throw new Error("Lesson not found: " + id);
    return l;
  });
}

// ============================================================
// NEW 30-CHAPTER STRUCTURE
// ============================================================

const newChapters = [
  // ==================== HSK 1 (chapters 1-15) ====================
  {
    id: 1,
    title: "Hello",
    titleChinese: "你好",
    description: "Pinyin tones and basic greetings.",
    lessonIds: [1, 2],
  },
  {
    id: 2,
    title: "Thank You",
    titleChinese: "谢谢你",
    description: "Polite expressions and remaining pinyin sounds.",
    lessonIds: ["9-2", 3],
  },
  {
    id: 3,
    title: "What's Your Name?",
    titleChinese: "你叫什么名字",
    description: "Introducing yourself, question words.",
    lessonIds: [6, 9],
  },
  {
    id: 4,
    title: "She Is My Chinese Teacher",
    titleChinese: "她是我的汉语老师",
    description: "The verb 是, the particle 的, negation with 不.",
    lessonIds: [5, 10, "4-5"],
  },
  {
    id: 5,
    title: "Her Daughter Is 20 This Year",
    titleChinese: "她女儿今年二十岁",
    description: "Numbers 1–100, age, 几 vs 多少.",
    lessonIds: [4, "3-1", "3-2"],
  },
  {
    id: 6,
    title: "I Can Speak Chinese",
    titleChinese: "我会说汉语",
    description: "会 (skill), 能 (ability), countries & languages.",
    lessonIds: ["5-4", 8],
  },
  {
    id: 7,
    title: "What's the Date Today?",
    titleChinese: "今天几号",
    description: "Dates, days of the week, time order.",
    lessonIds: ["3-3", "3-5"],
  },
  {
    id: 8,
    title: "I'd Like Some Tea",
    titleChinese: "我想喝茶",
    description: "想 (want), 吗 yes/no questions, 呢, food vocabulary.",
    lessonIds: ["5-3", 7, "5-2"],
  },
  {
    id: 9,
    title: "Where Does Your Son Work?",
    titleChinese: "你儿子在哪儿工作",
    description: "在 (at/in), 哪儿 (where), places, family & work.",
    lessonIds: ["6-1", "6-2", "6-4", "4-1"],
  },
  {
    id: 10,
    title: "Can I Sit Here?",
    titleChinese: "我能坐这儿吗",
    description: "Position words, 这/那, 有, measure words.",
    lessonIds: ["6-3", "4-2", "4-3"],
  },
  {
    id: 11,
    title: "What Time Is It Now?",
    titleChinese: "现在几点",
    description: "Telling time, 半, SVO word order.",
    lessonIds: ["3-4", "5-5"],
  },
  {
    id: 12,
    title: "How's the Weather Tomorrow?",
    titleChinese: "明天天气怎么样",
    description: "怎么样, 太…了, 很, weather vocabulary.",
    lessonIds: ["7-4", "7-5"],
  },
  {
    id: 13,
    title: "He's Learning to Cook Chinese Food",
    titleChinese: "他在学做中国菜呢",
    description: "在…呢 progressive, verb chains, common verbs, going places.",
    lessonIds: ["5-1", "7-1", "7-3", "6-5"],
  },
  {
    id: 14,
    title: "She Bought a Lot of Clothes",
    titleChinese: "她买了不少衣服",
    description: "了 (completion), 不 vs 没, shopping & clothes.",
    lessonIds: ["7-2", "8-1", "8-4"],
  },
  {
    id: 15,
    title: "I Came by Plane",
    titleChinese: "我是坐飞机来的",
    description: "是…的 (emphasis), transport, HSK1 review.",
    lessonIds: ["8-2", "8-3", "8-5"],
  },

  // ==================== HSK 2 (chapters 16-30) ====================
  {
    id: 16,
    title: "September Is Best for Beijing",
    titleChinese: "九月去北京旅游最好",
    description: "最 (superlative), 的时候 (when), approximate numbers.",
    lessonIds: ["12-3", "12-4"],
  },
  {
    id: 17,
    title: "I Get Up at 6 Every Day",
    titleChinese: "我每天六点起床",
    description: "每 (every), 都 (all), daily routines.",
    lessonIds: ["10-1", "10-2", "9-5"],
  },
  {
    id: 18,
    title: "The Red One on the Left Is Mine",
    titleChinese: "左边那个红色的是我的",
    description: "Colors, left/right/beside, 的 nominalization.",
    lessonIds: ["12-1", "11-2"],
  },
  {
    id: 19,
    title: "He Helped Me Get This Job",
    titleChinese: "这个工作是他帮我介绍的",
    description: "是…的 review, 帮 (help), 就 (then/just), extended family.",
    lessonIds: ["9-1", "9-3"],
  },
  {
    id: 20,
    title: "I'll Take This One",
    titleChinese: "就买这件吧",
    description: "吧 (suggestion), 件 measure word, 一下, new measure words.",
    lessonIds: ["13-5", "9-4"],
  },
  {
    id: 21,
    title: "Why Aren't You Eating?",
    titleChinese: "你怎么不吃了",
    description: "怎么 (why), 了 state change, 还/也, already.",
    lessonIds: ["10-5", "4-4"],
  },
  {
    id: 22,
    title: "Is Your Home Far from Work?",
    titleChinese: "你家离公司远吗",
    description: "离 (distance), 从…到, far/near, new places.",
    lessonIds: ["11-3", "11-4", "11-1"],
  },
  {
    id: 23,
    title: "Let Me Think Before I Tell You",
    titleChinese: "让我想想再告诉你",
    description: "让 (let), verb doubling, 再 (again later), still & again.",
    lessonIds: ["13-3", "13-4", "10-4"],
  },
  {
    id: 24,
    title: "Too Many Questions, I Couldn't Finish",
    titleChinese: "题太多，我没做完",
    description: "Result complements (做完, 看见, 听懂), can/cannot.",
    lessonIds: ["14-3", "14-4"],
  },
  {
    id: 25,
    title: "Stop Looking, the Phone Is on the Table",
    titleChinese: "别找了，手机在桌子上呢",
    description: "别/不要 (don't), 着 state, 正在…呢, action verbs.",
    lessonIds: ["13-2", "10-3", "13-1"],
  },
  {
    id: 26,
    title: "He's 3 Years Older Than Me",
    titleChinese: "他比我大三岁",
    description: "比 comparison, A比B + adj, opposites.",
    lessonIds: ["12-2", "12-5"],
  },
  {
    id: 27,
    title: "You're Wearing Too Little",
    titleChinese: "你穿得太少了",
    description: "得 degree complement, Verb+得+evaluation, how well.",
    lessonIds: ["14-5", "11-5"],
  },
  {
    id: 28,
    title: "The Door Is Open",
    titleChinese: "门开着呢",
    description: "着 continuous state, 因为…所以, 虽然…但是.",
    lessonIds: ["14-2", "15-4", "15-5"],
  },
  {
    id: 29,
    title: "Have You Seen That Movie?",
    titleChinese: "你看过那个电影吗",
    description: "过 (experience), 过 vs 了, duration & frequency, body & hobbies.",
    lessonIds: ["14-1", "16-2", "15-1", "15-2", "15-3"],
  },
  {
    id: 30,
    title: "New Year Is Coming Soon",
    titleChinese: "新年就要到了",
    description: "就要/快要…了, A不A questions, direction complements, HSK2 review.",
    lessonIds: ["16-1", "16-3", "16-4", "16-5"],
  },
];

// ============================================================
// BUILD NEW JSON
// ============================================================

// Verify all old lessons are used exactly once
const allUsedIds = new Set();
newChapters.forEach((ch) => {
  ch.lessonIds.forEach((id) => {
    const key = String(id);
    if (allUsedIds.has(key)) {
      console.warn("WARNING: lesson " + key + " used more than once (in chapter " + ch.id + ")");
    }
    allUsedIds.add(key);
  });
});

const allOldIds = Object.keys(lessonMap);
const unused = allOldIds.filter((id) => !allUsedIds.has(id));
if (unused.length > 0) {
  console.warn("WARNING: unused old lessons:", unused);
}
const missing = [...allUsedIds].filter((id) => !lessonMap[id]);
if (missing.length > 0) {
  console.error("ERROR: lessons not found:", missing);
  process.exit(1);
}

// Build output
const output = {
  chapters: newChapters.map((ch) => {
    const lessons = getLessons(ch.lessonIds);
    return {
      id: ch.id,
      title: ch.titleChinese + " — " + ch.title,
      titleChinese: ch.titleChinese,
      description: ch.description,
      lessons: lessons,
    };
  }),
  scenarios: data.scenarios || [],
};

// Backup original
fs.writeFileSync(backupPath, JSON.stringify(data, null, 2), "utf-8");
console.log("Backup saved to:", backupPath);

// Write new structure
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf-8");

// Stats
let totalQ = 0;
output.chapters.forEach((ch) => {
  const q = ch.lessons.reduce((s, l) => s + l.questions.length, 0);
  totalQ += q;
  console.log(
    "Chapter " + ch.id + ": " + ch.title + " — " + ch.lessons.length + " lessons, " + q + " exercises"
  );
});
console.log("\nTotal: " + output.chapters.length + " chapters, " + totalQ + " exercises");
console.log("Done!");
