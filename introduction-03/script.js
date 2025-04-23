document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM加载完成，开始创建星星和打字效果");
    
    // 获取元素
    const typingContainer = document.getElementById('typing-container');
    const houseMap = document.getElementById('house-map');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const starsContainer = document.getElementById('stars-container');
    
    // 检查所有必要的元素是否存在
    if (!starsContainer) {
        console.error("找不到星星容器元素!");
        return;
    }
    
    if (!typingContainer) {
        console.error("找不到打字效果容器元素!");
        return;
    }
    
    if (!houseMap) {
        console.error("找不到房子地图元素!");
        return;
    }
    
    if (!nextButton) {
        console.error("找不到下一步按钮元素!");
        return;
    }
    
    if (!prevButton) {
        console.error("找不到上一步按钮元素!");
        return;
    }
    
    // 星星字符集
    const starChars = ['*', '✦', '✩', '⋆', '.', '·', '✧'];
    
    // 创建星星
    const numStars = 100;
    const stars = [];
    
    console.log(`将创建 ${numStars} 颗星星`);
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // 随机字符
        const charIndex = Math.floor(Math.random() * starChars.length);
        star.innerText = starChars[charIndex];
        
        // 随机大小
        const size = (0.5 + Math.random() * 0.5) * (2/3);
        star.style.fontSize = `${size}rem`;
        
        // 随机初始透明度
        const minOpacity = 0.0;
        const maxOpacity = 1.0;
        const baseOpacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
        star.style.opacity = baseOpacity.toString();
        
        // 设置位置
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // 添加到容器
        starsContainer.appendChild(star);
        
        // 保存星星信息用于动画
        stars.push({
            element: star,
            minOpacity: minOpacity,
            maxOpacity: maxOpacity,
            phase: Math.random() * Math.PI * 2,
            speed: (0.2 + Math.random() * 0.8) * 2
        });
    }
    
    console.log(`创建了 ${stars.length} 颗星星`);
    
    // 星星闪烁动画
    function animateStars() {
        const time = Date.now() * 0.001; // 当前时间(秒)
        
        stars.forEach(star => {
            // 使用简单的正弦波在最小和最大透明度之间变化
            const range = star.maxOpacity - star.minOpacity;
            const offset = star.minOpacity;
            const opacity = offset + range * (0.5 + 0.5 * Math.sin(time * star.speed + star.phase));
            
            star.element.style.opacity = opacity.toFixed(2);
        });
        
        requestAnimationFrame(animateStars);
    }
    
    // 开始星星动画
    animateStars();
    console.log("星星动画已启动");
    
    // 要显示的文本
    const text = "我支撑着身体，从浴缸边缘慢慢爬出来。冰凉的瓷砖贴着我的脚，每一步都传来轻微的回响。穿过浴室门，一条狭窄的走廊延伸向两个方向。我先向左走，发现了一个餐厅，再往前是客厅。向走廊另一端走去，我找到了书房。\n \n草草走完整个房子后，一个奇怪的事实浮现出来：这里没有卧室，也没有通向外界的门。我站在走廊中央，意识到自己被困在了这个只有四个房间的封闭空间里——一个餐厅，一个书房，一个客厅，还有我醒来的那个浴室。 \n \n我触摸墙壁，指尖下的材质似乎在变化——有时坚实如石，有时柔软如织物，就像这个空间在回应我的触碰和思绪。房间里的轮廓时而清晰，时而模糊，仿佛在等待某种意义将它们固定。我恍然意识到，这里的一切或许与我的记忆和想象有着奇妙的联系。";
    
    // 房子地图ASCII艺术
    const mapText = `+-------------------+-------------------+
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
    
    // 清空打字容器（以防有任何预设内容）
    typingContainer.innerHTML = '';
    
    // 打字效果函数
    let charIndex = 0;
    const typingSpeed = 80; // 每字符80毫秒，稍微加快一点
    let typingTimer;
    
    function typeText() {
        if (charIndex < text.length) {
            // 添加当前字符
            typingContainer.textContent = text.substring(0, charIndex + 1);
            
            charIndex++;
            
            // 设置下一个字符的定时器
            typingTimer = setTimeout(typeText, typingSpeed);
        } else {
            // 打字完成，显示地图
            console.log("打字效果完成，显示地图");
            setTimeout(() => {
                // 设置地图内容
                houseMap.textContent = mapText;
                // 显示地图
                houseMap.style.display = 'block';
                
                // 显示地图后，再显示导航按钮
                setTimeout(() => {
                    nextButton.style.display = 'block';
                    prevButton.style.display = 'block';
                }, 1000);
            }, 500);
        }
    }
    
    // 确保导航按钮和地图初始状态是隐藏的
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    houseMap.style.display = 'none';
    
    // 延迟一秒后开始打字效果
    setTimeout(() => {
        typeText();
    }, 1000);
    
    // 添加下一步按钮点击事件
    nextButton.addEventListener('click', function() {
        console.log("下一步按钮被点击，准备跳转...");
        
        // 清除可能存在的打字定时器
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        
        // 创建淡出效果
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '0';
        
        // 延迟导航到下一页
        setTimeout(() => {
            window.location.href = '../introduction-04/index.html';
        }, 1000);
    });
    
    // 添加上一步按钮点击事件
    prevButton.addEventListener('click', function() {
        console.log("上一步按钮被点击，准备返回...");
        
        // 清除可能存在的打字定时器
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        
        // 创建淡出效果
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '0';
        
        // 延迟导航到上一页
        setTimeout(() => {
            window.location.href = '../introduction-02/index.html';
        }, 1000);
    });
});