let questions = [ // 建立測驗題目陣列
  { // 建立第一題物件
    question: "在 p5.js 中，哪一個指令可以建立畫布？", // 設定第一題題目
    options: ["createCanvas()", "drawCanvas()", "makeCanvas()", "canvasCreate()"], // 設定第一題選項
    answer: 0 // 設定第一題正確答案索引
  }, // 結束第一題物件
  { // 建立第二題物件
    question: "在 p5.js 中，哪一個指令可以設定背景顏色？", // 設定第二題題目
    options: ["color()", "background()", "fillColor()", "setBackground()"], // 設定第二題選項
    answer: 1 // 設定第二題正確答案索引
  }, // 建立第三題物件
  { // 建立第三題物件
    question: "在 p5.js 中，哪一個指令可以畫出圓形？", // 設定第三題題目
    options: ["circle()", "ellipse()", "round()", "drawCircle()"], // 設定第三題選項
    answer: 1 // 設定第三題正確答案索引
  }, // 結束第三題物件
  { // 建立第四題物件
    question: "在 p5.js 中，哪一個指令可以設定圖形填色？", // 設定第四題題目
    options: ["stroke()", "lineColor()", "fill()", "paint()"], // 設定第四題選項
    answer: 2 // 設定第四題正確答案索引
  }, // 結束第四題物件
  { // 建立第五題物件
    question: "p5.js 中的 draw() 函式通常會如何執行？", // 設定第五題題目
    options: ["只執行一次", "每秒執行一次", "持續重複執行", "只有按滑鼠才執行"], // 設定第五題選項
    answer: 2 // 設定第五題正確答案索引
  } // 結束第五題物件
]; // 結束題目陣列

let currentQuestion = 0; // 設定目前題目編號
let score = 0; // 設定目前答對題數
let selectedOption = -1; // 設定目前選擇的選項
let answered = false; // 設定目前題目是否已作答
let quizFinished = false; // 設定測驗是否已完成
let feedbackMessage = ""; // 設定回饋文字
let feedbackColor = "#183B56"; // 設定回饋文字顏色
let nextButton; // 建立下一題按鈕變數
let restartButton; // 建立重新開始按鈕變數
let animationTime = 0; // 設定動畫時間
let layout = {}; // 建立響應式版面設定物件

function setup() { // 建立 p5.js 初始化函式
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布
  pixelDensity(1); // 降低高解析度裝置的繪圖負擔
  textFont("Arial"); // 設定主要文字字型
  textAlign(CENTER, CENTER); // 設定文字水平與垂直置中
  createInterfaceButtons(); // 建立網頁按鈕
  calculateResponsiveLayout(); // 計算響應式版面配置
  updateButtonState(); // 更新按鈕狀態
} // 結束 setup 函式

function draw() { // 建立 p5.js 每一幀執行的函式
  background("#F5F7FA"); // 設定畫布背景顏色
  animationTime += 0.08; // 增加動畫時間
  calculateResponsiveLayout(); // 持續檢查並更新響應式版面

  if (quizFinished) { // 判斷測驗是否已經結束
    drawResultPage(); // 繪製測驗結果畫面
  } else { // 如果測驗尚未結束
    drawQuizPage(); // 繪製測驗作答畫面
  } // 結束畫面狀態判斷
} // 結束 draw 函式

