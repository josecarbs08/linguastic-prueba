import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Regular expressions to find sections
# This assumes the section has an id and ends with </section> properly without nested sections
def extract_section(html, section_id):
    # Regex logic to match <section id="XYZ"> ... </section>
    # Since there could be nested elements, we'll just try to find it using string manipulation or a simple regex if it doesn't have nested <section>
    # Actually, index.html doesn't have nested <section> inside these sections usually.
    pattern = re.compile(rf'(<section[^>]*id="{section_id}"[^>]*>.*?</section>)', re.DOTALL)
    match = pattern.search(html)
    return match.group(1) if match else None

clases_sec = extract_section(html, 'clases')
languages_sec = extract_section(html, 'languages')
opening_courses_sec = extract_section(html, 'opening-courses')

# For index.html: replace them with nothing, or maybe a small CTA that points to the new page.
# For now, let's just remove them.
index_html = html.replace(clases_sec, '') if clases_sec else html
index_html = index_html.replace(languages_sec, '') if languages_sec else index_html
index_html = index_html.replace(opening_courses_sec, '') if opening_courses_sec else index_html

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

# For programas.html: Keep only the relevant sections in the main body.
# Let's remove all other main sections from programas.html
def keep_sections(file_path, sections_to_keep):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # List of all sections in index.html: hero, why, clases, languages, noticias, opening-courses, why-learn, benefits, etc.
    all_sections = ['hero', 'why', 'clases', 'languages', 'noticias', 'opening-courses', 'faq', 'reviews']
    for sec_id in all_sections:
        if sec_id not in sections_to_keep:
            sec_content = extract_section(content, sec_id)
            if sec_content:
                content = content.replace(sec_content, '')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

keep_sections('programas.html', ['languages', 'opening-courses'])
keep_sections('clases.html', ['clases'])

print("Extraction complete")
