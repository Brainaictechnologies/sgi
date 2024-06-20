const express = require("express");
const multer = require("multer");
const sendEmail = require("./sendEmail"); // Path to your sendEmail.js file
const cloudinary = require("cloudinary").v2;
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "frontend/views"));
//app.set("views", path.join(__dirname, "admin/views"));
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const { User } = require("./models/user");
const { Blog } = require("./models/blog");
const { WhoWeAre } = require("./models/whoweare");
const { Csr } = require("./models/csr");
const { Autotech } = require("./models/autotech");
const { Technology } = require("./models/technology");

connectDB();

app.set("view engine", "ejs");
app.set("views", __dirname + "/frontend/views");
//app.set("views", __dirname + "/admin/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "aRUYUwdK5xPzW8-XPEYRzF5X-W4",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true },
  })
);
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static("public"));

const PORT = 3000;

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const exist = await User.findOne({ email }).select("+password");
  if (!exist) {
    throw new AuthenticationError(` Invalid Credentials`);
  }
  const isMatch = await bcrypt.compare(password, exist.password);

  if (isMatch) {
    req.session.userId = exist.id; // Set user ID in session
    return res.redirect("/dashboard");
  } else {
    return res.send("Invalid email or password");
  }
});

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next(); // User is logged in, proceed to the next function in the middleware/route handler
  } else {
    res.redirect("/login"); // User is not logged in, redirect to login page
  }
}
function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

app.get("/dashboard", isAuthenticated, async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  // Fetch user from session or database
  const user = await User.findOne({ _id: req.session.userId }); // Simplified for demonstration
  res.render("dashboard", { user });
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dzujsxbvf",
  api_key: "933724168861739",
  api_secret: "aRUYUwdK5xPzW8-XPEYRzF5X-W4",
});

// Middleware for file upload
//app.use(fileUpload());

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  try {
    // const results = await User.find().sort({ createdAt: 1 }).limit(8);

    // const trainers = results.map((result) => {
    //   const parts = result.fullname.split(" ");
    //   let firstname = parts[0];
    //   let lastname = parts.slice(1).join(" ");

    //   return {
    //     ...result.toObject(),
    //     firstname,
    //     lastname,
    //   };
    // });

    res.render("index");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/filter", async (req, res) => {
  const trainers = req.query.searchTerm;

  const filteredProducts = user.filter((trainers) =>
    trainers.name.toLowerCase().includes(trainers.toLowerCase())
  );

  res.render("trainers", { trainers: filteredProducts });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/coaches/:id", async (req, res) => {
  const coachId = req.params.id;
  try {
    // Fetch all coaches' data
    const results = await User.find().sort({ createdAt: 1 }).limit(8);

    // Find the particular coach with the given ID
    const coach = results.find((result) => result._id == coachId);

    let coachDetails = {}; // Object to store the details of the specific coach's details

    if (coach) {
      const parts = coach.fullname.split(" ");

      coachDetails = {
        coachFirstname: parts[0],
        coachLastname: parts.slice(1).join(" "),
        coachServices: coach.services,
        coachImage: coach.image,
        coachLocation: coach.location,
        coachTwitter: coach.twitter,
        coachInstagram: coach.instagram,
      };
    }

    // Filter out the coach with the given ID from the whole coaches
    const filteredResults = results.filter((result) => result._id != coachId);

    const trainers = filteredResults.map((result) => {
      const parts = result.fullname.split(" ");
      const coachData = {
        ...result.toObject(),
        firstname: parts[0],
        lastname: parts.slice(1).join(" "),
      };
      return coachData;
    });

    // Render the coaches template with the data
    res.render("coaches", { trainers, coachDetails });
  } catch (error) {
    console.error(error);
    return res.status(400).send("No Result");
  }

  // const result = await User.findOne({_id: coachId});
  // let parts = result.fullname.split(" ");
  // let firstname = parts[0];
  // let lastname = parts[1];

  // if (!result) {
  //   return res.status(400).send("No Result");
  // }
  // res.render("coaches", { result, firstname, lastname });
});

