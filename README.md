# WhatsApp Quick Connect

A lightweight Firefox extension that automatically detects phone numbers on any webpage and transforms them into direct WhatsApp Web links.

## Features
* **Automatic Detection:** Scans text nodes for phone number patterns using optimized regex.
* **Smart Linking:** Converts numbers into `wa.me` links instantly.
* **Non-Intrusive:** Uses `TreeWalker` API to ensure the website's original functionality and performance aren't affected.
* **Clean UI:** Highlights detected numbers with the official WhatsApp green color for easy identification.

## Project Structure
* `manifest.json`: Extension configuration and permissions.
* `content/phone-detector.js`: Logic for DOM scanning and link injection.
* `assets/`: Icons and static resources.

## Installation (Manual/Development Mode)
Since this extension is in development, you can load it manually in Firefox:

1. Clone this repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/whatsapp-quick-connect.git](https://github.com/YOUR_USERNAME/whatsapp-quick-connect.git)
