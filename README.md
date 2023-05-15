
# InstaSite

![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=whit)![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![fabricjs](https://shields.io/badge/-FabricJS-orange?style=for-the-badge)

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)![font-awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

InstaSite is a Python and React project meant to allow users to make simple websites using a GUI interface for template design, and a rich text editor for content. It was created as a final portfoilio project by Brandon Etter.

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


## Developer Experience

This is my second time building an editor using Draft.JS, but it's application was significantly more complex than I had initially thought. The editor needed to be able to **consistently** export HTML and load that HTML back into the Editor state, and each additional feature into the Editor brought it's own unique challenges to overcome regarding that consistency. Outside of making this a learning experience- I think I would much rather use a prebuilt editor maintained by several developers over years instead of one I was making in tandem with other features over the course of a couple weeks. In the end, I ended up learning a lot about controlling entity-state inside DraftJS and I'm proud of the final result.



https://github.com/brandonetter/SiteEditor/assets/4108484/296bf088-3a98-4b12-906d-2a29fa1d4526



Much of the work involved parsing through the exported HTML from the editor, and combining it with the full DIV styling controls like 'alignment' and 'font-family'. The final product needed to then be further parsed to provide two different versions of each page. One for the preview and one for the final output. The links inside of the preview are controlled with javascript to change the page content by communicating back with the main page instead of actually navigating the page. I had been previously unaware that child-windows created with JS could communicate and call functions from the main window- this luckily made the process very easy.

