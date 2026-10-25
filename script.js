(() => {
  let total = 8;
  const arabic = value => String(value).replace(/-/g, "−");
  const rand = max => Math.floor(Math.random() * max) + 1;
  const screens = [...document.querySelectorAll(".screen")];
  const answers = document.getElementById("answers");
  const feedback = document.getElementById("feedback");
  const next = document.getElementById("next");
  const hintButton = document.getElementById("hint-button");
  const hintText = document.getElementById("hint-text");
  const explanation = document.getElementById("explanation");
  const languageSelect = document.getElementById("language-select");
  const topicNames = {
    ratios: "النسب والتناسب",
    operations: "عمليات الأعداد",
    fractions: "الكسور",
    decimals: "الأعداد العشرية والنسب المئوية",
    integers: "الأعداد الصحيحة والمستوى الإحداثي",
    algebra: "الجبر والمعادلات",
    geometry: "الهندسة والقياس",
    powers: "القوى والجذور",
    statistics: "الإحصاء والاحتمالات",
    rational: "الأعداد النسبية",
    linear: "المعادلات والعلاقات الخطية",
    pythagorean: "نظرية فيثاغورس",
    volume: "الحجم والمساحة السطحية",
    transformations: "التحويلات الهندسية"
  };
  const englishTopicNames = {
    ratios: "Ratios and Proportions",
    operations: "Number Operations",
    fractions: "Fractions",
    decimals: "Decimals and Percentages",
    integers: "Integers and Coordinates",
    algebra: "Algebra and Equations",
    geometry: "Geometry and Measurement",
    powers: "Powers and Roots",
    statistics: "Statistics and Probability",
    rational: "Rational Numbers",
    linear: "Linear Equations and Relationships",
    pythagorean: "Pythagorean Theorem",
    volume: "Volume and Surface Area",
    transformations: "Geometric Transformations"
  };
  const translations = {
    ar: {
      pageTitle: "مغامرة الرياضيات", brand: "مختبر الرياضيات", tagline: "نتعلّم باللعب والتقنية",
      languageLabel: "اللغة", areaRectangle: "مساحة المستطيل", topicsLabel: "موضوعات الرياضيات",
      headerTag: "✦ مغامرة في عالم الرياضيات", eyebrow: "◈ لعبة تعليمية تفاعلية",
      title: "مغامرة الرياضيات", intro: "اختر صفك الدراسي وموضوع التحدّي، ثم اجمع النقاط واكتشف الحلول خطوة بخطوة. تحتوي كل مرحلة على تدريبات مناسبة للصف السادس أو السابع أو الثامن.",
      gradeLabel: "اختر الصف الدراسي", topicHeading: "اختر موضوع التحدّي", playerName: "اسم اللاعب",
      optional: "(اختياري)", namePlaceholder: "اكتب اسمك هنا", questionCount: "عدد الأسئلة",
      startButton: "ابدأ التحدّي ←", points: "نقطة", streak: "سلسلة", gameLabel: "سؤال الرياضيات",
      progressLabel: "التقدم في التحدي", hintButton: "💡 تلميح", footer: "تحدّي وحدات الرياضيات — خطوة بخطوة نحو التفوّق ✨",
      certificateTitle: "شهادة إنجاز", certificateAdventure: "مغامرة الرياضيات", certificateAwarded: "تُمنح هذه الشهادة إلى",
      certificateDescription: "لإتمام تحدّي الرياضيات بنجاح", copyCertificate: "انسخ نص الشهادة",
      downloadCertificate: "تنزيل شهادة PDF", exitButton: "خروج",
      downloadError: "تعذّر إنشاء ملف PDF. حاول مرة أخرى.",
      authorCredit: "محمد صلاح", missedTitle: "مراجعة الأسئلة التي تحتاج إلى تدريب",
      certificateLabel: "شهادة إتمام التحدّي",
      shareResult: "انسخ النتيجة", restart: "العب من جديد ↻",
      mixed: "تحدّي شامل", mixedDescription: "أسئلة متنوعة من موضوعات الصف",
      questionLabel: name => `موضوع السؤال: ${topicNames[name]}`,
      answerLabel: answer => `الإجابة ${answer}`,
      countLabel: (turn, total) => `السؤال ${arabic(turn)} من ${arabic(total)}`,
      rightAnswer: "إجابة صحيحة! أحسنت 🎉", wrongAnswer: answer => `ليست الإجابة الصحيحة. الإجابة هي ${arabic(answer)}.`,
      explanation: text => `طريقة الحل: ${text}`,
      hint: text => `💡 ${text}`,
      next: turn => turn ? "اعرف نتيجتك ←" : "السؤال التالي ←",
      recordEmpty: "🏅 سيظهر أفضل سجل لك هنا بعد أول جولة.",
      recordPreview: (score, time) => `🏅 أفضل نتيجة لك في هذا التحدّي: ${arabic(score)} نقطة — ${time}`,
      recordUnavailable: "تعذّر الوصول إلى سجل الجهاز في هذا المتصفح.",
      recordSaved: (label, score, time) => `${label} ${arabic(score)} نقطة — ${time}`,
      newRecord: "🎉 رقم قياسي جديد!", bestRecord: "🏅 أفضل سجل",
      saveFailed: "لم يتم حفظ السجل؛ التخزين غير متاح في هذا المتصفح.",
      perfectTitle: (name, grade) => `${name}ممتاز! أتقنت تحدّي ${grade}!`,
      greatTitle: (name, grade) => `${name}عمل رائع في ${grade}!`,
      tryTitle: (name, grade) => `${name}محاولة جيدة في ${grade}!`,
      perfectMessage: "أجبت عن كل الأسئلة بشكل صحيح وحافظت على سلسلة إجابات رائعة!",
      greatMessage: "أحرزت نتيجة جميلة. واصل التدريب لتتقن كل الوحدات!",
      tryMessage: "راجع موضوع التحدّي ثم حاول مرة أخرى. كل محاولة تزيد معرفتك!",
      finalScore: (score, streak, time) => `نتيجتك: ${arabic(score)} نقطة — أطول سلسلة: ${arabic(streak)} — الزمن: ${time}`,
      certificateName: "الطالب/ة المتميّز/ة",
      certificateScore: (score, correct, total) => `النتيجة ${arabic(score)} نقطة — ${arabic(correct)} من ${arabic(total)} صحيحة`,
      certificateText: (name, grade, topic, score, correct, total, date) => `شهادة إنجاز — مغامرة الرياضيات\nتُمنح إلى: ${name}\nالصف: ${grade}\nالموضوع: ${topic}\nالنتيجة: ${arabic(score)} نقطة من ${arabic(total)} سؤالاً\nالإجابات الصحيحة: ${arabic(correct)} من ${arabic(total)}\nالتاريخ: ${date}`,
      copySuccess: "تم نسخ نص الشهادة.", copyFallback: "تعذّر النسخ تلقائياً. حدّد نص الشهادة الظاهر لنسخه.",
      copyError: "تعذّر النسخ تلقائياً. يمكنك تحديد النتيجة أعلاه ونسخها يدوياً.",
      resultCopied: "تم نسخ نتيجتك؛ يمكنك مشاركتها الآن.",
      reviewItem: (question, answer) => `السؤال: ${question} الإجابة الصحيحة: ${arabic(answer)}`,
      reviewQuestion: "السؤال:", reviewAnswer: "الإجابة الصحيحة:",
      noMissed: "جولة مثالية! أجبت عن كل الأسئلة بشكل صحيح."
    },
    en: {
      pageTitle: "Math Adventure", brand: "Math Lab", tagline: "Learn through play and technology",
      languageLabel: "Language", areaRectangle: "Rectangle area", topicsLabel: "Math topics",
      headerTag: "✦ An adventure in mathematics", eyebrow: "◈ Interactive learning game",
      title: "Math Adventure", intro: "Choose your grade and a challenge topic. Earn points and explore step-by-step solutions with practice for grades 6, 7, and 8.",
      gradeLabel: "Choose your grade", topicHeading: "Choose a challenge topic", playerName: "Player name",
      optional: "(optional)", namePlaceholder: "Enter your name", questionCount: "Number of questions",
      startButton: "Start challenge →", points: "points", streak: "Streak", gameLabel: "Math question",
      progressLabel: "Challenge progress", hintButton: "💡 Hint", footer: "Math topics challenge — one step at a time ✨",
      certificateTitle: "Certificate of Achievement", certificateAdventure: "Math Adventure", certificateAwarded: "This certificate is awarded to",
      certificateDescription: "For completing the math challenge", copyCertificate: "Copy certificate text",
      downloadCertificate: "Download PDF", exitButton: "Exit",
      downloadError: "Could not create the PDF. Please try again.",
      authorCredit: "By: Mohamed Salah", missedTitle: "Review questions to practice",
      certificateLabel: "Challenge completion certificate",
      shareResult: "Copy result", restart: "Play again ↻",
      mixed: "Mixed challenge", mixedDescription: "A mix of topics for your grade",
      questionLabel: name => `Topic: ${englishTopicNames[name]}`,
      answerLabel: answer => `Answer ${answer}`,
      countLabel: (turn, total) => `Question ${turn} of ${total}`,
      rightAnswer: "Correct! Well done 🎉", wrongAnswer: answer => `Not quite. The correct answer is ${answer}.`,
      explanation: text => `Solution: ${text}`,
      hint: text => `💡 ${text}`,
      next: turn => turn ? "See your results →" : "Next question →",
      recordEmpty: "🏅 Your best score will appear here after your first round.",
      recordPreview: (score, time) => `🏅 Your best for this challenge: ${score} points — ${time}`,
      recordUnavailable: "Could not access saved scores in this browser.",
      recordSaved: (label, score, time) => `${label} ${score} points — ${time}`,
      newRecord: "🎉 New record!", bestRecord: "🏅 Best score",
      saveFailed: "Score could not be saved; browser storage is unavailable.",
      perfectTitle: (name, grade) => `${name}Excellent! You mastered ${grade}!`,
      greatTitle: (name, grade) => `${name}Great work in ${grade}!`,
      tryTitle: (name, grade) => `${name}Good try in ${grade}!`,
      perfectMessage: "You answered every question correctly and kept an amazing streak!",
      greatMessage: "Great score! Keep practicing to master every topic.",
      tryMessage: "Review this topic and try again. Every attempt helps you learn!",
      finalScore: (score, streak, time) => `Score: ${score} points — Best streak: ${streak} — Time: ${time}`,
      certificateName: "Outstanding Student",
      certificateScore: (score, correct, total) => `Score: ${score} points — ${correct} of ${total} correct`,
      certificateText: (name, grade, topic, score, correct, total, date) => `Certificate of Achievement — Math Adventure\nAwarded to: ${name}\nGrade: ${grade}\nTopic: ${topic}\nScore: ${score} points out of ${total} questions\nCorrect answers: ${correct} of ${total}\nDate: ${date}`,
      copySuccess: "Certificate text copied.", copyFallback: "Could not copy automatically. Select the certificate text to copy it.",
      copyError: "Could not copy automatically. You can select and copy the result above.",
      resultCopied: "Result copied — ready to share.",
      reviewItem: (question, answer) => `Question: ${question} Correct answer: ${answer}`,
      reviewQuestion: "Question:", reviewAnswer: "Correct answer:",
      noMissed: "Perfect round! You answered every question correctly."
    }
  };
  const gradeNames = { 6: "الصف السادس", 7: "الصف السابع", 8: "الصف الثامن" };
  const englishGradeNames = { 6: "Grade 6", 7: "Grade 7", 8: "Grade 8" };
  const gradeDescriptions = {
    6: "تدريبات مناسبة للصف السادس: النسب، العمليات، الكسور، الأعداد العشرية، والأعداد الصحيحة.",
    7: "تدريبات مناسبة للصف السابع: موضوعات الصف السادس مع الجبر والهندسة والإحصاء.",
    8: "تدريبات مناسبة للصف الثامن: المعادلات الخطية، القوى، فيثاغورس، الحجم، والتحويلات الهندسية."
  };
  const englishGradeDescriptions = {
    6: "Grade 6 practice: ratios, operations, fractions, decimals, and integers.",
    7: "Grade 7 practice: rational numbers, algebra, geometry, and statistics.",
    8: "Grade 8 practice: linear equations, powers, the Pythagorean theorem, volume, and transformations."
  };
  const englishTopicDescriptions = {
    ratios: "Ratios, proportions, and rates",
    operations: "Operations with multi-digit numbers",
    fractions: "Multiplying and dividing fractions",
    decimals: "Decimals and percentages",
    integers: "Integers and the coordinate plane",
    algebra: "Expressions and one-step equations",
    geometry: "Area and perimeter",
    powers: "Exponents, roots, and scientific notation",
    statistics: "Mean and probability",
    rational: "Operations with rational numbers",
    linear: "Linear equations and relationships",
    pythagorean: "Find side lengths of right triangles",
    volume: "Volume of prisms and cylinders",
    transformations: "Reflections, rotations, and translations"
  };
  const gradeTopics = {
    6: [
      { id: "ratios", emoji: "⚖️", description: "النسب والتناسب والمعدلات" },
      { id: "operations", emoji: "➕", description: "عمليات على الأعداد متعددة الأرقام" },
      { id: "fractions", emoji: "½", description: "ضرب الكسور وقسمتها" },
      { id: "decimals", emoji: "٪", description: "الأعداد العشرية والنسب المئوية" },
      { id: "integers", emoji: "📍", description: "الأعداد الصحيحة والمستوى الإحداثي" }
    ],
    7: [
      { id: "ratios", emoji: "⚖️", description: "النسب والتناسب والتغير التناسبي" },
      { id: "rational", emoji: "➖", description: "العمليات على الأعداد النسبية" },
      { id: "algebra", emoji: "🔠", description: "التعابير والمعادلات ذات الخطوة الواحدة" },
      { id: "geometry", emoji: "📐", description: "المساحة والمحيط" },
      { id: "statistics", emoji: "📊", description: "المتوسط والاحتمال" }
    ],
    8: [
      { id: "linear", emoji: "📈", description: "المعادلات والعلاقات الخطية" },
      { id: "powers", emoji: "²", description: "الأسس والجذور والكتابة العلمية" },
      { id: "pythagorean", emoji: "📐", description: "إيجاد أطوال أضلاع المثلث القائم" },
      { id: "volume", emoji: "🧊", description: "حجم المنشور والأسطوانة" },
      { id: "transformations", emoji: "🔄", description: "الانعكاس والدوران والانتقال" },
      { id: "statistics", emoji: "📊", description: "البيانات والاحتمالات" }
    ]
  };
  let topic = "mixed";
  let language = "ar";
  let grade = "6";
  let turn = 0;
  let score = 0;
  let correct = 0;
  let correctAnswers = 0;
  let streak = 0;
  let bestStreak = 0;
  let locked = false;
  let currentQuestion;
  let startedAt = 0;
  let timerInterval;
  let completedSeconds = 0;
  let storageWarning = false;
  let missedQuestions = [];

  const show = id => screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  const text = () => translations[language];
  const localizedGrade = () => language === "ar" ? gradeNames[grade] : englishGradeNames[grade];
  const localizedTopic = id => id === "mixed" ? text().mixed : language === "ar" ? topicNames[id] : englishTopicNames[id];
  function applyLanguage() {
    language = document.getElementById("language-select").value;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(element => {
      element.textContent = text()[element.dataset.i18n];
    });
    document.querySelectorAll("[data-placeholder]").forEach(element => {
      element.placeholder = text()[element.dataset.placeholder];
    });
    document.querySelectorAll("[data-aria]").forEach(element => {
      element.setAttribute("aria-label", text()[element.dataset.aria]);
    });
    document.querySelectorAll("[data-grade]").forEach(option => {
      option.textContent = language === "ar" ? gradeNames[option.dataset.grade] : englishGradeNames[option.dataset.grade];
    });
    const countLabels = language === "ar"
      ? { 8: "8 أسئلة — جولة سريعة", 12: "12 سؤالاً — جولة عادية", 16: "16 سؤالاً — تحدّي طويل" }
      : { 8: "8 questions — Quick round", 12: "12 questions — Standard round", 16: "16 questions — Long challenge" };
    document.querySelectorAll("[data-count]").forEach(option => {
      option.textContent = countLabels[option.dataset.count];
    });
    document.getElementById("grade-description").textContent =
      language === "ar" ? gradeDescriptions[grade] : englishGradeDescriptions[grade];
    updateGradeView();
    if (screens.find(screen => screen.id === "game").classList.contains("active")) {
      document.getElementById("count").textContent = text().countLabel(turn + 1, total);
      createQuestion();
    }
    if (currentQuestion && !screens.find(screen => screen.id === "game").classList.contains("active")) {
      renderMissedQuestions();
      updateCertificate();
      if (screens.find(screen => screen.id === "result").classList.contains("active")) {
        const name = document.getElementById("player-name").value.trim();
        const greeting = name ? (language === "ar" ? `يا ${name}، ` : `${name}, `) : "";
        renderResultMessage(greeting);
        document.getElementById("final").textContent =
          text().finalScore(score, bestStreak, formatTime(completedSeconds));
        const record = readRecord();
        if (record && !storageWarning) {
          document.getElementById("record-result").textContent =
            text().recordPreview(record.score, formatTime(record.seconds));
        }
      }
    }
  }
  const recordKey = () => `mathChallenge:grade${grade}:${topic}:${total}`;
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${arabic(minutes)}:${arabic(String(remainder).padStart(2, "0"))}`;
  };

  function readRecord() {
    try {
      const stored = localStorage.getItem(recordKey());
      if (!stored) return null;
      const record = JSON.parse(stored);
      if (!Number.isFinite(record.score) || !Number.isFinite(record.seconds)) return null;
      return record;
    } catch {
      document.getElementById("record-preview").textContent = text().recordUnavailable;
      return null;
    }
  }

  function updateRecordPreview() {
    const preview = document.getElementById("record-preview");
    preview.textContent = "";
    const record = readRecord();
    if (record) {
      preview.textContent = text().recordPreview(language === "ar" ? arabic(record.score) : record.score, formatTime(record.seconds));
    } else if (!preview.textContent) {
      preview.textContent = text().recordEmpty;
    }
  }

  function updateGradeView() {
    grade = document.getElementById("grade-select").value;
    document.getElementById("grade-description").textContent =
      language === "ar" ? gradeDescriptions[grade] : englishGradeDescriptions[grade];
    if (topic !== "mixed" && !gradeTopics[grade].some(item => item.id === topic)) {
      topic = "mixed";
    }
    const topicOptions = document.getElementById("topic-options");
    const cards = [
      { id: "mixed", emoji: "🎯", name: text().mixed, description: text().mixedDescription },
      ...gradeTopics[grade].map(item => ({
        ...item,
        name: localizedTopic(item.id),
        description: language === "ar" ? item.description : englishTopicDescriptions[item.id]
      }))
    ];
    topicOptions.replaceChildren(...cards.map(item => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `level${item.id === topic ? " selected" : ""}`;
      button.dataset.topic = item.id;
      button.setAttribute("aria-pressed", String(item.id === topic));
      button.addEventListener("click", () => {
        topic = item.id;
        updateGradeView();
      });
      const emoji = document.createElement("span");
      emoji.className = "emoji";
      emoji.textContent = item.emoji;
      const name = document.createElement("strong");
      name.textContent = item.name;
      const description = document.createElement("small");
      description.textContent = item.description;
      button.append(emoji, name, description);
      return button;
    }));
    updateRecordPreview();
  }

  function saveRecord() {
    const previous = readRecord();
    const current = { score, seconds: completedSeconds };
    if (previous && (previous.score > score || (previous.score === score && previous.seconds <= completedSeconds))) {
      return previous;
    }
    try {
      localStorage.setItem(recordKey(), JSON.stringify(current));
      return current;
    } catch {
      storageWarning = true;
      document.getElementById("record-result").textContent =
        text().saveFailed;
      return previous;
    }
  }

  function certificateDetails() {
    const name = document.getElementById("player-name").value.trim() || text().certificateName;
    const selectedTopic = localizedTopic(topic);
    const date = new Intl.DateTimeFormat(language === "ar" ? "ar" : "en", { dateStyle: "long" }).format(new Date());
    return { name, selectedTopic, date };
  }

  function renderMissedQuestions() {
    const section = document.getElementById("missed-review");
    const list = document.getElementById("missed-list");
    const title = document.getElementById("missed-title");
    list.replaceChildren();
    section.hidden = false;
    if (missedQuestions.length === 0) {
      title.textContent = text().missedTitle;
      const item = document.createElement("li");
      item.textContent = text().noMissed;
      list.append(item);
      return;
    }
    title.textContent = text().missedTitle;
    missedQuestions.forEach(missed => {
      const item = document.createElement("li");
      const question = document.createElement("span");
      question.className = "missed-question";
      question.textContent = `${text().reviewQuestion} ${missed.prompt}`;
      const answer = document.createElement("span");
      answer.textContent = ` ${text().reviewAnswer} ${missed.answer}`;
      item.append(question, answer);
      list.append(item);
    });
  }

  function certificateText() {
    const { name, selectedTopic, date } = certificateDetails();
    return text().certificateText(name, localizedGrade(), selectedTopic, score, correctAnswers, total, date);
  }

  function updateCertificate() {
    const { name, selectedTopic, date } = certificateDetails();
    document.getElementById("certificate-name").textContent = name;
    document.getElementById("certificate-grade").textContent = localizedGrade();
    document.getElementById("certificate-topic").textContent = selectedTopic;
    document.getElementById("certificate-score").textContent =
      text().certificateScore(score, correctAnswers, total);
    document.getElementById("certificate-date").textContent = date;
  }

  function downloadCertificate() {
    const { name, selectedTopic, date } = certificateDetails();
    const isArabic = language === "ar";
    const canvas = document.createElement("canvas");
    canvas.width = 2400;
    canvas.height = 1697;
    const context = canvas.getContext("2d");
    if (!context) {
      document.getElementById("share-status").textContent = text().downloadError;
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    context.fillStyle = "#fbf9f2";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#bc8c26";
    context.lineWidth = 14;
    context.strokeRect(45, 45, width - 90, height - 90);
    context.lineWidth = 3;
    context.strokeRect(70, 70, width - 140, height - 140);
    context.textAlign = "center";
    context.direction = isArabic ? "rtl" : "ltr";

    const drawText = (value, y, size, color, weight = "normal") => {
      context.font = `${weight} ${size}px Tahoma, Arial, sans-serif`;
      context.fillStyle = color;
      context.fillText(value, width / 2, y, width - 300);
    };

    drawText("✦", 260, 100, "#9a711b", "bold");
    drawText(isArabic ? "شهادة إنجاز" : "CERTIFICATE OF ACHIEVEMENT", 390, 64, "#9a711b", "bold");
    drawText(isArabic ? "مغامرة الرياضيات" : "Math Adventure", 520, 82, "#147b82", "bold");
    drawText(isArabic ? "تُمنح هذه الشهادة إلى" : "This certificate is awarded to", 690, 42, "#566579");
    drawText(name, 830, 82, "#112a4b", "bold");
    context.strokeStyle = "#bc8c26";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(500, 880);
    context.lineTo(width - 500, 880);
    context.stroke();
    drawText(isArabic ? "لإتمام تحدّي الرياضيات بنجاح" : "For completing the math challenge", 980, 40, "#566579");
    drawText(`${localizedGrade()}  •  ${selectedTopic}`, 1110, 38, "#142543", "bold");
    drawText(text().certificateScore(score, correctAnswers, total), 1200, 36, "#142543");
    drawText(date, 1370, 32, "#566579");
    drawText(isArabic ? "محمد صلاح" : "By: Mohamed Salah", 1510, 26, "#566579");

    const jpeg = canvas.toDataURL("image/jpeg", 0.94);
    const imageBytes = Uint8Array.from(atob(jpeg.split(",")[1]), character => character.charCodeAt(0));
    const encoder = new TextEncoder();
    const chunks = [];
    let byteLength = 0;
    const append = chunk => {
      chunks.push(chunk);
      byteLength += chunk.length;
    };
    const appendText = value => append(encoder.encode(value));
    const offsets = [0];
    appendText("%PDF-1.4\n");
    const addObject = (number, body) => {
      offsets[number] = byteLength;
      appendText(`${number} 0 obj\n${body}\nendobj\n`);
    };

    addObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
    addObject(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
    addObject(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>");
    offsets[4] = byteLength;
    appendText(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`);
    append(imageBytes);
    appendText("\nendstream\nendobj\n");
    const pageContent = "q\n841.89 0 0 595.28 0 0 cm\n/Im0 Do\nQ\n";
    addObject(5, `<< /Length ${encoder.encode(pageContent).length} >>\nstream\n${pageContent}endstream`);
    const crossReferenceOffset = byteLength;
    appendText(`xref\n0 6\n0000000000 65535 f \n`);
    for (let object = 1; object <= 5; object += 1) {
      appendText(`${String(offsets[object]).padStart(10, "0")} 00000 n \n`);
    }
    appendText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${crossReferenceOffset}\n%%EOF`);

    const pdf = new Blob(chunks, { type: "application/pdf" });
    const url = URL.createObjectURL(pdf);
    const link = document.createElement("a");
    link.href = url;
    link.download = "math-adventure-certificate.pdf";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  function exitGame() {
    window.clearInterval(timerInterval);
    languageSelect.disabled = false;
    currentQuestion = undefined;
    missedQuestions = [];
    show("start");
  }

  const numberQuestion = (prompt, answer, hint, explanationText, step = 1) => {
    const options = new Set([answer]);
    for (let offset = 1; options.size < 4; offset += 1) {
      options.add(answer + step * offset);
      if (options.size < 4) options.add(answer - step * offset);
    }
    return { prompt, answer, hint, explanation: explanationText, options: [...options] };
  };

  function createEnglishQuestion(selectedTopic) {
    if (selectedTopic === "ratios") {
      const first = rand(6);
      const second = rand(5) + 1;
      const scale = rand(4) + 1;
      const answer = first * scale;
      return numberQuestion(
        `A juice recipe uses a concentrate-to-water ratio of ${first}:${second}. How many cups of concentrate are needed for ${second * scale} cups of water?`,
        answer,
        "Find the scale factor by dividing the new water amount by the original amount, then scale the concentrate by the same factor.",
        `Scale factor = ${second * scale} ÷ ${second} = ${scale}. Concentrate = ${first} × ${scale} = ${answer} cups.`
      );
    }
    if (selectedTopic === "operations") {
      const operation = rand(3);
      const max = Math.pow(10, grade === "6" ? 2 : grade === "7" ? 3 : 4) - 1;
      let a = rand(max), b = rand(max), symbol, answer;
      if (operation === 1) {
        if (b > a) [a, b] = [b, a];
        symbol = "−"; answer = a - b;
      } else if (operation === 2) {
        a = rand(grade === "6" ? 90 : 900); b = rand(grade === "6" ? 9 : 12);
        symbol = "×"; answer = a * b;
      } else { symbol = "+"; answer = a + b; }
      return numberQuestion(
        `${a} ${symbol} ${b} = ?`, answer,
        operation === 2 ? "Multiply the ones first, then continue with the other place values." : "Line up the place values and work from right to left.",
        `${a} ${symbol} ${b} = ${answer}.`, 10
      );
    }
    if (selectedTopic === "fractions") {
      const denominator = rand(grade === "6" ? 4 : grade === "7" ? 6 : 8) + 1;
      const numerator = rand(denominator);
      const factor = rand(9) + 1;
      if (Math.random() < 0.5) {
        const whole = denominator * factor, answer = numerator * factor;
        return numberQuestion(
          `${numerator}/${denominator} × ${whole} = ?`, answer,
          "Write the whole number as a fraction with the same denominator, then simplify.",
          `${numerator}/${denominator} × ${whole}/1 = ${numerator} × ${factor} = ${answer}.`
        );
      }
      const top = numerator * factor;
      return numberQuestion(
        `${top}/${denominator} ÷ ${numerator}/${denominator} = ?`, factor,
        "Divide by multiplying the first fraction by the reciprocal of the second.",
        `${top}/${denominator} × ${denominator}/${numerator} = ${top} ÷ ${numerator} = ${factor}.`
      );
    }
    if (selectedTopic === "decimals") {
      const answer = rand(90) + 9, decimal = (answer / 100).toFixed(2);
      return numberQuestion(
        `Convert ${decimal} to a percentage.`, answer,
        "Multiply the decimal by 100, or move its decimal point two places to the right.",
        `${decimal} × 100 = ${answer}%.`, 10
      );
    }
    if (selectedTopic === "integers" || selectedTopic === "rational") {
      if (selectedTopic === "integers" && Math.random() < 0.5) {
        const x = rand(9) * (Math.random() < 0.5 ? -1 : 1);
        const y = rand(9) * (Math.random() < 0.5 ? -1 : 1);
        const quadrant = x > 0 ? (y > 0 ? 1 : 4) : (y > 0 ? 2 : 3);
        return { prompt: `Which quadrant contains the point (${x}, ${y})?`, answer: quadrant,
          hint: "The sign of the first coordinate tells left or right; the second tells down or up.",
          explanation: `The first coordinate is ${x > 0 ? "positive" : "negative"} and the second is ${y > 0 ? "positive" : "negative"}, so the point is in quadrant ${quadrant}.`,
          options: [1, 2, 3, 4] };
      }
      const a = rand(20) * (Math.random() < 0.5 ? -1 : 1);
      const b = rand(20) * (Math.random() < 0.5 ? -1 : 1);
      const answer = a + b;
      const hint = Math.sign(a) === Math.sign(b)
        ? "When signs match, add the absolute values and keep the common sign."
        : "When signs differ, subtract the smaller absolute value from the larger and keep the sign of the larger.";
      return numberQuestion(`${a} + (${b}) = ?`, answer, hint, `${a} + (${b}) = ${answer}.`);
    }
    if (selectedTopic === "algebra" || selectedTopic === "linear") {
      const answer = rand(20) + 1, offset = rand(12);
      if (Math.random() < 0.5) return numberQuestion(
        `Solve for x: x + ${offset} = ${answer + offset}`, answer,
        "Subtract the added number from both sides to isolate x.",
        `x = ${answer + offset} − ${offset} = ${answer}.`
      );
      const factor = rand(9) + 1;
      return numberQuestion(
        `Solve for x: ${factor}x = ${answer * factor}`, answer,
        "Divide both sides by the coefficient of x.",
        `x = ${answer * factor} ÷ ${factor} = ${answer}.`
      );
    }
    if (selectedTopic === "geometry") {
      const length = rand(12) + 2, width = rand(10) + 1;
      if (Math.random() < 0.5) return numberQuestion(
        `A rectangle is ${length} cm long and ${width} cm wide. What is its area?`,
        length * width, "Area of a rectangle = length × width.",
        `Area = ${length} × ${width} = ${length * width} cm².`
      );
      return numberQuestion(
        `A rectangle is ${length} cm long and ${width} cm wide. What is its perimeter?`,
        2 * (length + width), "Perimeter of a rectangle = 2 × (length + width).",
        `Perimeter = 2 × (${length} + ${width}) = ${2 * (length + width)} cm.`
      );
    }
    if (selectedTopic === "powers") {
      if (grade === "8" && Math.random() < 0.33) {
        const coefficient = rand(9) + 1, exponent = rand(5) + 1;
        const answer = coefficient * Math.pow(10, exponent);
        return numberQuestion(
          `Write ${coefficient} × 10^${exponent} in standard form.`, answer,
          "Move the decimal point in the coefficient to the right by the exponent's number of places.",
          `${coefficient} × 10^${exponent} = ${answer}.`, Math.pow(10, exponent)
        );
      }
      const base = rand(12) + 1;
      if (Math.random() < 0.5) return numberQuestion(
        `${base}² = ?`, base * base, "Squaring a number means multiplying it by itself.",
        `${base}² = ${base} × ${base} = ${base * base}.`
      );
      const root = rand(12) + 1, square = root * root;
      return numberQuestion(
        `√${square} = ?`, root, "A square root is the number that multiplies by itself to give the number under the radical.",
        `Since ${root} × ${root} = ${square}, √${square} = ${root}.`
      );
    }
    if (selectedTopic === "statistics") {
      if (Math.random() < 0.5) {
        const values = [rand(20), rand(20), rand(20), rand(20)];
        const sum = values.reduce((a, b) => a + b, 0);
        return numberQuestion(
          `Find the mean of: ${values.join(", ")}`, sum / values.length,
          "Add the four numbers, then divide the sum by 4.",
          `Sum = ${values.join(" + ")} = ${sum}. Mean = ${sum} ÷ 4 = ${sum / values.length}.`
        );
      }
      const favorable = rand(9) + 1;
      return numberQuestion(
        `A bag has ${favorable} red and ${10 - favorable} blue marbles. What is the probability of drawing red, as a percentage?`,
        favorable * 10, "Divide the favorable outcomes by the total outcomes, then multiply by 100%.",
        `Probability = ${favorable} ÷ 10 = ${favorable * 10}%.`, 10
      );
    }
    if (selectedTopic === "pythagorean") {
      const triples = [[3,4,5],[5,12,13],[6,8,10],[8,15,17]];
      const [a,b,c] = triples[rand(triples.length)-1];
      return numberQuestion(
        `A right triangle has legs ${a} cm and ${b} cm. What is the hypotenuse?`, c,
        "Use the Pythagorean theorem: hypotenuse² = leg₁² + leg₂².",
        `c² = ${a}² + ${b}² = ${c*c}, so c = ${c} cm.`
      );
    }
    if (selectedTopic === "volume") {
      const a=rand(9)+1,b=rand(8)+1,c=rand(7)+1,answer=a*b*c;
      return numberQuestion(
        `A rectangular prism is ${a} cm long, ${b} cm wide, and ${c} cm high. What is its volume?`,
        answer, "Volume of a rectangular prism = length × width × height.",
        `Volume = ${a} × ${b} × ${c} = ${answer} cm³.`
      );
    }
    if (selectedTopic === "transformations") {
      const x=rand(10)*(Math.random()<0.5?-1:1),y=rand(10)*(Math.random()<0.5?-1:1);
      const reflectX=Math.random()<0.5,answer=reflectX?-y:-x;
      return {prompt:reflectX?`Reflect (${x}, ${y}) over the x-axis. What is the new y-coordinate?`:`Reflect (${x}, ${y}) over the y-axis. What is the new x-coordinate?`,
        answer,hint:reflectX?"A reflection over the x-axis changes the sign of y.":"A reflection over the y-axis changes the sign of x.",
        explanation:reflectX?`The y-coordinate changes from ${y} to ${answer}.`:`The x-coordinate changes from ${x} to ${answer}.`,
        options:[...new Set([answer,answer+1,answer-1,answer+2])]};
    }
    return numberQuestion("What is 2 + 3?", 5, "Add the two numbers.", "2 + 3 = 5.");
  }

  function createQuestion() {
    const topicKeys = gradeTopics[grade].map(item => item.id);
    const selectedTopic = topic === "mixed" ? topicKeys[rand(topicKeys.length) - 1] : topic;
    let question;

    if (selectedTopic === "ratios") {
      const firstAmount = rand(6);
      const secondAmount = rand(5) + 1;
      const scale = rand(4) + 1;
      const newSecondAmount = secondAmount * scale;
      const answer = firstAmount * scale;
      question = numberQuestion(
        `في وصفة عصير، نسبة المركز إلى الماء هي ${arabic(firstAmount)} : ${arabic(secondAmount)}. كم كوباً من المركز نحتاج إلى ${arabic(newSecondAmount)} أكواب ماء؟`,
        answer,
        "أوجد معامل التكبير بقسمة كمية الماء الجديدة على كمية الماء الأصلية، ثم اضرب كمية المركز في المعامل نفسه.",
        `معامل التكبير = ${arabic(newSecondAmount)} ÷ ${arabic(secondAmount)} = ${arabic(scale)}. إذن كمية المركز = ${arabic(firstAmount)} × ${arabic(scale)} = ${arabic(answer)} أكواب.`
      );
    } else if (selectedTopic === "operations") {
      const operation = rand(3);
      const maxDigits = grade === "6" ? 2 : grade === "7" ? 3 : 4;
      const max = Math.pow(10, maxDigits) - 1;
      let a = rand(max);
      let b = rand(max);
      let answer;
      let symbol;
      if (operation === 1) {
        if (b > a) [a, b] = [b, a];
        symbol = "−";
        answer = a - b;
      } else if (operation === 2) {
        a = rand(grade === "6" ? 90 : 900);
        b = rand(grade === "6" ? 9 : 12);
        symbol = "×";
        answer = a * b;
      } else {
        symbol = "+";
        answer = a + b;
      }
      question = numberQuestion(
        `${arabic(a)} ${symbol} ${arabic(b)} = ؟`,
        answer,
        operation === 2 ? "اضرب الآحاد أولاً، ثم أكمل إلى الخانات الأكبر." : "رتّب الأعداد حسب القيمة المكانية، ثم أجرِ العملية من اليمين إلى اليسار.",
        `${arabic(a)} ${symbol} ${arabic(b)} = ${arabic(answer)}.`,
        10
      );
    } else if (selectedTopic === "fractions") {
      const denominator = rand(grade === "6" ? 4 : grade === "7" ? 6 : 8) + 1;
      const numerator = rand(denominator);
      const factor = rand(9) + 1;
      if (Math.random() < 0.5) {
        const whole = denominator * factor;
        const answer = numerator * factor;
        question = numberQuestion(
          `${arabic(numerator)}/${arabic(denominator)} × ${arabic(whole)} = ؟`,
          answer,
          "اكتب العدد الصحيح على صورة كسر مقامه يساوي مقام الكسر، ثم اختصر المقامين.",
          `${arabic(numerator)}/${arabic(denominator)} × ${arabic(whole)}/1 = ${arabic(numerator)} × ${arabic(factor)} = ${arabic(answer)}.`
        );
      } else {
        const top = numerator * factor;
        question = numberQuestion(
          `${arabic(top)}/${arabic(denominator)} ÷ ${arabic(numerator)}/${arabic(denominator)} = ؟`,
          factor,
          "اقسم بضرب الكسر الأول في مقلوب الكسر الثاني.",
          `${arabic(top)}/${arabic(denominator)} × ${arabic(denominator)}/${arabic(numerator)} = ${arabic(top)} ÷ ${arabic(numerator)} = ${arabic(factor)}.`
        );
      }
    } else if (selectedTopic === "decimals") {
      const value = rand(90) + 9;
      const decimal = (value / 100).toFixed(2);
      question = numberQuestion(
        `حوّل ${arabic(decimal)} إلى نسبة مئوية.`,
        value,
        "لتحويل العدد العشري إلى نسبة مئوية، اضربه في 100 أو حرّك الفاصلة منزلتين إلى اليمين.",
        `${arabic(decimal)} × 100 = ${arabic(value)}٪.`,
        10
      );
    } else if (selectedTopic === "rational") {
      const a = rand(20) * (Math.random() < 0.5 ? -1 : 1);
      const b = rand(20) * (Math.random() < 0.5 ? -1 : 1);
      const answer = a + b;
      question = numberQuestion(
        `${arabic(a)} + (${arabic(b)}) = ؟`,
        answer,
        Math.sign(a) === Math.sign(b)
          ? "عند جمع عددين لهما الإشارة نفسها، اجمع القيمتين المطلقين واحتفظ بالإشارة."
          : "عند اختلاف الإشارتين، اطرح القيمتين المطلقين وخذ إشارة العدد ذي القيمة المطلقة الأكبر.",
        `${arabic(a)} + (${arabic(b)}) = ${arabic(answer)}.`
      );
    } else if (selectedTopic === "linear") {
      const coefficient = rand(5) + 1;
      const answer = rand(15) + 1;
      const constant = rand(12);
      const result = coefficient * answer + constant;
      question = numberQuestion(
        `حل المعادلة: ${arabic(coefficient)}س + ${arabic(constant)} = ${arabic(result)}`,
        answer,
        `اطرح ${arabic(constant)} من الطرفين، ثم اقسم على معامل س ${arabic(coefficient)}.`,
        `س = (${arabic(result)} − ${arabic(constant)}) ÷ ${arabic(coefficient)} = ${arabic(answer)}.`
      );
    } else if (selectedTopic === "pythagorean") {
      const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];
      const [a, b, c] = triples[rand(triples.length) - 1];
      if (Math.random() < 0.5) {
        question = numberQuestion(
          `مثلث قائم ضلعاه القائمان ${arabic(a)} سم و${arabic(b)} سم. ما طول الوتر؟`,
          c,
          "استخدم نظرية فيثاغورس: مربع الوتر يساوي مجموع مربعي الضلعين القائمين.",
          `الوتر² = ${arabic(a)}² + ${arabic(b)}² = ${arabic(a * a + b * b)}؛ إذن طول الوتر ${arabic(c)} سم.`
        );
      } else {
        question = numberQuestion(
          `مثلث قائم وتره ${arabic(c)} سم وأحد ضلعيه القائمين ${arabic(a)} سم. ما طول الضلع القائم الآخر؟`,
          b,
          "اطرح مربع الضلع القائم المعروف من مربع الوتر، ثم أوجد الجذر التربيعي.",
          `الضلع² = ${arabic(c)}² − ${arabic(a)}² = ${arabic(c * c - a * a)}؛ إذن طول الضلع ${arabic(b)} سم.`
        );
      }
    } else if (selectedTopic === "volume") {
      const length = rand(9) + 1;
      const width = rand(8) + 1;
      const height = rand(7) + 1;
      const answer = length * width * height;
      question = numberQuestion(
        `منشور مستطيل طوله ${arabic(length)} سم وعرضه ${arabic(width)} سم وارتفاعه ${arabic(height)} سم. ما حجمه؟`,
        answer,
        "حجم المنشور المستطيل = الطول × العرض × الارتفاع.",
        `الحجم = ${arabic(length)} × ${arabic(width)} × ${arabic(height)} = ${arabic(answer)} سم³.`
      );
    } else if (selectedTopic === "transformations") {
      const x = rand(10) * (Math.random() < 0.5 ? -1 : 1);
      const y = rand(10) * (Math.random() < 0.5 ? -1 : 1);
      const reflectX = Math.random() < 0.5;
      const answer = reflectX ? -y : -x;
      question = {
        prompt: reflectX
          ? `انعكست النقطة (${arabic(x)}، ${arabic(y)}) حول محور السينات. ما الإحداثي الصادي الجديد؟`
          : `انعكست النقطة (${arabic(x)}، ${arabic(y)}) حول محور الصادات. ما الإحداثي السيني الجديد؟`,
        answer,
        hint: reflectX
          ? "عند الانعكاس حول محور السينات، تبقى س كما هي وتتغير إشارة ص."
          : "عند الانعكاس حول محور الصادات، تبقى ص كما هي وتتغير إشارة س.",
        explanation: reflectX
          ? `يتغير الإحداثي الصادي من ${arabic(y)} إلى ${arabic(answer)}.`
          : `يتغير الإحداثي السيني من ${arabic(x)} إلى ${arabic(answer)}.`,
        options: [...new Set([answer, answer + 1, answer - 1, answer + 2])]
      };
    } else if (selectedTopic === "algebra") {
      const answer = rand(20) + 1;
      const offset = rand(12);
      const operation = rand(3);
      if (operation === 1) {
        question = numberQuestion(
          `أوجد س: س + ${arabic(offset)} = ${arabic(answer + offset)}`,
          answer,
          "اطرح العدد المضاف من طرفي المعادلة لعزل س.",
          `نطرح ${arabic(offset)} من الطرفين: س = ${arabic(answer + offset)} − ${arabic(offset)} = ${arabic(answer)}.`
        );
      } else if (operation === 2) {
        question = numberQuestion(
          `أوجد س: س − ${arabic(offset)} = ${arabic(answer - offset)}`,
          answer,
          "أضف العدد المطروح إلى طرفي المعادلة لعزل س.",
          `نضيف ${arabic(offset)} إلى الطرفين: س = ${arabic(answer - offset)} + ${arabic(offset)} = ${arabic(answer)}.`
        );
      } else {
        const factor = rand(9) + 1;
        question = numberQuestion(
          `أوجد س: ${arabic(factor)}س = ${arabic(answer * factor)}`,
          answer,
          "اقسم طرفي المعادلة على معامل س.",
          `س = ${arabic(answer * factor)} ÷ ${arabic(factor)} = ${arabic(answer)}.`
        );
      }
    } else if (selectedTopic === "geometry") {
      const length = rand(12) + 2;
      const width = rand(10) + 1;
      if (Math.random() < 0.5) {
        const answer = length * width;
        question = numberQuestion(
          `مستطيل طوله ${arabic(length)} سم وعرضه ${arabic(width)} سم. ما مساحته؟`,
          answer,
          "مساحة المستطيل = الطول × العرض.",
          `المساحة = ${arabic(length)} × ${arabic(width)} = ${arabic(answer)} سم².`
        );
      } else {
        const answer = 2 * (length + width);
        question = numberQuestion(
          `مستطيل طوله ${arabic(length)} سم وعرضه ${arabic(width)} سم. ما محيطه؟`,
          answer,
          "محيط المستطيل = 2 × (الطول + العرض).",
          `المحيط = 2 × (${arabic(length)} + ${arabic(width)}) = ${arabic(answer)} سم.`
        );
      }
    } else if (selectedTopic === "powers") {
      const base = rand(12) + 1;
      if (grade === "8" && Math.random() < 0.33) {
        const coefficient = rand(9) + 1;
        const exponent = rand(5) + 1;
        const answer = coefficient * Math.pow(10, exponent);
        question = numberQuestion(
          `اكتب ${arabic(coefficient)} × 10^${arabic(exponent)} بالصورة القياسية.`,
          answer,
          "حرّك الفاصلة العشرية في المعامل إلى اليمين بعدد المنازل الذي يحدده الأس.",
          `${arabic(coefficient)} × 10^${arabic(exponent)} = ${arabic(answer)}.`,
          Math.pow(10, exponent)
        );
      } else if (Math.random() < 0.5) {
        const answer = base * base;
        question = numberQuestion(
          `${arabic(base)}² = ؟`,
          answer,
          "الأس 2 يعني ضرب العدد في نفسه.",
          `${arabic(base)}² = ${arabic(base)} × ${arabic(base)} = ${arabic(answer)}.`
        );
      } else {
        const root = rand(12) + 1;
        const square = root * root;
        question = numberQuestion(
          `√${arabic(square)} = ؟`,
          root,
          "الجذر التربيعي هو العدد الذي إذا ضُرب في نفسه أعطى العدد داخل الجذر.",
          `لأن ${arabic(root)} × ${arabic(root)} = ${arabic(square)}، فإن √${arabic(square)} = ${arabic(root)}.`
        );
      }
    } else if (selectedTopic === "statistics") {
      if (Math.random() < 0.5) {
        const values = [rand(20), rand(20), rand(20), rand(20)];
        const answer = values.reduce((sum, value) => sum + value, 0) / values.length;
        question = numberQuestion(
          `أوجد المتوسط الحسابي للأعداد: ${values.map(arabic).join("، ")}`,
          answer,
          "اجمع الأعداد الأربعة ثم اقسم المجموع على 4.",
          `المجموع = ${values.map(arabic).join(" + ")} = ${arabic(answer * values.length)}. المتوسط = ${arabic(answer * values.length)} ÷ 4 = ${arabic(answer)}.`
        );
      } else {
        const favorable = rand(9) + 1;
        const totalOutcomes = 10;
        const answer = favorable * 10;
        question = numberQuestion(
          `كيس فيه ${arabic(favorable)} كرات حمراء و${arabic(totalOutcomes - favorable)} زرقاء. ما احتمال سحب كرة حمراء كنسبة مئوية؟`,
          answer,
          "الاحتمال = عدد النتائج المطلوبة ÷ عدد النتائج الكلي، ثم اضرب في 100٪.",
          `الاحتمال = ${arabic(favorable)} ÷ ${arabic(totalOutcomes)} = ${arabic(answer)}٪.`,
          10
        );
      }
    } else if (selectedTopic === "integers" && Math.random() < 0.5) {
      const x = rand(9) * (Math.random() < 0.5 ? -1 : 1);
      const y = rand(9) * (Math.random() < 0.5 ? -1 : 1);
      const quadrant = x > 0 ? (y > 0 ? 1 : 4) : (y > 0 ? 2 : 3);
      const xDirection = x > 0 ? "موجب" : "سالب";
      const yDirection = y > 0 ? "موجب" : "سالب";
      question = {
        prompt: `في أي رُبع تقع النقطة (${arabic(x)}، ${arabic(y)})؟`,
        answer: quadrant,
        hint: "إشارة الإحداثي الأول تحدد اليمين أو اليسار، وإشارة الثاني تحدد الأعلى أو الأسفل.",
        explanation: `الإحداثي الأول ${xDirection} والثاني ${yDirection}؛ لذلك تقع النقطة في الربع ${arabic(quadrant)}.`,
        options: [1, 2, 3, 4]
      };
    } else {
      const a = rand(20) * (Math.random() < 0.5 ? -1 : 1);
      const b = rand(20) * (Math.random() < 0.5 ? -1 : 1);
      const answer = a + b;
      const hint = Math.sign(a) === Math.sign(b)
        ? "إذا كان العددان بالإشارة نفسها، اجمع قيمتيهما المطلقتين واحتفظ بالإشارة."
        : "إذا اختلفت الإشارتان، اطرح القيمة المطلقة الأصغر من الأكبر وخذ إشارة العدد ذي القيمة المطلقة الأكبر.";
      question = numberQuestion(
        `${arabic(a)} + (${arabic(b)}) = ؟`,
        answer,
        hint,
        `نجمع ${arabic(a)} و(${arabic(b)}) فنحصل على ${arabic(answer)}.`
      );
    }

    if (language === "en") question = createEnglishQuestion(selectedTopic);
    question.topicId = selectedTopic;
    currentQuestion = question;
    correct = question.answer;
    document.getElementById("question-label").textContent = text().questionLabel(selectedTopic);
    document.getElementById("question").textContent = question.prompt;
    answers.replaceChildren();
    question.options.sort(() => Math.random() - 0.5).forEach(value => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.dataset.answer = String(value);
      button.textContent = arabic(value);
      button.setAttribute("aria-label", text().answerLabel(arabic(value)));
      button.addEventListener("click", () => choose(button, value));
      answers.append(button);
    });
    feedback.textContent = "";
    feedback.className = "feedback";
    explanation.hidden = true;
    explanation.textContent = "";
    hintText.hidden = true;
    hintText.textContent = "";
    hintButton.disabled = false;
    next.hidden = true;
    locked = false;
  }

  function choose(button, value) {
    if (locked) return;
    locked = true;
    answers.querySelectorAll("button").forEach(option => {
      option.disabled = true;
      if (Number(option.dataset.answer) === correct) {
        option.classList.add("correct");
      }
    });
    if (value === correct) {
      correctAnswers += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      const bonus = streak % 3 === 0 ? 5 : 0;
      score += 10 + bonus;
      document.getElementById("score").textContent = arabic(score);
      document.getElementById("streak").textContent = arabic(streak);
      feedback.textContent = bonus
        ? language === "ar"
          ? `إجابة صحيحة! سلسلة ${streak} إجابات — مكافأة ${bonus} نقاط! 🔥`
          : `Correct! ${streak} in a row — ${bonus} bonus points! 🔥`
        : text().rightAnswer;
      feedback.classList.add("good");
    } else {
      streak = 0;
      document.getElementById("streak").textContent = arabic(streak);
      button.classList.add("wrong");
      currentQuestion.wasCorrect = false;
      missedQuestions.push({ prompt: currentQuestion.prompt, answer: correct });
      feedback.textContent = text().wrongAnswer(correct);
      feedback.classList.add("bad");
    }
    if (value === correct) currentQuestion.wasCorrect = true;
    explanation.textContent = text().explanation(currentQuestion.explanation);
    explanation.hidden = false;
    hintButton.disabled = true;
    next.textContent = text().next(turn === total - 1);
    next.hidden = false;
  }

  function loadQuestion() {
    document.getElementById("count").textContent = text().countLabel(turn + 1, total);
    const progress = document.getElementById("progress");
    progress.setAttribute("aria-valuemax", String(total));
    progress.setAttribute("aria-valuenow", String(turn));
    document.getElementById("fill").style.width = `${turn / total * 100}%`;
    createQuestion();
  }

  function startGame() {
    languageSelect.disabled = true;
    total = Number(document.getElementById("question-count").value);
    turn = 0;
    score = 0;
    correctAnswers = 0;
    missedQuestions = [];
    streak = 0;
    bestStreak = 0;
    completedSeconds = 0;
    storageWarning = false;
    startedAt = Date.now();
    window.clearInterval(timerInterval);
    document.getElementById("timer").textContent = formatTime(0);
    timerInterval = window.setInterval(() => {
      document.getElementById("timer").textContent =
        formatTime(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    document.getElementById("score").textContent = arabic(score);
    document.getElementById("streak").textContent = arabic(streak);
    document.getElementById("record-result").textContent = "";
    document.getElementById("share-status").textContent = "";
    document.getElementById("missed-review").hidden = true;
    const progress = document.getElementById("progress");
    progress.setAttribute("aria-valuemax", String(total));
    progress.setAttribute("aria-valuenow", "0");
    show("game");
    loadQuestion();
  }

  function finishGame() {
    window.clearInterval(timerInterval);
    completedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    const name = document.getElementById("player-name").value.trim();
    const greeting = name ? (language === "ar" ? `يا ${name}، ` : `${name}, `) : "";
    const perfectScore = total * 10 + Math.floor(total / 3) * 5;
    const previousRecord = readRecord();
    const record = saveRecord();
    const isNewRecord = !previousRecord || record?.score > previousRecord.score ||
      (record?.score === previousRecord.score && record?.seconds < previousRecord.seconds);
    show("result");
    document.getElementById("fill").style.width = "100%";
    document.getElementById("progress").setAttribute("aria-valuenow", String(total));
    renderResultMessage(greeting, perfectScore);
    document.getElementById("final").textContent =
      text().finalScore(score, bestStreak, formatTime(completedSeconds));
    if (record && !storageWarning) {
      document.getElementById("record-result").textContent =
        text().recordSaved(isNewRecord ? text().newRecord : text().bestRecord, record.score, formatTime(record.seconds));
    }
    renderMissedQuestions();
    updateCertificate();
  }

  function renderResultMessage(greeting = "", perfectScore = total * 10 + Math.floor(total / 3) * 5) {
    if (score >= perfectScore) {
      document.getElementById("badge").textContent = "🏆";
      document.getElementById("result-title").textContent = text().perfectTitle(greeting, localizedGrade());
      document.getElementById("message").textContent = text().perfectMessage;
    } else if (score >= total * 5) {
      document.getElementById("badge").textContent = "🌟";
      document.getElementById("result-title").textContent = text().greatTitle(greeting, localizedGrade());
      document.getElementById("message").textContent = text().greatMessage;
    } else {
      document.getElementById("badge").textContent = "💪";
      document.getElementById("result-title").textContent = text().tryTitle(greeting, localizedGrade());
      document.getElementById("message").textContent = text().tryMessage;
    }
  }

  document.getElementById("grade-select").addEventListener("change", updateGradeView);
  document.getElementById("language-select").addEventListener("change", applyLanguage);
  document.getElementById("question-count").addEventListener("change", updateRecordPreview);
  hintButton.addEventListener("click", () => {
    hintText.textContent = text().hint(currentQuestion.hint);
    hintText.hidden = false;
    hintButton.disabled = true;
  });
  document.getElementById("start-button").addEventListener("click", startGame);
  document.getElementById("exit-button").addEventListener("click", exitGame);
  next.addEventListener("click", () => {
    turn += 1;
    if (turn === total) finishGame();
    else loadQuestion();
  });
  document.getElementById("restart").addEventListener("click", () => {
    languageSelect.disabled = false;
    show("start");
  });
  document.getElementById("share-result").addEventListener("click", async () => {
    const name = document.getElementById("player-name").value.trim();
    const label = localizedTopic(topic);
    const result = language === "ar"
      ? `${name ? `${name} — ` : ""}${localizedGrade()} — ${label}: ${score} نقطة من ${total} سؤالاً، في ${formatTime(completedSeconds)}.`
      : `${name ? `${name} — ` : ""}${localizedGrade()} — ${label}: ${score} points out of ${total} questions, in ${formatTime(completedSeconds)}.`;
    try {
      await navigator.clipboard.writeText(result);
      document.getElementById("share-status").textContent = text().resultCopied;
    } catch {
      document.getElementById("share-status").textContent = text().copyError;
    }
  });
  document.getElementById("copy-certificate").addEventListener("click", async () => {
    const status = document.getElementById("share-status");
    try {
      await navigator.clipboard.writeText(certificateText());
      status.textContent = text().copySuccess;
    } catch {
      const copyField = document.createElement("textarea");
      copyField.value = certificateText();
      copyField.setAttribute("readonly", "");
      copyField.style.position = "fixed";
      copyField.style.opacity = "0";
      document.body.append(copyField);
      copyField.select();
      const copied = document.execCommand("copy");
      copyField.remove();
      status.textContent = copied ? text().copySuccess : text().copyFallback;
    }
  });
  document.getElementById("download-certificate").addEventListener("click", downloadCertificate);
  applyLanguage();
  updateGradeView();
  updateRecordPreview();
})();