function calculateResponsiveLayout() { // 建立計算響應式版面的函式
  let isPortrait = height >= width; // 判斷裝置是否為直向
  let isSmallPhone = width <= 480; // 判斷是否為小型手機
  let isTablet = width > 480 && width <= 1024; // 判斷是否為平板裝置
  let horizontalPadding = isSmallPhone ? 16 : isTablet ? 28 : 40; // 設定左右邊距
  let availableWidth = width - horizontalPadding * 2; // 計算可用寬度
  let contentWidth = min(900, availableWidth); // 設定內容最大寬度

  if (isSmallPhone && isPortrait) { // 判斷是否為小型手機直向
    layout.titleSize = 25; // 設定手機直向標題大小
    layout.subtitleSize = 15; // 設定手機直向副標題大小
    layout.questionSize = 19; // 設定手機直向題目大小
    layout.optionSize = 16; // 設定手機直向選項大小
    layout.optionHeight = 58; // 設定手機直向選項高度
    layout.optionGap = 11; // 設定手機直向選項間距
    layout.topTitle = 55; // 設定手機直向標題位置
    layout.questionY = 145; // 設定手機直向題目位置
    layout.optionStartY = 235; // 設定手機直向選項起始位置
    layout.feedbackY = height - 70; // 設定手機直向回饋位置
  } else if (isSmallPhone && !isPortrait) { // 判斷是否為小型手機橫向
    layout.titleSize = 23; // 設定手機橫向標題大小
    layout.subtitleSize = 14; // 設定手機橫向副標題大小
    layout.questionSize = 17; // 設定手機橫向題目大小
    layout.optionSize = 14; // 設定手機橫向選項大小
    layout.optionHeight = 42; // 設定手機橫向選項高度
    layout.optionGap = 7; // 設定手機橫向選項間距
    layout.topTitle = 35; // 設定手機橫向標題位置
    layout.questionY = 88; // 設定手機橫向題目位置
    layout.optionStartY = 130; // 設定手機橫向選項起始位置
    layout.feedbackY = height - 26; // 設定手機橫向回饋位置
  } else if (isTablet) { // 判斷是否為平板
    layout.titleSize = 34; // 設定平板標題大小
    layout.subtitleSize = 19; // 設定平板副標題大小
    layout.questionSize = 24; // 設定平板題目大小
    layout.optionSize = 20; // 設定平板選項大小
    layout.optionHeight = isPortrait ? 66 : 58; // 設定平板選項高度
    layout.optionGap = 14; // 設定平板選項間距
    layout.topTitle = isPortrait ? 72 : 45; // 設定平板標題位置
    layout.questionY = isPortrait ? 190 : 125; // 設定平板題目位置
    layout.optionStartY = isPortrait ? 300 : 185; // 設定平板選項起始位置
    layout.feedbackY = height - 82; // 設定平板回饋位置
  } else { // 如果是桌上型電腦或大型螢幕
    layout.titleSize = min(42, width * 0.04); // 設定電腦標題大小
    layout.subtitleSize = 22; // 設定電腦副標題大小
    layout.questionSize = min(30, width * 0.03); // 設定電腦題目大小
    layout.optionSize = min(24, width * 0.024); // 設定電腦選項大小
    layout.optionHeight = 66; // 設定電腦選項高度
    layout.optionGap = 16; // 設定電腦選項間距
    layout.topTitle = height * 0.11; // 設定電腦標題位置
    layout.questionY = height * 0.25; // 設定電腦題目位置
    layout.optionStartY = height * 0.40; // 設定電腦選項起始位置
    layout.feedbackY = height * 0.88; // 設定電腦回饋位置
  } // 結束裝置類型判斷

  layout.contentWidth = contentWidth; // 儲存內容區域寬度
  layout.left = width / 2 - contentWidth / 2; // 儲存內容區域左側位置
  layout.right = width / 2 + contentWidth / 2; // 儲存內容區域右側位置
  layout.isPortrait = isPortrait; // 儲存目前畫面方向
  layout.isSmallPhone = isSmallPhone; // 儲存是否為小型手機
} // 結束計算響應式版面函式

