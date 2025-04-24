import requests
from bs4 import BeautifulSoup

prompt = input("Prompt: ").replace(' ', '+')
pages = int(input("Pages: "))
page_links = []

for i in range(pages):
    num = i * 10
    res = requests.get(f"https://scholar.google.com/scholar?as_sdt=0%2C47&hl=en&q={prompt}&safe=active&start={num}&surl=1")
    soup = BeautifulSoup(res.text, 'html.parser')
    links = soup.select('.gs_rt > a')
    page_links.append(links)


def format_gs(gs_vals):
    srted_gs = gs_vals
    for story in srted_gs:
        print(f"______________________\n"
              f"{story['title']}\n"
              f"{story['link']}")

def create_custom_gs(lnks):
    gs = []
    for item in lnks:
        title = item.getText()
        link = item.get('href', None)
        gs.append({'title': title, 'link': link})
    return format_gs(gs)

for section_link in page_links:
    create_custom_gs(section_link)
