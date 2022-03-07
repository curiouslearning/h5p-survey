rm ./dist/survey.h5p
zip -r -X -D ./dist/survey.h5p H5PEditor.** H5P.Survey h5p.json content/**.json content/audio/**.wav content/images/**.png -x content/**/\*