function drawQuizPage() { // 建立繪製測驗畫面的函式
  let questionData = questions[currentQuestion]; // 取得目前題目資料

  fill("#183B56"); // 設定主標題顏色
  textSize(layout.titleSize); // 設定主標題大小
  text("p5.js 程式設計小測驗", width / 2, layout.topTitle); // 顯示主標題

  fill("#52758D"); // 設定題號文字顏色
  textSize(layout.subtitleSize); // 設定題號文字大小
  text(`第 ${currentQuestion + 1} 題 / 共 ${questions.length} 題`, width / 2, layout.topTitle + layout.titleSize + 18); // 顯示題號

  fill("#203040"); // 設定題目文字顏色
  textSize(layout.questionSize); // 設定題目文字大小
  text(questionData.question, width / 2, layout.questionY, layout.contentWidth, layout.questionSize * 3); // 顯示目前題目

  for (let i = 0; i < questionData.options.length; i++) { // 逐一處理每一個選項
    let optionY = layout.optionStartY + i * (layout.optionHeight + layout.optionGap); // 計算選項垂直位置
    drawResponsiveOption(questionData.options[i], i, optionY); // 繪製響應式選項
  } // 結束選項繪製迴圈

  if (answered) { // 判斷使用者是否已經作答
    fill(feedbackColor); // 設定回饋文字顏色
    textSize(layout.optionSize); // 設定回饋文字大小
    text(feedbackMessage, width / 2, layout.feedbackY, layout.contentWidth, layout.optionSize * 2); // 顯示回饋文字
  } // 結束作答判斷
} // 結束繪製測驗畫面函式

function drawResponsiveOption(optionText, optionIndex, baseY) { // 建立繪製響應式選項函式
  let offsetX = 0; // 設定水平動畫位移
  let offsetY = 0; // 設定垂直動畫位移
  let backgroundColor = "#FFFFFF"; // 設定選項預設背景顏色
  let borderColor = "#8BA7B8"; // 設定選項預設邊框顏色
  let textColor = "#183B56"; // 設定選項預設文字顏色
  let correctAnswer = questions[currentQuestion].answer; // 取得目前題目的正確答案

  if (answered && selectedOption !== correctAnswer && optionIndex === correctAnswer) { // 判斷是否顯示正確答案動畫
    backgroundColor = "#EBF2FA"; // 設定正確答案背景顏色
    borderColor = "#4A90B8"; // 設定正確答案邊框顏色
    offsetY = sin(animationTime * 3) * (layout.isSmallPhone ? 5 : 8); // 讓正確答案上下跳動
  } // 結束正確答案動畫判斷

  if (answered && selectedOption !== correctAnswer && optionIndex === selectedOption) { // 判斷是否顯示錯誤答案動畫
    backgroundColor = "#D00000"; // 設定錯誤答案背景顏色
    borderColor = "#960000"; // 設定錯誤答案邊框顏色
    textColor = "#FFFFFF"; // 設定錯誤答案文字顏色
    offsetX = sin(animationTime * 5) * (layout.isSmallPhone ? 6 : 10); // 讓錯誤答案左右移動
  } // 結束錯誤答案動畫判斷

  if (answered && selectedOption === correctAnswer && optionIndex === selectedOption) { // 判斷使用者是否答對
    backgroundColor = "#B7E4C7"; // 設定答對選項背景顏色
    borderColor = "#2D8A54"; // 設定答對選項邊框顏色
  } // 結束答對選項判斷

  push(); // 儲存目前繪圖設定
  translate(offsetX, offsetY); // 套用動畫位移
  rectMode(CENTER); // 設定矩形以中心點繪製
  fill(backgroundColor); // 設定矩形填色
  stroke(borderColor); // 設定矩形邊框顏色
  strokeWeight(2); // 設定矩形邊框粗細
  rect(width / 2, baseY, layout.contentWidth, layout.optionHeight, 12); // 繪製選項矩形
  fill(textColor); // 設定選項文字顏色
  noStroke(); // 移除文字邊框
  textSize(layout.optionSize); // 設定選項文字大小
  text(`${String.fromCharCode(65 + optionIndex)}. ${optionText}`, width / 2, baseY, layout.contentWidth * 0.88, layout.optionHeight * 0.8); // 顯示選項文字
  pop(); // 還原繪圖設定
} // 結束繪製響應式選項函式

function drawResultPage() { // 建立繪製結果畫面的函式
  let titleY = height * 0.28; // 設定結果標題位置
  let scoreY = height * 0.45; // 設定成績位置
  let messageY = height * 0.58; // 設定鼓勵文字位置

  fill("#183B56"); // 設定結果標題顏色
  textSize(min(layout.titleSize * 1.25, 48)); // 設定結果標題大小
  text("測驗完成！", width / 2, titleY); // 顯示測驗完成文字

  fill("#2D8A54"); // 設定成績文字顏色
  textSize(min(layout.titleSize * 1.15, 42)); // 設定成績文字大小
  text(`你答對了 ${score} / ${questions.length} 題`, width / 2, scoreY); // 顯示答對題數

  fill("#52758D"); // 設定鼓勵文字顏色
  textSize(layout.optionSize); // 設定鼓勵文字大小
  text(getResultMessage(), width / 2, messageY, layout.contentWidth, layout.optionSize * 3); // 顯示鼓勵文字
} // 結束繪製結果畫面函式

