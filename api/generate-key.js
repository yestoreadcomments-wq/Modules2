export default function handler(req, res) {
    // Block browser access - only allow programmatic requests
    const userAgent = req.headers['user-agent'] || '';
    
    // Check if it's a browser (contains common browser identifiers)
    const isBrowser = userAgent.includes('Mozilla') || 
                     userAgent.includes('Chrome') || 
                     userAgent.includes('Safari') || 
                     userAgent.includes('Firefox') || 
                     userAgent.includes('Edge') ||
                     !req.headers['user-agent']; // Block empty user agents too
    
    if (isBrowser) {
        return res.status(403).json({ 
            success: false, 
            error: "Access denied - This API is for programmatic use only" 
        });
    }
    
    // Enable CORS but only for non-browser requests
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
