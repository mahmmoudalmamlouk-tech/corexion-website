# COREXION website

Static website for corexion.uk (HTML, CSS, a little JavaScript).

## Pages
index.html, who-we-are.html, services.html, projects.html, sectors.html,
insights.html, contact.html, insights/<article>.html, 404.html

## Deploy on Railway
Railway builds the Dockerfile automatically (nginx serving these files on $PORT).

## Add a new article
Copy any file in /insights, change the title, summary and text,
then add a card for it on insights.html and a line in sitemap.xml.

## Contact form
The form opens the visitor's email app with the enquiry addressed to
info@corexion.uk. It can later be connected to a form service.
