from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from bs4 import BeautifulSoup
import re
def onewayScrape(departureCode,destinationCode,departureDate):
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument(f'user-agent={user_agent}')
    driver = webdriver.Chrome(options=options)

    url = f'https://www.kayak.com/flights/{departureCode}-{destinationCode}/{departureDate}'
    #url = f'https://www.kayak.com/flights/{departureCode}-{destinationCode}/{departureDate}/2024-06-08?sort=bestflight_a'

    driver.get(url)


    # flight_rows_present = EC.presence_of_element_located((By.XPATH, '//div[@class="nrc6-inner"]'))
    # WebDriverWait(driver, 10).until(flight_rows_present)
    driver.set_page_load_timeout(20)
    flight_rows = driver.find_elements(By.XPATH, '//div[@class="nrc6-inner"]')

    prices = []
    departure_times = []
    flight_durations = []
    stops_info = []
    layover_durations = []
    layover_airports = []

    for element in flight_rows:
        elementHtml = element.get_attribute("outerHTML")
        elementSoup = BeautifulSoup(elementHtml, 'html.parser')

        temp_price = elementSoup.find("div", {"class": "f8F1-price-text"})
        for li in elementSoup.find_all('li', class_='hJSA-item'):
            departure_time = li.find('div', class_='VY2U').find('div', class_='vmXl-mod-variant-large').text.strip()
            flight_duration = li.find('div', class_='xdW8').find('div', class_='vmXl-mod-variant-default').text.strip()
            if departure_time:
                cleaned_time = re.sub(r'\d+:\d+\s?[ap]\.m\.?', '', departure_time).strip().replace('–', '-')
                departure_times.append(cleaned_time)
            if flight_duration:
                flight_durations.append(flight_duration)
        if temp_price:
            prices.append(temp_price.text)
        else:
            prices.append("Price not found")

        stops_element = elementSoup.find("div", {"class": "JWEO"})
        if stops_element:
            stops = stops_element.find("span", {"class": "JWEO-stops-text"}).text.strip()
            stop_info = stops_element.find("div", {"class": "c_cgF c_cgF-mod-variant-default"})
            if stop_info:
                span_elements = stop_info.find_all('span', title=True)
                if span_elements:
                    airports = []
                    durations = []
                    stops_info.append(stops)
                    for span_element in span_elements:
                        title_attribute = span_element.get('title')
                        if title_attribute:
                            layover_duration, layover_airport = title_attribute.split(',')[0].strip(), title_attribute.split(',')[1].strip()
                            airports.append(layover_airport)
                            durations.append(layover_duration)
                    layover_airports.append(', '.join(airports))
                    layover_durations.append(', '.join(durations))
                else:
                    stops_info.append("Span elements with title not found")
                    layover_durations.append("Layover durations not found")
                    layover_airports.append("Layover airports not found")
            else:
                stops_info.append("Stop info not found")
                layover_durations.append("Layover durations not found")
                layover_airports.append("Layover airports not found")
        else:
            stops_info.append("Number of stops not found")


    cleaned_layover_airports = [BeautifulSoup(name, 'html.parser').text for name in layover_airports]
    flight_data = {
        "Prices": prices,
        "Departure Times": departure_times,
        "Flight Durations": flight_durations,
        "Stops": stops_info,
        "Layover Airports": cleaned_layover_airports,
        "Layover Durations": layover_durations
    }
    driver.quit()
    return flight_data