function getResultMessage() { // 建立取得測驗結果訊息函式
  if (score === questions.length) { // 判斷是否答對全部題目
    return "太厲害了！你已經熟悉這些 p5.js 基礎指令！"; // 回傳滿分訊息
  } // 結束滿分判斷

  if (score >= 3) { // 判斷是否答對三題以上
    return "表現很好！再練習一下就能全部答對！"; // 回傳良好表現訊息
  } // 結束三題以上判斷

  return "繼續加油！多練習 p5.js 指令會越來越熟悉！"; // 回傳一般鼓勵訊息
} // 結束取得測驗結果訊息函式

function mousePressed() { // 建立滑鼠按下事件函式
  if (quizFinished || answered) { // 判斷測驗是否結束或已經作答
    return; // 停止處理滑鼠事件
  } // 結束狀態判斷

  let clickedIndex = getClickedOptionIndex(mouseX, mouseY); // 取得被點擊的選項編號

  if (clickedIndex !== -1) { // 判斷是否點擊有效選項
    selectedOption = clickedIndex; // 記錄使用者選擇的選項
    answered = true; // 設定目前題目已作答

    if (selectedOption === questions[currentQuestion].answer) { // 判斷使用者是否答對
      score++; // 增加答對題數
      feedbackMessage = "答對了！做得很好！"; // 設定答對回饋文字
      feedbackColor = "#2D8A54"; // 設定答對回饋顏色
    } else { // 如果使用者答錯
      feedbackMessage = "答錯了！請觀察跳動的正確答案。"; // 設定答錯回饋文字
      feedbackColor = "#D00000"; // 設定答錯回饋顏色
    } // 結束答題結果判斷

    updateButtonState(); // 更新按鈕狀態
  } // 結束有效點擊判斷
} // 結束滑鼠按下事件函式

function getClickedOptionIndex(x, y) { // 建立取得點擊選項函式
  for (let i = 0; i < 4; i++) { // 逐一檢查四個選項
    let optionCenterY = layout.optionStartY + i * (layout.optionHeight + layout.optionGap); // 計算選項中心位置
    let optionTop = optionCenterY - layout.optionHeight / 2; // 計算選項上方位置
    let optionBottom = optionCenterY + layout.optionHeight / 2; // 計算選項下方位置

    if (x >= layout.left && x <= layout.right && y >= optionTop && y <= optionBottom) { // 判斷滑鼠是否位於選項內
      return i; // 回傳選項索引
    } // 結束點擊範圍判斷
  } // 結束選項檢查迴圈

  return -1; // 回傳未點擊任何選項
} // 結束取得點擊選項函式

function createInterfaceButtons() { // 建立介面按鈕函式
  nextButton = createButton("請先選擇答案"); // 建立下一題按鈕
  nextButton.mousePressed(goToNextQuestion); // 設定下一題按鈕事件
  styleButton(nextButton); // 套用下一題按鈕樣式

  restartButton = createButton("重新開始測驗"); // 建立重新開始按鈕
  restartButton.mousePressed(restartQuiz); // 設定重新開始按鈕事件
  styleButton(restartButton); // 套用重新開始按鈕樣式
} // 結束建立介面按鈕函式

function styleButton(button) { // 建立設定按鈕樣式函式
  button.style("font-size", "18px"); // 設定按鈕文字大小
  button.style("border", "none"); // 移除按鈕邊框
  button.style("border-radius", "10px"); // 設定按鈕圓角
  button.style("cursor", "pointer"); // 設定滑鼠指標樣式
  button.style("padding", "8px 16px"); // 設定按鈕內距
  button.style("min-height", "44px"); // 設定按鈕最小高度
  button.style("touch-action", "manipulation"); // 改善觸控裝置操作
} // 結束設定按鈕樣式函式

