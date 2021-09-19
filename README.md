**This application in under development.**

SoftWiki is a wiki-like application, available on Linux and Windows.

![presentation](images/v1.5.0-alpha_presentation.png)

## Features

- Mardown syntax.
- Store your notes locally in markdown files. (using a [server](https://github.com/softwiki/softwiki-server) is now possible but is an experimental feature).
- Manage your notes with projects.
- Put tags on your notes.
- Select the theme you want (but honestly why would you chose something else than the dark theme) <= Not finished yet.

## Roadmap & ideas

*As I'm doing this application mainly for my own needs, I might or not implement the following features, but in an ideal world, I probably would.*

- Data encryption.
- Web application.
- Mobile application.

## Download

[Download links here](https://public-downloads.vyndev.com)

*Windows will probably prevent you to run it the first time, so it's trust it or build it yourself from source*.

## Build from source

*I only tried to build from (Arch) Linux, so I will only provide the steps for linux for the moment,
however you might be able to build it from Windows using WSL or something else using docker.*

### Using docker (Linux)

I tried to simplify the process as mush as possible by using docker.  
So if you have docker installed, all you need is to run `sh build-with-docker.sh` in the root folder of the project.
it will basically create the needed image and run it, you'll then have the build outputs in
`electron/out` with multiple form (executables, zip, squirrel).

### Classic way (still linux, but without docker)

Todo, But look at the `install_required_packages.sh` and `build.sh`

## Why?

I always wanted to have my own wiki to store my knowledge, notes and other things that can be stored in a text file.  
The reason for creating my own application instead of using another markdown app, is mainly because I like to create
things from scratch and want to be able to improve it if I need without depending on someone else.  
I'm also using this project for learning purposes so the code won't be perfect at first.  
  
I plan to let the application free and open source, no paid plan or whatever to use it.

## License

GPLv3, See the [LICENSE](LICENSE.md).
