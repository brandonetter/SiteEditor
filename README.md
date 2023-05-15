
# InstaSite

![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=whit)![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![fabricjs](https://shields.io/badge/-FabricJS-orange?style=for-the-badge)

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)![font-awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)![socket-io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)

InstaSite is a Python and React project meant to allow users to make simple websites using a GUI interface for template design, and a rich text editor for content.

---

[![live](https://shields.io/badge/-LIVE%20SITE-brightgreen/?style=for-the-badge)](http://instasite.onrender.com)

The application is hoster on Render.com

---

## Building the App

    pip install -r requirements.txt
    pip install psycopg2
    flask db upgrade
    flask seed all
    npm install --prefix react-app
    npm run build --prefix react-app

After a successful build the application can then be ran using gunicorn

    gunicorn app:app
To remove all messages, channels, dms and reset back to initial DB state run:

    flask seed undo

---

## Features

- Rich text editor build with [Facebook's Draft.JS](https://draftjs.org/)
- GUI based template editor built using FabricJS and the HTML5 Canvas
- Export working HTML in a ZIP file
- Create and Edit pages in real-time controlling:
    -  Font Size
    - Font Family
    - Background Color 
    - Add Header Tags
    - Add Lists
    - Formatting with Bold, Underline, and Italics
    - Insert Images
    - Control DIV alignment

## Feature Highlights



https://github.com/brandonetter/SiteEditor/assets/4108484/2dfaff8a-f5b8-4c7e-8322-076ae09195e0


Drag and Drop design editor

https://github.com/brandonetter/SiteEditor/assets/4108484/0f0f87f3-4fe5-406d-9a89-5e96d08333ff

Live Editor With Features

## Database Design 
![db](https://user-images.githubusercontent.com/4108484/233222260-777b5b7e-1e87-4c18-844a-43e05fe423da.png)

A simple database design where each user has several projects. Each project has several files. Each file has many-to-one relationship with templates. Each file has a one-to-one relationship with FileContent





