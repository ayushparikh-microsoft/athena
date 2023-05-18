import re

def nonewlines(s: str) -> str:
    return s.replace('\n', ' ').replace('\r', ' ')

def linkify(input_text: str):
    # URLs starting with http://, https://, or ftp://
    replace_pattern1 = r'(^|[^\/])(www\.[\S]+(\b|$))'
    replace_pattern2 = r'(^|[^\/])(https?:\/\/[\S]+(\b|$))'
    replace_pattern3 = r'(^|[^\/])(ftp:\/\/[\S]+(\b|$))'

    # Replace links with anchor tags
    # <a href="#" onclick='window.open("http://www.foracure.org.au");return false;'></a>
    # r'\1<a href="http://\2" target="_blank">\2</a>'
    # r'\1<a href="\2" target="_blank">\2</a>'
    # r'\1<a href="\2" target="_blank">\2</a>'
    replaced_text = re.sub(replace_pattern1, r'<a href="http://\2" onclick=window.open(\2);return false;>\2</a>', input_text)
    replaced_text = re.sub(replace_pattern2, r'<a href="\2" onclick=window.open(\2);return false;>\2</a>', replaced_text)
    replaced_text = re.sub(replace_pattern3, r'<a href="\2" onclick=window.open(\2);return false;>\2</a>', replaced_text)

    return replaced_text
