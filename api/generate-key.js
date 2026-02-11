export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Generate random key
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Add timestamp and format
    const timestamp = Date.now();
    const generatedKey = `${key}+${timestamp}`;
    
    res.status(200).json({ 
        success: true,
        key: generatedKey,
        timestamp: timestamp
    });
}
