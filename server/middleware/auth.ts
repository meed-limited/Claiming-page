import jwt, { Secret } from "jsonwebtoken";

const secretKey: Secret = process.env.SECRET_KEY!;
let token: string;

// Protect routes
export async function protect(req: any, res: any, next: any) {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    console.log(req.headers);
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (token === undefined) {
    res.status(403).json({ success: false, message: "Not authorized: No bearer token!" });
    return;
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Not authorized: Wrong bearer token!" });
    return;
  }
}

export async function generateToken() {
  const signature = jwt.sign({ name: process.env.NAME }, secretKey, { expiresIn: process.env.EXPIRY_TIME });
  return signature;
}
