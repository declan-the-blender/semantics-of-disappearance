export default async function handler(req, res) {
    // 仅接受POST请求
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
      // 获取请求体
      const body = req.body;
      
      // 向OpenAI API发送请求
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `OpenAI API responded with ${response.status}: ${JSON.stringify(errorData)}`
        );
      }
      
      // 获取响应数据
      const data = await response.json();
      
      // 返回响应
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error proxying request to OpenAI:', error);
      return res.status(500).json({
        error: {
          message: error.message || 'An error occurred during the request'
        }
      });
    }
  }