function updateButtonState() { // 建立更新按鈕狀態函式
  let buttonWidth = layout.isSmallPhone ? min(width * 0.72, 240) : 220; // 計算按鈕寬度
  let buttonHeight = layout.isSmallPhone ? 46 : 50; // 計算按鈕高度

  nextButton.size(buttonWidth, buttonHeight); // 設定下一題按鈕尺寸
  restartButton.size(buttonWidth, buttonHeight); // 設定重新開始按鈕尺寸

  if (quizFinished) { // 判斷測驗是否已結束
    nextButton.hide(); // 隱藏下一題按鈕
    restartButton.show(); // 顯示重新開始按鈕
    restartButton.position(width / 2 - buttonWidth / 2, height * 0.70); // 設定重新開始按鈕位置
    restartButton.style("background-color", "#4A90B8"); // 設定重新開始按鈕背景顏色
    restartButton.style("color", "#FFFFFF"); // 設定重新開始按鈕文字顏色
    return; // 結束按鈕更新函式
  } // 結束測驗完成判斷

  restartButton.hide(); // 隱藏重新開始按鈕
  nextButton.show(); // 顯示下一題按鈕
  nextButton.position(width / 2 - buttonWidth / 2, height - buttonHeight - 18); // 將下一題按鈕固定在畫面下方

  if (answered) { // 判斷目前題目是否已作答
    nextButton.html(currentQuestion === questions.length - 1 ? "查看測驗結果" : "下一題"); // 設定下一題按鈕文字
    nextButton.style("background-color", "#4A90B8"); // 設定啟用時背景顏色
    nextButton.style("color", "#FFFFFF"); // 設定啟用時文字顏色
    nextButton.style("pointer-events", "auto"); // 啟用按鈕點擊功能
  } else { // 如果尚未作答
    nextButton.html("請先選擇答案"); // 設定尚未作答時文字
    nextButton.style("background-color", "#B9C5CC"); // 設定停用時背景顏色
    nextButton.style("color", "#FFFFFF"); // 設定停用時文字顏色
    nextButton.style("pointer-events", "none"); // 停用按鈕點擊功能
  } // 結束按鈕狀態判斷
} // 結束更新按鈕狀態函式

function goToNextQuestion() { // 建立前往下一題函式
  if (!answered) { // 判斷使用者是否尚未作答
    return; // 尚未作答時不進入下一題
  } // 結束尚未作答判斷

  if (currentQuestion < questions.length - 1) { // 判斷是否仍有下一題
    currentQuestion++; // 題目編號增加一題
    selectedOption = -1; // 清除選項選擇
    answered = false; // 設定新題目尚未作答
    feedbackMessage = ""; // 清除回饋文字
    animationTime = 0; // 重設動畫時間
  } else { // 如果目前是最後一題
    quizFinished = true; // 設定測驗完成
  } // 結束題目切換判斷

  updateButtonState(); // 更新按鈕狀態
} // 結束前往下一題函式

function restartQuiz() { // 建立重新開始測驗函式
  currentQuestion = 0; // 回到第一題
  score = 0; // 將分數歸零
  selectedOption = -1; // 清除選項選擇
  answered = false; // 設定尚未作答
  quizFinished = false; // 設定測驗尚未完成
  feedbackMessage = ""; // 清除回饋文字
  animationTime = 0; // 重設動畫時間
  updateButtonState(); // 更新按鈕狀態
} // 結束重新開始測驗函式

function windowResized() { // 建立視窗大小改變事件函式
  resizeCanvas(windowWidth, windowHeight); // 讓畫布符合新的視窗大小
  calculateResponsiveLayout(); // 重新計算響應式版面
  updateButtonState(); // 重新設定按鈕位置與尺寸
} // 結束視窗大小改變事件函式

function touchStarted() { // 建立觸控開始事件函式
  return false; // 防止手機瀏覽器觸控時產生額外捲動
} // 結束觸控開始事件函式