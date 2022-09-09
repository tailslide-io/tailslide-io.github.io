// Dynamic Table of Contents

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        document.querySelectorAll(".active").forEach((z) => {
          z.classList.remove("active");
        });
        document.querySelector(`a[href="#${id}"]`).classList.add("active");
      }
    });
  },
  { rootMargin: "0px 0px -75% 0px" }
);

document
  .getElementById("content")
  .querySelectorAll("h2,h3")
  .forEach(function (heading, i) {
    observer.observe(heading);
    let str = heading.innerHTML;
    str = str
      .replace(/\s+/g, "-")
      .replace(/[°&\/\\#,+()$~%.'":;*?<>{}]/g, "")
      .toLowerCase();
    heading.setAttribute("id", str);
    const item = document.createElement("a");
    item.innerHTML = heading.innerHTML;
    "h2,h3".split(",").forEach(function (x) {
      if (heading.tagName.toLowerCase() == x) {
        item.classList.add("tocitem", "toc-" + x);
      }
    });
    item.setAttribute("href", "#" + str);
    document.querySelector("#toc").appendChild(item);
  });

// SDK Code Display

const jsButton = document.getElementById("sdk-js");
const rubyButton = document.getElementById("sdk-ruby");
const pythonButton = document.getElementById("sdk-python");
const goButton = document.getElementById("sdk-go");
const codeBlock = document.getElementById("sdk-code");
const sdkHeader = document.getElementById("sdk-header");
const handleClick = (lang) => {
  replaceCode(lang);
  replaceHeader(lang);
  Prism.highlightElement(codeBlock);
};

const replaceHeader = (lang) => {
  switch (lang) {
    case "js":
      sdkHeader.textContent = "tailslideSDK.js";
      break;
    case "ruby":
      sdkHeader.textContent = "tailslideSDK.rb";
      break;
    case "python":
      sdkHeader.textContent = "tailslideSDK.py";
      break;
    case "go":
      sdkHeader.textContent = "tailslideSDK.go";
      break;
  }
};

const replaceCode = (lang) => {
  switch (lang) {
    case "js":
      codeBlock.innerHTML = `const FlagManager = require('tailslide');

const config = {
  natsServer: 'nats://localhost:4222',
  natsStream: 'flags_ruleset',
  appId: 1,
  userContext: '375d39e6-9c3f-4f58-80bd-e5960b710295',
  sdkKey: 'myToken',
  redisHost: 'http://localhost',
  redisPort: 6379,
};

const manager = new FlagManager(config);
await manager.initialize();`;
      codeBlock.className = "language-js";
      break;
    case "ruby":
      codeBlock.innerHTML = `require "async"
require('tailslide')

config = {
    nats_server: "nats://localhost:4222",
    nats_stream: "flags_ruleset",
    app_id: 1,
    user_context: "375d39e6-9c3f-4f58-80bd-e5960b710295",
    sdk_key: "myToken",
    redis_host: "http://localhost",
    redis_port: 6379,
}

Async do |task|
    manager = FlagManager.new(**config)
    manager.initialize_flags

end`;
      codeBlock.className = "language-ruby";
      break;
    case "python":
      codeBlock.innerHTML = `import asyncio
from tailslide import FlagManager

config = {
    "nats_server": "nats://localhost:4222",
    "nats_stream": "flags_ruleset",
    "app_id": 1,
    "user_context": "375d39e6-9c3f-4f58-80bd-e5960b710295",
    "sdk_key": "myToken",
    "redis_host": "http://localhost",
    "redis_port": 6379,
}

async def main():
    manager = FlagManager(**config)
    await manager.initialize()

asyncio.run(main())`;
      codeBlock.className = "language-py";
      break;
    case "go":
      codeBlock.innerHTML = `import (
  tailslide "github.com/tailslide-io/tailslide.go"
)

func main(){
  config := tailslide.FlagManagerConfig{
    NatsServer:  "nats://localhost:4222",
    NatsStream:  "flags_ruleset",
    AppId:       "1",
    UserContext: "375d39e6-9c3f-4f58-80bd-e5960b710295",
    SdkKey:      "myToken",
    RedisHost:   "http://localhost",
    RedisPort:   "6379",
  }

  manager := tailslide.NewFlagManager(config)
  manager.InitializeFlags()
}`;
      codeBlock.className = "language-go";
      break;
  }
};

jsButton.addEventListener("click", (e) => handleClick("js"));
rubyButton.addEventListener("click", (e) => handleClick("ruby"));
pythonButton.addEventListener("click", (e) => handleClick("python"));
goButton.addEventListener("click", (e) => handleClick("go"));
