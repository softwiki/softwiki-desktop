# Changelog
All notable changes to this project will be documented in this file.  
  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).  
  
The changelog history starts with version 1.3.0-alpha, previous versions exist but were very early testing builds.

## 1.4.0-alpha [2021-08-20]

This version provides new features, improved UI and bug fixes.

### Added

- Markdown file support
  - Notes are saved directly in your file system, meaning you can access them with the any editor.
  - A note is mapped to a file and a category is mapped to a directory. (Nested directory is not supported)

- Browser support
  - Mainly for demo purpose because there is no "public server" for storing the data.
  - All data are saved in the local storage in the client's browser.

- Categories.
  - Group notes under the same category.
  - New notes are automatically assigned to the current selected category.
  - Switch the note to another category when you want.

- Tags panel.
  - Tags are now visible under the categories panel on the left side.
  - Add, modify and delete tags directly from this panel.
  - Clicking on a tag select it as notes filter, holding CTRL when selecting tags allows multiple selection.

- Context menu (right click).
  - Some elements use the new context menu, instead of a buttons bar.

- Error handling
  - Check and errors messages.

- New application icon.

### Changed

- New UI design.
  - The interface has been revamped to use a more "flat" style.

 
- Replaced the note viewer buttons by a context menu.
- Notes are now saved only if modified when switching note or closing edit mode.
- Automatically focus the note when created with edit mode enabled.
- Note default title is now "Untitled".

### Fixed

- Tags in filters and "Add tag" section do not wrap lines anymore.
- Default tags no longer have 0.5 opacity.
- Clicking outside of the color picker when editing tag color now close the color picker.
- Filters and Sort buttons trigger zone is now fine and the and clicking outside of the opened panel now close it properly.

### Removed

- Tags settings is removed due to the new tags panel.
- Tags filtering above notes is removed due to the new tags panel.

## [1.3.0-alpha] 2021-07-18

This version aim to add basics features and fixe some bugs and unexpected behaviors.

### Added

- Font customization (family, size).
- Sort feature.
- Search feature.
- Filters (by tags) feature.
- Readme file, with presentation and build instructions.

### Changed

- Combo box components use new style.
- Settings panel use new style.

### Fixed

- The current theme is now correctly selected when opening the settings panel.
- The settings panel no longer closes after deleting a tag.
- The note list no longer goes out of the window and now display the scrollbar correctly.
- The first created note now display correctly.