# Carriage Music Manager
Carriage Music Manager is a desktop application for managing your collection of music files. If you have a collection of music files, chances are they’re in a variety of formats with a number of different naming conventions. You could rename them yourself, but that’s a pain. 

Carriage allows you to select several “source” folders where your music can come from. This can be anywhere you currently keep your music files (for instance, a folder of loose, uncategorized MP3s.) It will scan these folders and copy them to a central collection folder, according to a standard naming scheme (by default: Artist/Album/TrackNumber-SongTitle.mp3, but you can change this if you like.) It will also transcode each of the files into a common format (default: MP3.) Once you have this canonical collection, Carriage will scan the source folders as often as you like and add any new songs. 

It does not affect your original files. 

# FAQ
## Why not use XYZ other tool for this?
Carriage is graphical and easy to use. It has an opinionated configuration out of the box, so if you want it to just work, you can just add all your music and go. In short, it’s designed to be more user-friendly and easier to use than other existing music library tools. 

## Where does Carriage get song information? 
Carriage reads the metadata of the file itself to determine artist, album, track number, song title, etc. If your files do not have this information, you will have to update them some other way before Carriage is useful to you.

## Why does Carriage transcode to MP3 by default? 
MP3 is the most widely readable lossy format, and Carriage is designed to produce a library of files that are easy to access.

## Will Carriage re-encode MP3s? 
No. If a file is already in MP3 format, it will be copied, not re-encoded.

## Why Carriage? 
In a Jukebox, the “carriage” is the piece that actually carries the record to be placed on the platter. I wanted a name that was vaguely reminiscent of music organization. 

# Suggested Folder Configuration
You can get files into Carriage however you like, and organize your source folders in whatever way you please. This is how I do it, and you’re welcome to copy it. 

My music goes into four folders:
- MP3 Music
- FLAC Music
- WAV Music
- iTunes Media/Music

These are loosely organized in the format I want (Artist/Album), since that’s how most downloads end up anyway. Aside from arranging files this way, I don’t touch them and I let Carriage do all the rest.
