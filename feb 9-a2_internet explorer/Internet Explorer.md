# Internet Explorer - Understanding the Web

## Part 1: How the Internet Works

### What is the Internet?

The Internet is a massive global network of interconnected computers that communicate using standardized protocols. Think of it as a gigantic web of roads connecting every city on earth — data travels along these roads from one computer to another, finding the best route to reach its destination.

At its core, the Internet relies on a set of rules called **TCP/IP** (Transmission Control Protocol/Internet Protocol) that ensure data is sent, received, and reassembled correctly regardless of the path it takes.

### Client-Server Architecture

When you use the Internet, your device acts as a **client** — it requests information. The machine that stores and delivers that information is called a **server**.

| Component | Role | Example |
|-----------|------|---------|
| Client | Sends requests for resources | Your browser (Chrome, Firefox) |
| Server | Processes requests and sends back responses | Google's web servers |
| Protocol | Rules for communication | HTTP, HTTPS, FTP |
| Network | The pathway connecting client and server | ISP, routers, cables |

Here's a simplified flow:

1. You type a URL (e.g., `www.google.com`) into your browser.
2. Your browser contacts a **DNS server** to convert the domain name into an IP address — like looking up a title in a **library catalogue** to find the shelf number where the book is kept.
3. Your browser sends an **HTTP request** to the server at that IP address.
4. The server processes the request and sends back an **HTTP response** containing the webpage data (HTML, CSS, JavaScript).
5. Your browser **renders** (draws) the page on your screen.

### Key Protocols

- **HTTP (HyperText Transfer Protocol):** The standard protocol for transferring web pages. It defines how messages are formatted and transmitted.
- **HTTPS:** The secure version of HTTP. Data is encrypted so that third parties cannot intercept or tamper with it.
- **TCP (Transmission Control Protocol):** Breaks data into packets, sends them, and ensures they arrive completely and in the correct order.
- **IP (Internet Protocol):** Handles addressing — it makes sure packets are sent to the right destination using IP addresses.
- **DNS (Domain Name System):** Translates human-friendly domain names (like `google.com`) into machine-readable IP addresses (like `142.250.190.14`). Essentially the Internet's library catalogue.

### IP Addresses and Ports

Every device connected to the Internet has an **IP address** — a unique numerical label. There are two versions in use:

| Version | Format | Example |
|---------|--------|---------|
| IPv4 | Four groups of numbers (0-255) separated by dots | `192.168.1.10` |
| IPv6 | Eight groups of hexadecimal values separated by colons | `2001:0db8:85a3::8a2e:0370:7334` |

**Ports** are like apartment numbers within a building (the IP address being the building). They identify specific services running on a machine:

| Port | Service |
|------|---------|
| 80 | HTTP (web traffic) |
| 443 | HTTPS (secure web traffic) |
| 21 | FTP (file transfers) |
| 25 | SMTP (sending emails) |
| 3306 | MySQL (database) |

---

## Part 2: How Websites Work

### The Three Pillars of a Webpage

Every webpage you see is built from three core technologies:

1. **HTML (HyperText Markup Language):** Provides the skeleton — the structure and content of the page (headings, paragraphs, images, links).
2. **CSS (Cascading Style Sheets):** Provides the skin — the visual appearance (colours, fonts, spacing, layout).
3. **JavaScript:** Provides the muscles — the interactivity and dynamic behaviour (animations, form validation, data fetching).

Think of building a house: HTML is the walls, floors, and roof. CSS is the paint, wallpaper, and furniture arrangement. JavaScript is the electricity, plumbing, and smart-home features that make everything functional.

### Static vs Dynamic Websites

| Feature | Static Website | Dynamic Website |
|---------|---------------|-----------------|
| Content | Fixed, same for every visitor | Changes based on user, time, or data |
| Technologies | HTML, CSS, (minimal JS) | HTML, CSS, JS + backend (Python, Node.js, PHP) |
| Database | Not required | Usually requires one (MySQL, MongoDB) |
| Speed | Generally faster | May be slower due to server processing |
| Example | A personal portfolio page | Facebook, Amazon, Twitter |

### Frontend vs Backend

| Aspect | Frontend | Backend |
|--------|----------|---------|
| Also called | Client-side | Server-side |
| What it does | What the user sees and interacts with | Logic, database, authentication behind the scenes |
| Languages | HTML, CSS, JavaScript | Python, Java, Node.js, PHP, Ruby |
| Frameworks | React, Angular, Vue | Django, Flask, Express, Spring Boot |
| Runs on | User's browser | Web server |

### How a Webpage Loads — Step by Step

1. **URL Entry:** User types `www.example.com` in the address bar.
2. **DNS Lookup:** Browser queries DNS to resolve the domain into an IP address.
3. **TCP Connection:** Browser establishes a connection with the server via TCP (a three-way handshake: SYN → SYN-ACK → ACK).
4. **HTTP Request:** Browser sends a GET request for the page.
5. **Server Processing:** Server locates the requested resource, possibly queries a database, and builds a response.
6. **HTTP Response:** Server sends back HTML along with status codes (e.g., `200 OK`, `404 Not Found`).
7. **Rendering:** Browser parses HTML, fetches linked CSS and JS files, and paints the page on screen.

### Common HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 301 | Moved Permanently | Resource has a new permanent URL |
| 400 | Bad Request | Server could not understand the request |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Requested resource does not exist |
| 500 | Internal Server Error | Something went wrong on the server |

### Web Browsers

A web browser is software that retrieves, interprets, and displays web content. Major browsers include:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari
- Opera

Browsers contain a **rendering engine** (e.g., Blink in Chrome, Gecko in Firefox) that converts HTML/CSS into the visual page you see, and a **JavaScript engine** (e.g., V8 in Chrome) that executes scripts.

---

## Summary

The Internet is a vast interconnected network where clients request resources from servers following standardized protocols like HTTP/HTTPS. Domain names are translated to IP addresses by DNS, and web pages are built from HTML (structure), CSS (styling), and JavaScript (interactivity). Understanding this client-server model is the foundation for learning full-stack web development.

---

*Prepared by Shreya N | SuperMentr FSWD Internship | February 2026*
