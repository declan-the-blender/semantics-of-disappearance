// 塔罗牌数据
const tarotCards = [
    { id: 0, name: "愚者", image: "major_arcana/m00.jpg", hint: "代表新的开始、冒险和无限可能。我将开始一段新的旅程或做出一个大胆的决定。" },
    { id: 1, name: "魔术师", image: "major_arcana/m01.jpg", hint: "象征创造力、技能和意志力。我将发现新的能力或找到解决问题的方法。" },
    { id: 2, name: "女祭司", image: "major_arcana/m02.jpg", hint: "代表直觉、神秘和未显露的真相。我将会发现隐藏的信息或依靠直觉行动。" },
    { id: 3, name: "皇后", image: "major_arcana/m03.jpg", hint: "象征丰饶、创造和滋养。我将会创造新事物或关注他人的需求。" },
    { id: 4, name: "皇帝", image: "major_arcana/m04.jpg", hint: "代表权威、结构和控制。我将需要承担责任或面对权威人物。" },
    { id: 5, name: "教皇", image: "major_arcana/m05.jpg", hint: "象征传统、精神指导和群体归属。我将寻求建议或遵循传统路径。" },
    { id: 6, name: "恋人", image: "major_arcana/m06.jpg", hint: "代表关系、选择和价值观。我将面临重要选择或遇到有意义的关系。" },
    { id: 7, name: "战车", image: "major_arcana/m07.jpg", hint: "象征决心、控制和胜利。我将克服困难或坚定前行。" },
    { id: 8, name: "力量", image: "major_arcana/m08.jpg", hint: "代表内在力量、勇气和耐心。我将需要克服恐惧或展示内在力量。" },
    { id: 9, name: "隐者", image: "major_arcana/m09.jpg", hint: "象征孤独、反思和内在寻求。我将需要独处或寻找内心答案。" },
    { id: 10, name: "命运之轮", image: "major_arcana/m10.jpg", hint: "代表命运、转变和机会。我的故事将出现意外转折或命运变化。" },
    { id: 11, name: "正义", image: "major_arcana/m11.jpg", hint: "象征公正、平衡和诚实。我将面临判断或需要诚实面对现实。" },
    { id: 12, name: "倒吊人", image: "major_arcana/m12.jpg", hint: "代表牺牲、新视角和放弃。我将需要改变视角或接受当前局面。" },
    { id: 13, name: "死神", image: "major_arcana/m13.jpg", hint: "象征结束、转变和重生。我的故事将发生重大变化或告别旧事物。" },
    { id: 14, name: "节制", image: "major_arcana/m14.jpg", hint: "代表平衡、调和和适度。我将需要找到平衡或调和冲突。" },
    { id: 15, name: "恶魔", image: "major_arcana/m15.jpg", hint: "象征束缚、诱惑和物质执着。我将面临诱惑或需要打破限制。" },
    { id: 16, name: "塔", image: "major_arcana/m16.jpg", hint: "代表突变、混乱和启示。我的故事将出现突然的转折或崩塌的秩序。" },
    { id: 17, name: "星星", image: "major_arcana/m17.jpg", hint: "象征希望、灵感和宁静。我将找到希望或获得精神指引。" },
    { id: 18, name: "月亮", image: "major_arcana/m18.jpg", hint: "代表幻觉、恐惧和潜意识。我将面对内心恐惧或遇到迷惑。" },
    { id: 19, name: "太阳", image: "major_arcana/m19.jpg", hint: "象征成功、喜悦和清晰。我将获得成功或找到真相。" },
    { id: 20, name: "审判", image: "major_arcana/m20.jpg", hint: "代表觉醒、更新和决断。我将面临重大决定或获得新认识。" },
    { id: 21, name: "世界", image: "major_arcana/m21.jpg", hint: "象征完成、整合和成就。我将完成旅程或达成目标。" }
];

