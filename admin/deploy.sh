#!/bin/sh
cd static && rsync -v --exclude=*~ * root@globalsettings.org:/sites/globalsettings.org/ 
