import os
import fnmatch
import re

for file in os.listdir('.'):
    if fnmatch.fnmatch(file, 'main-es2015.*.js'):
        main_file = file
    elif fnmatch.fnmatch(file, 'polyfills-es2015.*.js'):
        polyfill_file = file
    elif fnmatch.fnmatch(file, 'runtime-es2015.*.js'):
        runtime_file = file
    elif fnmatch.fnmatch(file, 'styles.*.css'):
        styles_file = file

with open('200.html', 'r') as file:
    file_data = file.read()

    main_replacement = re.sub(r"main-es2015\.\w+\.js", main_file, file_data)
    polyfill_replacement = re.sub(r"polyfills-es2015\.\w+\.js", polyfill_file, main_replacement)
    runtime_replacement = re.sub(r"runtime-es2015\.\w+\.js", runtime_file, polyfill_replacement)
    styles_replacement = re.sub(r"styles-es2015\.\w+\.css", styles_file, runtime_replacement)

with open('200.html', 'w') as file:
    print('Writing file data...')
    file.write(styles_replacement)   

input('All done')
