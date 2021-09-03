/*
 * Author: Vyn
 * Created: 2020-06-10 04:27
 * Modified: 2020-06-10 05:25
 */

const { app, BrowserWindow, shell } = require("electron")
const path = require("path")
require("@electron/remote/main").initialize()

function createWindow () 
{
	const isDev = process.env["NODE_ENV"] === "development"
	// Create the browser window.

	const win = new BrowserWindow({
		width: 1080,
		height: 600,
		icon: "./public/logo192.png",
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false
		}
	})

	// and load the index.html of the app.
	
	if (isDev)
	{
		win.loadURL("http://localhost:3000")
	}
	else
	{
		win.loadFile("./build/index.html")
		win.removeMenu()
	}

	win.webContents.on("will-navigate", (event, url) => 
	{
		event.preventDefault()
		shell.openExternal(url)
	});

	// Open the DevTools.
	// win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => 
{
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") 
	{
		app.quit()
	}
})

app.on("activate", () => 
{
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) 
	{
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.