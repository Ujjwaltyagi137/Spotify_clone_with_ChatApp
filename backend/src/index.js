const express = require('express');
const path = require('path');
const fs = require('fs')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const connect = require('./connections/db');
const { clerkMiddleware } = require('@clerk/express');
const userRoutes = require('./router/userrouter');
const adminRoutes = require('./router/adminrouter');
const authRoutes = require('./router/authrouter');
const albumRoutes = require('./router/albumrouter');
const songRoutes = require('./router/songrouter');
const statRoutes = require('./router/statrouter');
const cron = require('node-cron');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { createServer } = require('http');
const initializeSocket = require('./connections/socket');
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir : path.join(__dirname , "tmp"),
    createParentPath : true,
    limits :{
        fileSize: 100*1024*1024
    }
}))

const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});
app.use(cors({
  origin:  [
    "http://localhost:3000",
    "https://spotify-clone-with-chatapp.onrender.com",
  ],
  credentials: true,
}));
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/albums', albumRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/stats', statRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../../frontend", "dist", "index.html"));
	});
}


app.use((err,req,res,next)=>{
    res.status(500).json({message : process.env.NODE_ENV === "production"? "Internal server error": err.message });
})

 const start = async () => {
  try {
    await connect();
    console.log(' Database connected');
    httpServer.listen(PORT, () =>
      console.log(` Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error(' Failed to start server:', err);
    process.exit(1);
  }
}
start()
