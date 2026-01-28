const otpRequests = new Map();

export const otpRateLimiter = (req, res, next) => {
  const { email } = req.body;
  const now = Date.now();

  if (!email) return res.status(400).json({
    success: false,
    message: "Email required",
  });

  const record = otpRequests.get(email);

  if (record && now - record < 60 * 1000) {
    return res.status(429).json({
      success: false,
      message: "Please wait before requesting another OTP",
    });
  }

  otpRequests.set(email, now);
  next();
};
