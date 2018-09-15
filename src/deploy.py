import os
import fnmatch
import re

for file in os.listdir('.'):
    if fnmatch.fnmatch(file, 'main.*.js'):
        main_file = file
        print('Main file is ' + main_file)

if main_file:
    with open('200.html', 'r') as file:
        file_data = file.read()

    updated_file_data = re.sub(r"main\.\w+\.js", main_file, file_data)

    with open('200.html', 'w') as file:
        print('Writing file data...')
        file.write(updated_file_data)

input('All done')
