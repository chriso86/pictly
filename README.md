# pictly

Search for photos based on location which you can search for using Google Maps.

---

## Installation

You will need the following tools to install pictly:

- [Node](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Docker (optional)](https://www.docker.com/products/docker-desktop)

### Version information

These are the versions that I used while creating this project:

- Node - 12.16.1
- npm - 6.13.4
- Angular CLI - 9.0.4

### Step 1. Getting the repository

The first step is to clone the pictly code repository using Git;

1. Firstly open a bash or command prompt and navigate to the folder where you would like to clone the repository.

2. Then you will need to run the Git command to clone the repository, run the following command in the bash/cmd now that you have navigated to the folder that you would like to clone the project to:

``` git
git clone https://github.com/chriso86/pictly
```

### Step 2. Getting Angular CLI

The next step is to install the Angular CLI globally using Node's package manager, also known as npm.

1. Navigate into the pictly folder that was cloned into your directory.

2. Then run the following command to install Angular CLI globally:

``` npm
npm i @angular/cli -g
```

3. Once that is done, we can install the rest of the project dependencies using the following command:

``` npm
npm i
```

---

## Running the Project

Hopefully you are still in the same folder.
We will need to run another npm command in the same folder to run the project:

``` npm
npm start
```

This will take a while to start, but once it has started, you can access the project at the following URL in your browser:

[http://localhost:4200](http://localhost:4200)

---

## The Docker way

Since this way is a little more involved if you have not already got Docker and docker-compose, it is optional.

I am not going to explain how to install Docker, but if you're on Windows, it should be pretty simple.

It may just require a restart.

Please note that you **DO NEED** the repository for this step as well, because you will need the "docker-compose.yml" file that lives in the code repository.

You can also download this file on it's own from the repository link, if you are that way inclined:

[pictly-repository/](https://github.com/chriso86/pictly)

_Assuming_ that you have Docker and docker-compose installed, if you follow these steps, you should be up and running quickly:

1. Ensure that you have the docker-compose.yml file on your local machine.
2. Navigate to the folder with the docker-compose.yml in it (using bash or command prompt)
3. Run the following command:

``` docker
docker-compose up
```

This should pull the image from the docker registry, and spin up a Docker container with the app running inside it.

You can still access the site in the browser at the following URL:

[http://localhost:4200](http://localhost:4200)

P.S. Don't forget to "docker-compose down" after you have stopped the containers.

This will remove the containers added and any networks created.
