import glob, os

# Change this to the path to your sync_pstn_tni folder
paths = ['./sync_calling_concore-docs/Content/TSGs/'] #['./sync_pstn_tni/', './sync_calling_concore-docs/']

# Change this to the path to your PDFs folder
output_path = './PDFs'

def get_markdown_files(folder):
    markdown_files = []
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(os.path.join(root, file))
    return markdown_files

# Find all markdown files in the sync_pstn_tni folder
files = []

for path in paths:
    files += get_markdown_files(path)
    #files.append(glob.glob(path))

# Convert each markdown file to PDF and save it to the PDFs folder
for file in files:
    # Get the file name without the extension
    file_name = os.path.splitext(os.path.basename(file))[0]
    # Convert the file to PDF
    os.system(f'pandoc "{file}" --pdf-engine=xelatex -o "{output_path}/{file_name}.pdf"')