app.get("/leadership", (req, res) => {
  res.render("leadership");
});

app.get("/media-marvel", (req, res) => {
  res.render("media-marvel");
});

app.get("/csr", (req, res) => {
  res.render("csr");
});

app.get("/technology", (req, res) => {
  res.render("technology");
});

app.get("/export", (req, res) => {
  res.render("export");
});

app.get("/energy", (req, res) => {
  res.render("energy");
});

app.get("/finance", (req, res) => {
  res.render("finance");
});

app.get("/investment", (req, res) => {
  res.render("investment");
});

app.get("/real-estate", (req, res) => {
  res.render("real-estate");
});

app.get("/mining", (req, res) => {
  res.render("mining");
});

app.get("/sustainability", (req, res) => {
  res.render("sustainability");
});

app.get("/careers", (req, res) => {
  res.render("careers");
});

app.get("/contact-us", (req, res) => {
  res.render("contact-us");
});

app.post("/submit_autotech", (req, res) => {
  const {
    author,
    title1,
    title2,
    title3,
    description1,
    description2,
    description3,
    description4,
  } = req.body;

  let newData = new Autotech();
    newData.author = author;
    newData.title1 = title1;
    newData.title2 = title2;
    newData.title3 = title3;
    newData.description1 = description1;
    newData.description2 = description2;
    newData.description3 = description3;
    newData.description4 = description4;
    newData.save();
  res.render("view-autotech");
});

