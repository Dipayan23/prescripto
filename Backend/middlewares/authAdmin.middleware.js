import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    try {
        
        const atoken = req.headers
        console.log(req.headers);
        
        if(!atoken || !atoken.authorization) {
            return res.status(401).json({ message: "Authorization token is required" });
        }
        
        const token_decoded = jwt.verify(atoken.authorization, process.env.JWT_SECRET);
        if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }

        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export { authAdmin };