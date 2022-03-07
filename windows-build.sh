rm ./dist/survey.h5p
7z a -r -tzip ./dist/survey.h5p H5PEditor.**/*.js H5PEditor.**/*.json H5PEditor.**/language/*.json H5PEditor.**/*.css H5P.Survey/*.* h5p.json content/**.json content/audio/**.wav content/images/**.png -x!content/audio/*/ -x!content/images/*/