// 房屋地图ASCII艺术
const HOUSE_MAP = `+-------------------+-------------------+
|                   |                   |
|                   |                   |
|                   |                   |
|       书房        |       浴室        |
|                   |                   |
|                   |                   |
|                   |                   |
|                   |                   |
|        门         |        门         |
+--------┼----------+---------┼---------+
|                                       |
|                                       |
|                 走廊                  |
|                                       |
|                                       |
+--------┼----------+---------┼---------+
|        门         |        门         |
|                   |                   |
|                   |                   |
|                   |                   |
|       客厅        |       餐厅        |
|                   |                   |
|                   |                   |
|                   |                   |
|                   |                   |
|                   |                   |
+-------------------+-------------------+`;

// 操作指南文本
const GUIDE_TEXT = `在右侧面板上，你可以通过两种方式引导故事发展：
1. 通过文本输入框直接输入你希望我执行的行动或描述你想象中房间里可能存在的物品和记忆。例如：'在书房的抽屉里发现一封信' 或 '回忆起客厅墙上照片的含义'。 
2. 如果你不确定该做什么，可以抽取塔罗牌寻求指引。每张塔罗牌都代表着特定的象征意义和行动方向，选择一张牌，它将为你提供创意灵感，引导A探索特定的情感或记忆路径。`;

// API配置 - 移除API密钥
const MODEL_ID = 'ft:gpt-4.1-2025-04-14:personal::BOxuRPTn';

// 固定的开场白文本
const FIXED_OPENING = `我睁开眼睛，发现自己躺在瓷白色的浴缸里。浴室里灯泡闪烁，发出轻微的嗡嗡声。浴缸边缘有一道细长的裂缝，像个微笑。旁边放着一只怀表，指针停在3:54，刻着"你有六分钟的时间"。

我不记得自己是谁，为什么在这里。口袋里有个黑色丝绒布袋，内有22张塔罗牌。布袋上刺绣着："当感到困惑时，随机抽取一张牌，它会为你带来指引。"

探索后发现，这里只有四个房间——浴室、餐厅、客厅和书房，没有出口。墙壁触感变幻，空间轮廓忽明忽暗，仿佛与我的记忆和想象相连。

时间在流逝，我只剩六分钟探索这个奇怪的房子。我感到一种紧迫感，我的发现将决定我的命运。我必须快速行动。`;

// 全局变量跟踪时间和故事状态
let currentTime = '3:54';
let storyHistory = [];
let storyContent = '';
let countdownInterval;
let countdownMinutes = 6;
let countdownSeconds = 0;
let countdownPaused = false;
// 生成唯一的会话ID，确保每次都是新故事
let sessionId = Date.now().toString();
// 标记是否已经触发结局
let endingTriggered = false;
// 定义按钮间的垂直间距
const BUTTON_VERTICAL_SPACING = 80;

// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // DOM 元素
    const prevCardBtn = document.getElementById('prevCardBtn');
    const nextCardBtn = document.getElementById('nextCardBtn');
    const randomCardBtn = document.getElementById('randomCardBtn');
    const selectCardBtn = document.getElementById('selectCardBtn');
    const submitTextBtn = document.getElementById('submitTextBtn');
    const returnButton = document.getElementById('returnButton');
    const currentCardImg = document.getElementById('current-card');
    const cardNameElement = document.getElementById('card-name');
    const cardHintElement = document.getElementById('card-hint-text');
    const manualInput = document.getElementById('manual-input');
    const storyOutput = document.getElementById('story-output');
    const leftSidebar = document.querySelector('.left-sidebar');
    
    // 创建并添加按钮，确保它们之间的间距一致
    createAllSidebarButtons();
    
    // 创建并添加倒计时时钟
    createCountdownClock();
    startCountdown();
    
    // 重新格式化塔罗牌提示文本，在句号后添加换行
    function formatHints() {
        tarotCards.forEach(card => {
            // 找到第一个句号位置
            const firstSentenceEnd = card.hint.indexOf('。') + 1;
            if (firstSentenceEnd > 0 && firstSentenceEnd < card.hint.length) {
                // 在第一个句号后添加换行符
                card.formattedHint = card.hint.substring(0, firstSentenceEnd) + '\n' + card.hint.substring(firstSentenceEnd);
            } else {
                card.formattedHint = card.hint;
            }
        });
    }
    
    // 调用格式化函数
    formatHints();

    // 当前卡片索引
    let currentCardIndex = 0;
    
    // 确保所有需要的元素都存在
    if (!prevCardBtn || !nextCardBtn || !randomCardBtn || !selectCardBtn || 
        !currentCardImg || !cardNameElement || !cardHintElement) {
        console.error('某些DOM元素未找到，请检查HTML结构');
        return;
    }
    
    // 创建所有侧边栏按钮，统一布局
    function createAllSidebarButtons() {
        // 倒计时位置在 top: 20px
        
        // 按顺序创建所有按钮，确保垂直间距一致
        createRestartButton(20 + BUTTON_VERTICAL_SPACING);
        createEndStoryButton(20 + BUTTON_VERTICAL_SPACING * 2);
        createMapButton(20 + BUTTON_VERTICAL_SPACING * 3);
        createGuideButton(20 + BUTTON_VERTICAL_SPACING * 4);
        
        // 返回按钮位置不变，保持在底部
    }
    
    // 创建重新开始按钮
    function createRestartButton(topPosition) {
        const restartContainer = document.createElement('div');
        restartContainer.className = 'restart-container';
        restartContainer.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        const restartButton = document.createElement('button');
        restartButton.id = 'restartButton';
        restartButton.className = 'pixel-btn';
        restartButton.textContent = '重新开始';
        restartButton.style.cssText = `
            font-size: 12px;
            padding: 6px 5px;
            white-space: nowrap;
            width: 100%;
        `;
        
        restartButton.addEventListener('click', function() {
            // 重新生成会话ID
            sessionId = Date.now().toString();
            // 重置故事和倒计时
            resetStory();
        });
        
        restartContainer.appendChild(restartButton);
        leftSidebar.appendChild(restartContainer);
    }
    
    // 创建结束故事按钮
    function createEndStoryButton(topPosition) {
        const endStoryContainer = document.createElement('div');
        endStoryContainer.className = 'end-story-container';
        endStoryContainer.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        const endStoryButton = document.createElement('button');
endStoryButton.id = 'endStoryButton';
endStoryButton.className = 'pixel-btn';
endStoryButton.textContent = '结束故事';
endStoryButton.style.cssText = `
    font-size: 12px;
    padding: 6px 5px;
    white-space: nowrap;
    width: 100%;
`;

        
        endStoryButton.addEventListener('click', function() {
            // 弹出确认对话框
            const confirmEnd = confirm('确定要结束当前故事并生成结局吗？');
            if (confirmEnd) {
                // 触发结局生成
                if (!endingTriggered) {
                    endingTriggered = true;
                    generateEnding();
                }
            }
        });
        
        endStoryContainer.appendChild(endStoryButton);
        leftSidebar.appendChild(endStoryContainer);
    }
    
    // 创建地图按钮
    function createMapButton(topPosition) {
        const mapContainer = document.createElement('div');
        mapContainer.className = 'map-container';
        mapContainer.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        const mapButton = document.createElement('button');
        mapButton.id = 'mapButton';
        mapButton.className = 'pixel-btn';
        mapButton.textContent = '地图';
        mapButton.style.cssText = `
            font-size: 12px;
            padding: 6px 5px;
            white-space: nowrap;
            width: 100%;
        `;
        
        mapButton.addEventListener('click', function() {
            showMap();
        });
        
        mapContainer.appendChild(mapButton);
        leftSidebar.appendChild(mapContainer);
    }
    
    // 创建操作指南按钮
    function createGuideButton(topPosition) {
        const guideContainer = document.createElement('div');
        guideContainer.className = 'guide-container';
        guideContainer.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        const guideButton = document.createElement('button');
        guideButton.id = 'guideButton';
        guideButton.className = 'pixel-btn';
        guideButton.textContent = '操作指南';
        guideButton.style.cssText = `
            font-size: 12px;
            padding: 6px 5px;
            white-space: nowrap;
            width: 100%;
        `;
        
        guideButton.addEventListener('click', function() {
            showGuide();
        });
        
        guideContainer.appendChild(guideButton);
        leftSidebar.appendChild(guideContainer);
    }
    
    // 显示地图弹窗
    function showMap() {
        // 暂停倒计时
        pauseCountdown();
        
        // 创建弹窗背景
        const modalBackground = document.createElement('div');
        modalBackground.className = 'modal-background';
        modalBackground.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        // 创建弹窗内容
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            max-width: 500px;
            width: 80%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        `;
        
        // 创建标题
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = '房屋地图';
        modalTitle.style.cssText = `
            margin-bottom: 10px;
            text-align: center;
            font-family: SimSun, "宋体", serif;
        `;
        
        // 创建地图内容
        const mapContent = document.createElement('pre');
        mapContent.textContent = HOUSE_MAP;
        mapContent.style.cssText = `
            font-family: monospace;
            white-space: pre;
            margin: 15px 0;
            text-align: center;
            line-height: 1.2;
        `;
        
        // 创建关闭按钮
        const closeButton = document.createElement('button');
        closeButton.className = 'pixel-btn';
        closeButton.textContent = '关闭';
        closeButton.style.cssText = `
            margin-top: 15px;
            font-size: 14px;
            padding: 8px 15px;
        `;
        
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modalBackground);
            // 恢复倒计时
            resumeCountdown();
        });
        
        // 组装弹窗
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(mapContent);
        modalContent.appendChild(closeButton);
        modalBackground.appendChild(modalContent);
        
        // 添加到页面
        document.body.appendChild(modalBackground);
    }
    
    // 显示操作指南弹窗
    function showGuide() {
        // 暂停倒计时
        pauseCountdown();
        
        // 创建弹窗背景
        const modalBackground = document.createElement('div');
        modalBackground.className = 'modal-background';
        modalBackground.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        // 创建弹窗内容
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            max-width: 500px;
            width: 80%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        `;
        
        // 创建标题
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = '操作指南';
        modalTitle.style.cssText = `
            margin-bottom: 10px;
            text-align: center;
            font-family: SimSun, "宋体", serif;
        `;
        
        // 创建指南内容
        const guideContent = document.createElement('div');
        guideContent.innerHTML = GUIDE_TEXT.replace(/\n/g, '<br>');
        guideContent.style.cssText = `
            font-family: SimSun, "宋体", serif;
            margin: 15px 0;
            line-height: 1.5;
            text-align: left;
        `;
        
        // 创建关闭按钮
        const closeButton = document.createElement('button');
        closeButton.className = 'pixel-btn';
        closeButton.textContent = '关闭';
        closeButton.style.cssText = `
            margin-top: 15px;
            font-size: 14px;
            padding: 8px 15px;
        `;
        
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modalBackground);
            // 恢复倒计时
            resumeCountdown();
        });
        
        // 组装弹窗
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(guideContent);
        modalContent.appendChild(closeButton);
        modalBackground.appendChild(modalContent);
        
        // 添加到页面
        document.body.appendChild(modalBackground);
    }
    
    // 创建倒计时时钟
    function createCountdownClock() {
        const countdownContainer = document.createElement('div');
countdownContainer.className = 'countdown-container';
countdownContainer.style.cssText = `
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: SimSun, "宋体", serif;
    font-size: 14px;
`;
        const countdownDisplay = document.createElement('div');
        countdownDisplay.id = 'countdown-display';
        countdownDisplay.style.cssText = `
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 2px;
        `;
        countdownDisplay.textContent = '6:00';
        
        const countdownLabel = document.createElement('div');
        countdownLabel.textContent = '剩余时间';
        countdownLabel.style.fontSize = '10px';
        
        countdownContainer.appendChild(countdownDisplay);
        countdownContainer.appendChild(countdownLabel);
        
        leftSidebar.appendChild(countdownContainer);
    }
    
    // 启动倒计时
    function startCountdown() {
        // 清除任何现有的倒计时
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // 重置倒计时
        countdownMinutes = 6;
        countdownSeconds = 0;
        countdownPaused = false;
        endingTriggered = false;
        updateCountdownDisplay();
        
        // 启动新的倒计时
        countdownInterval = setInterval(function() {
            if (countdownPaused) return;
            
            if (countdownMinutes === 0 && countdownSeconds === 0) {
                clearInterval(countdownInterval);
                handleCountdownEnd();
                return;
            }
            
            if (countdownSeconds === 0) {
                countdownMinutes--;
                countdownSeconds = 59;
            } else {
                countdownSeconds--;
            }
            
            updateCountdownDisplay();
        }, 1000);
    }
    
    // 暂停倒计时
    function pauseCountdown() {
        countdownPaused = true;
    }
    
    // 恢复倒计时
    function resumeCountdown() {
        countdownPaused = false;
    }
    
    // 更新倒计时显示
    function updateCountdownDisplay() {
        const display = document.getElementById('countdown-display');
        if (display) {
            display.textContent = `${countdownMinutes}:${countdownSeconds.toString().padStart(2, '0')}`;
        }
    }
    
    // 倒计时结束处理
    function handleCountdownEnd() {
        // 避免重复触发结局
        if (endingTriggered) return;
        endingTriggered = true;
        
        console.log('倒计时结束，准备生成结局');
        
        // 生成结局内容
        generateEnding();
    }
    
    // 生成结局并跳转到结局页面
    function generateEnding() {
       // 显示加载状态
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading-indicator';
loadingIndicator.innerHTML = '正在生成结局...';
document.body.appendChild(loadingIndicator);
        
        // 准备提交给API的消息
        let messages = [
            {
                "role": "system", 
                "content": `你是《消失的语义学》中的主角我，被困在一个由浴室、餐厅、客厅和书房组成的神秘房子里，没有卧室也没有出口。你在浴缸中醒来，失去记忆，身边有一只指向3:54的怀表，表明你只有六分钟时间。你的口袋里有一套塔罗牌，可以提供指引。作为我，你要根据用户的输入探索这个空间，发现线索，回忆起片段记忆。这个房子是流动的，由记忆和想象构成，会随着探索而变化。回应风格: 1. 使用第一人称，语调简洁但保留David Lynch风格的超现实感 2. 优先推动剧情发展，将描述和感官细节保持最小必要量 3. 引用并建立在之前发现的线索和记忆之上，保持叙事连贯性 4. 每次回应控制在100-150字左右 5. 每个回应应包含至少一个新发现或情节推进 互动类型: - 当用户描述房间中的新物品或记忆时，快速整合并推动故事向前 - 当用户选择塔罗牌时，简洁地使用该牌的象征引导新的情节转折 - 当用户要求执行动作时，专注于动作结果和新发现，而非过程描述 时间结束: 当怀表达到4:00时，简洁有力地总结故事，提供一个情感上有冲击力的结局。这不是解谜游戏，而是共同创造的叙事体验。用户不是在寻找预设的答案，而是在帮助构建和发现A的身份和故事。本次会话ID: ${sessionId}`
            }
        ];
        
        // 添加历史消息以保持连贯性
        storyHistory.forEach(item => {
            messages.push(item);
        });
        
        // 添加结局请求
        messages.push({
            "role": "user",
            "content": "六分钟倒计时归零，根据现在撰写的所有故事情节，为主人公的故事补上结尾。"
        });
        
        // 发送API请求 - 使用Vercel API路由
        fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL_ID,
                messages: messages,
                temperature: 0.7,
                max_tokens: 350 // 稍微增加token以获取更完整的结局
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('API请求失败：' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // 获取AI回复
            const endingText = data.choices[0].message.content;
            
            // 将结局内容保存到sessionStorage，以便在结局页面中使用
            sessionStorage.setItem('endingText', endingText);
            
            // 跳转到结局页面
            window.location.href = '../ending/index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            
            // 移除加载指示器
            document.body.removeChild(loadingIndicator);
            
            // 显示错误提示
            alert('生成结局时出错: ' + error.message);
        });
    }
    
    // 更新卡片显示
    function updateCardDisplay() {
        currentCardImg.src = tarotCards[currentCardIndex].image;
        cardNameElement.textContent = tarotCards[currentCardIndex].name;
        
        // 使用格式化后的提示文本
        cardHintElement.textContent = tarotCards[currentCardIndex].formattedHint || tarotCards[currentCardIndex].hint;
    }

    // 导航处理函数
    function nextCard() {
        currentCardIndex = (currentCardIndex + 1) % tarotCards.length;
        updateCardDisplay();
    }

    function prevCard() {
        currentCardIndex = (currentCardIndex - 1 + tarotCards.length) % tarotCards.length;
        updateCardDisplay();
    }

    // 随机卡片选择
    function selectRandomCard() {
        // 禁用按钮，防止动画过程中重复点击
        if (randomCardBtn) randomCardBtn.disabled = true;
        if (selectCardBtn) selectCardBtn.disabled = true;
        if (prevCardBtn) prevCardBtn.disabled = true;
        if (nextCardBtn) nextCardBtn.disabled = true;
        
        // 准备随机选择的索引，但不立即使用
        const finalIndex = Math.floor(Math.random() * tarotCards.length);
        
        // 添加翻牌动画的CSS类
        currentCardImg.classList.add('flipping');
        
        // 快速切换多张牌的动画效果
        let shuffleCount = 0;
        const totalShuffles = 10; // 总共切换的次数
        const initialDelay = 100; // 初始切换间隔(毫秒)
        let delay = initialDelay;
        
        function shuffleCards() {
            // 计算当前应该显示的随机卡片索引(非最终索引)
            const tempIndex = Math.floor(Math.random() * tarotCards.length);
            
            // 确保不连续显示相同的卡片
            if (tempIndex !== currentCardIndex) {
                // 更新卡片图像和名称
                currentCardImg.src = tarotCards[tempIndex].image;
                cardNameElement.textContent = tarotCards[tempIndex].name;
                currentCardIndex = tempIndex;
            }
            
            shuffleCount++;
            
            if (shuffleCount < totalShuffles) {
                // 逐渐增加延迟，让卡片切换变慢
                delay += 30;
                setTimeout(shuffleCards, delay);
            } else {
                // 最后停在最终选定的卡片上
                setTimeout(() => {
                    // 显示最终选定的卡片
                    currentCardIndex = finalIndex;
                    currentCardImg.src = tarotCards[finalIndex].image;
                    cardNameElement.textContent = tarotCards[finalIndex].name;
                    
                    // 更新提示文本
                    if (cardHintElement) {
                        cardHintElement.textContent = tarotCards[finalIndex].formattedHint || tarotCards[finalIndex].hint;
                    }
                    
                    // 移除翻牌动画类
                    currentCardImg.classList.remove('flipping');
                    
                    // 添加最终选定的视觉效果
                    currentCardImg.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        currentCardImg.style.transform = 'scale(1)';
                        
                        // 重新启用按钮
                        if (randomCardBtn) randomCardBtn.disabled = false;
                        if (selectCardBtn) selectCardBtn.disabled = false;
                        if (prevCardBtn) prevCardBtn.disabled = false;
                        if (nextCardBtn) nextCardBtn.disabled = false;
                    }, 300);
                }, 200);
            }
        }
        
        // 开始卡牌切换动画
        shuffleCards();
    }

    // 卡片选择处理
    function selectCard() {
        const selectedCard = tarotCards[currentCardIndex];
        let prompt = `玩家抽取了一张${selectedCard.name}牌，${selectedCard.hint}`;
        
        // 如果manualInput存在，更新其值
        if (manualInput) {
            manualInput.value = prompt;
            
            // 视觉反馈
            currentCardImg.style.transform = "scale(1.1)";
            setTimeout(() => {
                currentCardImg.style.transform = "scale(1)";
            }, 300);
            
            // 聚焦到输入区域
            manualInput.focus();
        }
    }

    // 打字效果函数
    function typeText(element, text, index = 0, speed = 30, callback = null) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeText(element, text, index + 1, speed, callback), speed);
        } else if (callback) {
            callback();
        }
    }

    // 提交文本处理
    function submitText() {
        if (!manualInput || !storyOutput) return;
        
        const userInput = manualInput.value.trim();
        if (!userInput) return;
        
// 显示加载状态
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading-indicator';
loadingIndicator.innerHTML = '生成故事中...';
storyOutput.appendChild(loadingIndicator);
        
        // 滚动到底部
        storyOutput.scrollTop = storyOutput.scrollHeight;
        
        // 禁用按钮防止重复提交
        if (submitTextBtn) submitTextBtn.disabled = true;
        
        // 准备提交给API的消息
        let messages = [
            {
                "role": "system", 
                "content": `你是《消失的语义学》中的主角我，被困在一个由浴室、餐厅、客厅和书房组成的神秘房子里，没有卧室也没有出口。你在浴缸中醒来，失去记忆，身边有一只指向3:54的怀表，表明你只有六分钟时间。你的口袋里有一套塔罗牌，可以提供指引。作为我，你要根据用户的输入探索这个空间，发现线索，回忆起片段记忆。这个房子是流动的，由记忆和想象构成，会随着探索而变化。回应风格: 1. 使用第一人称，语调简洁但保留David Lynch风格的超现实感 2. 优先推动剧情发展，将描述和感官细节保持最小必要量 3. 引用并建立在之前发现的线索和记忆之上，保持叙事连贯性 4. 每次回应控制在100-150字左右 5. 每个回应应包含至少一个新发现或情节推进 互动类型: - 当用户描述房间中的新物品或记忆时，快速整合并推动故事向前 - 当用户选择塔罗牌时，简洁地使用该牌的象征引导新的情节转折 - 当用户要求执行动作时，专注于动作结果和新发现，而非过程描述 时间结束: 当怀表达到4:00时，简洁有力地总结故事，提供一个情感上有冲击力的结局。这不是解谜游戏，而是共同创造的叙事体验。用户不是在寻找预设的答案，而是在帮助构建和发现A的身份和故事。本次会话ID: ${sessionId}`
            }
        ];
        
        // 添加历史消息以保持连贯性
        storyHistory.forEach(item => {
            messages.push(item);
        });
        
        // 添加当前输入
        messages.push({
            "role": "user",
            "content": userInput
        });
        
        // 发送API请求 - 使用Vercel API路由
        fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL_ID,
                messages: messages,
                temperature: 0.7,
                max_tokens: 250
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('API请求失败：' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // 获取AI回复
            const aiResponse = data.choices[0].message.content;
            
            // 将AI的回复添加到历史记录
            storyHistory.push({
                "role": "user",
                "content": userInput
            });
            
            storyHistory.push({
                "role": "assistant",
                "content": aiResponse
            });
            
            // 如果历史记录太长，保留最近的对话
            if (storyHistory.length > 10) {
                storyHistory = storyHistory.slice(storyHistory.length - 10);
            }
            
            // 更新时间
            updateStoryTime(aiResponse);
            
            // 移除加载指示器
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            // 创建新的段落元素
            const newParagraph = document.createElement('p');
            newParagraph.className = 'story-paragraph';
            newParagraph.style.cssText = `
                margin: 15px 0;
                line-height: 1.8;
            `;
            storyOutput.appendChild(newParagraph);
            
            // 使用打字效果显示AI回复
            typeText(newParagraph, aiResponse, 0, 15, () => {
                // 打字效果完成后滚动到底部
                storyOutput.scrollTop = storyOutput.scrollHeight;
            });
            
            // 清空输入框
            manualInput.value = "";
        })
        .catch(error => {
            console.error('Error:', error);
            
            // 移除加载指示器
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            // 创建错误消息段落
            const errorParagraph = document.createElement('p');
            errorParagraph.className = 'error-message';
            errorParagraph.innerHTML = "生成故事时出错: " + error.message;
            errorParagraph.style.cssText = `
                color: #cc0000;
                padding: 5px;
                background-color: #ffeeee;
                border-left: 3px solid #cc0000;
                margin: 10px 0;
            `;
            storyOutput.appendChild(errorParagraph);
            
            // 滚动到底部
            storyOutput.scrollTop = storyOutput.scrollHeight;
        })
        .finally(() => {
            // 重新启用按钮
            if (submitTextBtn) submitTextBtn.disabled = false;
        });
    }

    // 从响应中提取时间更新
    function updateStoryTime(response) {
        // 检查是否包含特定时间点
        const timePatterns = [
            /怀表.*?3:5[5-9]/i,
            /怀表.*?4:00/i
        ];
        
        // 检查时间是否有变化
        let newTime = currentTime;
        
        if (timePatterns[0].test(response)) {
            const matches = response.match(/怀表.*?3:5([5-9])/i);
            if (matches && matches[1]) {
                newTime = `3:5${matches[1]}`;
            }
        } else if (timePatterns[1].test(response)) {
            newTime = "4:00";
        }
        
        // 如果时间有变化，更新当前时间
        if (newTime !== currentTime) {
            currentTime = newTime;
            console.log(`时间更新为: ${currentTime}`);
            
            // 如果时间是4:00，可能需要触发结局
            if (currentTime === '4:00') {
                console.log('时间已到，故事即将结束');
                // 避免两种结局触发方式冲突
                if (!endingTriggered) {
                    endingTriggered = true;
                    // 稍微延迟生成结局，让玩家看到4:00的内容
                    setTimeout(generateEnding, 3000);
                }
            }
        }
    }
    
    // 重置故事（完全重新开始）
    function resetStory() {
        // 重置倒计时
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        startCountdown();
        
        // 初始化故事
        initializeStory();
    }

    // 返回landing page
    function returnToLandingPage() {
        // 清除倒计时
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // 返回到landing page的逻辑
        window.location.href = '../landing-page/index.html';
    }

    // 初始化故事状态 - 使用固定开场白
    function initializeStory() {
        // 清空故事容器
        if (storyOutput) {
            storyOutput.innerHTML = '';
        }
        
        // 重置故事历史
        storyHistory = [];
        
        // 创建新的段落元素并显示固定开场白
        const initialParagraph = document.createElement('p');
        initialParagraph.className = 'story-paragraph';
        initialParagraph.style.cssText = `
            margin: 15px 0;
            line-height: 1.8;
        `;
        
        if (storyOutput) {
            storyOutput.appendChild(initialParagraph);
            
            // 使用打字效果显示开场白
            typeText(initialParagraph, FIXED_OPENING, 0, 15, () => {
                // 打字效果完成后滚动到底部
                storyOutput.scrollTop = storyOutput.scrollHeight;
            });
            
            // 将固定开场白添加到故事历史
            storyHistory.push({
                "role": "user",
                "content": "开始一个新故事"
            });
            storyHistory.push({
                "role": "assistant",
                "content": FIXED_OPENING
            });
        }
    }

    // 添加事件监听器
    if (prevCardBtn) prevCardBtn.addEventListener('click', prevCard);
    if (nextCardBtn) nextCardBtn.addEventListener('click', nextCard);
    if (randomCardBtn) randomCardBtn.addEventListener('click', selectRandomCard);
    if (selectCardBtn) selectCardBtn.addEventListener('click', selectCard);
    if (submitTextBtn) submitTextBtn.addEventListener('click', submitText);
    if (returnButton) returnButton.addEventListener('click', returnToLandingPage);

    // 初始化显示
    updateCardDisplay();
    
    // 初始化故事
    initializeStory();
    
    // 处理页面刷新/重新加载
    window.addEventListener('beforeunload', function() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });
});