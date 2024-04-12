# Music Search and Discovery Web Application
This is a web application that allows users to search and view information about music artists and their albums. Users can sign up, log in with their Google account, and perform various functionalities related to artist and album search, as well as saving favorite artists and albums to their profile.

## Features
* User authentication with Google account
* Artist search: search for artists by name and view their basic information, top tracks, albums, and related artists
* Album search: search for albums by name and view their basic information, including the artist, release date, and track list
* Favorite artists and albums: logged-in users can save their favorite artists and albums to their profile and manage them (add, edit, delete)
* Intuitive and user-friendly interface
* Frontend built with ReactJS
* Integration with Last.fm API for artist and album data
* Dockerized project for easy deployment

## Technologies Used
* Laravel (v10)
* PHP (v8)
* ReactJS (or VueJS)
* Last.fm API
* Google Sign-in API
* Docker


# Getting Started
### To run the project locally, follow these steps:

### Prerequisites

- Docker and Docker Compose should be installed on your machine. You can download them from [https://www.docker.com](https://www.docker.com).



#### Clone the Repository

1. Open your terminal or command prompt.
2. Change the current working directory to the location where you want to download the project.
3. Run the following command:

Clone the repository:
```
$ git clone https://github.com/kculz/InspireLabs-Assessment.git
```
Change directory to root folder of the project.
```
$ cd InspireLabs-Assessment
```
To start project run

```
docker-compose up
```

# Screenshots
![Landing page](screenshots/landing.png)
![Sign up page](screenshots/signup.png)
![Google sign in page](screenshots/google-signup.png)
![Login page](screenshots/login.png)
![Home page](screenshots/home-page.png)
![Artist search results page](screenshots/artist-search.png)
![Album search result page](screenshots/album-search.png)
![Profile page](screenshots/profile.png)
