import { verify, sign } from "jsonwebtoken";

// Protect routes
export async function protect(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    res.status(403).json({ success: false, message: "Not authorized: No bearer token!" });
    return;
  }

  try {
    verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Not authorized: Wrong bearer token!" });
    return;
  }
}

export async function generateToken(req, res, next) {
  const signature = sign({ name: process.env.NAME }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRY_TIME });
  return signature;
}
