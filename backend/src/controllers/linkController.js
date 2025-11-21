const pool = require('../config/database');

// Generate random short code
const generateShortCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = Math.floor(Math.random() * 3) + 6; // 6-8 characters
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Validate URL format
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate short code format
const isValidShortCode = (code) => {
  const regex = /^[A-Za-z0-9]{6,8}$/;
  return regex.test(code);
};

// Create new short link
const createLink = async (req, res) => {
  try {
    const { url, short_code } = req.body;
    const userId = req.user.id; // Get user ID from authenticated user

    // Validate URL
    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format'
      });
    }

    let finalShortCode = short_code;

    // If custom code provided, validate it
    if (short_code) {
      if (!isValidShortCode(short_code)) {
        return res.status(400).json({
          success: false,
          message: 'Short code must be 6-8 alphanumeric characters'
        });
      }

      // Check if code already exists
      const existingCode = await pool.query(
        'SELECT id FROM links WHERE short_code = $1',
        [short_code]
      );

      if (existingCode.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Short code already exists'
        });
      }
    } else {
      // Auto-generate unique code
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        finalShortCode = generateShortCode();
        const existingCode = await pool.query(
          'SELECT id FROM links WHERE short_code = $1',
          [finalShortCode]
        );
        
        if (existingCode.rows.length === 0) {
          break;
        }
        attempts++;
      }

      if (attempts === maxAttempts) {
        return res.status(500).json({
          success: false,
          message: 'Failed to generate unique short code'
        });
      }
    }

    // Insert link into database with authenticated user's ID
    const newLink = await pool.query(
      'INSERT INTO links (short_code, url, user_id) VALUES ($1, $2, $3) RETURNING *',
      [finalShortCode, url, userId]
    );

    res.status(201).json({
      success: true,
      message: 'Link created successfully',
      data: newLink.rows[0]
    });

  } catch (error) {
    console.error('Create link error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating link',
      error: error.message
    });
  }
};




// Get all links (only for authenticated user)
const getAllLinks = async (req, res) => {
  try {
    const userId = req.user.id; // Get authenticated user's ID

    const query = `
      SELECT l.*, u.username, u.email 
      FROM links l 
      LEFT JOIN users u ON l.user_id = u.id
      WHERE l.user_id = $1
      ORDER BY l.created_at DESC
    `;

    const links = await pool.query(query, [userId]);

    res.status(200).json({
      success: true,
      count: links.rows.length,
      data: links.rows
    });

  } catch (error) {
    console.error('Get all links error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching links',
      error: error.message
    });
  }
};



// Get single link stats (only if owned by authenticated user)
const getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;
    const userId = req.user.id;

    const link = await pool.query(
      `SELECT l.*, u.username, u.email 
       FROM links l 
       LEFT JOIN users u ON l.user_id = u.id 
       WHERE l.short_code = $1 AND l.user_id = $2`,
      [code, userId]
    );

    if (link.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Link not found or you do not have access'
      });
    }

    res.status(200).json({
      success: true,
      data: link.rows[0]
    });

  } catch (error) {
    console.error('Get link stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching link stats',
      error: error.message
    });
  }
};



// Delete link
const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      'DELETE FROM links WHERE short_code = $1 RETURNING *',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Link deleted successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Delete link error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting link',
      error: error.message
    });
  }
};



// Redirect to original URL
const redirectToUrl = async (req, res) => {
  try {
    const { code } = req.params;

    // Get link
    const link = await pool.query(
      'SELECT * FROM links WHERE short_code = $1',
      [code]
    );

    if (link.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Link not found'
      });
    }

    // Update click stats
    await pool.query(
      'UPDATE links SET total_clicks = total_clicks + 1, last_clicked = NOW() WHERE short_code = $1',
      [code]
    );

    // Redirect
    res.redirect(302, link.rows[0].url);

  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during redirect',
      error: error.message
    });
  }
};

module.exports = {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectToUrl
};
