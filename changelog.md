# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.3] - 2020-10-21

### Added

- MomentJS module added for time stamping/formatting errors
- Utils file with re-usable functions

### Fixed

- If existing wins in !Won module was a string, it would not assign default value as 0 due to the variable being declared as a const

### Change

- Changelog headings amended
- Try/Catch blocks now added to each individual module to handle exceptions, logging the error message/stack/timestamp
- No longer passing gamestore data to modules, now held in utils file

### Removed

- Try/Catch from main server.js file

## [1.0.2] - 2020-10-18

### Added

- Check module now checks if the game is a valid game within the GameStore file
- Add module now checks if a profile already has the game within the profile

### Fix

- Fixed previous issue where property value returning undefined after using !won command by converting returned data toObject

## [1.0.1] - 2020-10-18

### Added

- Check module now checks if the game is a valid game within the GameStore file

### Fix

- Won module correctly searching 'search' property of JSON objects instead of 'name'
- Check module correctly searching 'search' property of JSON objects instead of 'name'

## [1.0.0] - 2020-10-18

### Added

- New changelog file from v1.0.0
- Addtional games to GameStore file
- Prevention of Strings being initially added as a value in !Add module

### Changed

- Wording of the Won modules description
- Wording of reply message in Won module when upon successfully incrementing
- Explaining !add more in 'Commands' section of README

### Fixed

- Fixed property value returning undefined after using !won command