app.get("/view-autotech", async (req, res) => {
  try {
    const allAutotech = await Autotech.find({});
    res.render("view-autotech", { allAutotech });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit-autotech/:id", async (req, res) => {
  try {
    const autotechId = req.params.id;
    const allAutotech = await Autotech.findOne({ _id: autotechId });
    if (!allAutotech) {
      return res.status(400).send("No Result");
    }
    res.render("edit-autotech", { allAutotech });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update-autotech/:id", async (req, res) => {
  try {
    const autotechId = req.params.id;
    const {
      title1,
      title2,
      title3,
      description1,
      description2,
      description3,
      description4,
    } = req.body;


    const updateAutotech = await Autotech.findByIdAndUpdate(
      autotechId,
      {
        $set: {
          title1,
          title2,
          title3,
          description1,
          description2,
          description3,
          description4
        },
      },
      { new: true }
    );

    if (!updateAutotech) {
      return res.status(404).send("Autotech post not found");
    }

    res.redirect("/view-autotech");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/delete-autotech/:id", async (req, res) => {
  try {
    const autotechId = req.params.id;
    const deleteAutotech = await Autotech.findByIdAndDelete(autotechId);

    if (!deleteAutotech) {
      return res.status(404).send("Autotech post not found");
    }
    res.redirect("/view-autotech");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/submit_technology", (req, res) => {
  const {
    author,
    title1,
    title2,
    title3,
    title4,
    title5,
    title6,
    title7,
    title8,
    description1,
    description2,
    description3,
    description4,
    description5,
    description6,
    description7,
    description8,
  } = req.body;

  let newData = new Technology();
    newData.author = author;
    newData.title1 = title1;
    newData.title2 = title2;
    newData.title3 = title3;
    newData.title4 = title4;
    newData.title5 = title5;
    newData.title6 = title6;
    newData.title7 = title7;
    newData.title8 = title8;
    newData.description1 = description1;
    newData.description2 = description2;
    newData.description3 = description3;
    newData.description4 = description4;
    newData.description5 = description5;
    newData.description6 = description6;
    newData.description7 = description7;
    newData.description8 = description8;
    newData.save();
  res.render("view-technology");
});

app.get("/view-technology", async (req, res) => {
  try {
    const allViewTechnology = await Technology.find({});
    res.render("view-technology", { allViewTechnology });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit-technology/:id", async (req, res) => {
  try {
    const techId = req.params.id;
    const allTech= await Technology.findOne({ _id: techId });
    if (!allTech) {
      return res.status(400).send("No Result");
    }
    res.render("edit-technology", { allTech });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update-technology/:id", async (req, res) => {
  try {
    const techId = req.params.id;
    const {
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
      title7,
      title8,
      description1,
      description2,
      description3,
      description4,
      description5,
      description6,
      description7,
      description8,
    } = req.body;


    const updateTech = await Technology.findByIdAndUpdate(
      techId,
      {
        $set: {
          title1,
          title2,
          title3,
          title4,
          title5,
          title6,
          title7,
          title8,
          description1,
          description2,
          description3,
          description4,
          description5,
          description6,
          description7,
          description8

        },
      },
      { new: true }
    );

    if (!updateTech) {
      return res.status(404).send("Tech post not found");
    }

    res.redirect("/view-technology");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/delete-technology/:id", async (req, res) => {
  try {
    const techId = req.params.id;
    const deletedTechnology = await Technology.findByIdAndDelete(techId);

    if (!deletedTechnology) {
      return res.status(404).send("Tech post not found");
    }
    res.redirect("/view-technology");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/submit_who_we_are", (req, res) => {
  const {
    author,
    title1,
    title2,
    description1,
    description2,
    description3,
  } = req.body;

  let newData = new WhoWeAre();
    newData.author = author;
    newData.title1 = title1;
    newData.title2 = title2;
    newData.description1 = description1;
    newData.description2 = description2;
    newData.description3 = description3;
    newData.save();
  res.redirect("view-who-we-are");
});

app.get("/view-who-we-are", async (req, res) => {
  try {
    const allViewWhoWeAre = await WhoWeAre.find({});
    res.render("view-who-we-are", { allViewWhoWeAre, truncateString });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit-who-we-are/:id", async (req, res) => {
  try {
    const whoWeAreId = req.params.id;
    const allWhoWeAre = await WhoWeAre.findOne({ _id: whoWeAreId });
    if (!allWhoWeAre) {
      return res.status(400).send("No Result");
    }
    res.render("edit-who-we-are", { allWhoWeAre });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update-who-we-are/:id", async (req, res) => {
  try {
    const whoWeAreId = req.params.id;
    const {
      title1,
      title2,
      description1,
      description2,
      description3,
    } = req.body;


    const updateWhoWeAre = await WhoWeAre.findByIdAndUpdate(
      whoWeAreId,
      {
        $set: {
          title1,
          title2,   
          description1,
          description2,
          description3,
        },
      },
      { new: true }
    );

    if (!updateWhoWeAre) {
      return res.status(404).send("Who We Are post not found");
    }

    res.redirect("/view-who-we-are");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/delete-who-we-are/:id", async (req, res) => {
  try {
    const whoWeAreId = req.params.id;
    const deletedWhoWeAre = await WhoWeAre.findByIdAndDelete(whoWeAreId);

    if (!deletedWhoWeAre) {
      return res.status(404).send("Who We Are post not found");
    }
    res.redirect("/view-who-we-are");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/submit_csr", upload.single("image"), async (req, res) => {
  const { author, title, description } = req.body;

  if (!req.file) {
    return res.status(400).send("No file upload.");
  }

  cloudinary.uploader.upload_stream(
    {
      folder: "SGI",
      resource_type: "image",
      // width: 1200, // Set the desired width
      // height: 600,
      //crop: "fill",
    },
    async (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
      }

      // Proceed with saving the new data after successful upload
      try {
        const imageUrl = result.secure_url;

        let newData = new Csr({
          author,
          title,
          description,
          image: imageUrl 
        });

        await newData.save(); 

        res.redirect("view-csr"); 
      } catch (dbError) {
        console.error(dbError);
        return res.status(500).send("Error saving data");
      }
    }
  ).end(req.file.buffer);
});


app.post("/submit", upload.single("image"), async (req, res) => {
  const {
    author,
    title1,
    title2,
    title3,
    description1,
    description2,
    description3,
    description4,
    description5,
    description6,
  } = req.body;

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send("No file upload.");
  }

  // Upload the file to Cloudinary
  cloudinary.uploader
    .upload_stream(
      {
        folder: "SGI",
        resource_type: "image",
        width: 1200, // Set the desired width
        height: 600,
        //crop: "fill",
      },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to upload image to Cloudinary" });
        }

        // You can save the Cloudinary URL or other details to your database
        const imageUrl = result.secure_url;

        // Modify the Cloudinary URL to add width and height parameters
        const resizedImageUrl = cloudinary.url(imageUrl, {
          width: 1200,
          height: 600,
          //crop: "fill",
          //quality: "auto",
        });

        let newBlog = new Blog();
        newBlog.author = author;
        newBlog.title1 = title1;
        newBlog.title2 = title2;
        newBlog.title3 = title3;
        newBlog.description1 = description1;
        newBlog.description2 = description2;
        newBlog.image = resizedImageUrl;
        newBlog.description3 = description3;
        newBlog.description4 = description4;
        newBlog.description5 = description5;
        newBlog.description6 = description6;
        newBlog.save();
      }
    )
    .end(req.file.buffer);
  res.redirect("dashboard");
});

app.get("/view-blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.render("view-blogs", { allBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/view-csr", async (req, res) => {
  try {
    const allCsr = await Csr.find({});
    res.render("view-csr", { allCsr });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit-csr/:id", async (req, res) => {
  try {
    const csrId = req.params.id;
    const allCsr = await Csr.findOne({ _id: csrId });
    if (!allCsr) {
      return res.status(400).send("No Result");
    }
    res.render("edit-csr", { allCsr });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update-csr/:id", upload.single("image"), async (req, res) => {
  try {
    const csrId = req.params.id;
    const {
      title,
      description,
    } = req.body;

    if (!req.file) {
      return res.status(400).send("No file upload.");
    }

    // Convert callback-based Cloudinary uploader to return a Promise
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "SGI",
              resource_type: "image",
              // width: 1200,
              // height: 600,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url); // Resolve with the image URL
            }
          )
          .end(req.file.buffer);
      });
    };

    // Wait for the image to be uploaded to Cloudinary
    const imageUrl = await uploadToCloudinary();
    console.log(imageUrl);

    // Update the blog post in the database including the new image URL
    const updatedBlogPost = await Csr.findByIdAndUpdate(
      csrId,
      {
        $set: {
          title,
          description,
          image: imageUrl,
        },
      },
      { new: true }
    );

    console.log(updatedBlogPost);

    if (!updatedBlogPost) {
      return res.status(404).send("Blog post not found");
    }

    res.redirect("/view-blogs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/delete-csr/:id", async (req, res) => {
  try {
    const csrId = req.params.id;
    const deletedCsr = await Csr.findByIdAndDelete(csrId);

    if (!deletedCsr) {
      return res.status(404).send("Csr post not found");
    }
    res.redirect("/view-csr");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/edit-blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const allBlogs = await Blog.findOne({ _id: blogId });
    if (!allBlogs) {
      return res.status(400).send("No Result");
    }
    res.render("edit-blog", { allBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update-blog/:id", upload.single("image"), async (req, res) => {
  try {
    const blogId = req.params.id;
    const {
      title1,
      title2,
      description1,
      description2,
      description3,
      description4,
      description5,
      description6,
    } = req.body;

    if (!req.file) {
      return res.status(400).send("No file upload.");
    }

    // Convert callback-based Cloudinary uploader to return a Promise
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "SGI",
              resource_type: "image",
              width: 1200,
              height: 600,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url); // Resolve with the image URL
            }
          )
          .end(req.file.buffer);
      });
    };

    // Wait for the image to be uploaded to Cloudinary
    const imageUrl = await uploadToCloudinary();
    console.log(imageUrl);

    // Update the blog post in the database including the new image URL
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      blogId,
      {
        $set: {
          title1,
          title2,
          description1,
          description2,
          description3,
          description4,
          description5,
          description6,
          image: imageUrl,
        },
      },
      { new: true }
    );

    console.log(updatedBlogPost);

    if (!updatedBlogPost) {
      return res.status(404).send("Blog post not found");
    }

    res.redirect("/view-blogs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/blogpost/:id", async (req, res) => {
  const blogId = req.params.id;
  try {
    const result = await Blog.findOne({ _id: blogId });

    if (!result) {
      return res.status(400).send("No Result");
    }
    res.render("blogpost", { result });
  } catch (error) {
    console.error(error);
    return res.status(400).send("No Result");
  }
});

app.get("/singlepost/:id", async(req, res) => {
  const blogId = req.params.id;
  try {
    const result = await Blog.findOne({ _id: blogId });

    if (!result) {
      return res.status(400).send("No Result");
    }
    return res.render("singlepost", {result});
  } catch (error) {
    console.error(error);
    return res.status(400).send("No Result");
  }
  
});

app.get("/blog", async(req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.render("blog", { allBlogs, truncateString });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete-blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlogPost = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlogPost) {
      return res.status(404).send("Blog post not found");
    }
    res.redirect("/view-blogs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.put("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  const updateData = req.body;

  try {
    // { new: true } option returns the document after update was applied
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId },
      updateData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send("Blog post not found.");
    }

    // Optionally, send back the updated blog post
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the blog post.");
  }
});

app.get("/about", async(req, res) => {
  try {
    const allWhoWeAre = await WhoWeAre.find({});
    res.render("about", { allWhoWeAre });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/autotech", (req, res) => {
  res.render("autotech");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// app.post("/login", passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false }) => {
//   // Dummy users
// const users = [{ id: 1, username: 'user', password: 'pass' }];

// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false, { message: 'Incorrect username or password.' });
//     }
//   }
// ));

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.id === id);
//   done(null, user);
// });

// });

app.get("/post-feed", isAuthenticated, (req, res) => {
  res.render("post-feed");
});

app.get("/new-post", isAuthenticated, (req, res) => {
  res.render("new-post");
});

app.get("/view-blogs", isAuthenticated, (req, res) => {
  res.render("view-blogs");
});

app.get("/create-who-we-are", isAuthenticated, (req, res) => {
  res.render("create-who-we-are");
});

app.get("/create-leadership", isAuthenticated, (req, res) => {
  res.render("create-leadership");
});

app.get("/create-csr", isAuthenticated, (req, res) => {
  res.render("create-csr");
});

app.get("/create-autotech", isAuthenticated, (req, res) => {
  res.render("create-autotech");
});

app.get("/create-technology", isAuthenticated, (req, res) => {
  res.render("create-technology");
});

app.get("/create-export", isAuthenticated, (req, res) => {
  res.render("create-export");
});

app.get("/create-energy", isAuthenticated, (req, res) => {
  res.render("create-energy");
});

app.get("/create-finance", isAuthenticated, (req, res) => {
  res.render("create-finance");
});

app.get("/create-investment", isAuthenticated, (req, res) => {
  res.render("create-investment");
});

app.get("/create-real_estate", isAuthenticated, (req, res) => {
  res.render("create-real_estate");
});

app.get("/create-mining", isAuthenticated, (req, res) => {
  res.render("create-mining");
});

app.get("/create-career", isAuthenticated, (req, res) => {
  res.render("create-career");
});

app.get("/create-blog", isAuthenticated, (req, res) => {
  res.render("create-blog");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid"); // Depending on your session store, you may need to clear the cookie.
    res.redirect("/login");
  });
});

(async () => {
  try {
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server Connection Failed");
        throw err;
      }
      console.log(`Database Established to port ${PORT}`);
    });
  } catch (err) {
    console.log("Database Connection Error");
    throw err;
  }
})();
