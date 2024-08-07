const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


var corsOptions = {
  origin: "https://gateentry.heliostechsolutions.in",
  credentials: true,
  optionsSucessStatus:200
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let clients = [];
let newDataAvailable = false;
let data;

const updateData = (newData) => {
  data = newData;
  newDataAvailable = true;
  console.log("new Data available");
};

// Function to send data to connected clients via SSE

app.post("/webhook", async (req, res) => {
  var jsonData = req.body;

  // const preCheckResponse

 

  updateData(jsonData);

  res.status(200).send("Data agyi");
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();
  const clientId = Date.now();
  clients.push({ clientId, res });
  // Immediately send a comment to flush headers
  res.write(":\n\n");
  var intervalId;

  try{
    intervalId = setInterval(() => {
      if (newDataAvailable) {
       clients.forEach((client)=>client.res.write(`data: ${JSON.stringify(data)}\n\n`));
        newDataAvailable = false; // Reset flag after sending data
      }
    }, 1000);
    console.log("yes events worked");
  }
  catch(error){
    console.error(error);
  }
  

  

  res.on("close", () => {
    clearInterval(intervalId); // Clear interval when client disconnects
  });
});

const port = 443;

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
