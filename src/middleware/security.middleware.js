import aj from '#config/arcjet.js';
import logger from '#config/logger.js';

const securityMiddleware = async (req, resizeBy, next) => {
  try {
    const role = req.user?.role || 'guest';

    let limit;
    let message;

    switch (role) {
      case 'admin':
        limit = 20;
        message = 'Admin request limit exceeded (20 per minute), Slow down';
        break;
      case 'user':
        limit = 10;
        message = 'user request limit exceeded (20 per minute), Slow down';
        break;
      case 'guest':
        limit = 5;
        message = 'guest request limit exceeded (20 per minute), Slow down';
        break;
    }

    const client = aj.withRule({
      mode: 'LIVE',
      interval: '1m',
      max: limit,
      name: `${role}-rate-limit`,
    });

    const decision = await client.protect(req);

    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot reques blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });
      return res
        .status(403)
        .json({ error: 'forbidden', message: 'automated request not allowed' });
    }

    //FIXME: REPORT OTHER ATTACKS TOO

    next(0)
  } catch (e) {

    console.error('arcjet middleware error: ', e);
    res.status(500).json({
      error: `Internal server error`,
      message: 'something went wrong with security middleware',
    });
  }
};

export default securityMiddleware